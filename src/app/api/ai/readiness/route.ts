import { NextRequest, NextResponse } from "next/server";
import { readinessAssessmentSchema } from "@/lib/validations/ideaSchema";
import { aiProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = readinessAssessmentSchema.parse(json);

    const scorecard = await aiProvider.assessReadiness(validated);
    return NextResponse.json({ success: true, data: scorecard });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || "Invalid input" },
      { status: 400 }
    );
  }
}
