export default async function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    message: 'HackZion Leaderboard API is running on Vercel' 
  });
}
