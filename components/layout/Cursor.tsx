"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Orange dot (instant) + ring (lerp 0.16, scale-based states, blend-difference
 * so it reads on any background). States: link → ring grows orange; view/drag
 * → ring fills ink with a label. Click squishes the ring. Hidden until the
 * first mousemove; never renders on touch / reduced-motion.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-cursor");
      return;
    }
    document.body.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let pressScale = 1;
    let state = "";
    let shown = false;
    let raf = 0;

    const applyState = (next: string) => {
      if (next === state) return;
      state = next;
      const ringEl = ringRef.current;
      const fillEl = fillRef.current;
      const labelEl = labelRef.current;
      if (!ringEl || !fillEl || !labelEl) return;

      if (next === "view" || next === "drag") {
        targetScale = 2.4;
        ringEl.style.borderColor = "transparent";
        ringEl.style.mixBlendMode = "normal";
        fillEl.style.opacity = "1";
        labelEl.textContent = next === "view" ? "View" : "Drag";
        labelEl.style.opacity = "1";
      } else if (next === "link") {
        targetScale = 1.7;
        ringEl.style.borderColor = "var(--orange)";
        ringEl.style.mixBlendMode = "normal";
        fillEl.style.opacity = "0";
        labelEl.style.opacity = "0";
      } else {
        targetScale = 1;
        ringEl.style.borderColor = "rgba(155,148,138,0.7)";
        ringEl.style.mixBlendMode = "difference";
        fillEl.style.opacity = "0";
        labelEl.style.opacity = "0";
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        ring.x = e.clientX;
        ring.y = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) applyState(tagged.dataset.cursor ?? "");
      else if (t.closest("a, button, [role=button], input, textarea, label")) applyState("link");
      else applyState("");
    };

    const onDown = () => {
      pressScale = 0.82;
    };
    const onUp = () => {
      pressScale = 1;
    };
    const onLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      shown = false;
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      scale += (targetScale * pressScale - scale) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) scale(${pressScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0) translate(-50%,-50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-9990">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[6px] w-[6px] rounded-full opacity-0 transition-opacity duration-200"
        style={{ background: "var(--orange)" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-full border opacity-0 transition-opacity duration-200 will-change-transform"
        style={{ borderColor: "rgba(155,148,138,0.7)", mixBlendMode: "difference" }}
      >
        <div
          ref={fillRef}
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
          style={{ background: "var(--ink)" }}
        />
        <span
          ref={labelRef}
          className="relative z-10 text-[10px] font-semibold tracking-wide opacity-0 transition-opacity duration-200"
          style={{ color: "var(--bg)" }}
        />
      </div>
    </div>
  );
}
