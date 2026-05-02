import React from 'react';
import { VILLA_DATA } from '@/config/data';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-24">
          <div className="flex flex-col">
            <span className="font-serif text-white text-xl tracking-widest uppercase mb-6">{VILLA_DATA.name}</span>
            <p className="text-white/40 text-xs font-light leading-relaxed max-w-xs uppercase tracking-widest">
              {VILLA_DATA.location}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Reservations</h4>
            <a href={`tel:${VILLA_DATA.contact.phone}`} className="text-white hover:text-white/70 transition-colors font-light text-lg">
              {VILLA_DATA.contact.phone}
            </a>
            <a href={`mailto:${VILLA_DATA.contact.email}`} className="text-white hover:text-white/70 transition-colors font-light text-lg">
              {VILLA_DATA.contact.email}
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Connect</h4>
            <a href={VILLA_DATA.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors font-light text-lg">Instagram</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[10px] tracking-widest uppercase">
          <span>&copy; {new Date().getFullYear()} {VILLA_DATA.name}. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
