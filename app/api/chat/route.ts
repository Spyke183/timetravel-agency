import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, fallbackReply } from "@/lib/chatbot";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant" | "system"; content: string };

function resolveProvider() {
  if (process.env.MISTRAL_API_KEY) {
    return {
      name: "mistral",
      url: "https://api.mistral.ai/v1/chat/completions",
      key: process.env.MISTRAL_API_KEY,
      model: process.env.MISTRAL_MODEL || "mistral-small-latest",
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      name: "groq",
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
    };
  }
  if (process.env.OPENROUTER_API_KEY) {
    return {
      name: "openrouter",
      url: "https://openrouter.ai/api/v1/chat/completions",
      key: process.env.OPENROUTER_API_KEY,
      model: process.env.OPENROUTER_MODEL || "mistralai/mistral-small-3.2-24b-instruct:free",
    };
  }
  return null;
}

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const history = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content ?? "").slice(0, 2000),
  }));

  while (history.length && history[0].role !== "user") history.shift();

  const provider = resolveProvider();

  if (!provider) {
    return NextResponse.json({ reply: fallbackReply(history), source: "fallback" });
  }

  try {
    const res = await fetch(provider.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.key}`,
      },
      body: JSON.stringify({
        model: provider.model,
        temperature: 0.6,
        max_tokens: 500,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[chat] ${provider.name} error ${res.status}: ${detail}`);
      return NextResponse.json({ reply: fallbackReply(history), source: "fallback" });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ reply: fallbackReply(history), source: "fallback" });
    }
    return NextResponse.json({ reply, source: provider.name });
  } catch (err) {
    console.error("[chat] exception:", err);
    return NextResponse.json({ reply: fallbackReply(history), source: "fallback" });
  }
}
