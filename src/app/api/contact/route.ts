import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contactSchema";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = contactSchema.parse(json);

    try {
      const enquiry = await prisma.contactEnquiry.create({
        data: {
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          subject: validated.subject,
          message: validated.message,
        },
      });
      return NextResponse.json({ success: true, data: enquiry });
    } catch {
      return NextResponse.json({
        success: true,
        data: { id: `enq-${Date.now()}`, ...validated },
        isFallback: true,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors || err.message },
      { status: 400 }
    );
  }
}
