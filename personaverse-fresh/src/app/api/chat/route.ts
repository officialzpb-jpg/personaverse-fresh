// app/api/chat/route.ts - Vertex AI with PersonaVerse Knowledge
import { NextRequest, NextResponse } from 'next/server';

const PERSONAVERSE_CONTEXT = `
You are the official AI assistant for PersonaVerse (https://www.personaverse.space).

ABOUT PERSONAVERSE:
- AI Personality & Multi-Model Chat Platform
- Chat with AI personas inspired by creators
- Create your own AI personas
- Monetize your personas
- Switch between AI models (GPT, Claude, Gemini)

FEATURES:
1. AI Persona Chat Hub - Chat with expert AI personalities
2. Multi-Model Integration - Switch between GPT-4, Claude, Gemini
3. Persona Creator Tool - Build custom AI personas
4. Persona Marketplace - Buy/sell premium personas
5. Battle Arena - Watch AI personas debate
6. Digital Legacy Mode - Preserve personality for future

PRICING:
- Free: 50 chats/month, 5 personas, basic models
- Pro ($15/mo): Unlimited chats, all models, persona creation
- Creator ($99/mo): Monetize personas, analytics, API access

PAGES:
- /personas - Browse AI personas
- /create - Create your persona
- /marketplace - Buy/sell personas
- /pricing - View plans
- /battle-arena - AI debates
- /admin/login - Admin dashboard (demo: admin@personaverse.space / admin123)

Be helpful, concise, and guide users to the right pages.
`;

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
      return NextResponse.json({
        content: getFallbackResponse(prompt),
        model: 'fallback',
        note: 'AI service not configured'
      });
    }

    // Call Vertex AI
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
                  text: `${PERSONAVERSE_CONTEXT}\n\nUser question: ${prompt}\n\nProvide a helpful, concise response:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vertex AI Error:', response.status, errorText);
      return NextResponse.json({
        content: getFallbackResponse(prompt),
        model: 'fallback',
        note: 'AI temporarily unavailable'
      });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || 'I apologize, but I could not generate a response at this time.';

    return NextResponse.json({
      content: aiResponse,
      model: 'gemini-1.5-flash',
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      content: "I can help you navigate PersonaVerse! Ask about creating personas, pricing, or features.",
      model: 'fallback',
      note: 'Using fallback responses'
    });
  }
}

function getFallbackResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
    return "We have three plans:\n\n• Free: 50 chats/month\n• Pro ($15/mo): Unlimited chats\n• Creator ($99/mo): Monetize personas\n\nVisit /pricing for details!";
  }
  
  if (lower.includes('create') || lower.includes('persona')) {
    return "Create your own AI persona at /create! You can customize personality, knowledge, and traits.";
  }
  
  if (lower.includes('what is') || lower.includes('about')) {
    return "PersonaVerse is an AI personality platform where you can chat with AI personas, create your own, and monetize them!";
  }
  
  if (lower.includes('admin')) {
    return "Admin dashboard is at /admin/login (demo: admin@personaverse.space / admin123)";
  }
  
  if (lower.includes('battle') || lower.includes('arena')) {
    return "Check out AI debates at /battle-arena!";
  }
  
  return "I can help you navigate PersonaVerse! Ask about creating personas, pricing, or visit /personas to browse.";
}
