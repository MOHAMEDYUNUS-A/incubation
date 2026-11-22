import { NextRequest, NextResponse } from "next/server";
import { startupApplicationSchema } from "@/lib/validations/applicationSchema";
import prisma from "@/lib/db/prisma";
import { sendEmail, getApplicationReceiptEmail } from "@/lib/email";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lookupId = searchParams.get("id");
    const lookupEmail = searchParams.get("email");

    // Public Applicant Status Tracker Lookup
    if (lookupId || lookupEmail) {
      let found: any = null;

      try {
        if (lookupId) {
          // Normalize e.g. "MIF-APP-101" to "app-101" or match exact
          const cleanedId = lookupId.replace(/^MIF-APP-/i, "").toLowerCase();
          found = await prisma.startupApplication.findFirst({
            where: {
              OR: [
                { id: lookupId },
                { id: `app-${cleanedId}` },
                { id: cleanedId },
              ],
            },
          });
        } else if (lookupEmail) {
          found = await prisma.startupApplication.findFirst({
            where: { founderEmail: lookupEmail.toLowerCase().trim() },
            orderBy: { createdAt: "desc" },
          });
        }
      } catch {
        // Look in memory fallback
        if (lookupId) {
          const cleanedId = lookupId.replace(/^MIF-APP-/i, "").toLowerCase();
          found = memoryApplications.find(
            (a) =>
              a.id.toLowerCase() === lookupId.toLowerCase() ||
              a.id.toLowerCase() === `app-${cleanedId}` ||
              a.id.toLowerCase() === cleanedId
          );
        } else if (lookupEmail) {
          found = memoryApplications.find(
            (a) => a.founderEmail?.toLowerCase() === lookupEmail.toLowerCase().trim()
          );
        }
      }

      if (!found) {
        return NextResponse.json(
          { success: false, error: "No application found matching the provided identifier." },
          { status: 404 }
        );
      }

      // Return sanitized status tracking data for public tracking
      return NextResponse.json({
        success: true,
        data: {
          id: found.id,
          startupName: found.startupName,
          founderName: found.founderName,
          category: found.category,
          stage: found.stage,
          status: found.status,
          createdAt: found.createdAt,
        },
      });
    }

    // Default: Fetch all applications for Admin Console
    try {
      const apps = await prisma.startupApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ success: true, count: apps.length, data: apps });
    } catch {
      return NextResponse.json({
        success: true,
        count: memoryApplications.length,
        data: memoryApplications,
        isFallback: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = startupApplicationSchema.parse(json);

    let savedItem: any = null;
    let isFallback = false;

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
      savedItem = created;
    } catch (dbError) {
      // In-memory persistence fallback
      const fallbackItem = {
        id: `app-${Date.now()}`,
        ...validated,
        status: "SUBMITTED",
        createdAt: new Date().toISOString(),
      };
      memoryApplications.unshift(fallbackItem);
      savedItem = fallbackItem;
      isFallback = true;
    }

    // Trigger Automated No-Reply Confirmation Email to Founder
    try {
      await sendEmail({
        to: savedItem.founderEmail,
        subject: `Application Received: ${savedItem.startupName} — MASTeR Incubation Foundation`,
        html: getApplicationReceiptEmail({
          applicationId: savedItem.id,
          founderName: savedItem.founderName,
          startupName: savedItem.startupName,
          category: savedItem.category,
          stage: savedItem.stage,
        }),
      });
    } catch (emailErr) {
      console.error("[APPLICATION EMAIL ERROR]", emailErr);
    }

    return NextResponse.json(
      { success: true, data: savedItem, isFallback },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors || err.message || "Invalid submission" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, notifyApplicant } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    let updatedItem: any = null;

    try {
      const updated = await prisma.startupApplication.update({
        where: { id },
        data: { status },
      });
      updatedItem = updated;
    } catch {
      memoryApplications = memoryApplications.map((app) => {
        if (app.id === id) {
          const mod = { ...app, status };
          updatedItem = mod;
          return mod;
        }
        return app;
      });
    }

    // If requested, send automated status update notification to the applicant
    if (notifyApplicant && updatedItem?.founderEmail) {
      try {
        await sendEmail({
          to: updatedItem.founderEmail,
          subject: `Status Update: ${updatedItem.startupName} is now ${status.replace(/_/g, " ")} — MASTeR Incubation Foundation`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; color: #0f172a; max-width: 580px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #091b34; margin-top: 0;">Incubation Application Status Update</h2>
              <p>Dear ${updatedItem.founderName},</p>
              <p>Your incubation application for <strong>${updatedItem.startupName}</strong> (ID: <code>${updatedItem.id}</code>) has been updated to:</p>
              <div style="padding: 12px 16px; background-color: #f1f5f9; border-left: 4px solid #2563eb; font-weight: bold; font-size: 15px; margin: 16px 0;">
                ${status.replace(/_/g, " ")}
              </div>
              <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
                Our committee will follow up with scheduling details or next action items. If you have any inquiries, contact our coordination team at contact@masterincubation.org.
              </p>
              <p style="font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 24px;">
                MASTeR Incubation Foundation (MIF) · MAMCET Siruganur · Automated Notification
              </p>
            </div>
          `,
        });
      } catch (e) {
        console.error("[STATUS UPDATE EMAIL FAILED]", e);
      }
    }

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
