"use client";

import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { supabase } from "@/lib/supabase";
import {
  Loader2, Phone, MessageCircle, Mail, MapPin,
  Star, ShieldCheck, UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const PRICE_PER_NIGHT = 50000;
const WHATSAPP_NUMBER  = "911234567890"; // ← replace
const CALL_NUMBER      = "+91 12345 67890"; // ← replace
const EMAIL            = "stay@westwillows.com";
const ADDRESS          = "West Willows Estate, Coorg, Karnataka — 571201";

// ─── TRUST SIGNALS ───────────────────────────────────────────────────────────
const trust = [
  { icon: Star,        text: "4.9 / 5  ·  Rated by guests" },
  { icon: ShieldCheck, text: "No hidden charges" },
  { icon: UserCheck,   text: "Direct booking with owner" },
];

// ─── CALENDAR STYLES ─────────────────────────────────────────────────────────
const calendarCSS = `
  .rdp-root {
    --rdp-accent-color:            #C5A880;
    --rdp-accent-background-color: #FAF7F4;
    --rdp-range_middle-background-color: #FAF7F4;
    font-family: inherit;
    width: 100%;
  }
  .rdp-month_caption {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: #1A1A1A;
  }
  .rdp-day_button {
    border-radius: 0 !important;
    font-size: 0.8rem;
  }
  .rdp-nav button { color: #C5A880; }
  .rdp-weekday { font-size: 0.7rem; color: #1A1A1A88; letter-spacing: 0.08em; }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function GuestStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 border border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center text-lg leading-none"
        aria-label="Decrease guests"
      >
        −
      </button>
      <span className="font-serif text-xl w-6 text-center tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(8, value + 1))}
        className="w-8 h-8 border border-charcoal/20 text-charcoal/60 hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center text-lg leading-none"
        aria-label="Increase guests"
      >
        +
      </button>
      <span className="text-[13px] text-charcoal/40 font-light">
        {value === 8 ? "max capacity" : `of 8 max`}
      </span>
    </div>
  );
}

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────
function SuccessState({
  name, range, handleWhatsApp, handleCall,
}: {
  name: string;
  range: DateRange | undefined;
  handleWhatsApp: () => void;
  handleCall: () => void;
}) {
  return (
    <section id="booking" className="bg-cream text-charcoal py-32 px-8 flex items-center justify-center min-h-[70vh]">
      <motion.div
        className="max-w-xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-gold tracking-[0.3em] uppercase text-[11px] font-light mb-6">Dates Held</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">You&apos;re almost there, {name}.</h2>
        <p className="text-charcoal/55 font-light text-base leading-relaxed mb-10">
          Your dates —{" "}
          <span className="text-charcoal font-normal">
            {range?.from && format(range.from, "MMM d")} → {range?.to && format(range.to, "MMM d, yyyy")}
          </span>{" "}
          — are provisionally reserved. Complete the booking by messaging us on WhatsApp or calling directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white text-sm tracking-widest uppercase font-light hover:bg-[#1fb959] transition-colors duration-400"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-2.5 px-8 py-4 border border-charcoal/25 text-charcoal text-sm tracking-widest uppercase font-light hover:bg-charcoal hover:text-cream transition-colors duration-400"
          >
            <Phone className="w-4 h-4" /> Call Owner
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function Booking() {
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [range, setRange]   = useState<DateRange | undefined>();
  const [name, setName]     = useState("");
  const [phone, setPhone]   = useState("");
  const [guests, setGuests] = useState(2);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { fetchUnavailableDates(); }, []);

  async function fetchUnavailableDates() {
    const { data, error } = await supabase.from("booked_dates").select("date");
    if (!error && data) setUnavailableDates(data.map((r) => new Date(r.date)));
  }

  const disabledDays = [{ before: new Date() }, ...unavailableDates];
  const nights  = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const total   = nights > 0 ? nights * PRICE_PER_NIGHT : 0;
  const canBook = nights > 0 && !!name && !!phone;

  const waMessage = () =>
    range?.from && range?.to && name
      ? `Hi, I'd like to book West Willows.\n\nDates: ${format(range.from, "MMM d")} → ${format(range.to, "MMM d, yyyy")}\nName: ${name}\nGuests: ${guests}\nTotal: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm.`
      : "Hi, I'm interested in booking West Willows. Could you share availability?";

  const handleWhatsApp = () =>
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage())}`, "_blank");

  const handleCall = () =>
    window.open(`tel:${CALL_NUMBER.replace(/\s/g, "")}`, "_self");

  async function handleBook() {
    if (!canBook) { setErrorMsg("Please fill in your name, phone, and select dates."); return; }
    setStatus("loading"); setErrorMsg("");
    const { error } = await supabase.rpc("create_booking", {
      p_name: name, p_phone: phone,
      p_start_date: format(range!.from!, "yyyy-MM-dd"),
      p_end_date: format(range!.to!, "yyyy-MM-dd"),
      p_guests: guests, p_total_price: total,
    });
    if (error) {
      const clash = error.message.includes("duplicate key") || error.message.includes("constraint");
      setErrorMsg(clash ? "Those dates were just taken. Please choose different dates." : "Something went wrong. Please try again.");
      setStatus("error");
      if (clash) fetchUnavailableDates();
    } else {
      setStatus("success");
    }
  }

  if (status === "success")
    return <SuccessState name={name} range={range} handleWhatsApp={handleWhatsApp} handleCall={handleCall} />;

  return (
    <>
      {/* ── BOOKING SECTION ── */}
      <section id="booking" className="bg-cream text-charcoal py-24 md:py-32 px-4 md:px-8">
        <style dangerouslySetInnerHTML={{ __html: calendarCSS }} />

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-16 md:mb-20">
            <motion.p
              className="text-gold uppercase tracking-[0.32em] text-[11px] font-light mb-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              Plan Your Stay
            </motion.p>
            <motion.h2
              className="font-serif text-4xl md:text-6xl leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              Reserve the Villa
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-16 items-start">

            {/* ── LEFT: BOOKING CARD ── */}
            <motion.div
              className="border border-charcoal/10 bg-white shadow-[0_4px_40px_-8px_rgba(26,26,26,0.08)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Price Header */}
              <div className="px-8 pt-8 pb-7 border-b border-charcoal/8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-charcoal">
                    ₹{PRICE_PER_NIGHT.toLocaleString("en-IN")}
                  </span>
                  <span className="text-charcoal/40 text-sm font-light">/ night</span>
                </div>
                <p className="text-[13px] text-charcoal/40 font-light mt-1 tracking-wide">
                  Entire villa · Exclusive use · Up to 8 guests
                </p>
              </div>

              {/* Form Body */}
              <div className="px-8 py-7 space-y-7">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-charcoal/40 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Arjun Sharma"
                      className="w-full bg-transparent border-b border-charcoal/18 py-2.5 text-charcoal font-serif text-base placeholder:text-charcoal/22 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-charcoal/40 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-b border-charcoal/18 py-2.5 text-charcoal font-serif text-base placeholder:text-charcoal/22 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-charcoal/40 mb-3">
                    Guests
                  </label>
                  <GuestStepper value={guests} onChange={setGuests} />
                </div>

                {/* Date summary (shown once calendar is used) */}
                <AnimatePresence>
                  {range?.from && range?.to && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center justify-between py-4 border-y border-charcoal/8 text-sm">
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest text-charcoal/35 mb-1">Check-in</p>
                          <p className="font-serif text-charcoal">{format(range.from, "MMM d, yyyy")}</p>
                        </div>
                        <div className="text-charcoal/20 text-lg">→</div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest text-charcoal/35 mb-1">Check-out</p>
                          <p className="font-serif text-charcoal">{format(range.to, "MMM d, yyyy")}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest text-charcoal/35 mb-1">Nights</p>
                          <p className="font-serif text-charcoal">{nights}</p>
                        </div>
                      </div>
                      {/* Total */}
                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm font-light text-charcoal/50">
                          ₹{PRICE_PER_NIGHT.toLocaleString("en-IN")} × {nights} nights
                        </p>
                        <p className="font-serif text-2xl text-charcoal">
                          ₹{total.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error */}
                {errorMsg && (
                  <p className="text-red-500 text-[13px] font-light">{errorMsg}</p>
                )}
              </div>

              {/* CTAs */}
              <div className="px-8 pb-8 space-y-3">
                <button
                  onClick={handleBook}
                  disabled={status === "loading" || !canBook}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal text-cream text-[13px] uppercase tracking-[0.18em] font-light hover:bg-[#C5A880] transition-colors duration-500 disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : "Check Availability"}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#f0faf4] border border-[#25D366]/30 text-[#1a7a40] text-[13px] uppercase tracking-[0.18em] font-light hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-400"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </button>
              </div>

              {/* Trust Signals */}
              <div className="px-8 pb-8 pt-1 border-t border-charcoal/6 mt-1">
                <ul className="space-y-2.5 mt-5">
                  {trust.map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-charcoal/50 font-light">
                      <Icon className="w-3.5 h-3.5 text-gold flex-shrink-0" strokeWidth={2} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── RIGHT: CALENDAR ── */}
            <motion.div
              className="flex flex-col gap-5 lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-charcoal/35 font-light">
                Select Dates
              </p>

              <div className="border border-charcoal/10 bg-white shadow-[0_4px_40px_-8px_rgba(26,26,26,0.06)] p-6">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={disabledDays}
                  numberOfMonths={1}
                  className="text-sm"
                />
              </div>

              {/* Quick contact nudge */}
              <div className="pt-2 text-center">
                <p className="text-[12px] text-charcoal/35 font-light">
                  Prefer to just ask?{" "}
                  <button
                    onClick={handleCall}
                    className="text-charcoal/60 underline underline-offset-2 hover:text-gold transition-colors duration-300"
                  >
                    Call the owner
                  </button>{" "}
                  or{" "}
                  <button
                    onClick={handleWhatsApp}
                    className="text-charcoal/60 underline underline-offset-2 hover:text-gold transition-colors duration-300"
                  >
                    send a WhatsApp
                  </button>
                  .
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="bg-charcoal text-cream py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
          {[
            { icon: Phone,         label: "Call",      detail: CALL_NUMBER,       sub: "Mon–Sun · 9am–9pm",           action: handleCall },
            { icon: MessageCircle, label: "WhatsApp",  detail: "Message directly", sub: "Quick replies",               action: handleWhatsApp },
            { icon: Mail,          label: "Email",     detail: EMAIL,             sub: "Reply within 24 hrs",         action: () => window.open(`mailto:${EMAIL}`) },
            { icon: MapPin,        label: "Location",  detail: "Coorg, Karnataka", sub: ADDRESS,                      action: () => {} },
          ].map(({ icon: Icon, label, detail, sub, action }, i) => (
            <motion.button
              key={i}
              onClick={action}
              className="group text-left bg-charcoal px-8 py-9 hover:bg-white/4 transition-colors duration-400"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Icon className="w-4 h-4 text-gold mb-5" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/35 mb-2">{label}</p>
              <p className="font-serif text-lg text-cream leading-snug">{detail}</p>
              <p className="text-cream/30 text-[12px] font-light mt-1 leading-snug">{sub}</p>
            </motion.button>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 px-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 font-light tracking-wide text-xs uppercase">
      <div className="flex items-center gap-3">
        <span className="font-serif text-sm tracking-widest text-gold">West Willows</span>
        <span className="text-white/15">·</span>
        <span className="text-cream/30">© {new Date().getFullYear()}. All rights reserved.</span>
      </div>
      <div className="flex gap-8 text-cream/30">
        <a href="#" className="hover:text-gold transition-colors duration-300">Instagram</a>
        <a href="#booking" className="hover:text-gold transition-colors duration-300">Book</a>
        <a href="#" className="hover:text-gold transition-colors duration-300">Privacy</a>
      </div>
    </footer>
  );
}
