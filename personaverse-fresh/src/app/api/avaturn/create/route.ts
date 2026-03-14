import { NextRequest, NextResponse } from "next/server";

const AVATURN_API_URL = "https://api.avaturn.me/v1";

// POST /api/avaturn/create - Create a new avatar from photo
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.AVATURN_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Avaturn API key not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image") as File;
    
    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Create avatar via Avaturn API
    const avatarFormData = new FormData();
    avatarFormData.append("image", image);
    avatarFormData.append("gender", formData.get("gender") || "auto");

    const response = await fetch(`${AVATURN_API_URL}/avatars`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: avatarFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create avatar");
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      avatarId: data.id,
      avatarUrl: `${AVATURN_API_URL}/avatars/${data.id}.glb`,
      previewUrl: data.preview_url,
    });

  } catch (error) {
    console.error("Avaturn create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create avatar" },
      { status: 500 }
    );
  }
}

// GET /api/avaturn/create - List user's avatars
export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.AVATURN_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Avaturn API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${AVATURN_API_URL}/avatars`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch avatars");
    }

    const data = await response.json();
    
    return NextResponse.json({
      avatars: data.avatars || [],
    });

  } catch (error) {
    console.error("Avaturn list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch avatars" },
      { status: 500 }
    );
  }
}
