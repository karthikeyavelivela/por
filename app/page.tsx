import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import WorkShowcase from "@/components/sections/WorkShowcase";
import Statement from "@/components/sections/Statement";
import StatsBand from "@/components/sections/StatsBand";
import ContactCTA from "@/components/sections/ContactCTA";
import { marqueePhrases } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee phrases={marqueePhrases} />
      <WorkShowcase />
      <Statement />
      <StatsBand />
      <ContactCTA />
    </>
  );
}
