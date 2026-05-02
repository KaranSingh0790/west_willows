"use client";

import React, { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { VILLA_DATA } from '@/config/data';
import { FadeIn } from './shared/FadeIn';

export const AvailabilityCalendar = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/availability');
        const data = await response.json();
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates);
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const isDateBlocked = (dateToCheck: Date) => {
    const dateStr = format(dateToCheck, 'yyyy-MM-dd');
    return blockedDates.includes(dateStr);
  };

  const css = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #ffffff;
      --rdp-background-color: #1a1a1a;
      --rdp-accent-color-dark: #ffffff;
      --rdp-background-color-dark: #333333;
      --rdp-outline: 2px solid var(--rdp-accent-color);
      --rdp-outline-selected: 2px solid var(--rdp-accent-color);
      margin: 0;
    }
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
    .rdp-day_range_middle {
      background-color: #ffffff33 !important;
      color: #ffffff !important;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #ffffff22 !important;
    }
    .rdp-day_disabled {
      text-decoration: line-through;
      opacity: 0.25;
    }
  `;

  return (
    <div className="w-full h-full flex flex-col justify-center text-white">
      <style>{css}</style>
      
      <div className="mb-10 text-center lg:text-left">
        <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Check Availability</h3>
        <p className="text-white/40 text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0">
          Select your dates below. Dates marked out are currently reserved.
        </p>
      </div>

      <div className="flex justify-center lg:justify-start mb-10">
        <div className="bg-[#111]/80 backdrop-blur-md border border-white/10 p-6 rounded-none inline-block shadow-2xl">
          {isLoading ? (
            <div className="w-[300px] h-[300px] flex items-center justify-center">
              <span className="text-white/40 text-xs tracking-widest uppercase animate-pulse">Syncing Calendar...</span>
            </div>
          ) : (
            <DayPicker
              mode="range"
              selected={date}
              onSelect={setDate}
              disabled={[
                { before: startOfDay(new Date()) },
                (dateToDisable) => isDateBlocked(dateToDisable)
              ]}
              className="text-white font-light"
            />
          )}
        </div>
      </div>

      <div className="max-w-md h-12">
        {date?.from ? (
          <FadeIn>
            <div className="flex items-center gap-3 text-[#25D366]">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-sm tracking-widest uppercase font-medium">Selected Dates Available</span>
            </div>
            <p className="text-white/40 text-[10px] tracking-widest uppercase mt-3">
              Reach out to the concierge to secure your reservation.
            </p>
          </FadeIn>
        ) : (
          <p className="text-white/30 text-[10px] tracking-widest uppercase">
            Select a date range to verify live availability.
          </p>
        )}
      </div>
    </div>
  );
};
