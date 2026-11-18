import React from "react";
import Facilities from "@/components/sections/Facilities";

export const metadata = {
  title: "Campus Facilities & Labs | MASTeR Incubation Foundation",
  description: "Explore the prototyping labs, 3D printing equipment, IoT testing workbenches, and co-working spaces at MAMCET.",
};

export default function FacilitiesPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <Facilities />
    </div>
  );
}
