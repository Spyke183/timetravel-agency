import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://timetravel-agency-woad.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    ...destinations.map((d) => ({
      url: `${BASE}/destinations/${d.slug}`,
      priority: 0.8,
    })),
  ];
}
