import EventsPage from "@/components/EventsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Celebrations | West Willows Luxury Resort & Venue",
  description: "Host your dream events at West Willows. We specialize in luxury weddings, themed pool parties, corporate get-togethers, prewedding shoots, and exclusive musical concerts in Punjab.",
  keywords: "luxury wedding venue, themed pool parties, corporate get togethers, haldi sangeet venue, prewedding shoots punjab, private night club parties, musical concerts venue",
  openGraph: {
    title: "Luxury Events at West Willows",
    description: "Discover our premium venues for weddings, corporate retreats, and private parties.",
    type: "website",
  }
};

export default function Events() {
  return <EventsPage />;
}
