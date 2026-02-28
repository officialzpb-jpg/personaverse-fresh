// app/api/chat/route.ts - Debug version
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt } = body;

  console.log('START');
  console.log('Prompt:', prompt);
  
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  console.log('API Key length:', apiKey?.length || 0);
  console.log('API Key exists:', !!apiKey);
  
  if (!apiKey || apiKey.length < 10) {
    console.log('ERROR: API key missing or too short');
    return NextResponse.json({ 
      content: `Debug: API key issue. Length: ${apiKey?.length || 0}`, 
      model: 'debug' 
    });
  }

  console.log('Making API call with key starting with:', apiKey.substring(0, 10));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.log('API Error:', error);
      return NextResponse.json({ 
        content: `API Error: ${response.status}`, 
        model: 'error' 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    
    return NextResponse.json({ content: text, model: 'gemini' });

  } catch (err) {
    console.log('Exception:', err);
    return NextResponse.json({ 
      content: `Error: ${err instanceof Error ? err.message : 'Unknown'}`, 
      model: 'error' 
    });
  }
}
