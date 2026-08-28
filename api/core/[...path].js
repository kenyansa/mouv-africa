const UPSTREAM_BASE = process.env.CORE_UPSTREAM_URL || 'https://app.mconnect.africa/core';

export default async function handler(req, res) {
  const segments = Array.isArray(req.query.path)
    ? req.query.path
    : String(req.query.path || '').split('/');
  const upstreamUrl = `${UPSTREAM_BASE}/${segments.filter(Boolean).join('/')}`;
  const skey = req.headers.skey || process.env.CORE_SKEY;
  const requestBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(skey ? { SKEY: skey } : {}),
      },
      body:
        req.method !== 'GET' && req.method !== 'HEAD' ? requestBody : undefined,
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
    console.error('Core proxy failed:', error);
    res.status(502).json({ error: 'Upstream request failed' });
  }
}
