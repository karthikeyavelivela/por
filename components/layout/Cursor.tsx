"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

type Mode = "free" | "snap" | "view" | "drag";

/**
 * Morphing cursor. Free: a small dot that squashes & stretches with
 * velocity. Over links/buttons it snaps onto the element as a rounded
 * highlight that drifts with the pointer. Over project covers/carousels it
 * becomes a labelled disc ("View"/"Drag"). Desktop fine-pointers only.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-cursor");
      return;
    }
    document.body.classList.add("has-cursor");

    const el = elRef.current!;
    const label = labelRef.current!;
    const DOT = 12;

    let mode: Mode = "free";
    let snapTarget: HTMLElement | null = null;
    let snapRect: DOMRect | null = null;
    let shown = false;

    // smoothed position + velocity for the free-mode stretch
    const pos = { x: -100, y: -100 };
    const smooth = { x: -100, y: -100 };
    let raf = 0;

    gsap.set(el, { xPercent: -50, yPercent: -50, width: DOT, height: DOT, borderRadius: 999 });

    const setFreeStyle = () => {
      el.style.background = "var(--ink)";
      el.style.border = "none";
      el.style.mixBlendMode = "difference";
      label.style.opacity = "0";
    };
    setFreeStyle();

    const toFree = () => {
      mode = "free";
      snapTarget = null;
      snapRect = null;
      setFreeStyle();
      gsap.to(el, {
        width: DOT,
        height: DOT,
        borderRadius: 999,
        duration: 0.4,
        ease: "expo.out",
      });
    };

    const toSnap = (target: HTMLElement) => {
      mode = "snap";
      snapTarget = target;
      snapRect = target.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(target).borderRadius) || 10;
      el.style.mixBlendMode = "normal";
      el.style.background = "transparent";
      el.style.border = "1.5px solid var(--orange)";
      label.style.opacity = "0";
      gsap.to(el, {
        width: snapRect.width + 12,
        height: snapRect.height + 12,
        borderRadius: Math.min(radius + 6, (snapRect.height + 12) / 2),
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        duration: 0.45,
        ease: "expo.out",
      });
    };

    const toDisc = (kind: "view" | "drag") => {
      mode = kind;
      snapTarget = null;
      snapRect = null;
      el.style.mixBlendMode = "normal";
      el.style.background = "var(--ink)";
      el.style.border = "none";
      label.textContent = kind === "view" ? "View" : "Drag";
      label.style.opacity = "1";
      gsap.to(el, {
        width: 84,
        height: 84,
        borderRadius: 999,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        duration: 0.45,
        ease: "expo.out",
      });
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!shown) {
        shown = true;
        smooth.x = pos.x;
        smooth.y = pos.y;
        el.style.opacity = "1";
      }

      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest<HTMLElement>("a, button, [role=button]");

      if (tagged?.dataset.cursor === "view") {
        if (mode !== "view") toDisc("view");
      } else if (tagged?.dataset.cursor === "drag") {
        if (mode !== "drag") toDisc("drag");
      } else if (interactive) {
        if (snapTarget !== interactive) toSnap(interactive);
      } else if (mode !== "free") {
        toFree();
      }
    };

    const loop = () => {
      const dx = pos.x - smooth.x;
      const dy = pos.y - smooth.y;
      smooth.x += dx * 0.18;
      smooth.y += dy * 0.18;

      if (mode === "snap" && snapRect) {
        // pin to the element with a slight magnetic drift toward the pointer
        const cx = snapRect.left + snapRect.width / 2;
        const cy = snapRect.top + snapRect.height / 2;
        gsap.set(el, {
          x: cx + (pos.x - cx) * 0.14,
          y: cy + (pos.y - cy) * 0.14,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
        });
      } else if (mode === "free") {
        // squash & stretch along the velocity vector
        const v = Math.min(Math.hypot(dx, dy), 80);
        const stretch = 1 + v * 0.006;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        gsap.set(el, {
          x: smooth.x,
          y: smooth.y,
          rotate: angle,
          scaleX: stretch,
          scaleY: 1 / stretch,
        });
      } else {
        gsap.set(el, { x: smooth.x, y: smooth.y, rotate: 0, scaleX: 1, scaleY: 1 });
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => {
      gsap.to(el, { scale: 0.85, duration: 0.15, ease: "power2.out" });
    };
    const onUp = () => {
      gsap.to(el, { scale: 1, duration: 0.35, ease: "back.out(2.5)" });
    };
    const onLeaveWindow = () => {
      el.style.opacity = "0";
      shown = false;
    };
    const onScroll = () => {
      // element moved under us — re-measure or release
      if (mode === "snap" && snapTarget) snapRect = snapTarget.getBoundingClientRect();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-9990">
      <div
        ref={elRef}
        className="fixed left-0 top-0 flex items-center justify-center opacity-0 transition-opacity duration-200 will-change-transform"
        style={{ background: "var(--ink)", mixBlendMode: "difference" }}
      >
        <span
          ref={labelRef}
          className="text-[11px] font-semibold tracking-wide opacity-0 transition-opacity duration-200"
          style={{ color: "var(--bg)" }}
        />
      </div>
    </div>
  );
}
