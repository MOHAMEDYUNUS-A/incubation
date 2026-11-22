import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contactSchema";
import prisma from "@/lib/db/prisma";
import { sendEmail, getContactEnquiryReceiptEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = contactSchema.parse(json);

    let enquiryData: any = null;
    let isFallback = false;

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
      enquiryData = enquiry;
    } catch {
      enquiryData = { id: `enq-${Date.now()}`, ...validated };
      isFallback = true;
    }

    // Send automated No-Reply confirmation email to the sender
    try {
      await sendEmail({
        to: validated.email,
        subject: `Enquiry Received: "${validated.subject}" — MASTeR Incubation Foundation`,
        html: getContactEnquiryReceiptEmail({
          name: validated.name,
          subject: validated.subject,
          message: validated.message,
          referenceId: enquiryData?.id ? `MIF-${enquiryData.id.toUpperCase()}` : `MIF-ENQ-${Date.now()}`,
        }),
      });
    } catch (emailErr) {
      console.error("[CONTACT EMAIL ERROR]", emailErr);
    }

    return NextResponse.json({
      success: true,
      data: enquiryData,
      isFallback,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors || err.message },
      { status: 400 }
    );
  }
}
