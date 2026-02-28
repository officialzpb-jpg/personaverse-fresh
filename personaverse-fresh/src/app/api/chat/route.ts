// app/api/chat/route.ts - Vertex AI Integration
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

    // Call Google Vertex AI (Gemini)
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant for PersonaVerse, an AI personality platform. Answer this question: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Vertex AI Error:', error);
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';

    return NextResponse.json({
      content: aiResponse,
      model: 'gemini-pro',
      tokens: {
        prompt: prompt.length / 4,
        completion: aiResponse.length / 4,
        total: (prompt.length + aiResponse.length) / 4,
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
