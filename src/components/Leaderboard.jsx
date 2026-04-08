import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StarsBackground from "./StarsBackground";

const DOMAINS = ["All", "Cyber Security", "AIML", "IOT", "Open Innovation"];
const PHASES = ["phase1", "phase2", "phase3", "phase4"];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [teams, setTeams] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scores, setScores] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const auth = localStorage.getItem("leaderboardAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
    }
  }, [selectedDomain, isAuthenticated]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthenticating(true);

    try {
      // For local development, check env variable directly
      // For production, use API route
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocal) {
        // Local development - check against hardcoded value or env
        const expectedPassword = import.meta.env.VITE_LEADERBOARD_PASSWORD || "147258";
        if (password === expectedPassword) {
          localStorage.setItem("leaderboardAuth", "true");
          setIsAuthenticated(true);
        } else {
          setAuthError("Invalid password");
        }
      } else {
        // Production - use API route
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("leaderboardAuth", "true");
          setIsAuthenticated(true);
        } else {
          setAuthError("Invalid password");
        }
      }
    } catch (err) {
      setAuthError("Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const url = selectedDomain === "All"
        ? "/api/teams"
        : `/api/teams?domain=${selectedDomain}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTeams(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhaseSelect = (phase) => {
    setSelectedPhase(phase);
    const initialScores = {};
    teams.forEach(team => {
      initialScores[team._id] = team.scores[phase]?.marks || 0;
    });
    setScores(initialScores);
    setMessage({ type: "", text: "" });
  };

  const handleScoreChange = (teamId, value) => {
    setScores(prev => ({
      ...prev,
      [teamId]: value === "" ? "" : Math.max(0, Math.min(100, Number(value)))
    }));
  };

  const handleSavePhase = async () => {
    if (!selectedPhase || teams.length === 0) {
      setMessage({ type: "error", text: "Select a phase first" });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    const updates = teams.map(team => ({
      id: team._id,
      marks: scores[team._id] || 0
    }));

    try {
      const response = await fetch("/api/teams", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase: selectedPhase, updates })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setSelectedPhase(null);
        fetchTeams();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save scores" });
    } finally {
      setIsSaving(false);
    }
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <StarsBackground>
        <div className="min-h-screen flex-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="font-zentry text-3xl font-black text-blue-75 uppercase mb-2">
                Leaderboard Access
              </h2>
              <p className="text-blue-50/50 font-general text-sm">
                Enter password to view and manage scores
              </p>
            </div>

            <form onSubmit={handleAuth}>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-300 transition-colors"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10"
                  >
                    <p className="text-red-400 text-sm font-general text-center">
                      {authError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isAuthenticating || !password}
                className="w-full px-6 py-3 bg-violet-300 text-white font-general uppercase tracking-wider rounded-lg hover:bg-[#6b3fff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isAuthenticating ? "Verifying..." : "Access Leaderboard"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/")}
                className="text-blue-50/50 hover:text-blue-50 font-general text-sm transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </StarsBackground>
    );
  }

  return (
    <StarsBackground>
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-zentry text-4xl md:text-6xl font-black text-blue-75 uppercase mb-2">
              🏆 HackZion Leaderboard
            </h1>
            <p className="text-blue-50/50 font-general text-sm">
              Manage phase scores and view rankings
            </p>
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {DOMAINS.map(domain => (
              <button
                key={domain}
                onClick={() => { setSelectedDomain(domain); setSelectedPhase(null); }}
                className={`px-4 py-2 rounded-lg font-general text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDomain === domain
                    ? "bg-violet-300 text-white"
                    : "bg-white/5 text-blue-50/70 border border-white/10 hover:bg-white/10"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Phase Controls */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-general font-bold mb-4">Phase Management</h3>
            <div className="flex flex-wrap gap-3">
              {PHASES.map((phase, idx) => (
                <button
                  key={phase}
                  onClick={() => handlePhaseSelect(phase)}
                  className={`px-6 py-3 rounded-lg font-general uppercase tracking-wider transition-all cursor-pointer ${
                    selectedPhase === phase
                      ? "bg-yellow-300 text-gray-900 font-bold"
                      : "bg-violet-300/20 text-violet-300 border border-violet-300/50 hover:bg-violet-300/30"
                  }`}
                >
                  {selectedPhase === phase ? `✓ Editing ${phase.replace("phase", "Phase ")} ` : `Enter ${phase.replace("phase", "Phase ")}`}
                </button>
              ))}
            </div>
          </div>

          {/* Message Display */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-xl border ${
                  message.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                <p className="text-center font-general text-sm">{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score Entry or Leaderboard */}
          {selectedPhase ? (
            // Score Entry Mode
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="font-zentry text-2xl font-black text-yellow-300 uppercase">
                    {selectedDomain} - {selectedPhase.replace("phase", "Phase ")}
                  </h2>
                  <p className="text-blue-50/50 font-general text-sm mt-1">
                    {teams.length} teams | Enter scores and save
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPhase(null)}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-blue-50 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  View Leaderboard
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-blue-50 font-general text-xs uppercase">Team</th>
                      <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">Current Score</th>
                      <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">New Score (0-100)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teams.map((team) => (
                      <tr key={team._id} className="hover:bg-white/5">
                        <td className="px-6 py-4 text-white font-general font-medium">{team.name}</td>
                        <td className="px-6 py-4 text-center text-white font-general">
                          {team.scores[selectedPhase]?.marks || 0}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scores[team._id] || 0}
                            onChange={(e) => handleScoreChange(team._id, e.target.value)}
                            className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center focus:outline-none focus:border-violet-300 mx-auto block"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-white/10">
                <button
                  onClick={handleSavePhase}
                  disabled={isSaving}
                  className="w-full px-6 py-4 bg-yellow-300 text-gray-900 font-general uppercase tracking-wider rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-lg font-bold"
                >
                  {isSaving ? "💾 Saving..." : `💾 Save ${selectedPhase.replace("phase", "Phase ")} Scores`}
                </button>
              </div>
            </div>
          ) : (
            // Leaderboard View Mode
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center text-violet-300 font-general">Loading...</div>
              ) : teams.length === 0 ? (
                <div className="p-12 text-center text-blue-50/50 font-general">No teams found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-blue-50 font-general text-xs uppercase">Rank</th>
                        <th className="px-6 py-4 text-left text-blue-50 font-general text-xs uppercase">Team</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">Domain</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">P1</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">P2</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">P3</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">P4</th>
                        <th className="px-6 py-4 text-center text-blue-50 font-general text-xs uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {teams.map((team, index) => (
                        <tr
                          key={team._id}
                          className={`hover:bg-white/5 ${
                            index < 3 ? "bg-gradient-to-r from-yellow-300/10 to-transparent" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-2xl">
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                          </td>
                          <td className="px-6 py-4 text-white font-general font-bold">{team.name}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 bg-violet-300/20 text-violet-300 rounded-full text-xs">
                              {team.domain}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-white">{team.scores.phase1.marks || 0}</td>
                          <td className="px-6 py-4 text-center text-white">{team.scores.phase2.marks || 0}</td>
                          <td className="px-6 py-4 text-center text-white">{team.scores.phase3.marks || 0}</td>
                          <td className="px-6 py-4 text-center text-white">{team.scores.phase4.marks || 0}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-yellow-300 font-black text-xl">{team.totalScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/5 border border-white/10 text-blue-50 font-general uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </StarsBackground>
  );
};

export default Leaderboard;
