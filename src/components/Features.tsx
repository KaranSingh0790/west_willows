"use client";

import { motion, Variants } from "framer-motion";
import { Waves, ChefHat, BedDouble, Trees, Wifi, Camera } from "lucide-react";

const features = [
  { icon: Waves, title: "Private Pool", desc: "Temperature controlled, infinity edge overlooking the forest." },
  { icon: ChefHat, title: "Gourmet Kitchen", desc: "Fully equipped modular kitchen for private chef dining." },
  { icon: BedDouble, title: "Luxury Suites", desc: "4 expansive bedrooms with en-suite spa bathrooms." },
  { icon: Trees, title: "Open Lawn", desc: "Manicured gardens perfect for private evening soirees." },
  { icon: Wifi, title: "High-Speed WiFi", desc: "Stay connected from every corner of the property." },
  { icon: Camera, title: "Cinematic Views", desc: "360-degree panoramic views of untouched nature." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function Features() {
  return (
    <section id="features" className="bg-beige text-charcoal py-32 px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h3 className="text-gold uppercase tracking-[0.2em] mb-4 text-sm font-light">
            Amenities
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif max-w-2xl mx-auto">
            Everything you need for an unforgettable stay.
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx} 
                className="group flex flex-col items-center text-center space-y-6 p-8 border border-transparent hover:border-gold/20 hover:bg-cream transition-all duration-500 cursor-default"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-cream border border-charcoal/5 flex items-center justify-center text-charcoal group-hover:text-gold group-hover:shadow-[0_0_30px_rgba(197,168,128,0.3)] transition-all duration-500">
                  <Icon strokeWidth={1.5} className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-3">{feature.title}</h4>
                  <p className="text-charcoal/70 font-light text-sm leading-relaxed max-w-xs mx-auto">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
