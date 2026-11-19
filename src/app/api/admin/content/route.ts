import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "site-content.json");

function getStoredContent() {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileData = fs.readFileSync(CONTENT_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading site-content.json:", err);
  }
  return null;
}

function saveStoredContent(data: any) {
  try {
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving site-content.json:", err);
    return false;
  }
}

export async function GET() {
  const content = getStoredContent();
  if (!content) {
    return NextResponse.json(
      { success: false, error: "Content file not found or corrupted." },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data: content });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getStoredContent() || {};

    // Allow partial updates by section (e.g., { section: "gallery", data: [...] })
    // or full replacement (e.g. { fullContent: { ... } })
    let updatedContent = { ...current };

    if (body.section && body.data !== undefined) {
      updatedContent[body.section] = body.data;
    } else if (body.fullContent) {
      updatedContent = body.fullContent;
    } else {
      updatedContent = { ...current, ...body };
    }

    const saved = saveStoredContent(updatedContent);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to persist content updates to disk." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Site content updated successfully.",
      data: updatedContent,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to parse update request." },
      { status: 400 }
    );
  }
}
