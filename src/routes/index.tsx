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
    ],
  }),
  component: Index,
});

const STEPS = [
  { n: "01", title: "Discovery",       body: "Understanding your brand, products and aspirations." },
  { n: "02", title: "Curation",        body: "Assessing suitability for the Dutch market." },
  { n: "03", title: "Positioning",     body: "Refining pricing, presentation and storytelling." },
  { n: "04", title: "Retail Presence", body: "Introducing your brand into retail presence." },
  { n: "05", title: "Activation",      body: "Connecting your brand with customers through engagement and exposure." },
  { n: "06", title: "Insights",        body: "Gathering feedback, sales performance and market response." },
  { n: "07", title: "Growth",          body: "Exploring future opportunities and long-term collaboration." },
];

function Index() {
  return (
    <main
      className="min-h-screen bg-noir-deep text-white antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Hero />
      <SerpentineJourney />
      <Closing />
    </main>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function Hero() {
  const [m, setM] = useState({ x: 0.5, y: 0.4 });
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const headline = "Our Process";

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-white/5 px-6 pb-28 pt-28 sm:pt-36 lg:px-10 lg:pb-40 lg:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(900px circle at ${m.x * 100}% ${m.y * 100}%, oklch(0.78 0.13 85 / 0.12), transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl text-center">
        <div
          className={`inline-flex items-center gap-4 transition-all duration-1000 ${
            shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="h-px w-12 bg-gold" />
          <span
            className="text-[11px] uppercase tracking-[0.32em] text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            §02 — Market Entry &amp; Retail Presence
          </span>
          <span className="h-px w-12 bg-gold" />
        </div>

        <h1
          ref={headlineRef}
          aria-label={headline}
          style={{ fontFamily: "var(--font-display)" }}
          className="mx-auto mt-10 max-w-5xl text-[clamp(3.5rem,11vw,10rem)] font-medium leading-[0.9] tracking-[-0.045em]"
        >
          {headline.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block transition-all"
              style={{
                transitionDuration: "900ms",
                transitionDelay: `${120 + i * 55}ms`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(40%)",
                filter: shown ? "blur(0)" : "blur(8px)",
                fontStyle: ch === "P" || ch === "r" || ch === "o" || ch === "c" || ch === "e" || ch === "s" ? undefined : undefined,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
          <span className="text-gold">.</span>
        </h1>

        <p
          className={`mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/65 transition-all duration-1000 sm:text-xl ${
            shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          A <em className="not-italic text-gold-soft">seven-step</em> journey from discovery to long-term growth, designed to bring your brand into the European market with{" "}
          <em className="not-italic text-gold-soft">intention</em> and{" "}
          <em className="not-italic text-gold-soft">clarity</em>.
        </p>

        <div
          className={`mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/40 transition-opacity duration-1000 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "var(--font-display)", transitionDelay: "1300ms" }}
        >
          <span>Scroll to follow the path</span>
          <svg width="14" height="40" viewBox="0 0 14 40" fill="none" className="text-gold">
            <path d="M7 0v32" stroke="currentColor" strokeWidth="1" />
            <path d="M2 28l5 8 5-8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── SERPENTINE JOURNEY ──────────────────────── */

function SerpentineJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  // Measure path length once mounted (and on resize)
  useEffect(() => {
    const measure = () => {
      if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-driven progress through the section
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.2;
      const total = r.height - (start - end);
      const traveled = Math.min(Math.max(start - r.top, 0), total);
      const p = total > 0 ? traveled / total : 0;
      setProgress(p);
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length + 0.001)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Serpentine SVG path — built across a fixed viewBox; scales to container width
  // Viewport: 1000 wide, 2100 tall — 7 curved segments
  const PATH_D = `
    M 500 40
    C 760 120, 760 300, 500 380
    C 240 460, 240 640, 500 720
    C 760 800, 760 980, 500 1060
    C 240 1140, 240 1320, 500 1400
    C 760 1480, 760 1660, 500 1740
    C 240 1820, 240 2000, 500 2080
  `;

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 sm:py-28 lg:px-10 lg:py-32"
    >
      {/* Eyebrow */}
      <div className="mx-auto mb-20 flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-gold/60" />
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-white/40"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Framework
          </span>
        </div>
        <span
          className="hidden text-[10px] uppercase tracking-[0.32em] text-gold sm:inline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(active + 1).padStart(2, "0")} / 07 · {Math.round(progress * 100)}%
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* SVG serpentine path — absolute, full height */}
        <svg
          aria-hidden
          viewBox="0 0 1000 2120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        >
          {/* Faint base path */}
          <path
            d={PATH_D}
            fill="none"
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth="1.2"
          />
          {/* Gold draw path */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="oklch(0.78 0.13 85)"
            strokeWidth="1.4"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLen || 0,
              strokeDashoffset: pathLen ? pathLen * (1 - progress) : 0,
              transition: "stroke-dashoffset 200ms linear",
              filter: "drop-shadow(0 0 6px oklch(0.78 0.13 85 / 0.5))",
            }}
          />
        </svg>

        {/* Steps — alternating sides */}
        <ol className="relative grid grid-cols-1 gap-y-20 md:gap-y-28">
          {STEPS.map((s, i) => {
            const left = i % 2 === 0;
            const isActive = i === active;
            const isPast = i < active;
            return (
              <StepRow
                key={s.n}
                index={i}
                step={s}
                left={left}
                isActive={isActive}
                isPast={isPast}
              />
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  left,
  isActive,
  isPast,
}: {
  step: { n: string; title: string; body: string };
  index: number;
  left: boolean;
  isActive: boolean;
  isPast: boolean;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dim = !isActive && !isPast;

  return (
    <li
      ref={ref}
      className={`relative grid grid-cols-12 items-center transition-all duration-700 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Left side content (or spacer) */}
      <div
        className={`col-span-12 md:col-span-5 ${left ? "md:order-1" : "md:order-3"} ${
          left ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            dim ? "scale-[0.97] opacity-50 blur-[1px]" : "scale-100 opacity-100 blur-0"
          }`}
        >
          <div
            className={`flex items-center gap-3 ${left ? "md:justify-end" : "justify-start"}`}
          >
            {!left && <span className="h-px w-8 bg-gold/60" />}
            <span
              className="text-[10px] uppercase tracking-[0.32em] text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Step {step.n}
            </span>
            {left && <span className="h-px w-8 bg-gold/60" />}
          </div>

          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className={`mt-4 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.03em] transition-colors duration-500 ${
              isActive ? "text-white" : isPast ? "text-white/85" : "text-white/70"
            }`}
          >
            {step.title}
          </h3>

          <p
            className={`mt-4 max-w-md text-base leading-relaxed text-white/55 sm:text-lg ${
              left ? "md:ml-auto" : ""
            }`}
          >
            {step.body}
          </p>
        </div>
      </div>

      {/* Center node */}
      <div className="col-span-12 hidden md:order-2 md:col-span-2 md:flex md:justify-center">
        <div className="relative">
          <span
            className={`relative grid h-14 w-14 place-items-center rounded-full border bg-noir-deep transition-all duration-500 ${
              isActive
                ? "border-gold shadow-[0_0_0_8px_oklch(0.78_0.13_85/0.08)]"
                : isPast
                  ? "border-gold/70"
                  : "border-white/15"
            }`}
          >
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className={`text-xs font-medium tracking-tight transition-colors duration-500 ${
                isActive || isPast ? "text-gold" : "text-white/50"
              }`}
            >
              {step.n}
            </span>
            {isActive && (
              <span className="absolute inset-0 -z-0 animate-ping rounded-full border border-gold/40" />
            )}
          </span>
          {isActive && (
            <span className="absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-2xl" />
          )}
        </div>
      </div>

      {/* Opposite-side oversized numeral watermark */}
      <div
        className={`col-span-12 hidden md:col-span-5 md:flex ${
          left ? "md:order-3 md:justify-start md:pl-12" : "md:order-1 md:justify-end md:pr-12"
        }`}
      >
        <span
          aria-hidden
          style={{
            fontFamily: "var(--font-display)",
            WebkitTextStroke: isActive
              ? "1.5px oklch(0.78 0.13 85 / 0.55)"
              : "1px oklch(0.78 0.13 85 / 0.18)",
            color: "transparent",
            transition: "all 600ms ease",
            transform: isActive ? "translateY(-6px)" : "translateY(0)",
          }}
          className="select-none text-[10rem] font-medium leading-none tracking-tighter sm:text-[14rem]"
        >
          {step.n}
        </span>
      </div>
    </li>
  );
}

/* ─────────────────────────────── CLOSING ─────────────────────────────── */

function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 px-6 py-24 sm:py-32 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold" />
          <span
            className="text-[11px] uppercase tracking-[0.32em] text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Continue the journey
          </span>
          <span className="h-px w-12 bg-gold" />
        </div>
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="mx-auto mt-8 max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em]"
        >
          Seven stages. <span className="italic text-gold-soft">One direction.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Every brand we partner with begins here — with discovery, with curiosity, with a quiet ambition to be understood before being sold.
        </p>
        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href="mailto:N21West.nl@gmail.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-gold transition-colors duration-500 hover:text-noir-deep"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative">Begin with us</span>
            <span className="relative">→</span>
          </a>
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-white/30"
            style={{ fontFamily: "var(--font-display)" }}
          >
            N21West.nl@gmail.com · Amsterdam · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
