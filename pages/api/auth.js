export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  // Hardcoded password check
  if (password === process.env.LEADERBOARD_PASSWORD) {
    res.status(200).json({ 
      success: true, 
      message: 'Authentication successful' 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
}
