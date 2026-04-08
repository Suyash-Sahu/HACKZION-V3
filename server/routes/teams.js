const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authMiddleware = require('../middleware/auth');

// Get all teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().sort({ totalScore: -1 });
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get teams by domain
router.get('/teams/:domain', async (req, res) => {
  try {
    const teams = await Team.find({ domain: req.params.domain })
      .sort({ totalScore: -1 });
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get leaderboard (sorted by total score)
router.get('/leaderboard', async (req, res) => {
  try {
    const { domain } = req.query;
    const filter = domain ? { domain } : {};
    
    const teams = await Team.find(filter)
      .sort({ totalScore: -1, createdAt: 1 });
    
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bulk save phase scores (protected route)
router.put('/save-phase', authMiddleware, async (req, res) => {
  try {
    const { phase, updates } = req.body;

    if (!phase || !updates || !Array.isArray(updates)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request format. Required: { phase, updates: [{ id, marks }] }' 
      });
    }

    const validPhases = ['phase1', 'phase2', 'phase3', 'phase4'];
    if (!validPhases.includes(phase)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phase. Must be: phase1, phase2, phase3, or phase4' 
      });
    }

    // Update all teams in the updates array
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

    const updatedTeams = await Promise.all(updatePromises);
    const filteredTeams = updatedTeams.filter(team => team !== null);

    res.json({ 
      success: true, 
      message: `Successfully updated ${filteredTeams.length} teams for ${phase}`,
      data: filteredTeams 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update single team score (protected route)
router.put('/team/:id/score', authMiddleware, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    const { phase, marks } = req.body;
    
    if (!phase || marks === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phase and marks are required' 
      });
    }

    team.scores[phase] = {
      marks: Number(marks),
      submitted: true
    };

    await team.save();
    
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new team (protected route)
router.post('/team', authMiddleware, async (req, res) => {
  try {
    const { name, domain } = req.body;

    if (!name || !domain) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team name and domain are required' 
      });
    }

    const team = new Team({ name, domain });
    await team.save();

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete team (protected route)
router.delete('/team/:id', authMiddleware, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    
    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    res.json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
