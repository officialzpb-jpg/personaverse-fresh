// app/api/chat/route.ts - Debug version
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    console.log('Received prompt:', prompt);
    console.log('API Key exists:', !!process.env.GOOGLE_AI_API_KEY);
    console.log('API Key first 10 chars:', process.env.GOOGLE_AI_API_KEY?.substring(0, 10));

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY not set');
      return NextResponse.json({
        content: "API key not configured. Please set GOOGLE_AI_API_KEY in environment variables.",
        model: 'error',
      });
    }

    // Call Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    console.log('Calling URL:', url.substring(0, 80) + '...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a helpful assistant for PersonaVerse, an AI personality platform. User asks: ${prompt}`,
              },
            ],
          },
        ],
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return NextResponse.json({
        content: `API Error: ${response.status} - ${errorText.substring(0, 200)}`,
        model: 'error',
      });
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data).substring(0, 200));
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || 'No response from AI';

    return NextResponse.json({
      content: aiResponse,
      model: 'gemini-1.5-flash',
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      model: 'error',
    });
  }
}
