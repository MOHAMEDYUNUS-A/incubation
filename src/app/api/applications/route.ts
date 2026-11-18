import { NextRequest, NextResponse } from "next/server";
import { startupApplicationSchema } from "@/lib/validations/applicationSchema";
import prisma from "@/lib/db/prisma";

// In-memory fallback if MySQL is not yet configured on the target host
let memoryApplications: any[] = [
  {
    id: "app-101",
    startupName: "AgroSens Telemetry",
    founderName: "Arun K.",
    founderEmail: "arun.ece@mamcet.edu.in",
    founderPhone: "+91 9876543210",
    category: "ELECTRONICS_IOT_SMART",
    stage: "PROTOTYPE_MVP",
    problemStatement: "Lack of granular soil moisture and NPK telemetry for delta paddy farmers leads to excessive fertilization and crop yield drop.",
    proposedSolution: "Solar-powered LoRa telemetry nodes providing real-time mobile app alerts and automated irrigation solenoid triggers.",
    targetMarket: "Delta zone agricultural farmers in Trichy, Thanjavur, and Tiruvarur.",
    status: "INCUBATED",
    createdAt: new Date("2026-10-15").toISOString(),
  },
  {
    id: "app-102",
    startupName: "ThermaGrid Analytics",
    founderName: "Sivaram M.",
    founderEmail: "sivaram@thermagrid.in",
    founderPhone: "+91 9812345678",
    category: "RENEWABLE_ENERGY_CLEAN_TECH",
    stage: "PROOF_OF_CONCEPT",
    problemStatement: "Solar panel thermal hotspots and dust accumulation reduce commercial photovoltaic plant yield by up to 18%.",
    proposedSolution: "Autonomous thermal drone imaging with edge computer vision for hotspot identification and predictive cleaning schedules.",
    targetMarket: "Commercial rooftop and utility-scale solar farm operators in South India.",
    status: "SHORTLISTED_FOR_PITCH",
    createdAt: new Date("2026-11-02").toISOString(),
  },
];

export async function GET() {
  try {
    const apps = await prisma.startupApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    // Return memory fallback if database connection is pending
    return NextResponse.json({
      success: true,
      count: memoryApplications.length,
      data: memoryApplications,
      isFallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = startupApplicationSchema.parse(json);

    try {
      const created = await prisma.startupApplication.create({
        data: {
          startupName: validated.startupName,
          founderName: validated.founderName,
          founderEmail: validated.founderEmail,
          founderPhone: validated.founderPhone,
          coFoundersCount: validated.coFoundersCount,
          collegeOrEntity: validated.collegeOrEntity,
          category: validated.category as any,
          stage: validated.stage as any,
          problemStatement: validated.problemStatement,
          proposedSolution: validated.proposedSolution,
          targetMarket: validated.targetMarket,
          competitors: validated.competitors || "",
          revenueModel: validated.revenueModel || "",
          fundingNeeded: validated.fundingNeeded || "",
          labRequirement: validated.labRequirement || "",
          pitchDeckUrl: validated.pitchDeckUrl || "",
        },
      });
      return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch (dbError) {
      // In-memory persistence fallback
      const fallbackItem = {
        id: `app-${Date.now()}`,
        ...validated,
        status: "SUBMITTED",
        createdAt: new Date().toISOString(),
      };
      memoryApplications.unshift(fallbackItem);
      return NextResponse.json(
        { success: true, data: fallbackItem, isFallback: true },
        { status: 201 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors || err.message || "Invalid submission" },
      { status: 400 }
    );
  }
}
