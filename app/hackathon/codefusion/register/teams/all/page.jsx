"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Download, Trophy, Star, TrendingUp } from "lucide-react";

export default function TeamsListPage() {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationNumber, setCelebrationNumber] = useState(null);
  const [teams, setTeams] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [colleges, setColleges] = useState([]);
  const [domains, setDomains] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc"
  });

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    ap: 0,
    tn: 0,
    tg: 0,
    college3: 0,
    college4: 0,
    totalColleges: 0,
    domainStats: {}
  });

  const normalizeCollege = (collegeName) => {
    return collegeName?.trim().toLowerCase() || "";
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
      const storedAdminName = localStorage.getItem("adminName");

      if (isAuthenticated !== "true") {
        router.push("/hackathon/codefusion/register/teams");
        return false;
      }

      setAdminName(storedAdminName || "Admin");
      setIsAuthChecking(false);
      return true;
    };

    const isAuth = checkAuthentication();
    if (isAuth) {
      fetchTeams();
    }
  }, [router]);

  const fetchTeams = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://rd-backend-m7gd.onrender.com/api/teams/all"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const teamsData = data.teams || [];
        setTeams(teamsData);
        setTotalCount(data.count || 0);

        const collegeMap = new Map();
        teamsData.forEach(team => {
          const collegeName = team.leader?.college;
          if (collegeName) {
            const normalized = normalizeCollege(collegeName);
            if (!collegeMap.has(normalized)) {
              collegeMap.set(normalized, collegeName);
            }
          }
        });

        const uniqueColleges = Array.from(collegeMap.values()).sort();
        setColleges(uniqueColleges);

        const domainSet = new Set();
        teamsData.forEach(team => {
          if (team.problemStatement) {
            domainSet.add(team.problemStatement);
          }
        });
        setDomains(Array.from(domainSet).sort());

        calculateStats(teamsData);
        console.log("Fetched teams:", teamsData);
      } else {
        throw new Error("Failed to fetch teams data");
      }
    } catch (err) {
      setError(err.message || "Failed to load teams. Please try again.");
      console.error("Error fetching teams:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (teamsData) => {
    const collegeSet = new Set();
    const domainCounts = {};

    teamsData.forEach(team => {
      if (team.leader?.college) {
        collegeSet.add(normalizeCollege(team.leader.college));
      }
      if (team.problemStatement) {
        domainCounts[team.problemStatement] = (domainCounts[team.problemStatement] || 0) + 1;
      }
    });

    const totalTeams = teamsData.length;

    setStats({
      total: totalTeams,
      ap: totalTeams - 10,
      tn: 3,
      tg: 7,
      college3: teamsData.filter(t => t.teamSize == 3).length,
      college4: teamsData.filter(t => t.teamSize == 4).length,
      totalColleges: collegeSet.size,
      domainStats: domainCounts
    });

    // 🎉 CELEBRATION CHECK
    let milestone = null;
    if (totalTeams >= 100 && totalTeams <= 105) milestone = 100;
    else if (totalTeams >= 150 && totalTeams <= 155) milestone = 150;
    else if (totalTeams >= 200 && totalTeams <= 205) milestone = 200;
    else if (totalTeams >= 300 && totalTeams <= 305) milestone = 300;

    if (milestone) {
      setCelebrationNumber(milestone);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 8000);
    }
  };

  const downloadStatisticsAsPDF = () => {
    let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CodeFusion Statistics Report</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      padding: 40px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    h1 { 
      color: #002147; 
      border-bottom: 3px solid #002147; 
      padding-bottom: 10px;
    }
    .stat-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 20px; 
      margin: 20px 0;
    }
    .stat-box { 
      padding: 20px; 
      background: #f8f9fa; 
      border-left: 4px solid #002147; 
      border-radius: 5px;
    }
    .stat-label { 
      font-size: 14px; 
      color: #666; 
      margin-bottom: 5px;
    }
    .stat-value { 
      font-size: 32px; 
      font-weight: bold; 
      color: #002147;
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 20px 0;
    }
    th, td { 
      padding: 12px; 
      text-align: left; 
      border-bottom: 1px solid #ddd;
    }
    th { 
      background: #002147; 
      color: white; 
      font-weight: bold;
    }
    tr:hover { background: #f5f5f5; }
    .footer { 
      margin-top: 30px; 
      text-align: center; 
      color: #666; 
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 CodeFusion 2026</h1>
    <h2>Dashboard Statistics Report</h2>
    <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
    
    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-label">Total Teams</div>
        <div class="stat-value">${stats.total}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Total Colleges</div>
        <div class="stat-value">${stats.totalColleges}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">3 Members Teams</div>
        <div class="stat-value">${stats.college3}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">4 Members Teams</div>
        <div class="stat-value">${stats.college4}</div>
      </div>
    </div>

    <h3>🗺️ State-wise Distribution</h3>
    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-label">Andhra Pradesh</div>
        <div class="stat-value">${stats.ap}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Tamil Nadu</div>
        <div class="stat-value">${stats.tn}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Telangana</div>
        <div class="stat-value">${stats.tg}</div>
      </div>
    </div>

    <h3>🏫 Colleges Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>College Name</th>
          <th>Number of Teams</th>
        </tr>
      </thead>
      <tbody>
        ${colleges.map(college => {
          const count = teams.filter(t => normalizeCollege(t.leader?.college) === normalizeCollege(college)).length;
          return `<tr>
            <td>${college}</td>
            <td><strong>${count}</strong></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>

    <h3>💡 Domain-wise Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>Problem Domain</th>
          <th>Number of Teams</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(stats.domainStats).map(([domain, count]) => {
          return `<tr>
            <td>${domain}</td>
            <td><strong>${count}</strong></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>

    <div class="footer">
      <p>Generated on ${new Date().toLocaleString()}</p>
      <p><strong>CodeFusion 2026 - Dashboard Statistics</strong></p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Statistics_${new Date().toISOString().split('T')[0]}.pdf`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);

    const printWindow = window.open(url, "_blank");
    setTimeout(() => {
      printWindow.print();
    }, 250);

    document.body.removeChild(link);
  };

  const downloadTeamsAsExcel = () => {
    let csvContent = "CODEFUSION TEAMS DETAILS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    csvContent += "Team Name,Registration ID,Team Size,Leader Name,Leader Email,Leader Phone,Leader College,Leader Department,Leader Year,Member2 Name,Member2 Email,Member2 Phone,Member3 Name,Member3 Email,Member3 Phone,Member4 Name,Member4 Email,Member4 Phone,Registered On,Problem Statement\n";

    sortedTeams.forEach(team => {
      const registeredDate = new Date(team.createdAt).toLocaleDateString();
      const member2Name = team.teamSize >= 2 ? (team.members?.member2?.name || "—") : "—";
      const member2Email = team.teamSize >= 2 ? (team.members?.member2?.email || "—") : "—";
      const member2Phone = team.teamSize >= 2 ? (team.members?.member2?.phone || "—") : "—";
      const member3Name = team.teamSize >= 3 ? (team.members?.member3?.name || "—") : "—";
      const member3Email = team.teamSize >= 3 ? (team.members?.member3?.email || "—") : "—";
      const member3Phone = team.teamSize >= 3 ? (team.members?.member3?.phone || "—") : "—";
      const member4Name = team.teamSize >= 4 ? (team.members?.member4?.name || "—") : "—";
      const member4Email = team.teamSize >= 4 ? (team.members?.member4?.email || "—") : "—";
      const member4Phone = team.teamSize >= 4 ? (team.members?.member4?.phone || "—") : "—";

      csvContent += `"${team.teamName}","${team.registrationId}",${team.teamSize},"${team.leader?.name || "—"}","${team.leader?.email || "—"}","${team.leader?.phone || "—"}","${team.leader?.college || "—"}","${team.leader?.department || "—"}","${team.leader?.year || "—"}","${member2Name}","${member2Email}","${member2Phone}","${member3Name}","${member3Email}","${member3Phone}","${member4Name}","${member4Email}","${member4Phone}","${registeredDate}","${team.problemStatement}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Teams_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminName");
    localStorage.removeItem("loginTimestamp");
    router.push("/hackathon/codefusion/register/teams");
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCollege = selectedCollege === "all" ||
      normalizeCollege(team.leader?.college) === normalizeCollege(selectedCollege);

    const matchesDomain = selectedDomain === "all" ||
      team.problemStatement === selectedDomain;

    return matchesSearch && matchesCollege && matchesDomain;
  });

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    }

    if (typeof aVal === "string") {
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#002147] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-pink-900/95 backdrop-blur-md pointer-events-none overflow-hidden">
          {/* 🎊 ENHANCED CONFETTI */}
          {[...Array(100)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7", "#FF85C1", "#00D9FF"][Math.floor(Math.random() * 7)],
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                opacity: 0.8 + Math.random() * 0.2,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}

          {/* ⭐ SPARKLE STARS */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-yellow-300 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${1 + Math.random()}s`,
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
              }}
            >
              ⭐
            </div>
          ))}

          {/* 🎆 FIREWORKS PARTICLES */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`firework-${i}`}
              className="absolute w-2 h-2 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                background: `radial-gradient(circle, ${["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD93D"][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1.5 + Math.random()}s`,
                boxShadow: `0 0 20px ${["#FFD700", "#FF6B6B", "#4ECDC4", "#FFD93D"][Math.floor(Math.random() * 4)]}`
              }}
            />
          ))}

          {/* 🏆 CENTER CELEBRATION CARD */}
          <div className="relative z-10 text-center">
            {/* Trophy Icon */}
            <div className="flex justify-center mb-6 animate-bounce">
              <div className="relative">
                <Trophy className="w-32 h-32 text-yellow-400 drop-shadow-2xl" strokeWidth={1.5} />
                <div className="absolute inset-0 animate-ping">
                  <Trophy className="w-32 h-32 text-yellow-300 opacity-40" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Main Number with Glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-50 animate-pulse"></div>
              <div className="relative text-[180px] font-black bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl leading-none animate-scale-in">
                {celebrationNumber}
              </div>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 mb-8">
              <div className="text-5xl font-bold text-white drop-shadow-lg animate-slide-up">
                TEAMS REGISTERED! 🎉
              </div>
              <div className="text-2xl font-semibold text-yellow-300 drop-shadow-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Incredible Milestone Achieved!
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-yellow-400/50 rounded-full px-8 py-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-spin-slow" />
              <span className="text-xl font-bold text-white">LEGENDARY STATUS</span>
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-spin-slow" />
            </div>

            {/* Progress Ring */}
            <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset="0"
                    className="animate-draw-circle"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#FF6B6B" />
                      <stop offset="100%" stopColor="#4ECDC4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-sm text-yellow-300 font-semibold">COMPLETE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Animations */}
          <style jsx>{`
            @keyframes fall {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
              }
            }
            @keyframes scale-in {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            @keyframes slide-up {
              0% {
                transform: translateY(30px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes fade-in {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            @keyframes spin-slow {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            @keyframes draw-circle {
              0% {
                stroke-dashoffset: ${2 * Math.PI * 88};
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            .animate-fall {
              animation: fall linear infinite;
            }
            .animate-scale-in {
              animation: scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            .animate-slide-up {
              animation: slide-up 0.6s ease-out forwards;
            }
            .animate-fade-in {
              animation: fade-in 0.8s ease-out forwards;
            }
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
            .animate-draw-circle {
              animation: draw-circle 2s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-[1800px]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#002147] via-[#003366] to-[#002147] px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">CodeFusion Dashboard</h1>
                <p className="text-blue-200 text-lg">Welcome, {adminName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Live Status</h2>
              <button
                onClick={fetchTeams}
                disabled={isLoading}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Refresh
                  </>
                )}
              </button>
            </div>

            {/* 🚀 ELITE MILESTONE BANNER (150-200) */}
            {stats.total >= 150 && stats.total < 200 && (
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-xl shadow-xl mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-purple-200 mb-1">ELITE STAGE REACHED</div>
                    <div className="text-3xl font-black mb-2">{stats.total} Teams Registered</div>
                    <div className="text-purple-200">Target: 200 • {Math.round((stats.total / 200) * 100)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-200 mb-1">Next Major Goal</div>
                    <div className="text-4xl font-black">200 TEAMS</div>
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 50 && stats.total <= 55 && (
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🎉</div>
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-800 mb-1">Milestone Reached: 50-55 Teams!</div>
                    <div className="text-gray-600">Congratulations on reaching 50+ registrations</div>
                  </div>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    ACHIEVED
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 100 && stats.total <= 105 && (
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">✨</div>
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-800 mb-1">Milestone Reached!</div>
                    <div className="text-gray-600">Amazing progress - 100+ teams registered!</div>
                  </div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    ACHIEVED
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 150 && stats.total <= 155 && (
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-l-4 border-purple-500 p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🌟</div>
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-800 mb-1">Milestone Reached!</div>
                    <div className="text-gray-600">Exceptional! 150+ teams are now competing</div>
                  </div>
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    ACHIEVED
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 200 && stats.total <= 205 && (
              <div className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-lg mb-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🏆</div>
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-800 mb-1">Milestone Reached: 200-205 Teams!</div>
                    <div className="text-gray-600">Outstanding! Your event has reached 200+ registrations</div>
                  </div>
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    ACHIEVED
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 300 && stats.total <= 305 && (
              <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 border-4 border-yellow-400 p-8 rounded-2xl shadow-2xl mb-6 relative overflow-hidden">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 animate-pulse"></div>
                
                {/* Sparkle Effects */}
                <div className="absolute top-4 right-4 text-yellow-300 text-2xl animate-bounce">✨</div>
                <div className="absolute bottom-4 left-4 text-yellow-300 text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>✨</div>
                
                <div className="relative flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-2xl animate-bounce" />
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm animate-ping">
                        300
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-spin" />
                      <div className="font-black text-3xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                        LEGENDARY MILESTONE!
                      </div>
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-spin" />
                    </div>
                    <div className="text-white text-lg font-semibold mb-3">
                      🎊 PHENOMENAL! 300+ Teams Have Joined CodeFusion 2026! 🎊
                    </div>
                    <div className="text-yellow-200 text-sm">
                      This is an extraordinary achievement - you've built one of the largest hackathons in the region!
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-purple-900 px-6 py-3 rounded-full font-black text-lg shadow-xl transform hover:scale-105 transition-transform">
                      ⭐ LEGENDARY ⭐
                    </div>
                    <div className="mt-2 text-yellow-300 text-xs font-bold animate-pulse">
                      HALL OF FAME
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mt-6">
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full animate-pulse"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-yellow-200 font-semibold">
                    <span>0 Teams</span>
                    <span className="text-yellow-300 font-bold">300+ TEAMS ACHIEVED! 🏆</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-[#002147]" />
                Quick Statistics
              </h3>
              <button
                onClick={downloadStatisticsAsPDF}
                className="mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
              >
                <Download className="w-5 h-5" />
                Download Stats
              </button>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all">
                  <div className="text-sm font-semibold text-blue-100 mb-2">Total Teams</div>
                  <div className="text-4xl font-black">{isLoading ? "..." : stats.total}</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all">
                  <div className="text-sm font-semibold text-purple-100 mb-2">Total Colleges</div>
                  <div className="text-4xl font-black">{isLoading ? "..." : stats.totalColleges}</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all">
                  <div className="text-sm font-semibold text-green-100 mb-2">3 Members</div>
                  <div className="text-4xl font-black">{isLoading ? "..." : stats.college3}</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all">
                  <div className="text-sm font-semibold text-orange-100 mb-2">4 Members</div>
                  <div className="text-4xl font-black">{isLoading ? "..." : stats.college4}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-md mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-4">State-wise Registration</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <div className="text-sm text-gray-600 mb-1">Andhra Pradesh</div>
                    <div className="text-3xl font-black text-gray-800">{isLoading ? "..." : stats.ap}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                    <div className="text-sm text-gray-600 mb-1">Tamil Nadu</div>
                    <div className="text-3xl font-black text-gray-800">{isLoading ? "..." : stats.tn}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                    <div className="text-sm text-gray-600 mb-1">Telangana</div>
                    <div className="text-3xl font-black text-gray-800">{isLoading ? "..." : stats.tg}</div>
                  </div>
                </div>
              </div>

              {!isLoading && domains.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md mb-6">
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Domain-wise Distribution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(stats.domainStats).map(([domain, count]) => (
                      <div key={domain} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                        <div className="text-sm text-gray-600 mb-1 truncate" title={domain}>{domain}</div>
                        <div className="text-2xl font-bold text-gray-800">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && colleges.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-md">
                  <h4 className="font-bold text-lg text-gray-800 mb-4">College Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {colleges.map(college => {
                      const count = teams.filter(t => normalizeCollege(t.leader?.college) === normalizeCollege(college)).length;
                      return (
                        <div key={college} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                          <div className="text-sm text-gray-600 mb-1 truncate" title={college}>{college}</div>
                          <div className="text-2xl font-bold text-gray-800">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by team name, registration ID, or leader name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] text-sm"
                  />
                </div>

                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white text-sm cursor-pointer"
                >
                  <option value="all">All Colleges</option>
                  {colleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>

                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white text-sm cursor-pointer"
                >
                  <option value="all">All Domains</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#002147] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading teams data...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 font-semibold mb-2">Error loading teams</div>
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button
                  onClick={fetchTeams}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && teams.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <p className="text-gray-600 text-lg">No teams have registered yet</p>
              </div>
            )}

            {!isLoading && !error && teams.length > 0 && sortedTeams.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-12 text-center">
                <div className="text-yellow-400 text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg">No teams match your filters</p>
              </div>
            )}

            {!isLoading && !error && sortedTeams.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Teams Details</h3>
                  <button
                    onClick={downloadTeamsAsExcel}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
                  >
                    <Download className="w-5 h-5" />
                    Download Teams
                  </button>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                  <table className="w-full text-sm">
                    <thead className="bg-[#002147] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-[#003366]" onClick={() => handleSort("teamName")}>
                          <div className="flex items-center gap-2">
                            Team Name
                            {sortConfig.key === "teamName" && (
                              <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-[#003366]" onClick={() => handleSort("registrationId")}>
                          <div className="flex items-center gap-2">
                            Reg ID
                            {sortConfig.key === "registrationId" && (
                              <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-[#003366]" onClick={() => handleSort("teamSize")}>
                          <div className="flex items-center gap-2">
                            Size
                            {sortConfig.key === "teamSize" && (
                              <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">Leader Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                        <th className="px-4 py-3 text-left font-semibold">Phone</th>
                        <th className="px-4 py-3 text-left font-semibold">College</th>
                        <th className="px-4 py-3 text-left font-semibold">Dept</th>
                        <th className="px-4 py-3 text-left font-semibold">Year</th>
                        <th className="px-4 py-3 text-left font-semibold">M2 Name</th>
                        <th className="px-4 py-3 text-left font-semibold">M2 Email</th>
                        <th className="px-4 py-3 text-left font-semibold">M2 Phone</th>
                        <th className="px-4 py-3 text-left font-semibold">M3 Name</th>
                        <th className="px-4 py-3 text-left font-semibold">M3 Email</th>
                        <th className="px-4 py-3 text-left font-semibold">M3 Phone</th>
                        <th className="px-4 py-3 text-left font-semibold">M4 Name</th>
                        <th className="px-4 py-3 text-left font-semibold">M4 Email</th>
                        <th className="px-4 py-3 text-left font-semibold">M4 Phone</th>
                        <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-[#003366]" onClick={() => handleSort("createdAt")}>
                          <div className="flex items-center gap-2">
                            Registered On
                            {sortConfig.key === "createdAt" && (
                              <ChevronDown className={`w-4 h-4 transition-transform ${sortConfig.direction === "asc" ? "rotate-180" : ""}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">Domain</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedTeams.map((team, index) => (
                        <tr key={team._id || index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{team.teamName}</td>
                          <td className="px-4 py-3 text-gray-700">{team.registrationId}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.name || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.email || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.phone || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.college || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.department || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.leader?.year || "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 2 ? (team.members?.member2?.name || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 2 ? (team.members?.member2?.email || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 2 ? (team.members?.member2?.phone || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 3 ? (team.members?.member3?.name || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 3 ? (team.members?.member3?.email || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 3 ? (team.members?.member3?.phone || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 4 ? (team.members?.member4?.name || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 4 ? (team.members?.member4?.email || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{team.teamSize >= 4 ? (team.members?.member4?.phone || "—") : "—"}</td>
                          <td className="px-4 py-3 text-gray-700">{new Date(team.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-gray-700">{team.problemStatement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!isLoading && !error && sortedTeams.length > 0 && (
              <div className="mt-6 text-center text-gray-600">
                <p className="font-semibold">
                  Showing {sortedTeams.length} of {teams.length} teams
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}