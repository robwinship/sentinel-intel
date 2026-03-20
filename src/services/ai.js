import { SEV, MARKET } from '../data/seeds.js';

/**
 * Builds the shared prompt from events and market data.
 */
function buildPrompt(events, market) {
  const evtLines = [...events]
    .sort((a, b) => SEV[b.sev].rank - SEV[a.sev].rank)
    .slice(0, 8)
    .map(e => `[${e.sev}] ${e.headline} (${e.region}, ${e.cat}): ${e.synopsis}`)
    .join('\n');

  const mktLine = (market || MARKET)
    .map(m => `${m.sym}: ${m.val.toFixed(2)} (${m.pct >= 0 ? '+' : ''}${m.pct.toFixed(2)}%)`)
    .join(', ');

  return (
    'You are an expert executive intelligence analyst. Generate a concise, professional executive security brief based on the following intelligence events and market data. ' +
    'Suitable for a C-suite audience. 3–4 paragraphs max. Start with overall threat assessment, highlight top 2–3 operational risks, market context, then recommended priorities. Professional tone.\n\n' +
    `INTELLIGENCE EVENTS:\n${evtLines}\n\nMARKET DATA:\n${mktLine}`
  );
}

/**
 * Calls the Google Gemini 1.5 Flash API (free tier).
 * Get a free key at: https://aistudio.google.com/
 */
async function callGemini(apiKey, prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error ${res.status}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Calls the Anthropic Claude API.
 * Get a key at: https://console.anthropic.com/
 * Note: requires the anthropic-dangerous-direct-browser-access header for browser use.
 */
async function callAnthropic(apiKey, prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Anthropic API error ${res.status}`);
  }

  const data = await res.json();
  return data.content?.map(b => (b.type === 'text' ? b.text : '')).join('') || '';
}

/**
 * Main entry point — reads provider + key from localStorage, dispatches to correct API.
 * @param {Array} events
 * @param {Array} market
 * @returns {Promise<string>} AI-generated executive brief
 */
export async function generateAISummary(events, market) {
  const provider = localStorage.getItem('aiProvider') || 'gemini';
  const apiKey   = localStorage.getItem(`${provider}ApiKey`) || '';

  if (!apiKey) {
    throw new Error(
      `No ${provider === 'gemini' ? 'Gemini' : 'Anthropic'} API key found. ` +
      'Please add your key in Settings.'
    );
  }

  const prompt = buildPrompt(events, market);

  if (provider === 'gemini') {
    return callGemini(apiKey, prompt);
  } else if (provider === 'anthropic') {
    return callAnthropic(apiKey, prompt);
  }

  throw new Error(`Unknown AI provider: ${provider}`);
}
