// Shared helpers for the serverless functions in this folder.
// Uses Upstash Redis's plain REST API (what Vercel's KV/"Upstash for
// Redis" storage integration provisions) via fetch, so no extra npm
// dependency is needed. Works with either the "Vercel KV"-branded env
// var names or the raw Upstash ones, whichever the integration sets.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const isConfigured = Boolean(KV_URL && KV_TOKEN);

// Single command, e.g. kv('INCR', 'some:key')
async function kv(...command) {
  if (!isConfigured) throw new Error('KV not configured');
  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`KV error ${res.status}`);
  const data = await res.json();
  return data.result;
}

// Many commands in one round trip, e.g. kvPipeline([['GET','a'],['GET','b']])
async function kvPipeline(commands) {
  if (!isConfigured) throw new Error('KV not configured');
  if (commands.length === 0) return [];
  const res = await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`KV pipeline error ${res.status}`);
  return res.json();
}

function setCors(res, methods) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', `${methods}, OPTIONS`);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

function todayStr(d) {
  return (d || new Date()).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

function checkPassword(req) {
  const provided = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && provided === expected;
}

module.exports = { kv, kvPipeline, setCors, todayStr, checkPassword, isConfigured };
