import Hero from "@/components/Hero";
import AgencyIntro from "@/components/AgencyIntro";
import DestinationsGallery from "@/components/DestinationsGallery";
import Quiz from "@/components/Quiz";
import ReservationForm from "@/components/ReservationForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsGallery />
      <AgencyIntro />
      <Quiz />
      <ReservationForm />
    </>
  );
}
