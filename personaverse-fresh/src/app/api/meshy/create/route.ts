import { NextRequest, NextResponse } from "next/server";

const MESHY_API_URL = "https://api.meshy.ai/v2";

// POST /api/meshy/create - Create 3D avatar from text or image
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.MESHY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Meshy API key not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { mode, prompt, imageUrl, artStyle = "realistic", negativePrompt = "" } = body;

    if (mode === "text") {
      // Text-to-3D
      const response = await fetch(`${MESHY_API_URL}/text-to-3d`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          art_style: artStyle, // realistic, cartoon, low-poly
          topology: "triangle", // triangle, quad
          target_polycount: 50000, // 30000-100000
          should_remesh: true,
          should_texture: true,
          texture_richness: "high", // low, medium, high
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create 3D model");
      }

      const data = await response.json();
      
      return NextResponse.json({
        success: true,
        taskId: data.task_id,
        status: "processing",
        message: "3D avatar creation started",
      });

    } else if (mode === "image") {
      // Image-to-3D
      const response = await fetch(`${MESHY_API_URL}/image-to-3d`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          topology: "triangle",
          target_polycount: 50000,
          should_remesh: true,
          should_texture: true,
          texture_richness: "high",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create 3D model");
      }

      const data = await response.json();
      
      return NextResponse.json({
        success: true,
        taskId: data.task_id,
        status: "processing",
        message: "3D avatar creation started",
      });
    }

    return NextResponse.json(
      { error: "Invalid mode. Use 'text' or 'image'" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Meshy create error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create 3D avatar" },
      { status: 500 }
    );
  }
}

// GET /api/meshy/create - Check task status
export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.MESHY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Meshy API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${MESHY_API_URL}/tasks/${taskId}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch task status");
    }

    const data = await response.json();
    
    return NextResponse.json({
      taskId: data.task_id,
      status: data.status, // PENDING, IN_PROGRESS, SUCCEEDED, FAILED
      progress: data.progress || 0,
      modelUrl: data.model_url, // GLB file URL
      thumbnailUrl: data.thumbnail_url,
      createdAt: data.created_at,
      finishedAt: data.finished_at,
    });

  } catch (error) {
    console.error("Meshy status error:", error);
    return NextResponse.json(
      { error: "Failed to fetch task status" },
      { status: 500 }
    );
  }
}
