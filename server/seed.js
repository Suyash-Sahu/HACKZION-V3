const mongoose = require('mongoose');
const Team = require('./models/Team');
require('dotenv').config();

const teamsData = [
  // Cyber Security Teams
  { name: "CyberWarriors", domain: "Cyber Security" },
  { name: "SecureNet", domain: "Cyber Security" },
  { name: "FirewallFusion", domain: "Cyber Security" },
  { name: "CryptoGuardians", domain: "Cyber Security" },
  { name: "ThreatHunters", domain: "Cyber Security" },
  { name: "ByteDefenders", domain: "Cyber Security" },
  { name: "ShieldSquad", domain: "Cyber Security" },
  { name: "CodeBreakers", domain: "Cyber Security" },
  { name: "EthicalHackers", domain: "Cyber Security" },
  { name: "VulnValidators", domain: "Cyber Security" },
  { name: "PenTestPros", domain: "Cyber Security" },
  { name: "DataProtectors", domain: "Cyber Security" },
  { name: "ZeroDayZeros", domain: "Cyber Security" },
  { name: "NetworkNinjas", domain: "Cyber Security" },

  // AIML Teams
  { name: "NeuralNinjas", domain: "AIML" },
  { name: "DeepLearningDynasty", domain: "AIML" },
  { name: "AIAlchemists", domain: "AIML" },
  { name: "ModelMasters", domain: "AIML" },
  { name: "DataScientists", domain: "AIML" },
  { name: "SmartAlgorithms", domain: "AIML" },
  { name: "PredictivePioneers", domain: "AIML" },
  { name: "VisionaryAI", domain: "AIML" },
  { name: "CognitiveCoders", domain: "AIML" },
  { name: "MLMavericks", domain: "AIML" },
  { name: "NeuralNetworkers", domain: "AIML" },
  { name: "AIArchitects", domain: "AIML" },
  { name: "DataDriven", domain: "AIML" },
  { name: "MachineMinds", domain: "AIML" },
  { name: "TensorFlow Titans", domain: "AIML" },

  // IOT Teams
  { name: "IoTInnovators", domain: "IOT" },
  { name: "SmartDevices", domain: "IOT" },
  { name: "ConnectedCreators", domain: "IOT" },
  { name: "SensorSquad", domain: "IOT" },
  { name: "EmbeddedExperts", domain: "IOT" },
  { name: "HardwareHackers", domain: "IOT" },
  { name: "AutomationArmy", domain: "IOT" },
  { name: "SmartHomeHeroes", domain: "IOT" },
  { name: "CircuitBreakers", domain: "IOT" },
  { name: "IoTSolutions", domain: "IOT" },
  { name: "DeviceDoctors", domain: "IOT" },
  { name: "EdgeComputers", domain: "IOT" },
  { name: "SensorSavvy", domain: "IOT" },
  { name: "RoboRevolution", domain: "IOT" },
  { name: "TechTinkerers", domain: "IOT" },

  // Open Innovation Teams
  { name: "InnovationKings", domain: "Open Innovation" },
  { name: "CreativeCoders", domain: "Open Innovation" },
  { name: "SolutionSeekers", domain: "Open Innovation" },
  { name: "TechPioneers", domain: "Open Innovation" },
  { name: "DigitalDisruptors", domain: "Open Innovation" },
  { name: "CodeCrafters", domain: "Open Innovation" },
  { name: "FutureBuilders", domain: "Open Innovation" },
  { name: "IdeaImplementers", domain: "Open Innovation" },
  { name: "ProblemSolvers", domain: "Open Innovation" },
  { name: "VisionaryDevs", domain: "Open Innovation" },
  { name: "StartupSprinters", domain: "Open Innovation" },
  { name: "AgileAdapters", domain: "Open Innovation" },
  { name: "RapidPrototypers", domain: "Open Innovation" },
  { name: "InnovationStation", domain: "Open Innovation" },
  { name: "TechTitans", domain: "Open Innovation" },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Team.deleteMany({});
    console.log('🗑️  Cleared existing teams');

    // Insert new teams
    const teams = await Team.insertMany(teamsData);
    console.log(`✅ Successfully seeded ${teams.length} teams`);

    // Display summary by domain
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
