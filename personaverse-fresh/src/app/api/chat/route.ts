// app/api/chat/route.ts - Simplified version
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simple response for now (AI integration to be added)
    return NextResponse.json({
      content: `You asked: "${prompt}"\n\nAI integration coming soon! This is a placeholder response.`,
      model: 'placeholder',
      tokens: {
        prompt: prompt.length / 4,
        completion: 50,
        total: prompt.length / 4 + 50,
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
