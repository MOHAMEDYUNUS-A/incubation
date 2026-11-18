import { NextRequest, NextResponse } from "next/server";
import { aiProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "A message string is required." },
        { status: 400 }
      );
    }

    const reply = await aiProvider.chatAssistant(message, history || []);
    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process AI chat" },
      { status: 500 }
    );
  }
}
