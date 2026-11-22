import { NextRequest, NextResponse } from "next/server";
import {
  getSuccessStories,
  getAllSuccessStoriesAdmin,
  getStoryBySlug,
  saveSuccessStory,
} from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const includeDrafts = searchParams.get("all") === "true";

    if (slug) {
      const story = getStoryBySlug(slug);
      if (!story) {
        return NextResponse.json(
          { success: false, error: `Story ${slug} not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: story });
    }

    const stories = includeDrafts ? getAllSuccessStoriesAdmin() : getSuccessStories();
    return NextResponse.json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch success stories." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      startupId,
      startupName,
      slug,
      title,
      heroImage,
      problemStatement,
      theBreakthrough,
      mifJourney,
      impactMetrics,
      founderQuote,
      quoteAuthor,
      status,
      isEditorialPick,
      publishedAt,
      interview,
      authorName,
    } = body;

    if (!startupId || !title || !slug) {
      return NextResponse.json(
        { success: false, error: "startupId, title, and slug are required." },
        { status: 400 }
      );
    }

    const saved = saveSuccessStory(
      {
        id,
        startupId,
        startupName: startupName || "Incubated Startup",
        slug,
        title,
        heroImage: heroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
        problemStatement: problemStatement || "",
        theBreakthrough: theBreakthrough || "",
        mifJourney: mifJourney || "",
        impactMetrics: impactMetrics || [],
        founderQuote: founderQuote || "",
        quoteAuthor: quoteAuthor || "",
        status: status || "PUBLISHED",
        isEditorialPick: isEditorialPick !== undefined ? isEditorialPick : false,
        publishedAt: publishedAt || new Date().toISOString(),
        interview,
      },
      authorName
    );

    return NextResponse.json({
      success: true,
      message: "Success story saved successfully.",
      data: saved,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save success story." },
      { status: 500 }
    );
  }
}
