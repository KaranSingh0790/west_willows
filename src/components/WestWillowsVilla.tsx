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
    <section className="relative min-h-[75vh] md:min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center pt-20">
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: scrollY * 0.4 }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image 
          src="/assets/frontView.jpg" 
          alt="West Willows Estate" 
          fill 
          priority
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/20 to-[#0a0a0a]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-widest uppercase mb-6 drop-shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {VILLA_DATA.name}
        </motion.h1>
        <motion.p 
          className="text-white/80 text-sm md:text-lg tracking-[0.3em] uppercase mb-12 max-w-2xl font-light drop-shadow-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          {VILLA_DATA.tagline}
        </motion.p>
        <motion.a
          href="#booking"
          className="border border-white/50 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          Check Availability
        </motion.a>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="relative z-10 bg-[#0a0a0a] py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-12 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
          {VILLA_DATA.stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 100} className="flex flex-col items-center text-center min-w-[140px] md:min-w-0 snap-center">
              {stat.icon}
              <span className="font-serif text-white/90 text-xl md:text-2xl tracking-wider mb-3">{stat.value}</span>
              <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">{stat.label}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="bg-[#0a0a0a] py-20 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-white/40 text-[10px] tracking-widest uppercase block mb-4">Discover</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">
              Uncompromising Luxury.
            </h2>
          </div>
          <p className="text-white/50 text-sm font-light max-w-md">
            Every corner of West Willows is meticulously designed to offer a seamless blend of modern elegance and timeless comfort.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {VILLA_DATA.amenities.map((amenity, index) => (
            <FadeIn key={index} delay={index * 100} className="group relative h-[50vh] md:h-[60vh] overflow-hidden bg-[#111]">
              <Image 
                src={amenity.image} 
                alt={amenity.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-4">0{index + 1}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 tracking-wide">{amenity.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed font-light opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                  {amenity.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    { src: '/assets/pool.jpg', style: 'col-span-12 md:col-span-8 aspect-[16/9]' },
    { src: '/assets/room2.jpg', style: 'col-span-12 md:col-span-4 aspect-[3/4] md:mt-32' },
    { src: '/assets/breakfast.jpg', style: 'col-span-12 md:col-span-5 aspect-[4/5]' },
    { src: '/assets/hall.jpg', style: 'col-span-12 md:col-span-7 aspect-[16/9] md:mt-24' },
    { src: '/assets/frontView.jpg', style: 'col-span-12 aspect-[21/9]' }
  ];

  return (
    <section id="gallery" className="bg-[#0a0a0a] py-24 md:py-40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="font-serif text-4xl md:text-6xl text-white font-light tracking-wide">
            The Estate.
          </h2>
          <p className="text-white/40 text-[10px] tracking-widest uppercase">A Visual Journey</p>
        </FadeIn>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {images.map((img, idx) => (
            <FadeIn key={idx} className={`relative overflow-hidden bg-[#111] ${img.style}`}>
              <Image 
                src={img.src} 
                alt={`Gallery View ${idx}`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

import { AvailabilityCalendar } from './AvailabilityCalendar';

const BookingSection = () => {
  const whatsappMsg = encodeURIComponent("Hello, I would like to inquire about availability at West Willows.");

  return (
    <section id="booking" className="bg-[#0a0a0a] py-24 md:py-40 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow element for luxury feel */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn className="text-center mb-20 md:mb-32">
          <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-6 block">Your Stay</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white font-light tracking-wide mb-6">Begin Your Journey</h2>
          <p className="text-white/50 text-sm md:text-base font-light max-w-2xl mx-auto">
            Experience the epitome of luxury. Check our real-time availability or connect directly with our concierge team to curate your bespoke estate experience.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Check Availability Box */}
          <FadeIn className="bg-[#111]/80 backdrop-blur-md border border-white/5 p-8 md:p-14">
            <AvailabilityCalendar />
          </FadeIn>

          {/* Concierge Box */}
          <FadeIn delay={200} className="flex flex-col justify-center h-full lg:pl-8">
            <div className="mb-14">
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">The Concierge</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Prefer a personal touch? Our dedicated concierge team is available around the clock to assist with your reservations, special requests, and event planning.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col group">
                <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">Direct Line</span>
                <a href={`tel:${VILLA_DATA.contact.phone}`} className="font-serif text-3xl md:text-4xl text-white hover:text-white/70 transition-colors">
                  {VILLA_DATA.contact.phone}
                </a>
              </div>
              
              <div className="flex flex-col group">
                <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">Email Address</span>
                <a href={`mailto:${VILLA_DATA.contact.email}`} className="font-serif text-2xl md:text-3xl text-white hover:text-white/70 transition-colors">
                  {VILLA_DATA.contact.email}
                </a>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <a 
                  href={`https://wa.me/${VILLA_DATA.contact.whatsapp}?text=${whatsappMsg}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center group-hover:bg-[#1da851] transition-colors shadow-[0_0_30px_rgba(37,211,102,0.15)] group-hover:shadow-[0_0_40px_rgba(37,211,102,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.115.548 4.148 1.594 5.945L.19 23.367l5.541-1.45a11.967 11.967 0 006.297 1.777h.005c6.645 0 12.029-5.382 12.029-12.031C24.062 5.383 18.678 0 12.031 0zm6.541 17.382c-.276.776-1.602 1.488-2.227 1.547-.565.053-1.285.127-4.14-1.055-3.51-1.455-5.83-5.045-6.002-5.275-.172-.23-1.433-1.905-1.433-3.633 0-1.728.895-2.585 1.215-2.925.32-.34.695-.425.925-.425.23 0 .46.005.665.015.215.01.505-.08.79.61.287.69.98 2.395 1.065 2.565.085.17.143.37.028.6-.115.23-.173.37-.345.57-.172.2-.363.425-.518.595-.172.185-.36.385-.145.755.215.37.955 1.58 2.055 2.565 1.42 1.275 2.59 1.66 2.965 1.83.375.17.595.145.815-.11.22-.255.955-1.11 1.215-1.49.26-.38.52-.315.865-.185.345.13 2.185 1.03 2.56 1.215.375.185.625.275.715.425.09.15.09.865-.185 1.64z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm tracking-[0.2em] uppercase group-hover:text-white/70 transition-colors">Book via WhatsApp</span>
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default function WestWillowsVilla() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 selection:text-white">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <AmenitiesSection />
        <GallerySection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
