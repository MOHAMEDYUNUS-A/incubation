import { NextRequest, NextResponse } from "next/server";
import {
  getAllPassports,
  getPassportById,
  createStartupPassport,
  updatePassportStatus,
} from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get("startupId");
    const status = searchParams.get("status");

    let passports = getAllPassports();

    if (startupId) {
      passports = passports.filter((p) => p.startupId === startupId);
    }
    if (status) {
      passports = passports.filter((p) => p.status.toUpperCase() === status.toUpperCase());
    }

    return NextResponse.json({
      success: true,
      count: passports.length,
      data: passports,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch passports." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { startupId, startupName, slug, remarks, issuedBy } = body;

    if (!startupId || !startupName || !slug) {
      return NextResponse.json(
        { success: false, error: "startupId, startupName, and slug are required." },
        { status: 400 }
      );
    }

    const passport = await createStartupPassport({
      startupId,
      startupName,
      slug,
      remarks,
      issuedBy,
    });

    return NextResponse.json({
      success: true,
      message: "Startup Passport issued successfully.",
      data: passport,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to issue passport." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { passportId, status, remarks, updatedBy } = body;

    if (!passportId || !status) {
      return NextResponse.json(
        { success: false, error: "passportId and status are required." },
        { status: 400 }
      );
    }

    const updated = updatePassportStatus(passportId, status, remarks, updatedBy);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Passport ${passportId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Passport status updated to ${status}.`,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update passport status." },
      { status: 500 }
    );
  }
}
