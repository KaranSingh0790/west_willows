"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <motion.div
          className="w-full h-full bg-cover bg-center origin-center"
          style={{
            backgroundImage: "url('/assets/frontView.png')",
            scale,
          }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </motion.div>

      {/* Hero Text */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ opacity }}
      >
        <motion.p
          className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm mb-8 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          A Private Escape Into Luxury
        </motion.p>

        <motion.h1
          className="text-6xl md:text-9xl lg:text-[11rem] font-serif text-cream uppercase tracking-wide leading-[0.9] drop-shadow-2xl"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          West <br />
          <span className="text-gold">Willows</span>
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-col items-center gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-cream/70 font-sans font-light text-sm tracking-widest uppercase">
            Perched in nature &bull; Available for private stays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="#booking"
              className="px-10 py-3 bg-gold text-white uppercase tracking-widest text-xs font-light hover:bg-[#b0956f] transition-colors duration-500"
            >
              Check Availability
            </a>
            <a
              href="#amenities"
              className="px-10 py-3 border border-cream/40 text-cream uppercase tracking-widest text-xs font-light hover:bg-cream hover:text-charcoal transition-all duration-500"
            >
              View Villa
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 gap-3">
        <span className="text-cream/50 text-[10px] uppercase tracking-[0.3em] font-light">Scroll</span>
        <motion.div className="w-[1px] h-16 bg-cream/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gold/60"
            animate={{ top: ["-50%", "150%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
