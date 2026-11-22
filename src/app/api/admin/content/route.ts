import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "site-content.json");
const TMP_FILE_PATH = path.join("/tmp", "site-content.json");
const TMP_TIME_PATH = path.join("/tmp", "site-content-time.txt");

// In-memory global store to guarantee persistence during lambda execution
let inMemoryStore: any = null;
let inMemoryTimestamp: number = 0;

function getStoredContent() {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  // 1. Check /tmp on serverless environments
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const fileData = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      inMemoryStore = JSON.parse(fileData);
      if (fs.existsSync(TMP_TIME_PATH)) {
        inMemoryTimestamp = parseInt(fs.readFileSync(TMP_TIME_PATH, "utf-8"), 10) || 0;
      }
      return inMemoryStore;
    }
  } catch (e) {
    // ignore
  }

  // 2. Check bundled source file
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileData = fs.readFileSync(CONTENT_FILE_PATH, "utf-8");
      inMemoryStore = JSON.parse(fileData);
      return inMemoryStore;
    }
  } catch (err) {
    console.error("Error reading site-content.json:", err);
  }
  return null;
}

function saveStoredContent(data: any, timestamp?: number) {
  inMemoryStore = data;
  inMemoryTimestamp = timestamp || Date.now();

  // Attempt writing to bundled path (works in local dev)
  try {
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Expected on Vercel read-only filesystem
  }

  // Attempt writing to /tmp (works in Vercel serverless functions)
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    fs.writeFileSync(TMP_TIME_PATH, inMemoryTimestamp.toString(), "utf-8");
  } catch (e) {
    // ignore
  }

  return true;
}

export async function GET() {
  const content = getStoredContent();
  if (!content) {
    return NextResponse.json(
      { success: false, error: "Content file not found or corrupted." },
      { status: 500 }
    );
  }
  return NextResponse.json({
    success: true,
    data: content,
    timestamp: inMemoryTimestamp,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = getStoredContent() || {};
    const timestamp = body.timestamp || Date.now();

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

    const saved = saveStoredContent(updatedContent, timestamp);
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
      timestamp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to parse update request." },
      { status: 400 }
    );
  }
}
