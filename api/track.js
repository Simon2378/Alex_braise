const { kv, setCors, todayStr, isConfigured } = require('./_lib');

const ALLOWED_PAGES = ['home', 'menu'];

// QR scans are tagged explicitly (?src=qr). Everything else is classified
// from the referrer's hostname. A referrer-less visit to the homepage is
// also counted as a probable scan (typed URL or QR reader that drops the
// query string) — there is no better way to tell the two apart.
function classifySource(ref, qr, page) {
  if (qr) return 'qr';
  if (!ref) return page === 'home' ? 'qr' : 'direct';
  const r = String(ref).toLowerCase();
  if (r.includes('google.')) return 'google';
  if (r.includes('bing.') || r.includes('yahoo.') || r.includes('duckduckgo.') || r.includes('yandex.')) return 'search';
  if (r.includes('facebook.com') || r.includes('fb.com')) return 'facebook';
  if (r.includes('instagram.com')) return 'instagram';
  if (r.includes('tiktok.com')) return 'tiktok';
  if (r.includes('whatsapp.com') || r.includes('wa.me')) return 'whatsapp';
  if (r.includes('twitter.com') || r.includes('x.com') || r.includes('linkedin.com') || r.includes('pinterest.')) return 'social';
  return 'website';
}

module.exports = async (req, res) => {
  setCors(res, 'POST');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isConfigured) return res.status(200).json({ ok: false, reason: 'storage not configured' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const page = ALLOWED_PAGES.includes(body?.page) ? body.page : 'home';
  const ref = typeof body?.ref === 'string' ? body.ref.slice(0, 200) : '';
  const qr = Boolean(body?.qr);
  const source = classifySource(ref, qr, page);
  const date = todayStr();
  const key = `day:${date}`;

  try {
    await kv('HINCRBY', key, `s.${source}`, 1);
    await kv('HINCRBY', key, `p.${page}`, 1);
    if (source !== 'qr') await kv('HINCRBY', key, `l.${page}`, 1);
    await kv('SADD', 'visit:dates', date);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ ok: false });
  }
};
