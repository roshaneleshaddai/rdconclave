"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, Download, TrendingUp } from "lucide-react";

export default function FinalTeamsListPage() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationNumber, setCelebrationNumber] = useState(null);

  const [teams, setTeams] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [colleges, setColleges] = useState([]);
  const [domains, setDomains] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  
  const [stats, setStats] = useState({ 
    total: 0, 
    college3: 0, 
    college4: 0, 
    totalColleges: 0,
    domainStats: {},
    ap: 0,
    tn: 0,
    tg: 0,
    totalParticipants: 0
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
      ap: teamsData.filter(t => normalizeCollege(t.leader?.college).includes('andhra') || t.leader?.college?.toLowerCase().includes('ap')).length,
      tn: teamsData.filter(t => normalizeCollege(t.leader?.college).includes('tamil') || t.leader?.college?.toLowerCase().includes('tn')).length,
      tg: teamsData.filter(t => normalizeCollege(t.leader?.college).includes('telangana') || t.leader?.college?.toLowerCase().includes('tg') || t.leader?.college?.toLowerCase().includes('hyderabad')).length,
      college3: teamsData.filter(t => t.teamSize == 3).length,
      college4: teamsData.filter(t => t.teamSize == 4).length,
      totalColleges: collegeSet.size,
      domainStats: domainCounts,
      totalParticipants: teamsData.reduce((sum, team) => sum + (team.teamSize || 0), 0)
    });

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
            font-family: 'Segoe UI', 'Roboto', sans-serif;
            background-color: white;
            padding: 20px;
          }
          .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #0051a8;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #0051a8;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
          }
          .header p {
            color: #666;
            font-size: 14px;
            margin-top: 4px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 30px;
          }
          .stat-card {
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            border: 1px solid;
          }
          .stat-card.blue {
            background: linear-gradient(135deg, #e8f0ff 0%, #d4e4ff 100%);
            border-color: #4a90e2;
          }
          .stat-card.purple {
            background: linear-gradient(135deg, #f0e8ff 0%, #e8d4ff 100%);
            border-color: #9370db;
          }
          .stat-card.orange {
            background: linear-gradient(135deg, #ffe8d4 0%, #ffd9b3 100%);
            border-color: #e8944a;
          }
          .stat-card.green {
            background: linear-gradient(135deg, #d4ffe8 0%, #b3ffd9 100%);
            border-color: #4ae890;
          }
          .stat-label {
            color: #333;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.8px;
          }
          .stat-value {
            font-size: 28px;
            font-weight: 700;
          }
          .stat-card.blue .stat-value { color: #0051a8; }
          .stat-card.purple .stat-value { color: #6b4fb9; }
          .stat-card.orange .stat-value { color: #c65d00; }
          .stat-card.green .stat-value { color: #0fa860; }
          .section-title {
            color: #0051a8;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 12px;
            border-bottom: 2px solid #0051a8;
            padding-bottom: 8px;
            margin-top: 24px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .colleges-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .college-item {
            background-color: #f5f9ff;
            border: 1px solid #d0e0f7;
            border-radius: 6px;
            padding: 10px;
            text-align: center;
          }
          .college-name {
            color: #333;
            font-size: 11px;
            margin-bottom: 6px;
            font-weight: 600;
            word-break: break-word;
          }
          .college-count {
            color: #0051a8;
            font-size: 16px;
            font-weight: 700;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #999;
            font-size: 10px;
            border-top: 1px solid #e0e0e0;
            padding-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CodeFusion 2026 - Final Teams Report</h1>
            <p>Dashboard Statistics Summary</p>
            <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card blue">
              <div class="stat-label">Total Final Teams</div>
              <div class="stat-value">${stats.total}</div>
            </div>
            <div class="stat-card purple">
              <div class="stat-label">Total Participants</div>
              <div class="stat-value">${stats.totalParticipants}</div>
            </div>
            <div class="stat-card orange">
              <div class="stat-label">Total Colleges</div>
              <div class="stat-value">${stats.totalColleges}</div>
            </div>
          </div>

          <div class="section-title">College Distribution</div>
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
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
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
    let csvContent = "CodeFusion 2026 - Final Teams Details\n";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      {showCelebration && (
        <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute top-[-20px] w-2.5 h-4"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#0051a8", "#e8944a", "#0fa860", "#6b4fb9", "#ff0080"][i % 5],
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `confettiFall 1.2s ease-in forwards ${Math.random() * 0.4}s`
              }}
            />
          ))}
          <div className="relative text-center">
            <div className="text-8xl font-black bg-gradient-to-r from-[#0051a8] to-[#0fa860] bg-clip-text text-transparent drop-shadow-xl">
              {celebrationNumber}
            </div>
            <div className="text-xl font-semibold tracking-widest text-gray-800 mt-4">
              TEAMS MILESTONE
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Final Teams Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                CodeFusion 2026 • Selected & Confirmed Teams
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-700">Live</span>
              </div>
              <button
                onClick={fetchTeams}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {!isLoading && stats.total >= 50 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-r-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold text-gray-900">Milestone Achieved!</p>
                <p className="text-sm text-gray-700">{stats.total} teams have been successfully registered</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Key Statistics
            </h2>
            <button
              onClick={downloadStatisticsAsPDF}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Final Teams</p>
              <p className="text-4xl font-bold text-blue-600 mt-3">
                {isLoading ? "—" : stats.total}
              </p>
              <p className="text-xs text-gray-500 mt-2">registered & confirmed</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Participants</p>
              <p className="text-4xl font-bold text-purple-600 mt-3">
                {isLoading ? "—" : stats.totalParticipants}
              </p>
              <p className="text-xs text-gray-500 mt-2">across all teams</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Participating Colleges</p>
              <p className="text-4xl font-bold text-orange-600 mt-3">
                {isLoading ? "—" : stats.totalColleges}
              </p>
              <p className="text-xs text-gray-500 mt-2">unique institutions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">3 Member Teams</p>
              <p className="text-4xl font-bold text-blue-600 mt-3">
                {isLoading ? "—" : stats.college3}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">4 Member Teams</p>
              <p className="text-4xl font-bold text-green-600 mt-3">
                {isLoading ? "—" : stats.college4}
              </p>
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">State Distribution</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Andhra Pradesh</span>
                  <span className="text-lg font-bold text-gray-900">{stats.ap}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Tamil Nadu</span>
                  <span className="text-lg font-bold text-gray-900">{stats.tn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Telangana</span>
                  <span className="text-lg font-bold text-gray-900">{stats.tg}</span>
                </div>
              </div>
            </div>

            {!isLoading && domains.length > 0 && (
              <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">Domain Distribution</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(stats.domainStats).map(([domain, count]) => (
                    <div key={domain} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 truncate font-medium">{domain}</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && colleges.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">College Statistics</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {colleges.map(college => {
                const count = teams.filter(t => normalizeCollege(t.leader?.college) === normalizeCollege(college)).length;
                return (
                  <div key={college} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center hover:bg-blue-50 transition">
                    <p className="text-xs text-gray-600 truncate font-medium mb-2">{college}</p>
                    <p className="text-xl font-bold text-gray-900">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by team name, ID, or leader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
            >
              <option value="all">All Colleges</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading teams data...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-800 font-semibold mb-2">Error Loading Data</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchTeams}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition font-semibold text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && teams.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg font-semibold">No final teams registered yet</p>
          </div>
        )}

        {!isLoading && !error && teams.length > 0 && sortedTeams.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">No teams match your filter criteria</p>
          </div>
        )}

        {!isLoading && !error && sortedTeams.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Final Teams Details</h2>
              <button
                onClick={downloadTeamsAsExcel}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
              >
                <Download className="w-4 h-4" />
                Download Teams
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white border-b">
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-800" onClick={() => handleSort("finalTeamId")}>
                      <div className="flex items-center gap-2">
                        Team ID
                        {sortConfig.key === "finalTeamId" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-800" onClick={() => handleSort("teamName")}>
                      <div className="flex items-center gap-2">
                        Team Name
                        {sortConfig.key === "teamName" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Reg ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Team Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">College</th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-800" onClick={() => handleSort("createdAt")}>
                      <div className="flex items-center gap-2">
                        Registered
                        {sortConfig.key === "createdAt" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Domain</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
                    <tr 
                      key={team._id || team.finalTeamId} 
                      className={`border-b hover:bg-blue-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900">{team.finalTeamId || "—"}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 truncate">{team.teamName || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{team.registrationId || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-xs">
                          {team.teamSize}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-medium">{team.leader?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{team.leader?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{team.leader?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{new Date(team.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-700 truncate text-xs">{team.problemStatement || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedTeams.length > 0 && (
              <div className="mt-4 text-xs text-gray-600 text-center font-medium">
                Showing {sortedTeams.length} of {teams.length} teams
              </div>
            )}
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