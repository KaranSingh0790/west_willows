"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    title: "Wake up in elegance",
    image: "/bedroom.png",
    desc: "Plush king-sized beds with a view of the mist-covered valley.",
  },
  {
    title: "Unwind in style",
    image: "/living.png",
    desc: "A sprawling lounge area, drenched in natural light and luxury.",
  },
  {
    title: "Mornings by the pool",
    image: "/pool.png",
    desc: "An infinity pool that bleeds into the horizon, for your private swims.",
  },
  {
    title: "Your Private Sanctuary",
    image: "/hero.png",
    desc: "Escape the noise. Find yourself amidst absolute tranquility.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinContainer = containerRef.current;
      const scrollContainer = scrollRef.current;
      
      if (!pinContainer || !scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(scrollContainer, {
        x: -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="bg-cream text-charcoal">
      <div className="py-24 px-8 md:px-16 text-center">
        <h3 className="text-gold uppercase tracking-[0.2em] mb-4 text-sm font-light">
          The Experience
        </h3>
        <h2 className="text-4xl md:text-6xl font-serif max-w-3xl mx-auto leading-tight">
          Every corner is designed to take your breath away.
        </h2>
      </div>

      <div ref={containerRef} className="h-screen w-full flex items-center overflow-hidden bg-cream relative">
        <div ref={scrollRef} className="flex h-[70vh] gap-8 px-8 md:px-16 items-center w-[400vw] md:w-[300vw]">
          {spaces.map((space, index) => (
            <div 
              key={index} 
              className="w-[85vw] md:w-[60vw] h-full flex-shrink-0 relative group rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-10" />
              <img 
                src={space.image} 
                alt={space.title}
                className="w-full h-full object-cover origin-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 pointer-events-none translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-700">
                <h3 className="text-2xl md:text-5xl font-serif text-cream mb-2 md:mb-4 drop-shadow-md">
                  {space.title}
                </h3>
                <p className="text-cream/90 font-sans tracking-wide font-light max-w-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:delay-100 text-sm md:text-base">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer block at the end for padding */}
          <div className="w-[10vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
