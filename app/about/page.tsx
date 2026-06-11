import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import Timeline from "@/components/sections/Timeline";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Button from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Karthikeya Velivela — AppSec Engineer & Software Developer at PETZU, founder of FYRO, dev studio founder with 50+ sites shipped, active HackerOne researcher.",
};

export default function AboutPage() {
  return (
    <div className="pt-36 md:pt-44">
      {/* Editorial split hero */}
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <p data-reveal className="t-label mb-6 flex items-center gap-3 text-(--muted)">
            <span aria-hidden className="h-px w-10" style={{ background: "var(--orange)" }} />
            About
          </p>
          <RevealText
            as="h1"
            lines={[
              "Builder by day.",
              <span key="g" className="t-grad">Breaker by choice.</span>,
            ]}
            className="t-title"
          />

          {/* Story — two columns */}
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div className="space-y-6 text-(--muted)">
              <p data-reveal>
                I&apos;m Karthikeya — AppSec Engineer & Software Developer at
                PETZU, where new features get threat-modeled before they exist
                and code gets security review before it merges. I work both
                sides of the boundary: building the product and attacking it.
              </p>
              <p data-reveal data-delay="0.08">
                FYRO, the company I founded, started at my family&apos;s
                construction-materials business — watching trucks deliver a
                load and drive home empty. It&apos;s now a live multi-tenant
                logistics platform matching return-trips with waiting loads
                across Tier-2 India.
              </p>
            </div>
            <div className="space-y-6 text-(--muted)">
              <p data-reveal data-delay="0.16">
                Before the titles, I ran an independent dev studio that shipped
                50+ websites — the training ground where speed and polish
                stopped being trade-offs. That muscle showed up at Guidewire
                DEVTrails 2026, where our team&apos;s GuidePay placed Rank 54
                of 7,000.
              </p>
              <p data-reveal data-delay="0.24">
                The offensive side never stops: I hunt on HackerOne, and the
                recon workflow from that hunting became SentinelX, my
                open-source OSINT CLI. B.Tech CSE at KL University, Vijayawada
                — 9.2 CGPA, Class of 2027.
              </p>
            </div>
          </div>
        </div>

        {/* Portrait frame */}
        <div className="md:col-span-4 md:col-start-9">
          <div
            data-reveal
            data-delay="0.2"
            className="relative overflow-hidden rounded-(--radius) p-px"
            style={{ background: "var(--grad)" }}
          >
            {/* TODO: replace with real photo —
                <Image src="/portrait.jpg" alt="Karthikeya Velivela" width={800} height={1000} className="rounded-[21px] object-cover" />
                Keep the gradient-border wrapper. */}
            <div
              className="relative flex aspect-[4/5] items-center justify-center rounded-[21px]"
              style={{ background: "var(--surface)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,107,43,0.12), transparent 60%)",
                }}
              />
              <LogoMark className="h-28 w-28 opacity-15" />
            </div>
          </div>
          <p data-reveal data-delay="0.3" className="t-label mt-4 text-(--muted)">
            Vijayawada, India — IST
          </p>
        </div>
      </div>

      {/* Experience timeline */}
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <p data-reveal className="t-label mb-5 flex items-center gap-3 text-(--muted)">
          <span aria-hidden className="h-px w-10" style={{ background: "var(--teal)" }} />
          Experience
        </p>
        <RevealText as="h2" lines={["The road", "so far."]} className="t-title mb-16" />
        <Timeline />
      </div>

      {/* Skills */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p data-reveal className="t-label mb-5 flex items-center gap-3 text-(--muted)">
          <span aria-hidden className="h-px w-10" style={{ background: "var(--orange)" }} />
          Skills
        </p>
        <RevealText as="h2" lines={["Tools of", "the trade."]} className="t-title mb-12" />
      </div>
      <SkillsGrid />

      {/* Closing CTA */}
      <div className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10 md:py-36">
        <RevealText
          as="p"
          lines={["Want the longer version?"]}
          className="t-title mb-10"
        />
        <div data-reveal data-delay="0.2">
          <Button href="/contact">
            Say hello <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
