import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Process — N21 West" },
      {
        name: "description",
        content:
          "A seven-step journey from discovery to long-term growth — bringing your brand into the European market with intention and clarity.",
      },
      { property: "og:title", content: "Our Process — N21 West" },
      {
        property: "og:description",
        content:
          "A seven-step journey from discovery to long-term growth — bringing your brand into the European market with intention and clarity.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Understanding your brand, products and aspirations.",
  },
  {
    n: "02",
    title: "Curation",
    body: "Assessing suitability for the Dutch market.",
  },
  {
    n: "03",
    title: "Positioning",
    body: "Refining pricing, presentation and storytelling.",
  },
  {
    n: "04",
    title: "Retail Presence",
    body: "Introducing your brand into retail presence.",
  },
  {
    n: "05",
    title: "Activation",
    body: "Connecting your brand with customers through engagement and exposure.",
  },
  {
    n: "06",
    title: "Insights",
    body: "Gathering feedback, sales performance and market response.",
  },
  {
    n: "07",
    title: "Growth",
    body: "Exploring future opportunities and long-term collaboration.",
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-noir-deep text-white antialiased">
      <OurProcess />
    </main>
  );
}

function OurProcess() {
  const ref = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.2 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Scroll-driven progress + active step along the rail
  useEffect(() => {
    const onScroll = () => {
      const rail = railRef.current;
      if (!rail) return;
      const r = rail.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.25;
      const total = r.height - (start - end);
      const traveled = Math.min(Math.max(start - r.top, 0), total);
      const p = total > 0 ? traveled / total : 0;
      setProgress(p);
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length + 0.01)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
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
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, oklch(0.78 0.13 85 / 0.10), transparent 60%)`,
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
        {/* Header — asymmetric ~60% */}
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
              §02 — Market Entry &amp; Retail Presence
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className={`mt-8 text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-all delay-100 duration-1000 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Our
            <br />
            <span className="inline-flex items-baseline gap-4">
              <span className="italic text-gold-soft" style={{ fontFamily: "var(--font-display)" }}>
                Process
              </span>
              <span className="relative">
                .
                <span
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gold transition-transform delay-700 duration-700"
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
            A <em className="not-italic text-gold-soft">seven-step</em> journey from discovery to
            long-term growth, designed to bring your brand into the European market with{" "}
            <em className="not-italic text-gold-soft">intention</em> and{" "}
            <em className="not-italic text-gold-soft">clarity</em>.
          </p>
        </div>

        {/* Side index — sticky counter */}
        <aside className="col-span-12 lg:col-span-5 lg:pt-24">
          <div className="lg:sticky lg:top-24">
            <div
              className={`relative border border-white/10 bg-noir/50 p-8 backdrop-blur-sm transition-all delay-500 duration-1000 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Corner className="-left-px -top-px" />
              <Corner className="-right-px -top-px rotate-90" />
              <Corner className="-bottom-px -left-px -rotate-90" />
              <Corner className="-bottom-px -right-px rotate-180" />

              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] uppercase tracking-[0.32em] text-white/40"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Stage
                </span>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  In motion
                </span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-7xl font-medium leading-none tracking-tight text-gold transition-all duration-500"
                  key={STEPS[active].n}
                >
                  {STEPS[active].n}
                </span>
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="pb-2 text-2xl font-medium text-white"
                >
                  {STEPS[active].title}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {STEPS[active].body}
              </p>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="relative h-px w-full bg-white/10">
                  <div
                    className="absolute left-0 top-0 h-px bg-gold transition-[width] duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/40">
                  <span>{String(active + 1).padStart(2, "0")} / 07</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Rail of steps */}
        <div ref={railRef} className="col-span-12 lg:col-span-7 lg:-mt-24">
          <ol className="relative">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-[18px] top-0 h-full w-px bg-white/10 sm:left-[26px]"
            />
            <div
              aria-hidden
              className="absolute left-[18px] top-0 w-px bg-gold transition-[height] duration-300 sm:left-[26px]"
              style={{ height: `${progress * 100}%` }}
            />

            {STEPS.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <li
                  key={s.n}
                  className={`group relative flex gap-6 py-8 transition-all duration-700 sm:gap-10 ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  {/* Node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border bg-noir-deep transition-all duration-500 sm:h-[52px] sm:w-[52px] ${
                        isActive
                          ? "border-gold shadow-[0_0_0_6px_oklch(0.78_0.13_85/0.08)]"
                          : isPast
                            ? "border-gold/60"
                            : "border-white/15"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                          isActive || isPast ? "bg-gold" : "bg-white/30"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute inset-0 -z-0 animate-ping rounded-full border border-gold/40" />
                      )}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 border-b border-white/5 pb-2">
                    <div className="flex items-baseline gap-4">
                      <span
                        style={{ fontFamily: "var(--font-display)" }}
                        className={`text-xs uppercase tracking-[0.32em] transition-colors duration-500 ${
                          isActive || isPast ? "text-gold" : "text-white/35"
                        }`}
                      >
                        Step {s.n}
                      </span>
                      <span className="h-px flex-1 bg-white/5" />
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className={`mt-3 text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.02] tracking-[-0.02em] transition-colors duration-500 ${
                        isActive ? "text-white" : isPast ? "text-white/80" : "text-white/45"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-xl text-base leading-relaxed transition-colors duration-500 sm:text-lg ${
                        isActive ? "text-white/75" : "text-white/40"
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bottom marker */}
        <div
          className="col-span-12 mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.28em] text-white/30"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span>N21 West — Market Entry Framework</span>
          <span className="hidden sm:inline">Seven Stages · {new Date().getFullYear()}</span>
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
