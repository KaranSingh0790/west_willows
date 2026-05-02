"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navigation } from './shared/Navigation';
import { Footer } from './shared/Footer';
import { FadeIn } from './shared/FadeIn';
import { VILLA_DATA } from '@/config/data';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: scrollY * 0.4 }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image 
          src="/assets/hall.jpg" 
          alt="Celebrations & Events" 
          fill 
          priority
          className="object-cover object-center opacity-40 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-20">
        <motion.h1 
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-widest uppercase mb-6 drop-shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Celebrations
        </motion.h1>
        <motion.p 
          className="text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase mb-12 font-light drop-shadow-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          Curating Unforgettable Moments
        </motion.p>
      </div>
    </section>
  );
};

const EventsGrid = () => {
  return (
    <section className="py-24 md:py-40 bg-[#0a0a0a] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide mb-8">
            Tailored Experiences
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
            Our luxury estate serves as the perfect canvas for your events. From intimate pre-wedding rituals to grand corporate retreats, our spaces adapt to your vision, paired with uncompromising service.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {VILLA_DATA.events.map((event, index) => (
            <FadeIn key={index} delay={index * 50} className="flex flex-col group">
              <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                {event.icon}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-white mb-4 tracking-wide group-hover:text-white/80 transition-colors">
                {event.title}
              </h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light">
                {event.description}
              </p>
              <div className="mt-8 w-12 h-px bg-white/20 group-hover:w-full transition-all duration-700 ease-out" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const InquirySection = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-40 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide mb-6">Host Your Event</h2>
          <p className="text-white/50 text-sm font-light mb-16">Connect with our event concierges to discuss your vision and check date availability.</p>
          
          <a
            href="/#booking"
            className="inline-block border border-white px-12 py-5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Request a Proposal
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Navigation />
      <main>
        <HeroSection />
        <EventsGrid />
        <InquirySection />
      </main>
      <Footer />
    </div>
  );
}
