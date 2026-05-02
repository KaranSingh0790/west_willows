"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navigation } from './shared/Navigation';
import { Footer } from './shared/Footer';
import { FadeIn } from './shared/FadeIn';

const ESTATES = [
  {
    id: "westwillows",
    name: "Westwillows Villa",
    tagline: "The Grand Estate",
    description: "Spread across 7 acres of pristine land, Westwillows Villa is our crown jewel. Designed for ultimate luxury and grand celebrations, this estate features 5 exquisite ensuite bedrooms, a magnificent double-height courtyard that serves as the heart of the home, and an exclusive in-house sports bar.",
    features: ["7 Acres Estate", "5 Ensuite Bedrooms", "Double-Height Courtyard", "In-House Sports Bar"],
    images: ["/assets/frontView.jpg", "/assets/bar.jpg"],
  },
  {
    id: "willow-studio",
    name: "The Willow Studio",
    tagline: "An Intimate Retreat",
    description: "The Willow Studio offers a more intimate, yet equally luxurious escape. It features 2 beautifully appointed ensuite bedrooms connected by a comfortable lounge area, along with one additional bedroom setup, making it perfect for smaller families or close groups of friends seeking privacy.",
    features: ["2 Ensuite Bedrooms", "Private Lounge Area", "1 Additional Bedroom Setup", "Secluded Ambiance"],
    images: ["/assets/room1.jpg", "/assets/room2.jpg"],
  },
  {
    id: "glass-house",
    name: "Glass House Gazebo",
    tagline: "The Ultimate Hosting Space",
    description: "Immersed in nature, the Glass House Gazebo is a fully air-conditioned garden lounge space. While not a residential house, it is an architectural marvel designed specifically for hosting memorable birthdays, elegant lunches, exclusive dinners, and intimate small gatherings.",
    features: ["Garden Lounge Space", "Fully Air-Conditioned", "Ideal for Events", "Panoramic Nature Views"],
    images: ["/assets/hall.jpg", "/assets/breakfast.jpg"],
  }
];

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
          src="/assets/pool.jpg" 
          alt="Our Collections" 
          fill 
          priority
          className="object-cover object-center opacity-40 grayscale-[20%]"
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
          The Collections
        </motion.h1>
        <motion.p 
          className="text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase mb-12 font-light drop-shadow-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          Discover Our Distinct Properties
        </motion.p>
      </div>
    </section>
  );
};

const EstateSection = ({ estate, index }: { estate: typeof ESTATES[0], index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <section className="py-24 md:py-40 border-t border-white/5 bg-[#0a0a0a]" id={estate.id}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 md:gap-24 items-center`}>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <FadeIn>
              <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4 block">0{index + 1} // {estate.tagline}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 tracking-wide">{estate.name}</h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-12">
                {estate.description}
              </p>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-white/10 pt-8">
                {estate.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="w-2 h-px bg-white/40 mb-3" />
                    <span className="text-white/80 text-xs tracking-wider uppercase font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <FadeIn delay={200} className="relative w-full aspect-[4/3] bg-[#111] overflow-hidden">
              <Image 
                src={estate.images[0]} 
                alt={`${estate.name} View 1`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </FadeIn>
            <FadeIn delay={400} className={`relative w-4/5 aspect-[16/9] bg-[#111] overflow-hidden ${isReversed ? 'mr-auto' : 'ml-auto'} -mt-20 md:-mt-32 z-10 border-4 border-[#0a0a0a]`}>
              <Image 
                src={estate.images[1]} 
                alt={`${estate.name} View 2`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const InquirySection = () => {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-40 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide mb-6">Reserve a Property</h2>
          <p className="text-white/50 text-sm font-light mb-16">Whether you are planning a grand celebration or an intimate getaway, our team is ready to curate your experience.</p>
          
          <a
            href="/#booking"
            className="inline-block border border-white px-12 py-5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Inquire Now
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

export default function EstatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Navigation />
      <main>
        <HeroSection />
        {ESTATES.map((estate, index) => (
          <EstateSection key={estate.id} estate={estate} index={index} />
        ))}
        <InquirySection />
      </main>
      <Footer />
    </div>
  );
}
