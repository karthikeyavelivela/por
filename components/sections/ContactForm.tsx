"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { FORMSPREE_ENDPOINT, SITE } from "@/data/site";
import { cn, isFinePointer, prefersReducedMotion } from "@/lib/utils";

function Field({
  id,
  label,
  type = "text",
  textarea,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  const shared = cn(
    "w-full rounded-2xl border bg-transparent px-5 pt-7 pb-3 text-(--ink) outline-none transition-[border-color,box-shadow] duration-300"
  );

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-5 transition-all duration-300",
          float ? "top-2.5 text-[10px] uppercase tracking-[0.18em]" : "top-5 text-(--muted)"
        )}
        style={{
          color: float ? "var(--orange)" : undefined,
          transitionTimingFunction: "var(--ease)",
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(shared, "resize-none")}
          style={{
            borderColor: focused ? "rgba(255,107,43,0.55)" : "var(--line)",
            boxShadow: focused ? "0 0 0 3px rgba(255,107,43,0.12)" : "none",
          }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={shared}
          style={{
            borderColor: focused ? "rgba(255,107,43,0.55)" : "var(--line)",
            boxShadow: focused ? "0 0 0 3px rgba(255,107,43,0.12)" : "none",
          }}
        />
      )}
    </div>
  );
}

export default function ContactForm({
  onSent,
}: {
  onSent: (message: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: paste Formspree ID into FORMSPREE_ENDPOINT in data/site.ts
    if (FORMSPREE_ENDPOINT) {
      setSending(true);
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (res.ok) {
          onSent("Message sent — talk soon.");
          setName("");
          setEmail("");
          setMessage("");
          return;
        }
      } catch {
        // fall through to mailto
      } finally {
        setSending(false);
      }
    }
    // Fallback: never dead-end — compose a prefilled email.
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: gsap.utils.clamp(-8, 8, (e.clientX - (r.left + r.width / 2)) * 0.08),
      y: gsap.utils.clamp(-8, 8, (e.clientY - (r.top + r.height / 2)) * 0.15),
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <form onSubmit={onSubmit} className="glass rounded-(--radius) p-7 md:p-9" data-reveal data-delay="0.2">
      <div className="space-y-5">
        <Field id="name" label="Your name" value={name} onChange={setName} />
        <Field id="email" label="Your email" type="email" value={email} onChange={setEmail} />
        <Field id="message" label="What's on your mind?" textarea value={message} onChange={setMessage} />
      </div>
      <button
        type="submit"
        disabled={sending}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative mt-7 w-full overflow-hidden rounded-full px-7 py-4 font-medium disabled:opacity-60"
        style={{ background: "var(--ink)", color: "var(--bg)" }}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
          style={{ background: "var(--grad)", transitionTimingFunction: "var(--ease)" }}
        />
        <span className="relative z-10">{sending ? "Sending…" : "Send message →"}</span>
      </button>
      <p className="mt-4 text-center text-xs text-(--muted)">
        {FORMSPREE_ENDPOINT
          ? "Delivered via Formspree."
          : "Opens your mail client — nothing stored."}
      </p>
    </form>
  );
}
