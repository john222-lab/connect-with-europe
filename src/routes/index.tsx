import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Work With Us — N21 West" },
      {
        name: "description",
        content:
          "Partner with N21 West to enter the European market with intention, clarity, and long-term commitment.",
      },
      { property: "og:title", content: "Work With Us — N21 West" },
      {
        property: "og:description",
        content:
          "Partner with N21 West to enter the European market with intention, clarity, and long-term commitment.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-noir-deep text-white antialiased">
      <WorkWithUs />
    </main>
  );
}

function WorkWithUs() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const email = "N21West.nl@gmail.com";
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      style={{ fontFamily: "var(--font-sans)" }}
      className="relative overflow-hidden bg-noir-deep py-24 sm:py-32 lg:py-40"
    >
      {/* Spotlight follow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, oklch(0.78 0.13 85 / 0.12), transparent 60%)`,
        }}
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-16 px-6 lg:px-10">
        {/* LEFT — Editorial header (asymmetric ~60%) */}
        <div className="col-span-12 lg:col-span-7">
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-px w-12 bg-gold" />
            <span
              className="text-[11px] uppercase tracking-[0.32em] text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              §01 — Partnership
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className={`mt-8 text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-all delay-100 duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Work
            <br />
            <span className="inline-flex items-baseline gap-4">
              <span className="italic text-gold-soft" style={{ fontFamily: "var(--font-display)" }}>
                with
              </span>
              <span className="relative">
                Us
                <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-0 bg-gold transition-transform delay-700 duration-700"
                  style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
                />
              </span>
            </span>
          </h2>

          <p
            className={`mt-10 max-w-xl text-lg leading-relaxed text-white/70 transition-all delay-300 duration-1000 sm:text-xl ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            We partner with brands that are ready to enter the European market with{" "}
            <em className="not-italic text-gold-soft">intention</em>,{" "}
            <em className="not-italic text-gold-soft">clarity</em>, and{" "}
            <em className="not-italic text-gold-soft">long-term commitment</em>.
          </p>
          <p
            className={`mt-4 max-w-xl text-base leading-relaxed text-white/55 transition-all delay-500 duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            If you are ready to take the next step, we would be glad to connect.
          </p>
        </div>

        {/* RIGHT — Contact card (asymmetric ~40%) */}
        <div className="col-span-12 lg:col-span-5 lg:pt-24">
          <div
            className={`group relative transition-all delay-500 duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Gold border frame */}
            <div className="relative border border-white/10 bg-noir/50 p-8 backdrop-blur-sm sm:p-10 transition-colors duration-500 hover:border-gold/40">
              {/* Corner ticks */}
              <Corner className="-left-px -top-px" />
              <Corner className="-right-px -top-px rotate-90" />
              <Corner className="-bottom-px -left-px -rotate-90" />
              <Corner className="-bottom-px -right-px rotate-180" />

              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.32em] text-white/40"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Direct line
                </span>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  Available
                </span>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="group/email mt-6 block w-full text-left"
              >
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="block break-all text-2xl font-medium leading-tight text-white transition-colors duration-300 group-hover/email:text-gold sm:text-3xl"
                >
                  {email}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/40 transition-colors group-hover/email:text-gold-soft">
                  {copied ? "Copied to clipboard" : "Click to copy"}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d={copied ? "M2 6l3 3 5-6" : "M3 3h6v6M3 9l6-6"}
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <a
                href={`mailto:${email}?subject=Partnership%20Inquiry`}
                className="relative inline-flex w-full items-center justify-between overflow-hidden border border-gold/60 bg-transparent px-6 py-4 transition-all duration-500 hover:border-gold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-out group-hover:translate-x-0"
                />
                <span className="relative text-sm font-medium uppercase tracking-[0.28em] text-gold transition-colors duration-500 group-hover:text-noir-deep">
                  Get Started
                </span>
                <span className="relative flex h-8 w-8 items-center justify-center text-gold transition-all duration-500 group-hover:translate-x-1 group-hover:text-noir-deep">
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path
                      d="M1 5h17m0 0L14 1m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.2em] text-white/35">
                <Meta label="Based" value="Amsterdam" />
                <Meta label="Reply" value="< 48h" />
                <Meta label="Scope" value="Europe" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marker line */}
        <div className="col-span-12 mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.28em] text-white/30"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span>N21 West — Est. Netherlands</span>
          <span className="hidden sm:inline">Selective Partnerships · {new Date().getFullYear()}</span>
          <span>↘ Continue</span>
        </div>
      </div>
    </section>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 border-l border-t border-gold ${className}`}
    />
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white/30">{label}</span>
      <span className="text-white/70" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </span>
    </div>
  );
}
