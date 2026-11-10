const { kv, kvPipeline, setCors, todayStr, checkPassword, isConfigured } = require('./_lib');

// Returns raw per-day counters; the admin dashboard does all the
// aggregation (windows, chart buckets, comparisons) client-side from this.
module.exports = async (req, res) => {
  setCors(res, 'GET');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkPassword(req)) return res.status(401).json({ error: 'Unauthorized' });

  const today = todayStr();

  if (!isConfigured) {
    return res.status(200).json({ days: {}, start: today, today, configured: false });
  }

  try {
    const dates = (await kv('SMEMBERS', 'visit:dates')) || [];

    if (dates.length === 0) {
      return res.status(200).json({ days: {}, start: today, today, configured: true });
    }

    const sortedDates = [...dates].sort();
    const commands = sortedDates.map((d) => ['HGETALL', `day:${d}`]);
    const results = await kvPipeline(commands);

    const days = {};
    sortedDates.forEach((date, i) => {
      const flat = (results[i] && results[i].result) || [];
      const day = { s: {}, p: {}, l: {} };
      for (let j = 0; j < flat.length; j += 2) {
        const field = flat[j];
        const value = parseInt(flat[j + 1], 10) || 0;
        const dot = field.indexOf('.');
        if (dot === -1) continue;
        const cat = field.slice(0, dot);
        const sub = field.slice(dot + 1);
        if (day[cat]) day[cat][sub] = value;
      }
      days[date] = day;
    });

    res.status(200).json({ days, start: sortedDates[0], today, configured: true });
  } catch (err) {
    res.status(500).json({ error: 'Stats error', detail: String((err && err.message) || err) });
  }
};
