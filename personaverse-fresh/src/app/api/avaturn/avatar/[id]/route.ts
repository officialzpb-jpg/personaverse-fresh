import { NextRequest, NextResponse } from "next/server";

const AVATURN_API_URL = "https://api.avaturn.me/v1";

// GET /api/avaturn/avatar/[id] - Get avatar details/URL
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const apiKey = process.env.AVATURN_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Avaturn API key not configured" },
        { status: 500 }
      );
    }

    const { id } = params;

    // Get avatar details
    const response = await fetch(`${AVATURN_API_URL}/avatars/${id}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch avatar");
    }

    const data = await response.json();
    
    return NextResponse.json({
      avatarId: id,
      avatarUrl: `${AVATURN_API_URL}/avatars/${id}.glb`,
      previewUrl: data.preview_url,
      status: data.status,
      createdAt: data.created_at,
    });

  } catch (error) {
    console.error("Avaturn avatar error:", error);
    return NextResponse.json(
      { error: "Failed to fetch avatar" },
      { status: 500 }
    );
  }
}

// DELETE /api/avaturn/avatar/[id] - Delete avatar
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const apiKey = process.env.AVATURN_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Avaturn API key not configured" },
        { status: 500 }
      );
    }

    const { id } = params;

    const response = await fetch(`${AVATURN_API_URL}/avatars/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete avatar");
    }
    
    return NextResponse.json({
      success: true,
      message: "Avatar deleted successfully",
    });

  } catch (error) {
    console.error("Avaturn delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete avatar" },
      { status: 500 }
    );
  }
}
