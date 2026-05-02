"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const featured = [
  {
    icon: "🏊",
    label: "Infinity Pool",
    note: "Sunrise to midnight, yours alone",
  },
  {
    icon: "🛏",
    label: "4 Luxury Suites",
    note: "King beds · valley views · en-suite spa",
  },
  {
    icon: "🍹",
    label: "Bar & Kitchen",
    note: "Fully stocked · private chef-ready",
  },
  {
    icon: "🧑‍🍳",
    label: "Live-in Caretaker",
    note: "On call, discreet, always helpful",
  },
  {
    icon: "🌿",
    label: "8 Acres of Privacy",
    note: "Manicured lawns · forested walking trails",
  },
  {
    icon: "🔥",
    label: "Outdoor BBQ",
    note: "Wood-fired pit · alfresco dining setup",
  },
];

const suites = [
  {
    id: "pool",
    number: "01",
    heading: "The Infinity Pool",
    body: "Temperature-controlled and facing nothing but open sky. Float in silence at 6am or sip wine poolside at dusk — the schedule is entirely yours.",
    img: "/assets/pool.png",
    flip: false,
  },
  {
    id: "suites",
    number: "02",
    heading: "Four Private Suites",
    body: "Each bedroom is its own world: king-sized bed, spa-grade en-suite, and floor-to-ceiling windows that pour the valley in. No two rooms feel the same.",
    img: "/assets/room1.png",
    flip: true,
  },
  {
    id: "kitchen",
    number: "03",
    heading: "Kitchen & The Bar",
    body: "A pro-grade modular kitchen sits next to a curated home bar. Host a candlelit dinner or mix your own cocktail while the hills go quiet outside.",
    img: "/assets/bar.png",
    flip: false,
  },
  {
    id: "hall",
    number: "04",
    heading: "The Grand Hall",
    body: "High ceilings, warm light, and space to breathe. Use it for a private celebration, a lazy morning breakfast, or simply to sit and do nothing at all.",
    img: "/assets/hall.png",
    flip: true,
  },
];

// ─── FEATURED GRID ────────────────────────────────────────────────────────────

function FeaturedGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-charcoal/8 border border-charcoal/8">
      {featured.map((item, i) => (
        <motion.div
          key={i}
          className="group bg-cream hover:bg-beige transition-colors duration-500 px-8 py-9 flex flex-col gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-2xl leading-none" aria-hidden>{item.icon}</span>
          <div>
            <p className="font-serif text-lg text-charcoal leading-snug">{item.label}</p>
            <p className="text-charcoal/45 text-[13px] font-light mt-1 leading-snug">{item.note}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── EDITORIAL SUITE ROW ─────────────────────────────────────────────────────

function SuiteRow({ suite }: { suite: typeof suites[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      id={suite.id}
      className={`grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] ${suite.flip ? "bg-beige" : "bg-cream"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden h-[55vw] max-h-[600px] lg:h-auto lg:max-h-none ${
          suite.flip ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${suite.img}')`, y: imgY, scale: 1.12 }}
        />
        {/* Subtle edge vignette towards text */}
        <div
          className={`absolute inset-y-0 w-32 pointer-events-none hidden lg:block ${
            suite.flip
              ? "left-0 bg-gradient-to-r from-beige/60 to-transparent"
              : "right-0 bg-gradient-to-l from-cream/60 to-transparent"
          }`}
        />
      </div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 lg:py-28 ${
          suite.flip ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {/* Number */}
        <motion.span
          className="font-serif text-[5rem] leading-none text-charcoal/6 select-none mb-4 -ml-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {suite.number}
        </motion.span>

        <motion.h3
          className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-6"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {suite.heading}
        </motion.h3>

        <motion.div
          className="w-10 h-[1.5px] bg-gold mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{ transformOrigin: "left" }}
        />

        <motion.p
          className="text-charcoal/60 font-light text-base md:text-[17px] leading-[1.75] max-w-sm"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {suite.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function Amenities() {
  return (
    <section id="amenities" className="bg-cream text-charcoal">

      {/* ── Section Header ── */}
      <div className="max-w-5xl mx-auto px-8 md:px-16 pt-28 pb-20">
        <motion.p
          className="text-gold uppercase tracking-[0.32em] text-[11px] mb-7 font-light"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          The Estate
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.h2
            className="font-serif text-4xl md:text-[3.75rem] leading-[1.1] max-w-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need.<br />
            <em className="not-italic text-charcoal/40">Nothing you don&apos;t.</em>
          </motion.h2>
          <motion.p
            className="text-charcoal/50 font-light text-sm leading-relaxed max-w-xs md:text-right md:pb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The full villa — 4 suites, pool, bar, kitchen, staff — is exclusively yours.
            No shared spaces, no strangers.
          </motion.p>
        </div>
      </div>

      {/* ── Featured Quick-Scan Grid ── */}
      <div className="px-8 md:px-16 pb-20 max-w-5xl mx-auto">
        <FeaturedGrid />
      </div>

      {/* ── Editorial Suite Rows ── */}
      {suites.map((suite) => (
        <SuiteRow key={suite.id} suite={suite} />
      ))}

    </section>
  );
}
