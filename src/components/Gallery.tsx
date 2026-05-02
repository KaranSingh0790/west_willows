"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "/assets/frontView.png", alt: "West Willows — Front View", span: "col-span-2 row-span-2" },
  { src: "/assets/pool.png", alt: "Private Infinity Pool", span: "col-span-1 row-span-1" },
  { src: "/assets/room1.png", alt: "Master Suite", span: "col-span-1 row-span-1" },
  { src: "/assets/room2.png", alt: "Guest Suite", span: "col-span-1 row-span-2" },
  { src: "/assets/bar.png", alt: "The Bar", span: "col-span-1 row-span-1" },
  { src: "/assets/bar2.png", alt: "Kitchen & Bar", span: "col-span-1 row-span-1" },
  { src: "/assets/hall.png", alt: "Grand Hall", span: "col-span-1 row-span-1" },
  { src: "/assets/breakfast.png", alt: "Morning Breakfast Area", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  const openImage = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
  };

  return (
    <section id="gallery" className="py-32 px-4 md:px-8 bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
          <div>
            <motion.p
              className="text-gold uppercase tracking-[0.3em] mb-4 text-xs font-light"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Cinematic Views
            </motion.p>
            <motion.h2
              className="text-4xl md:text-6xl font-serif"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              A Visual Tour of the Estate
            </motion.h2>
          </div>
          <motion.p
            className="max-w-xs text-cream/50 font-light text-sm mt-6 md:mt-0 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Each frame tells a story. Click to explore in full.
          </motion.p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-2 md:gap-3">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className={`relative group overflow-hidden cursor-pointer ${img.span}`}
              onClick={() => openImage(img.src, img.alt)}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-700 flex flex-col items-center justify-center gap-3">
                <ZoomIn
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  strokeWidth={1}
                />
                <p className="text-white/0 group-hover:text-white/90 text-xs uppercase tracking-widest font-light transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/97 backdrop-blur-md p-4 md:p-16 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-3 rounded-full border border-white/10 hover:border-white/30 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-widest">
              {selectedAlt}
            </p>
            <motion.img
              src={selectedImage}
              alt={selectedAlt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
