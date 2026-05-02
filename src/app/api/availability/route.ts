import { NextResponse } from 'next/server';
import { VILLA_DATA } from '@/config/data';
import { eachDayOfInterval, startOfDay, subDays, format } from 'date-fns';

export async function GET() {
  const icsUrl = VILLA_DATA.CALENDAR_ICS_URL;

  if (!icsUrl) {
    return NextResponse.json({ blockedDates: [] });
  }

  try {
    const response = await fetch(icsUrl, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error("Failed to fetch ICS");
    
    const text = await response.text();
    const blockedDates: string[] = [];
    
    const lines = text.split(/\r?\n/);
    let inEvent = false;
    let startStr: string | null = null;
    let endStr: string | null = null;
    
    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        inEvent = true;
        startStr = null;
        endStr = null;
      } else if (line.startsWith('END:VEVENT')) {
        if (inEvent && startStr && endStr) {
          try {
            // Handle YYYYMMDD format for all-day events
            const startParsed = startStr.length === 8 
              ? new Date(`${startStr.substring(0,4)}-${startStr.substring(4,6)}-${startStr.substring(6,8)}T00:00:00Z`)
              : new Date(startStr);
              
            const endParsed = endStr.length === 8
              ? new Date(`${endStr.substring(0,4)}-${endStr.substring(4,6)}-${endStr.substring(6,8)}T00:00:00Z`)
              : new Date(endStr);

            const start = startOfDay(startParsed);
            let end = startOfDay(endParsed);

            // If it's an all-day event, Google Calendar makes DTEND exclusive (e.g., 20260507 for a booking ending on 6th night)
            if (endStr.length === 8) {
              end = subDays(end, 1);
            }

            // Only generate interval if start is before or equal to end
            if (start <= end) {
              const days = eachDayOfInterval({ start, end });
              days.forEach(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                if (!blockedDates.includes(dateStr)) {
                  blockedDates.push(dateStr);
                }
              });
            }
          } catch (e) {
            console.error("Error parsing event dates", e);
          }
        }
        inEvent = false;
      } else if (inEvent) {
        if (line.startsWith('DTSTART')) {
          startStr = line.split(':')[1];
        } else if (line.startsWith('DTEND')) {
          endStr = line.split(':')[1];
        }
      }
    }

    return NextResponse.json({ blockedDates });
  } catch (error) {
    console.error("Error fetching or parsing ICS:", error);
    return NextResponse.json({ blockedDates: [] }, { status: 500 });
  }
}
