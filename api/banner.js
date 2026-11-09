const { kv, setCors, checkPassword, isConfigured } = require('./_lib');

module.exports = async (req, res) => {
  setCors(res, 'GET, POST');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    if (!isConfigured) return res.status(200).json({ fr: '', en: '' });
    try {
      const raw = await kv('GET', 'banner:text');
      const data = raw ? JSON.parse(raw) : { fr: '', en: '' };
      return res.status(200).json({ fr: data.fr || '', en: data.en || '' });
    } catch (err) {
      return res.status(200).json({ fr: '', en: '' });
    }
  }

  if (req.method === 'POST') {
    if (!checkPassword(req)) return res.status(401).json({ error: 'Unauthorized' });
    if (!isConfigured) return res.status(500).json({ error: 'Storage not configured' });

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    const fr = typeof body?.fr === 'string' ? body.fr.trim() : '';
    const en = typeof body?.en === 'string' ? body.en.trim() : '';

    try {
      await kv('SET', 'banner:text', JSON.stringify({ fr, en }));
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: 'Storage error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
