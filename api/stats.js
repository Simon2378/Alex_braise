const { kv, kvPipeline, setCors, todayStr, checkPassword, isConfigured } = require('./_lib');

const SOURCES = ['qr', 'google', 'other'];

function daysAgoStr(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return todayStr(d);
}

function emptyCounts() {
  return { qr: 0, google: 0, other: 0, total: 0 };
}

function sumWindow(byDate, from, to) {
  const out = emptyCounts();
  Object.keys(byDate).forEach((date) => {
    if (date >= from && date <= to) {
      SOURCES.forEach((s) => { out[s] += byDate[date][s]; });
    }
  });
  out.total = out.qr + out.google + out.other;
  return out;
}

function emptyWindows() {
  const w = {};
  ['today', 'last7', 'last30', 'last90', 'last180', 'last365'].forEach((k) => { w[k] = emptyCounts(); });
  return w;
}

module.exports = async (req, res) => {
  setCors(res, 'GET');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkPassword(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!isConfigured) return res.status(200).json({ byDate: {}, windows: emptyWindows(), totals: emptyCounts(), configured: false });

  try {
    const dates = (await kv('SMEMBERS', 'scan:dates')) || [];

    if (dates.length === 0) {
      return res.status(200).json({ byDate: {}, windows: emptyWindows(), totals: emptyCounts(), configured: true });
    }

    const sortedDates = [...dates].sort();
    const commands = [];
    sortedDates.forEach((date) => {
      SOURCES.forEach((source) => commands.push(['GET', `scan:${source}:${date}`]));
    });

    const results = await kvPipeline(commands);

    const byDate = {};
    sortedDates.forEach((date, di) => {
      byDate[date] = {};
      SOURCES.forEach((source, si) => {
        const idx = di * SOURCES.length + si;
        const val = results[idx] && results[idx].result;
        byDate[date][source] = val ? parseInt(val, 10) || 0 : 0;
      });
    });

    const today = todayStr();
    const windows = {
      today: sumWindow(byDate, today, today),
      last7: sumWindow(byDate, daysAgoStr(6), today),
      last30: sumWindow(byDate, daysAgoStr(29), today),
      last90: sumWindow(byDate, daysAgoStr(89), today),
      last180: sumWindow(byDate, daysAgoStr(179), today),
      last365: sumWindow(byDate, daysAgoStr(364), today),
    };
    const totals = sumWindow(byDate, sortedDates[0], today);

    res.status(200).json({ byDate, windows, totals, configured: true });
  } catch (err) {
    res.status(500).json({ error: 'Stats error', detail: String(err && err.message || err) });
  }
};
