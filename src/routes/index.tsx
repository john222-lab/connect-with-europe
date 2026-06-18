import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type SVGProps } from "react";

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

type Step = {
  n: string;
  title: string;
  body: string;
  meta: string;
  Icon: (props: SVGProps<SVGSVGElement> & { className?: string }) => React.ReactElement;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discovery",
    body: "Understanding your brand, products and aspirations.",
    meta: "Listen · Learn",
    Icon: IconDiscovery,
  },
  {
    n: "02",
    title: "Curation",
    body: "Assessing suitability for the Dutch market.",
    meta: "Select · Refine",
    Icon: IconCuration,
  },
  {
    n: "03",
    title: "Positioning",
    body: "Refining pricing, presentation and storytelling.",
    meta: "Price · Narrate",
    Icon: IconPositioning,
  },
  {
    n: "04",
    title: "Retail Presence",
    body: "Introducing your brand into retail presence.",
    meta: "Place · Display",
    Icon: IconRetail,
  },
  {
    n: "05",
    title: "Activation",
    body: "Connecting your brand with customers through engagement and exposure.",
    meta: "Engage · Expose",
    Icon: IconActivation,
  },
  {
    n: "06",
    title: "Insights",
    body: "Gathering feedback, sales performance and market response.",
    meta: "Measure · Learn",
    Icon: IconInsights,
  },
  {
    n: "07",
    title: "Growth",
    body: "Exploring future opportunities and long-term collaboration.",
    meta: "Scale · Sustain",
    Icon: IconGrowth,
  },
];

function Index() {
  return (
    <main
      className="min-h-screen bg-noir-deep text-white antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Hero />
      <JourneyMap />
      <Closing />
    </main>
  );
}

/* ─────────────────────────────────  HERO  ───────────────────────────────── */

function Hero() {
  const [m, setM] = useState({ x: 0.5, y: 0.4 });
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-white/5 px-6 pb-24 pt-28 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-40"
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(800px circle at ${m.x * 100}% ${m.y * 100}%, oklch(0.78 0.13 85 / 0.12), transparent 60%)`,
        }}
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Giant outlined "07" watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none lg:block"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span
          className="text-[28rem] font-medium leading-none tracking-tighter"
          style={{
            WebkitTextStroke: "1px oklch(0.78 0.13 85 / 0.18)",
            color: "transparent",
          }}
        >
          07
        </span>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 flex items-center gap-4">
          <span className="h-px w-12 bg-gold" />
          <span
            className="text-[11px] uppercase tracking-[0.32em] text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            §02 — Market Entry &amp; Retail Presence
          </span>
        </div>

        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="col-span-12 text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.9] tracking-[-0.045em] lg:col-span-10"
        >
          Our{" "}
          <span className="italic text-gold-soft">Process</span>
          <span className="text-gold">.</span>
        </h1>

        <p className="col-span-12 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl lg:col-span-7">
          A <em className="not-italic text-gold-soft">seven-step</em> journey from discovery to long-term growth, designed to bring your brand into the European market with{" "}
          <em className="not-italic text-gold-soft">intention</em> and{" "}
          <em className="not-italic text-gold-soft">clarity</em>.
        </p>

        <div
          className="col-span-12 mt-4 flex flex-wrap items-center gap-x-10 gap-y-4 text-[11px] uppercase tracking-[0.28em] text-white/40 lg:col-span-7"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span><span className="text-gold">07</span> Stages</span>
          <span><span className="text-gold">01</span> Framework</span>
          <span><span className="text-gold">∞</span> Possibilities</span>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────  JOURNEY MAP  ───────────────────────────── */

function JourneyMap() {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visibleIdx, setVisibleIdx] = useState<Set<number>>(new Set());

  useEffect(() => {
    const nodes = wrapRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!nodes) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            setVisibleIdx((prev) => new Set(prev).add(i));
          }
        });
      },
      { threshold: 0.25 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative px-6 py-24 sm:py-28 lg:px-10 lg:py-32">
      {/* Section label */}
      <div className="mx-auto mb-16 flex max-w-7xl items-center justify-between">
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
          className="hidden text-[10px] uppercase tracking-[0.32em] text-white/30 sm:inline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Hover · Explore
        </span>
      </div>

      <div ref={wrapRef} className="mx-auto max-w-7xl">
        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {STEPS.map((s, i) => {
            // Asymmetric bento layout — distinct sizes per tile
            const spans = [
              "lg:col-span-7 lg:row-span-2", // 01 large
              "lg:col-span-5",                // 02
              "lg:col-span-5",                // 03
              "lg:col-span-6 lg:row-span-2", // 04 large
              "lg:col-span-6",                // 05
              "lg:col-span-6",                // 06
              "lg:col-span-12",               // 07 wide finale
            ];
            const isLarge = i === 0 || i === 3 || i === 6;
            return (
              <StepTile
                key={s.n}
                index={i}
                step={s}
                className={spans[i]}
                large={isLarge}
                isHot={active === i}
                onEnter={() => setActive(i)}
                onLeave={() => setActive((v) => (v === i ? null : v))}
                revealed={visibleIdx.has(i)}
              />
            );
          })}
        </div>

        {/* Connector strip */}
        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            End of framework
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function StepTile({
  step,
  index,
  className = "",
  large,
  isHot,
  onEnter,
  onLeave,
  revealed,
}: {
  step: Step;
  index: number;
  className?: string;
  large?: boolean;
  isHot: boolean;
  onEnter: () => void;
  onLeave: () => void;
  revealed: boolean;
}) {
  const [m, setM] = useState({ x: 0.5, y: 0.5 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  const Icon = step.Icon;

  return (
    <article
      data-step={index}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className={`group relative isolate overflow-hidden border border-white/10 bg-noir/40 backdrop-blur-sm transition-all duration-700 ease-out ${className} ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 70}ms`,
        minHeight: large ? 360 : 240,
      }}
    >
      {/* Hover spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${m.x * 100}% ${m.y * 100}%, oklch(0.78 0.13 85 / 0.16), transparent 65%)`,
        }}
      />
      {/* Gold sweep on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100"
      />
      {/* Corner ticks */}
      <Corner className="-left-px -top-px" />
      <Corner className="-right-px -top-px rotate-90" />
      <Corner className="-bottom-px -left-px -rotate-90" />
      <Corner className="-bottom-px -right-px rotate-180" />

      {/* Background numeral */}
      <span
        aria-hidden
        className={`pointer-events-none absolute right-4 select-none font-medium leading-none tracking-tighter transition-all duration-700 ${
          large ? "bottom-4 text-[16rem]" : "bottom-2 text-[10rem]"
        }`}
        style={{
          fontFamily: "var(--font-display)",
          WebkitTextStroke: "1px oklch(0.78 0.13 85 / 0.14)",
          color: "transparent",
          transform: isHot ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {step.n}
      </span>

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] uppercase tracking-[0.32em] text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Step {step.n}
            </span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <div
            className={`relative grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ${
              isHot ? "border-gold bg-gold/10" : "border-white/15 bg-white/[0.02]"
            }`}
          >
            <Icon className={`h-5 w-5 transition-colors duration-500 ${isHot ? "text-gold" : "text-white/60"}`} />
            {isHot && (
              <span className="absolute inset-0 -z-0 animate-ping rounded-full border border-gold/40" />
            )}
          </div>
        </div>

        {/* Bottom block */}
        <div className="mt-auto pt-10">
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className={`font-medium leading-[1.02] tracking-[-0.025em] transition-colors duration-500 ${
              large ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-[clamp(1.75rem,3vw,2.75rem)]"
            } ${isHot ? "text-white" : "text-white/85"}`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base ${
              large ? "max-w-lg" : ""
            }`}
          >
            {step.body}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span
              className="text-[10px] uppercase tracking-[0.32em] text-white/35"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.meta}
            </span>
            <span
              aria-hidden
              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] transition-all duration-500 ${
                isHot ? "text-gold" : "text-white/25"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span
                className={`h-px transition-all duration-500 ${isHot ? "w-10 bg-gold" : "w-5 bg-white/25"}`}
              />
              {index < STEPS.length - 1 ? "Next" : "Begin"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────  CLOSING  ─────────────────────────────── */

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
      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-end gap-y-10">
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <span
              className="text-[11px] uppercase tracking-[0.32em] text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Continue the journey
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.035em]"
          >
            Seven stages.{" "}
            <span className="italic text-gold-soft">One direction.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Every brand we partner with begins here — with discovery, with curiosity, with a quiet ambition to be understood before being sold.
          </p>
        </div>
        <div className="col-span-12 flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
          <a
            href="mailto:N21West.nl@gmail.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold bg-transparent px-7 py-4 text-[11px] uppercase tracking-[0.32em] text-gold transition-colors duration-500 hover:text-noir-deep"
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
            Amsterdam · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────  ATOMS  ──────────────────────────────── */

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-l border-t border-gold/70 ${className}`}
    />
  );
}

/* ─────────────────────────────────  ICONS  ──────────────────────────────── */
/* Custom hand-drawn SVGs — one per step, kept on a 24x24 grid */

function IconDiscovery({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15 15 5 5" strokeLinecap="round" />
      <circle cx="10.5" cy="10.5" r="2.5" />
    </svg>
  );
}
function IconCuration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 17.5h7M17.5 14v7" strokeLinecap="round" />
    </svg>
  );
}
function IconPositioning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <path d="M3 20 12 4l9 16" />
      <path d="M7 20h10" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.4" />
    </svg>
  );
}
function IconRetail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <path d="M3 9h18l-1.5 11H4.5L3 9Z" />
      <path d="M3 9 5 4h14l2 5" />
      <path d="M9 13a3 3 0 0 0 6 0" strokeLinecap="round" />
    </svg>
  );
}
function IconActivation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="6" opacity=".6" />
      <circle cx="12" cy="12" r="9.5" opacity=".3" />
    </svg>
  );
}
function IconInsights({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <path d="M3 20V4M3 20h18" strokeLinecap="round" />
      <path d="M7 16V11M11 16V7M15 16v-3M19 16V9" strokeLinecap="round" />
    </svg>
  );
}
function IconGrowth({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
      <path d="M4 18 10 12l4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
