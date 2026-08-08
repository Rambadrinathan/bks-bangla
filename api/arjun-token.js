/* Mints a short-lived Gemini Live token for the Arjun voice enrolment flow.
 *
 * The tool declarations live HERE, inside bidi_generate_content_setup, and not
 * in the browser's setup message. Two reasons: the token-bound setup is what the
 * service actually honours, and a tampered client must not be able to widen the
 * tool surface.
 *
 * Tokens are deliberately short (10 minutes, single use). The whole conversation
 * is designed to take about ninety seconds, and a long-lived token is a metered
 * resource someone else can spend.
 */

const { systemInstruction, TOOLS } = require('./_persona.js');

const GEMINI_MODEL = process.env.GEMINI_LIVE_MODEL || 'gemini-3.1-flash-live-preview';
const GEMINI_VOICE = process.env.GEMINI_LIVE_VOICE || 'Charon';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'not_configured', detail: 'GEMINI_API_KEY is not set on this deployment' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const lang = body && body.lang === 'en' ? 'en' : 'bn';

  const now = Date.now();
  const setup = {
    model: `models/${GEMINI_MODEL}`,
    generation_config: {
      response_modalities: ['AUDIO'],
      temperature: 0.35,
      speech_config: { voice_config: { prebuilt_voice_config: { voice_name: GEMINI_VOICE } } }
    },
    system_instruction: { parts: [{ text: systemInstruction(lang) }] },
    tools: [{ function_declarations: TOOLS }],
    session_resumption: {},
    input_audio_transcription: {},
    output_audio_transcription: {}
  };

  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1alpha/auth_tokens', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        uses: 1,
        expire_time: new Date(now + 10 * 60 * 1000).toISOString(),
        new_session_expire_time: new Date(now + 2 * 60 * 1000).toISOString(),
        bidi_generate_content_setup: setup
      })
    });

    const text = await r.text();
    if (!r.ok) {
      res.status(502).json({ error: 'token_failed', status: r.status, detail: text.slice(0, 400) });
      return;
    }

    const data = JSON.parse(text);
    const token = data.name || data.token;
    if (!token) {
      res.status(502).json({ error: 'no_token', detail: text.slice(0, 400) });
      return;
    }

    res.setHeader('cache-control', 'no-store');
    res.status(200).json({
      token,
      model: GEMINI_MODEL,
      websocketUrl:
        'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.' +
        'GenerativeService.BidiGenerateContentConstrained?access_token=' + encodeURIComponent(token)
    });
  } catch (err) {
    res.status(502).json({ error: 'token_failed', detail: String(err && err.message || err).slice(0, 300) });
  }
};
