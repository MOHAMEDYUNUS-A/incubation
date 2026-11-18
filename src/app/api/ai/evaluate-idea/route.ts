import { NextRequest, NextResponse } from "next/server";
import { ideaAnalysisSchema } from "@/lib/validations/ideaSchema";
import { aiProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = ideaAnalysisSchema.parse(json);

    const result = await aiProvider.analyzeIdea(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message || "Invalid input" },
      { status: 400 }
    );
  }
}
