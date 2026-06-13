"use client";

import dynamic from "next/dynamic";

const EvilEye = dynamic(() => import("@/components/three/EvilEye"), { ssr: false });

/** Full-bleed WebGL eye that tracks the cursor — the /eye experiment. */
export default function EyeStage() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <EvilEye
          eyeColor="#FF6F37"
          intensity={1.5}
          pupilSize={1.75}
          irisWidth={0.25}
          glowIntensity={0.35}
          scale={1}
          noiseScale={1.3}
          pupilFollow={1}
          flameSpeed={1}
          backgroundColor="#0B0A08"
        />
      </div>

      {/* soft scrim so the caption reads over the flame ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 44% 30% at 50% 52%, color-mix(in srgb, var(--bg) 78%, transparent) 0%, transparent 72%)",
        }}
      />

      <div className="pointer-events-none relative z-10 flex flex-col items-center px-6 text-center">
        <p data-reveal className="t-label mb-4 flex items-center gap-3 text-(--muted)">
          <span aria-hidden className="h-px w-10" style={{ background: "var(--orange)" }} />
          Experiment
        </p>
        <h1
          data-reveal
          data-delay="0.1"
          className="t-title text-(--ink)"
          style={{ fontFamily: "Clash Display, system-ui, sans-serif" }}
        >
          It watches back.
        </h1>
        <p
          data-reveal
          data-delay="0.25"
          className="mt-5 max-w-md text-sm leading-relaxed text-(--muted)"
        >
          A real-time WebGL eye rendered on a single fragment shader — the pupil
          follows your cursor. Move it around.
        </p>
      </div>
    </section>
  );
}
