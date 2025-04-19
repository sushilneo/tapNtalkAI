export async function expandIntent(prompt: string): Promise<string> {
  try {
    const res = await fetch('/api/intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? 'No message from AI.';
  } catch (error) {
    console.error('❌ expandIntent error:', error);
    return 'Something went wrong.';
  }
}
