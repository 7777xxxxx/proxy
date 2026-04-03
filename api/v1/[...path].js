export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const path = req.query.path ? req.query.path.join('/') : '';
    const targetUrl = `https://openrouter.ai/api/v1/${path}`;

    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers['authorization'] || '',
          'HTTP-Referer': 'https://openrouter.ai',
          'X-Title': 'Cherry Studio',
        },
        body: req.method !== 'GET' && req.method !== 'HEAD'
          ? JSON.stringify(req.body)
          : undefined,
      });

      const data = await response.text();
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
