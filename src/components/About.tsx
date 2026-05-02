"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "4", label: "Luxury Suites" },
  { value: "8", label: "Acres of Privacy" },
  { value: "∞", label: "Pool Views" },
  { value: "1", label: "Villa, Entirely Yours" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal text-cream">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ y: -60 }}
        whileInView={{ y: 60 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 2.5, ease: "linear" }}
        style={{
          backgroundImage: "url('/assets/frontView.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "grayscale(80%) brightness(0.3)",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-40">
        {/* Section Tag */}
        <motion.p
          className="text-gold uppercase tracking-[0.3em] text-xs mb-10 font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight max-w-4xl mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Where Architecture Meets the Wild, and Luxury Meets{" "}
          <em className="text-gold not-italic">Silence</em>
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-20 h-[1px] bg-gold mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Body Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          <motion.p
            className="text-cream/70 font-light text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            West Willows was born from a singular vision — to create a space where true luxury
            is defined not by opulence, but by uninterrupted peace. Nestled in the hills, the
            villa is a private world unto itself, where time slows and every sense is engaged
            by the beauty of nature.
          </motion.p>
          <motion.p
            className="text-cream/70 font-light text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Built with locally sourced stone and designed with a minimalist hand, the
            villa blends seamlessly into its surroundings. From the infinity pool that
            kisses the horizon to suites that frame cinematic sunrises, West Willows is
            a love letter to the land — and to you.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-5xl md:text-6xl font-serif text-gold">{stat.value}</span>
              <span className="text-cream/50 text-xs uppercase tracking-widest font-light">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
