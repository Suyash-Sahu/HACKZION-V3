const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true,
    enum: ['Cyber Security', 'AIML', 'IOT', 'Open Innovation']
  },
  scores: {
    phase1: {
      marks: { type: Number, default: 0 },
      submitted: { type: Boolean, default: false }
    },
    phase2: {
      marks: { type: Number, default: 0 },
      submitted: { type: Boolean, default: false }
    },
    phase3: {
      marks: { type: Number, default: 0 },
      submitted: { type: Boolean, default: false }
    },
    phase4: {
      marks: { type: Number, default: 0 },
      submitted: { type: Boolean, default: false }
    }
  },
  totalScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total score before saving
teamSchema.pre('save', function(next) {
  this.totalScore = 
    (this.scores.phase1.marks || 0) +
    (this.scores.phase2.marks || 0) +
    (this.scores.phase3.marks || 0) +
    (this.scores.phase4.marks || 0);
  next();
});

module.exports = mongoose.models.Team || mongoose.model('Team', teamSchema);
