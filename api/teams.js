const dbConnect = require('../lib/mongodb');
const Team = require('../models/Team');
const teamData = require('../team.json');

const DOMAIN_MAP = {
  iot: 'IOT',
  cybersecurity: 'Cyber Security',
  aiml: 'AIML',
  openinnovation: 'Open Innovation',
};

function getTeamScoresDefaults() {
  return {
    phase1: { marks: 0, submitted: false },
    phase2: { marks: 0, submitted: false },
    phase3: { marks: 0, submitted: false },
    phase4: { marks: 0, submitted: false },
  };
}

async function seedTeamsIfEmpty() {
  const count = await Team.estimatedDocumentCount();
  if (count > 0) return;

  const ops = [];
  for (const [key, names] of Object.entries(teamData)) {
    const domain = DOMAIN_MAP[key];
    if (!domain || !Array.isArray(names)) continue;

    for (const name of names) {
      if (!name) continue;
      ops.push({
        updateOne: {
          filter: { name, domain },
          update: {
            $setOnInsert: {
              name,
              domain,
              totalScore: 0,
              scores: getTeamScoresDefaults(),
            },
          },
          upsert: true,
        },
      });
    }
  }

  if (ops.length === 0) return;
  await Team.bulkWrite(ops, { ordered: false });
}

module.exports = async function handler(req, res) {
  // Support CORS/preflight and avoid Vercel returning 405 for OPTIONS requests.
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
    await seedTeamsIfEmpty();

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
            const marks = update && typeof update.marks !== "undefined" ? Number(update.marks) : 0;

            let team = null;
            if (update && update.id) {
              team = await Team.findById(update.id);
            } else if (update && update.name && update.domain) {
              team = await Team.findOne({ name: update.name, domain: update.domain });
            }

            if (team) {
              team.scores[phase] = {
                marks: Number.isFinite(marks) ? Math.max(0, Math.min(100, marks)) : 0,
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
    console.error('API /api/teams error:', error);
    return res.status(500).json({
      success: false,
      message: error && error.message ? error.message : 'Server error'
    });
  }
};
