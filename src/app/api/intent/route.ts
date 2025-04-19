export async function POST(req: Request) {
    const { prompt } = await req.json();
  
    const apiKey = process.env.OPENROUTER_API_KEY || '';
  
    console.log('🔑 Server sees key:', apiKey);
  
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`, // ✅ FINAL FIX: use Authorization again
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openchat/openchat-3.5-0106',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that rephrases short student gestures into polite classroom-ready sentences.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });
  
    const data = await response.json();
    console.log('🧠 OpenRouter response:', JSON.stringify(data, null, 2));
  
    if (data.choices?.[0]?.message?.content) {
      return Response.json(data);
    }
  
    if (data.error) {
      return Response.json({ error: data.error.message });
    }
  
    return Response.json({ message: 'No valid AI response.' });
  }
  