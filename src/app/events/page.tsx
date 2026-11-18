import React from "react";
import EventsNews from "@/components/sections/EventsNews";

export const metadata = {
  title: "Events & Calendar | MASTeR Incubation Foundation",
  description: "View upcoming workshops, ideathons, startup masterclasses, and bootcamps at MAMCET campus.",
};

export default function EventsPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#050814]">
      <EventsNews />
    </div>
  );
}
