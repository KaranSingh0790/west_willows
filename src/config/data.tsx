import React from 'react';
import { Map, Bed, Waves, Coffee, Users, Briefcase, Heart, Sparkles, Camera, Cake, Disc, Mic } from 'lucide-react';

export const VILLA_DATA = {
  name: "West Willows",
  location: "Village Dharamgarh, Banur-Tepla Road, Distt SAS Nagar (Mohali), Mohali, Punjab. 140501",
  tagline: "A Private Sanctuary.",
  pricePerNight: "₹30,000",
  CALENDAR_ICS_URL: "https://calendar.google.com/calendar/ical/7c9a04da4669691ad0440131cff4a68fd04da5fa2ebc1eb3fba89685b225c52c%40group.calendar.google.com/public/basic.ics",

  stats: [
    { label: "Estate", value: "7 Acres", icon: <Map className="w-8 h-8 mb-6 text-white/60" strokeWidth={1} /> },
    { label: "Accommodation", value: "5 Bedrooms", icon: <Bed className="w-8 h-8 mb-6 text-white/60" strokeWidth={1} /> },
    { label: "Wellness", value: "Infinity Jacuzzi", icon: <Waves className="w-8 h-8 mb-6 text-white/60" strokeWidth={1} /> },
    { label: "Entertainment", value: "Private Lounge", icon: <Coffee className="w-8 h-8 mb-6 text-white/60" strokeWidth={1} /> },
    { label: "Service", value: "24/7 Staff", icon: <Users className="w-8 h-8 mb-6 text-white/60" strokeWidth={1} /> }
  ],

  amenities: [
    {
      title: "The Infinity Jacuzzi",
      description: "Immerse yourself in tranquility overlooking lush landscapes. Temperature-controlled waters seamlessly blend with the horizon, offering a secluded oasis under the open sky.",
      image: "/assets/pool.jpg",
    },
    {
      title: "The Private Suites",
      description: "Five meticulously appointed bedrooms offering panoramic views, premium linens, and uncompromising comfort. Each suite is designed as a personal sanctuary of calm.",
      image: "/assets/room1.jpg",
    },
    {
      title: "The Lounge & Bar",
      description: "A sophisticated space designed for intimate gatherings and celebrations, complete with premium amenities and bespoke interior touches.",
      image: "/assets/bar.jpg",
    },
    {
      title: "The Grand Hall",
      description: "Architectural brilliance meets modern luxury in our double-height living spaces, flowing seamlessly into the lush outdoor estate.",
      image: "/assets/hall.jpg",
    }
  ],

  events: [
    {
      title: "Themed Pool Parties",
      description: "Dive into the extraordinary world of entertainment and excitement with our exclusive themed pool parties. Designed to add a splash of creativity and a wave of fun to your aquatic celebrations.",
      icon: <Waves className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Corporate Get Togethers",
      description: "Where business meets pleasure in the perfect blend of professional ambiance and social connectivity. Whether you're planning a team-building session, a product launch, or an executive retreat.",
      icon: <Briefcase className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Engagement & Wedding Events",
      description: "Embark on the journey of a lifetime surrounded by elegance, romance, and unparalleled service. From intimate gatherings to grand affairs, we turn your dreams into reality.",
      icon: <Heart className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Haldi And Sangeet Events",
      description: "Embrace the richness of cultural traditions. We curate vibrant and joyful ceremonies that infuse your pre-wedding celebrations with color, rhythm, and unforgettable moments.",
      icon: <Sparkles className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Prewedding Shoots",
      description: "Celebrate the unique journey of your love. From picturesque landscapes to intimate moments, our prewedding shoots are designed to capture the essence of your love timelessly and artistically.",
      icon: <Camera className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Birthday Get Togethers",
      description: "Make your birthday a memorable celebration that reflects your unique style and personality. Perfect for milestone celebrations or simply reveling in the joy of another year with loved ones.",
      icon: <Cake className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "In-House Night Club Parties",
      description: "Prepare for a night of pulsating beats and vibrant lights. We bring the thrill of the nightclub experience right to our in-house venue, creating a nightlife haven for exhilarating entertainment.",
      icon: <Disc className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    },
    {
      title: "Musical Concerts",
      description: "Immerse yourself in the magic of live music. Our venue transforms into a dynamic space that resonates with the rhythm and soul of unforgettable performances from chart-topping or emerging artists.",
      icon: <Mic className="w-10 h-10 mb-6 text-white/80" strokeWidth={1} />
    }
  ],

  contact: {
    phone: "+91 9056220650",
    whatsapp: "919056220650",
    email: "westwillowsin@gmail.com",
    instagram: "https://www.instagram.com/westwillows_/"
  }
};
