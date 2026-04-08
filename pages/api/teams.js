import dbConnect from '../../lib/mongodb.js';
import Team from '../../models/Team.js';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { domain } = req.query;
        const filter = domain && domain !== 'All' ? { domain } : {};
        
        const teams = await Team.find(filter)
          .sort({ totalScore: -1, createdAt: 1 });
        
        res.status(200).json({ success: true, data: teams });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
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

        res.status(200).json({
          success: true,
          message: `Successfully updated ${updatedTeams.length} teams for ${phase}`,
          data: updatedTeams
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
