import Counter from "@/components/ui/Counter";
import { STATS } from "@/data/site";

export default function StatsBand() {
  return (
    <section className="border-y" style={{ borderColor: "var(--line)", background: "rgba(22,19,16,0.5)" }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            data-delay={String(i * 0.08)}
            className="border-r px-6 py-16 text-center last:border-r-0 max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b md:px-8 md:py-20"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="t-grad font-display font-semibold leading-none"
              style={{
                fontFamily: "Clash Display, system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
              }}
            >
              <Counter
                value={s.value}
                decimals={"decimals" in s ? s.decimals : 0}
                prefix={"prefix" in s ? s.prefix : ""}
                suffix={"suffix" in s ? s.suffix : ""}
              />
            </p>
            <p className="mt-4 text-sm text-(--muted)">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
