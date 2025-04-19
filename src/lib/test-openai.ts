const apiKey = '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';

async function test() {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openchat/openchat-3.5-0106',
      messages: [
        { role: 'user', content: 'Say hello politely' }
      ],
    }),
  });

  const json = await res.json();
  console.log('🧠 TEST Response:', JSON.stringify(json, null, 2));
}

test();
