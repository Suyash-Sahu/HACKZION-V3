import dbConnect from '../../lib/mongodb.js';
import Team from '../../models/Team.js';

export default async function handler(req, res) {
  // Support CORS/preflight and avoid 405s on OPTIONS.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { method } = req;

    // Ensure DB connection errors are returned as JSON.
    await dbConnect();

    switch (method) {
      case 'GET': {
        try {
          const { domain } = req.query;
          const filter = domain && domain !== 'All' ? { domain } : {};

          const teams = await Team.find(filter)
            .sort({ totalScore: -1, createdAt: 1 });

          return res.status(200).json({ success: true, data: teams });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message || 'Failed to load teams' });
        }
      }

      case 'PUT': {
        try {
          const { phase, updates } = req.body;

          if (!phase || !updates || !Array.isArray(updates)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid request format'
            });
          }

          const validPhases = ['phase1', 'phase2', 'phase3', 'phase4'];
          if (!validPhases.includes(phase)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid phase'
            });
          }

          const updatePromises = updates.map(async (update) => {
            const team = await Team.findById(update.id);
            if (team) {
              team.scores[phase] = {
                marks: update.marks || 0,
                submitted: true
              };
              await team.save();
              return team;
            }
            return null;
          });

          const updatedTeams = (await Promise.all(updatePromises)).filter(t => t !== null);

          return res.status(200).json({
            success: true,
            message: `Successfully updated ${updatedTeams.length} teams for ${phase}`,
            data: updatedTeams
          });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message || 'Failed to update teams' });
        }
      }

      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error && error.message ? error.message : 'Server error'
    });
  }
}
