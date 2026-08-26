const UPSTREAM_BASE = process.env.CORE_UPSTREAM_URL || 'https://app.mconnect.africa/core';

export default async function handler(req, res) {
  const segments = Array.isArray(req.query.path) ? req.query.path : [req.query.path];
  const upstreamUrl = `${UPSTREAM_BASE}/${segments.filter(Boolean).join('/')}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.skey ? { SKEY: req.headers.skey } : {}),
      },
      body:
        req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body ?? {}) : undefined,
    });

    const contentType = upstreamResponse.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await upstreamResponse.json();
      res.status(upstreamResponse.status).json(data);
    } else {
      const text = await upstreamResponse.text();
      res.status(upstreamResponse.status).send(text);
    }
  } catch (error) {
    res.status(502).json({ error: 'Upstream request failed', detail: String(error) });
  }
}
