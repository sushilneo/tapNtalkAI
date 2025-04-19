export async function expandIntent(prompt: string): Promise<string> {
    try {
      // 👉 Temporarily hardcoded API key for testing (remove before deploying)
      const apiKey = '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';
  
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openchat/openchat-3.5-0106',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that rephrases short student intentions into polite, classroom-appropriate sentences.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });
  
      const json = await response.json();
  
      console.log('🧠 Full OpenRouter Response:', JSON.stringify(json, null, 2));
  
      return json.choices?.[0]?.message?.content ?? 'No message from AI.';
    } catch (error) {
      console.error('❌ OpenRouter API Error:', error);
      return 'Something went wrong with the AI engine.';
    }
  }
  