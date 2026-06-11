import { skillCards, toolMarquee } from "@/data/skills";
import Marquee from "@/components/ui/Marquee";

export default function SkillsGrid() {
  return (
    <section className="py-8">
      <div className="mx-auto grid max-w-[1400px] gap-5 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {skillCards.map((card, i) => (
          <div
            key={card.title}
            data-reveal
            data-delay={String(i * 0.08)}
            className="toplit glass rounded-(--radius) p-7 transition-transform duration-500 hover:-translate-y-1.5"
            style={{ transitionTimingFunction: "var(--ease)" }}
          >
            <h3
              className="mb-5 font-display text-lg font-semibold tracking-tight"
              style={{
                fontFamily: "Clash Display, system-ui, sans-serif",
                color: card.accent === "orange" ? "var(--orange)" : "var(--teal)",
              }}
            >
              {card.title}
            </h3>
            <ul className="space-y-2.5">
              {card.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-(--muted)">
                  <span
                    aria-hidden
                    className="h-1 w-1 shrink-0 rounded-full"
                    style={{
                      background: card.accent === "orange" ? "var(--orange)" : "var(--teal)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Marquee phrases={toolMarquee} display={false} slow />
      </div>
    </section>
  );
}
