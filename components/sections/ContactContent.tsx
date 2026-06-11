"use client";

import { useRef, useState } from "react";
import Blobs from "@/components/layout/Blobs";
import RevealText from "@/components/ui/RevealText";
import Toast from "@/components/ui/Toast";
import ContactForm from "@/components/sections/ContactForm";
import { SITE, SOCIALS } from "@/data/site";
import { useISTClock } from "@/lib/hooks";

export default function ContactContent() {
  const time = useISTClock();
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2200);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      show("Email copied");
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <>
      {/* blobs intensify slightly on this page */}
      <Blobs intense />
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 pt-36 pb-28 md:grid-cols-2 md:px-10 md:pt-44">
        <div>
          <RevealText
            as="h1"
            lines={["Say", <span key="g" className="t-grad">hello.</span>]}
            className="t-hero"
          />

          <div className="mt-14 space-y-11">
            <div data-reveal>
              <p className="t-label mb-4 text-(--muted)">Email — click to copy</p>
              <button
                onClick={copyEmail}
                aria-label={`Copy email address ${SITE.email}`}
                className="u-draw break-all text-left font-display font-semibold tracking-tight text-(--ink) transition-colors duration-300 hover:text-(--orange)"
                style={{
                  fontFamily: "Clash Display, system-ui, sans-serif",
                  fontSize: "clamp(1.25rem, 2.6vw, 2rem)",
                }}
              >
                {SITE.email}
              </button>
            </div>

            <div data-reveal data-delay="0.1">
              <p className="t-label mb-4 text-(--muted)">Elsewhere</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-hop u-draw font-medium text-(--muted) hover:text-(--orange)"
                    >
                      {s.label} <span className="arrow" aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal data-delay="0.2">
              <p className="t-label mb-4 text-(--muted)">Local time</p>
              <p
                className="font-display text-2xl font-semibold tabular-nums text-(--ink)"
                style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
                suppressHydrationWarning
              >
                {time}{" "}
                <span className="text-sm font-normal text-(--muted)">IST</span>
              </p>
              <p className="mt-2 text-sm text-(--muted)">Usually replies within a day.</p>
            </div>
          </div>
        </div>

        <ContactForm onSent={show} />
      </div>
      <Toast show={!!toast} message={toast} />
    </>
  );
}
