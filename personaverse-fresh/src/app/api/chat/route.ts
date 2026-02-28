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

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY not set');
      return NextResponse.json(
        { 
          content: 'I can help you navigate PersonaVerse! Ask about creating personas, pricing, or features.',
          model: 'fallback',
          error: 'API key not configured'
        }
      );
    }

    console.log('Calling Vertex AI with key:', apiKey.substring(0, 10) + '...');

    // Try Vertex AI endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
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
                  text: `You are a helpful assistant for PersonaVerse, an AI personality platform. Be concise and friendly. User asks: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    console.log('Vertex AI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vertex AI Error:', errorText);
      
      // Return fallback response
      return NextResponse.json({
        content: getFallbackResponse(prompt),
        model: 'fallback',
        error: 'AI service error'
      });
    }

    const data = await response.json();
    console.log('Vertex AI response:', JSON.stringify(data).substring(0, 200));
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || data.candidates?.[0]?.content?.text
      || 'I apologize, but I could not generate a response at this time.';

    return NextResponse.json({
      content: aiResponse,
      model: 'gemini-1.5-flash',
      tokens: {
        prompt: Math.ceil(prompt.length / 4),
        completion: Math.ceil(aiResponse.length / 4),
        total: Math.ceil((prompt.length + aiResponse.length) / 4),
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      content: "I can help you navigate PersonaVerse! Ask about creating personas, pricing, or features.",
      model: 'fallback',
      error: 'Internal server error'
    });
  }
}

function getFallbackResponse(prompt: string): string {
  const responses: Record<string, string> = {
    'personaverse': 'PersonaVerse is an AI personality platform where you can chat with AI personas, create your own, and monetize them!',
    'create': 'Go to the Create page to build your own AI persona with custom traits and knowledge!',
    'price': 'We have Free, Pro ($15/mo), and Creator ($99/mo) plans. Check the Pricing page!',
    'contact': 'Email us at support@personaverse.space or visit the Trust page.',
    'admin': 'The admin dashboard is at /admin/login.',
    'battle': 'The Battle Arena is at /battle-arena!',
    'hello': 'Hello! 👋 I\'m here to help you explore PersonaVerse. What would you like to know?',
  };

  const lowerPrompt = prompt.toLowerCase();
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerPrompt.includes(key)) {
      return response;
    }
  }
  
  return "I can help you navigate PersonaVerse! Ask about creating personas, pricing, or features.";
}
