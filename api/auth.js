module.exports = async function handler(req, res) {
  // Support CORS/preflight and avoid Vercel returning 405 for OPTIONS requests.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  let password = req.body && req.body.password;
  // In some runtimes, body can arrive as a raw string; handle that defensively.
  if (!password && typeof req.body === "string") {
    try {
      const parsed = JSON.parse(req.body);
      password = parsed && parsed.password;
    } catch (_) {
      // ignore parse errors; handled by validation below
    }
  }

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  // Hardcoded password check
  const expectedPassword = process.env.LEADERBOARD_PASSWORD || "147258";
  const receivedPassword = typeof password === "number" ? String(password) : password;

  if (receivedPassword === expectedPassword) {
    res.status(200).json({ 
      success: true, 
      message: 'Authentication successful' 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
};
