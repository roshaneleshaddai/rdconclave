"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, Download, Trophy, Star, TrendingUp } from "lucide-react";

export default function FinalTeamsListPage() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationNumber, setCelebrationNumber] = useState(null);

  const [teams, setTeams] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [colleges, setColleges] = useState([]);
  const [domains, setDomains] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  
  // Statistics
  const [stats, setStats] = useState({ 
    total: 0, 
    college3: 0, 
    college4: 0, 
    totalColleges: 0,
    domainStats: {} 
  });

  const normalizeCollege = (collegeName) => {
    return collegeName?.trim().toLowerCase() || "";
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://rd-backend-7cuu.onrender.com/api/payment/finalteams"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const teamsData = data.finalTeams || [];
        setTeams(teamsData);
        setTotalCount(data.total || 0);
        
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
        
        console.log("Fetched final teams:", teamsData);
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
        domainCounts[team.problemStatement] =
          (domainCounts[team.problemStatement] || 0) + 1;
      }
    });

    const totalTeams = teamsData.length;

    setStats({
      total: totalTeams,
      college3: teamsData.filter(t => t.teamSize == 3).length,
      college4: teamsData.filter(t => t.teamSize == 4).length,
      totalColleges: collegeSet.size,
      domainStats: domainCounts
    });

    // 🎉 CELEBRATION CHECK
    let milestone = null;

    if (totalTeams >= 50 && totalTeams <= 55) milestone = 50;
    else if (totalTeams >= 100 && totalTeams <= 105) milestone = 100;
    else if (totalTeams >= 150 && totalTeams <= 155) milestone = 150;

    if (milestone) {
      setCelebrationNumber(milestone);
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
      }, 1000);
    }
  };

  const downloadStatisticsAsPDF = () => {
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Arial', sans-serif;
            background-color: white;
            padding: 12px;
          }
          .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
          }
          .header {
            text-align: center;
            margin-bottom: 12px;
            border-bottom: 2px solid #002147;
            padding-bottom: 8px;
          }
          .header h1 {
            color: #002147;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          .header p {
            color: #666;
            font-size: 9px;
            margin-top: 2px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }
          .stat-card {
            background-color: #f9f9f9;
            border: 1.5px solid #002147;
            border-radius: 5px;
            padding: 10px;
            text-align: center;
          }
          .stat-label {
            color: #666;
            font-size: 8px;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
          }
          .stat-value {
            color: #002147;
            font-size: 24px;
            font-weight: bold;
          }
          .section-title {
            color: #002147;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1.5px solid #002147;
            padding-bottom: 4px;
            margin-top: 10px;
          }
          .colleges-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
          .college-item {
            background-color: #00214710;
            border: 1px solid #002147;
            border-radius: 4px;
            padding: 6px;
            text-align: center;
          }
          .college-name {
            color: #333;
            font-size: 7px;
            margin-bottom: 3px;
            font-weight: 600;
            word-break: break-word;
          }
          .college-count {
            color: #002147;
            font-size: 12px;
            font-weight: bold;
          }
          .footer {
            margin-top: 10px;
            text-align: center;
            color: #999;
            font-size: 8px;
            border-top: 1px solid #ddd;
            padding-top: 6px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CodeFusion 2026 - Final Teams</h1>
            <p>Dashboard Statistics Report</p>
            <p>${new Date().toLocaleDateString()}</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Final Teams</div>
              <div class="stat-value">${stats.total}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Colleges</div>
              <div class="stat-value">${stats.totalColleges}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">3 Members Teams</div>
              <div class="stat-value">${stats.college3}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">4 Members Teams</div>
              <div class="stat-value">${stats.college4}</div>
            </div>
          </div>

          <div class="section-title">Colleges Distribution</div>
          <div class="colleges-grid">
            ${colleges.map(college => {
              const count = teams.filter(t => normalizeCollege(t.leader?.college) === normalizeCollege(college)).length;
              return `
                <div class="college-item">
                  <div class="college-name">${college}</div>
                  <div class="college-count">${count}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="section-title">Domain-wise Distribution</div>
          <div class="colleges-grid">
            ${Object.entries(stats.domainStats).map(([domain, count]) => {
              return `
                <div class="college-item">
                  <div class="college-name">${domain}</div>
                  <div class="college-count">${count}</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Final_Teams_Statistics_${new Date().toISOString().split('T')[0]}.pdf`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    
    const printWindow = window.open(url, "_blank");
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    document.body.removeChild(link);
  };

  const downloadTeamsAsExcel = () => {
    let csvContent = "CODEFUSION FINAL TEAMS DETAILS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    
    csvContent += "Final Team ID,Registration ID,Team Name,Team Size,Leader Name,Leader Email,Leader Phone,Leader College,Member2 Name,Member2 Email,Member2 Phone,Member3 Name,Member3 Email,Member3 Phone,Member4 Name,Member4 Email,Member4 Phone,Registered On,Problem Statement\n";
    
    sortedTeams.forEach(team => {
      const registeredDate = new Date(team.createdAt).toLocaleDateString();
      const members = team.members || [];
      const member2 = members[0] || {};
      const member3 = members[1] || {};
      const member4 = members[2] || {};
      
      csvContent += `"${team.finalTeamId || "—"}","${team.registrationId || "—"}","${team.teamName}",${team.teamSize},"${team.leader?.name || "—"}","${team.leader?.email || "—"}","${team.leader?.phone || "—"}","${team.leader?.college || "—"}","${member2.name || "—"}","${member2.email || "—"}","${member2.phone || "—"}","${member3.name || "—"}","${member3.email || "—"}","${member3.phone || "—"}","${member4.name || "—"}","${member4.email || "—"}","${member4.phone || "—"}","${registeredDate}","${team.problemStatement || "—"}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Final_Teams_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.registrationId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.finalTeamId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
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

  return (
    <div className="min-h-screen bg-white font-sans">
      {showCelebration && (
        <div className="fixed inset-0 z-[9999] bg-white/90 flex items-center justify-center overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute top-[-20px] w-2.5 h-4 opacity-90"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#ff0080", "#00c6ff", "#ffd700", "#7cff00", "#ff6a00"][i % 5],
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `confettiFall 1s linear forwards ${Math.random() * 0.3}s`
              }}
            />
          ))}
          <div className="relative text-center" style={{ animation: "scaleIn 0.4s ease-out forwards" }}>
            <div className="text-[140px] font-black bg-gradient-to-r from-[#00c6ff] via-[#8e2de2] to-[#ff0080] bg-clip-text text-transparent">
              {celebrationNumber}
            </div>
            <div className="text-xl font-bold tracking-[4px] text-gray-700">
              FINAL TEAMS REGISTERED
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-[#002147] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#002147]">
                Final Teams Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                CodeFusion 2026 - Selected Teams
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Live Status</span>
          </div>
          <button
            onClick={fetchTeams}
            className="px-4 py-2 bg-[#002147] text-white rounded-lg hover:bg-blue-900 transition text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        {stats.total >= 75 && stats.total < 100 && (
          <div className="mb-10" style={{ animation: "scaleIn 0.4s ease-out forwards" }}>
            <div className="relative overflow-hidden bg-gradient-to-r from-[#002147] via-[#003d82] to-[#002147] rounded-2xl p-1 shadow-2xl">
              <div className="relative bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                    <Trophy className="w-10 h-10 text-yellow-400" style={{ filter: "drop-shadow(0 0 10px rgba(250,204,21,0.5))" }} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">ELITE STAGE REACHED</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <p className="text-blue-100 font-medium text-sm md:text-base uppercase tracking-widest">{stats.total} Final Teams</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 max-w-xs w-full px-4">
                  <div className="flex justify-between text-xs font-bold text-blue-200 mb-2 uppercase tracking-tighter">
                    <span>Target: 100</span>
                    <span>{Math.round((stats.total / 100) * 100)}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out" style={{ width: `${(stats.total / 100) * 100}%` }}></div>
                  </div>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-xl border border-white/10 text-center">
                  <p className="text-[10px] text-blue-200 font-bold uppercase tracking-[0.2em]">Next Major Goal</p>
                  <p className="text-xl font-black text-white">100 TEAMS</p>
                </div>
                <div className="absolute top-[-20px] right-[-20px] opacity-10">
                  <TrendingUp className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="space-y-3">
            {stats.total >= 50 && stats.total <= 55 && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-bold text-blue-900">Milestone Reached: 50+ Final Teams!</p>
                      <p className="text-sm text-blue-700">Congratulations on selecting 50+ teams</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 100 && stats.total <= 105 && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <p className="font-bold text-purple-900">Milestone Reached: 100+ Final Teams!</p>
                      <p className="text-sm text-purple-700">Amazing progress - 100+ teams selected!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-purple-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#002147]">Quick Statistics</h2>
            <button
              onClick={downloadStatisticsAsPDF}
              disabled={isLoading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Stats
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Final Teams</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.total}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Colleges</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.totalColleges}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">3 Members</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.college3}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">4 Members</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.college4}
              </p>
            </div>
          </div>
        </div>

        {!isLoading && domains.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-5 mb-8 border border-indigo-200">
            <h3 className="font-bold text-[#002147] mb-4 text-sm">Domain-wise Distribution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(stats.domainStats).map(([domain, count]) => (
                <div key={domain} className="bg-white rounded-lg p-3 border border-indigo-100 text-center hover:shadow-md transition">
                  <p className="text-xs text-gray-600 truncate mb-2 font-medium">{domain}</p>
                  <p className="text-2xl font-bold text-indigo-600">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && colleges.length > 0 && (
          <div className="bg-[#00214710] rounded-lg p-5 mb-8 border border-[#002147]">
            <h3 className="font-bold text-[#002147] mb-4 text-sm">College Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {colleges.map(college => {
                const count = teams.filter(t => normalizeCollege(t.leader?.college) === normalizeCollege(college)).length;
                return (
                  <div key={college} className="text-center bg-white p-3 rounded-lg border border-[#002147] border-opacity-20">
                    <p className="text-xs text-gray-600 truncate mb-2">{college}</p>
                    <p className="text-2xl font-bold text-[#002147]">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by team name, ID, or leader..."
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading final teams data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-semibold mb-2">Error loading teams</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchTeams}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && teams.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg font-semibold">No final teams have been selected yet</p>
          </div>
        )}

        {!isLoading && !error && teams.length > 0 && sortedTeams.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">No teams match your filters</p>
          </div>
        )}

        {!isLoading && !error && sortedTeams.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#002147]">Final Teams Details</h2>
              <button
                onClick={downloadTeamsAsExcel}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download Teams
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#002147] text-white border-b">
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("finalTeamId")}>
                      <div className="flex items-center gap-2">
                        Final Team ID
                        {sortConfig.key === "finalTeamId" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("teamName")}>
                      <div className="flex items-center gap-2">
                        Team Name
                        {sortConfig.key === "teamName" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("registrationId")}>
                      <div className="flex items-center gap-2">
                        Reg ID
                        {sortConfig.key === "registrationId" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("teamSize")}>
                      <div className="flex items-center gap-2">
                        Size
                        {sortConfig.key === "teamSize" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">College</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">M4 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M4 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M4 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("createdAt")}>
                      <div className="flex items-center gap-2">
                        Registered On
                        {sortConfig.key === "createdAt" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Domain</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => {
                    const members = team.members || [];
                    const member2 = members[0] || {};
                    const member3 = members[1] || {};
                    const member4 = members[2] || {};
                    
                    return (
                      <tr 
                        key={team._id || team.finalTeamId} 
                        className={`border-b hover:bg-[#00214710] transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900 text-xs">{team.finalTeamId || "—"}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 truncate">{team.teamName || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.registrationId || "—"}</td>
                        <td className="px-4 py-3 text-gray-700">
                          <span className="bg-[#00214710] text-[#002147] px-2 py-1 rounded font-semibold">
                            {team.teamSize}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.name || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.email || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.phone || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.college || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (member2.name || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (member2.email || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (member2.phone || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (member3.name || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (member3.email || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (member3.phone || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (member4.name || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (member4.email || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (member4.phone || "—") : "—"}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{new Date(team.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs max-w-xs truncate">{team.problemStatement || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && !error && sortedTeams.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Showing {sortedTeams.length} of {teams.length} final teams
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}