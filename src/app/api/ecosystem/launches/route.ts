import { NextRequest, NextResponse } from "next/server";
import { getProductLaunches, addProductLaunch } from "@/lib/ecosystem/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startupId = searchParams.get("startupId");

    const launches = getProductLaunches(startupId || undefined);

    return NextResponse.json({
      success: true,
      data: launches,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product launches." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      startupId,
      startupName,
      productName,
      tagline,
      launchDate,
      version,
      demoUrl,
      pressReleaseUrl,
      mediaUrls,
      description,
      isFeatured,
      addedBy,
    } = body;

    if (!startupId || !productName || !description) {
      return NextResponse.json(
        { success: false, error: "startupId, productName, and description are required." },
        { status: 400 }
      );
    }

    const launch = addProductLaunch(
      {
        startupId,
        startupName: startupName || "Incubated Startup",
        productName,
        tagline: tagline || "",
        launchDate: launchDate || new Date().toISOString(),
        version: version || "v1.0",
        demoUrl,
        pressReleaseUrl,
        mediaUrls: mediaUrls || [],
        description,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      },
      addedBy
    );

    return NextResponse.json({
      success: true,
      message: "Product launch registered successfully.",
      data: launch,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add product launch." },
      { status: 500 }
    );
  }
}
