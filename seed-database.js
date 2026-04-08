// Run this script locally to seed your MongoDB database
// Usage: node seed-database.js
// Make sure to create a .env file with MONGODB_URI first

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const teamsData = [
  // Cyber Security Teams (13 teams)
  { name: "BinaryBrains", domain: "Cyber Security" },
  { name: "Algorithmics", domain: "Cyber Security" },
  { name: "Vervain", domain: "Cyber Security" },
  { name: "Crib exchanges", domain: "Cyber Security" },
  { name: "Team Dhurandhar", domain: "Cyber Security" },
  { name: "4code", domain: "Cyber Security" },
  { name: "Firewall", domain: "Cyber Security" },
  { name: "Devrush", domain: "Cyber Security" },
  { name: "InnoX", domain: "Cyber Security" },
  { name: "Space syntax", domain: "Cyber Security" },
  { name: "CodeX", domain: "Cyber Security" },
  { name: "Hack-It-Up", domain: "Cyber Security" },
  { name: "Code crafters", domain: "Cyber Security" },

  // AIML Teams (15 teams)
  { name: "Tokenizers", domain: "AIML" },
  { name: "Neural Knights", domain: "AIML" },
  { name: "Team SPY", domain: "AIML" },
  { name: "BYTE_FORCE", domain: "AIML" },
  { name: "Hackzemon", domain: "AIML" },
  { name: "Spiddy", domain: "AIML" },
  { name: "Team Prajna", domain: "AIML" },
  { name: "BrainStack", domain: "AIML" },
  { name: "CodeShinobis", domain: "AIML" },
  { name: "VitalSync", domain: "AIML" },
  { name: "INNOVISION", domain: "AIML" },
  { name: "WAKANDA'S VISION", domain: "AIML" },
  { name: "VISIONAUTS", domain: "AIML" },
  { name: "RRCE auralyx", domain: "AIML" },
  { name: "Chokepoint", domain: "AIML" },

  // IOT Teams (8 teams)
  { name: "Vision X", domain: "IOT" },
  { name: "Teamcursor101", domain: "IOT" },
  { name: "team Blenders", domain: "IOT" },
  { name: "Event Horizon", domain: "IOT" },
  { name: "Incredia", domain: "IOT" },
  { name: "TEAM CRUSADERS", domain: "IOT" },
  { name: "Rhythm", domain: "IOT" },
  { name: "IoT Legion's", domain: "IOT" },

  // Open Innovation Teams (14 teams)
  { name: "VulnixAI", domain: "Open Innovation" },
  { name: "CodeVortex", domain: "Open Innovation" },
  { name: "CODEBLASTERS", domain: "Open Innovation" },
  { name: "Hexel Studio", domain: "Open Innovation" },
  { name: "Team DSA", domain: "Open Innovation" },
  { name: "Mossaic", domain: "Open Innovation" },
  { name: "Code Ninjas", domain: "Open Innovation" },
  { name: "SheSquad", domain: "Open Innovation" },
  { name: "Hackoholics", domain: "Open Innovation" },
  { name: "Triveni", domain: "Open Innovation" },
  { name: "VibeCoders", domain: "Open Innovation" },
  { name: "TECH KANNADIGAS", domain: "Open Innovation" },
  { name: "Code Blazers", domain: "Open Innovation" },
  { name: "Solace", domain: "Open Innovation" },
];

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  domain: { type: String, required: true, enum: ['Cyber Security', 'AIML', 'IOT', 'Open Innovation'] },
  scores: {
    phase1: { marks: { type: Number, default: 0 }, submitted: { type: Boolean, default: false } },
    phase2: { marks: { type: Number, default: 0 }, submitted: { type: Boolean, default: false } },
    phase3: { marks: { type: Number, default: 0 }, submitted: { type: Boolean, default: false } },
    phase4: { marks: { type: Number, default: 0 }, submitted: { type: Boolean, default: false } }
  },
  totalScore: { type: Number, default: 0 }
}, { timestamps: true });

teamSchema.pre('save', function(next) {
  this.totalScore = 
    (this.scores.phase1.marks || 0) +
    (this.scores.phase2.marks || 0) +
    (this.scores.phase3.marks || 0) +
    (this.scores.phase4.marks || 0);
  next();
});

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Team.deleteMany({});
    console.log('🗑️  Cleared existing teams');

    // Insert new teams
    const teams = await Team.insertMany(teamsData);
    console.log(`✅ Successfully seeded ${teams.length} teams`);

    // Display summary
    const summary = teams.reduce((acc, team) => {
      acc[team.domain] = (acc[team.domain] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 Domain Summary:');
    Object.entries(summary).forEach(([domain, count]) => {
      console.log(`  ${domain}: ${count} teams`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
