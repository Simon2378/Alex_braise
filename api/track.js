const { kv, setCors, todayStr, isConfigured } = require('./_lib');

const ALLOWED_SOURCES = ['qr', 'google', 'other'];

module.exports = async (req, res) => {
  setCors(res, 'POST');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isConfigured) return res.status(200).json({ ok: false, reason: 'storage not configured' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const source = ALLOWED_SOURCES.includes(body?.source) ? body.source : 'other';
  const today = todayStr();

  try {
    await kv('INCR', `scan:${source}:${today}`);
    await kv('SADD', 'scan:dates', today);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false });
  }
};
