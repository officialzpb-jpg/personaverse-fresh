// app/api/chat/route.ts - Ultra simple version
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt } = body;

  console.log('1. Starting API call');
  console.log('2. Prompt:', prompt);
  console.log('3. API Key set:', process.env.GOOGLE_AI_API_KEY ? 'YES' : 'NO');

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    console.log('4. ERROR: No API key');
    return NextResponse.json({ content: 'Error: No API key', model: 'error' });
  }

  try {
    console.log('5. Making fetch call...');
    
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

    console.log('6. Response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.log('7. ERROR response:', error);
      return NextResponse.json({ 
        content: `API Error ${response.status}: ${error.substring(0, 100)}`, 
        model: 'error' 
      });
    }

    const data = await response.json();
    console.log('8. Success! Data received');
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No text';
    
    return NextResponse.json({ content: text, model: 'gemini' });

  } catch (err) {
    console.log('9. CATCH ERROR:', err);
    return NextResponse.json({ 
      content: `Exception: ${err instanceof Error ? err.message : 'Unknown'}`, 
      model: 'error' 
    });
  }
}
