"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-in-out py-6 px-8 md:px-16 flex items-center justify-between",
        isScrolled ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-xl md:text-2xl font-serif tracking-widest uppercase cursor-pointer">
        <span className={cn("transition-colors duration-500", isScrolled ? "text-charcoal" : "text-cream")}>
          West
        </span>
        <span className={cn("ml-2 text-gold transition-colors duration-500")}>
          Willows
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-sans font-light">
        {[
          { label: "Amenities", href: "#amenities" },
          { label: "Gallery", href: "#gallery" },
          { label: "About", href: "#about" },
          { label: "Location", href: "#location" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "hover:text-gold transition-colors duration-300",
              isScrolled ? "text-charcoal" : "text-cream"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href="#booking"
        className={cn(
          "px-6 py-2 border uppercase tracking-wider text-sm transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold",
          isScrolled ? "border-charcoal text-charcoal hover:text-white" : "border-cream text-cream"
        )}
      >
        Book Now
      </a>
      
      <button className="md:hidden">
        <Menu className={cn("w-6 h-6", isScrolled ? "text-charcoal" : "text-cream")} />
      </button>
    </motion.nav>
  );
}
