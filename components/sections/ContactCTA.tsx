import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { SITE, SOCIALS } from "@/data/site";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-32 text-center md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <RevealText
          as="h2"
          lines={[
            "Let's build",
            <span key="g" className="t-grad">something.</span>,
          ]}
          className="t-hero"
        />

        <div data-reveal data-delay="0.3" className="mt-14">
          <Button href={`mailto:${SITE.email}`} external>
            {SITE.email}
          </Button>
        </div>

        <ul data-reveal data-delay="0.45" className="mt-10 flex justify-center gap-8">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-hop u-draw text-sm font-medium text-(--muted) hover:text-(--ink)"
              >
                {s.label} <span className="arrow" aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
