"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Download, Filter } from "lucide-react";

export default function TeamsListPage() {
  const router = useRouter();
  
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
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  
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
        console.log("Total count:", data.count);
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

  const getStateFromCollege = (college) => {
    const collegeName = college?.toLowerCase() || "";
    if (collegeName.includes("ap") || collegeName.includes("andhra") || collegeName.includes("hyderabad")) return "AP";
    if (collegeName.includes("tn") || collegeName.includes("tamil") || collegeName.includes("chennai")) return "TN";
    if (collegeName.includes("tg") || collegeName.includes("telangana")) return "TG";
    return null;
  };

  const calculateStats = (teamsData) => {
    let apCount = 0, tnCount = 0, tgCount = 0;
    const collegeSet = new Set();
    const domainCounts = {};

    teamsData.forEach(team => {
      const state = getStateFromCollege(team.leader?.college);
      if (state === "AP") apCount++;
      else if (state === "TN") tnCount++;
      else if (state === "TG") tgCount++;

      if (team.leader?.college) {
        collegeSet.add(normalizeCollege(team.leader.college));
      }

      if (team.problemStatement) {
        domainCounts[team.problemStatement] = (domainCounts[team.problemStatement] || 0) + 1;
      }
    });

    const college3Count = teamsData.filter(t => t.teamSize == 3).length;
    const college4Count = teamsData.filter(t => t.teamSize == 4).length;
    
    setStats({
      total: teamsData.length,
      ap: apCount,
      tn: tnCount,
      tg: tgCount,
      college3: college3Count,
      college4: college4Count,
      totalColleges: collegeSet.size,
      domainStats: domainCounts
    });
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
            padding: 15px;
          }
          .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #002147;
            padding-bottom: 10px;
          }
          .header h1 {
            color: #002147;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 2px;
          }
          .header p {
            color: #666;
            font-size: 10px;
            margin-top: 3px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
          }
          .stat-card {
            background-color: #f9f9f9;
            border: 1.5px solid #002147;
            border-radius: 6px;
            padding: 12px;
            text-align: center;
          }
          .stat-label {
            color: #666;
            font-size: 9px;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 6px;
            letter-spacing: 0.5px;
          }
          .stat-value {
            color: #002147;
            font-size: 28px;
            font-weight: bold;
          }
          .state-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 15px;
          }
          .state-card {
            background-color: #f9f9f9;
            border: 1.5px solid #002147;
            border-radius: 5px;
            padding: 10px;
            text-align: center;
          }
          .state-label {
            color: #666;
            font-size: 9px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .state-value {
            color: #002147;
            font-size: 22px;
            font-weight: bold;
          }
          .section-title {
            color: #002147;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            border-bottom: 1.5px solid #002147;
            padding-bottom: 5px;
            margin-top: 15px;
          }
          .colleges-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 15px;
          }
          .college-item {
            background-color: #00214710;
            border: 1px solid #002147;
            border-radius: 4px;
            padding: 8px;
            text-align: center;
          }
          .college-name {
            color: #333;
            font-size: 8px;
            margin-bottom: 4px;
            font-weight: 600;
            word-break: break-word;
          }
          .college-count {
            color: #002147;
            font-size: 14px;
            font-weight: bold;
          }
          .footer {
            margin-top: 15px;
            text-align: center;
            color: #999;
            font-size: 9px;
            border-top: 1px solid #ddd;
            padding-top: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CodeFusion 2026</h1>
            <p>Dashboard Statistics Report</p>
            <p>${new Date().toLocaleDateString()}</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Teams</div>
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

          <div class="section-title">State-wise Distribution</div>
          <div class="state-grid">
            <div class="state-card">
              <div class="state-label">Andhra Pradesh</div>
              <div class="state-value">${stats.ap}</div>
            </div>
            <div class="state-card">
              <div class="state-label">Tamil Nadu</div>
              <div class="state-value">${stats.tn}</div>
            </div>
            <div class="state-card">
              <div class="state-label">Telangana</div>
              <div class="state-value">${stats.tg}</div>
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
    
    csvContent += "Team Name,Registration ID,Team Size,Leader Name,Leader Email,Leader Phone,Leader College,Leader Department,Leader Year,Member 2 Name,Member 2 Email,Member 2 Phone,Member 3 Name,Member 3 Email,Member 3 Phone,Member 4 Name,Member 4 Email,Member 4 Phone,Registered On,Problem Statement\n";
    
    sortedTeams.forEach(team => {
      const registeredDate = new Date(team.createdAt).toLocaleDateString();
      csvContent += `"${team.teamName}","${team.registrationId}",${team.teamSize},"${team.leader?.name || "—"}","${team.leader?.email || "—"}","${team.leader?.phone || "—"}","${team.leader?.college || "—"}","${team.leader?.department || "—"}","${team.leader?.year || "—"}","${team.member2?.name || "—"}","${team.member2?.email || "—"}","${team.member2?.phone || "—"}","${team.member3?.name || "—"}","${team.member3?.email || "—"}","${team.member3?.phone || "—"}","${team.member4?.name || "—"}","${team.member4?.email || "—"}","${team.member4?.phone || "—"}","${registeredDate}","${team.problemStatement}"\n`;
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
    const matchesSearch = 
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4"></div>
          <p className="text-gray-600 font-SUSE">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-SUSE" style={{ fontFamily: "SUSE, sans-serif" }}>
      <header className="bg-white border-b border-[#002147] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#002147]">
                CodeFusion Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, <span className="font-semibold">{adminName}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#002147] hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">

        <div className="mb-8 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Live Status</span>
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-3">
            {stats.total >= 50 && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-bold text-blue-900">Milestone Reached: 50 Teams!</p>
                      <p className="text-sm text-blue-700">Congratulations on reaching 50 registrations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 100 && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <p className="font-bold text-purple-900">Milestone Reached: 100 Teams!</p>
                      <p className="text-sm text-purple-700">Amazing progress - 100 teams registered!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-purple-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 150 && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌟</span>
                    <div>
                      <p className="font-bold text-amber-900">Milestone Reached: 150 Teams!</p>
                      <p className="text-sm text-amber-700">Exceptional! 150 teams are now competing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}

            {stats.total >= 200 && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-bold text-green-900">Milestone Reached: 200 Teams!</p>
                      <p className="text-sm text-green-700">Outstanding! Your event has reached 200 registrations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600 font-semibold">ACHIEVED</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-[#002147]">Statistics Overview</h2>
            <button
              onClick={downloadStatisticsAsPDF}
              disabled={isLoading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Stats
            </button>
          </div>

          <style>{`
            @keyframes dance {
              0%, 100% { transform: translateY(0) scale(1); }
              25% { transform: translateY(-12px) scale(1.05); }
              50% { transform: translateY(0) scale(1); }
              75% { transform: translateY(-8px) scale(1.02); }
            }
            .dance-ball {
              animation: dance 2.5s ease-in-out infinite;
            }
            .dance-ball:nth-child(2) { animation-delay: 0.2s; }
            .dance-ball:nth-child(3) { animation-delay: 0.4s; }
            .dance-ball:nth-child(4) { animation-delay: 0.6s; }
          `}</style>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="dance-ball bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-3xl font-bold">{isLoading ? "..." : stats.total}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 text-center">Total Teams</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="dance-ball bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-3xl font-bold">{isLoading ? "..." : stats.totalColleges}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 text-center">Total Colleges</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="dance-ball bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-3xl font-bold">{isLoading ? "..." : stats.college3}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 text-center">3 Members</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="dance-ball bg-gradient-to-br from-green-400 to-green-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-4">
                <span className="text-white text-3xl font-bold">{isLoading ? "..." : stats.college4}</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 text-center">4 Members</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-8 mb-12 border border-gray-200">
            <h3 className="text-center font-bold text-[#002147] mb-8 text-lg">State-wise Registration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="dance-ball bg-gradient-to-br from-red-300 to-red-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-3">
                  <span className="text-white text-2xl font-bold">{isLoading ? "..." : stats.ap}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Andhra Pradesh</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="dance-ball bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-3">
                  <span className="text-white text-2xl font-bold">{isLoading ? "..." : stats.tn}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Tamil Nadu</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="dance-ball bg-gradient-to-br from-teal-300 to-teal-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-3">
                  <span className="text-white text-2xl font-bold">{isLoading ? "..." : stats.tg}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700">Telangana</p>
              </div>
            </div>
          </div>
        </div>

        {!isLoading && domains.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8 border border-indigo-200">
            <h3 className="font-bold text-[#002147] mb-6 text-base">Domain-wise Distribution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.entries(stats.domainStats).map(([domain, count]) => (
                <div key={domain} className="bg-white rounded-lg p-4 border border-indigo-100 text-center hover:shadow-md transition">
                  <p className="text-xs text-gray-600 truncate mb-2 font-medium">{domain}</p>
                  <p className="text-2xl font-bold text-indigo-600">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && colleges.length > 0 && (
          <div className="bg-[#00214710] rounded-lg p-6 mb-8 border border-[#002147]">
            <h3 className="font-bold text-[#002147] mb-4">Colleges Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

            <button
              onClick={fetchTeams}
              className="px-4 py-2 bg-[#002147] text-white rounded-lg hover:bg-blue-900 transition text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teams data...</p>
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
            <p className="text-gray-600 text-lg font-semibold">No teams have registered yet</p>
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
              <h2 className="text-lg font-bold text-[#002147]">Teams Details</h2>
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
                    <th className="px-4 py-3 text-left font-semibold">Leader</th>
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
                  {sortedTeams.map((team, index) => (
                    <tr 
                      key={team._id} 
                      className={`border-b hover:bg-[#00214710] transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900 truncate">{team.teamName}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.registrationId}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="bg-[#00214710] text-[#002147] px-2 py-1 rounded font-semibold">
                          {team.teamSize}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.department || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.year || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (team.member2?.name || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (team.member2?.email || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 2 ? (team.member2?.phone || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (team.member3?.name || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (team.member3?.email || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 3 ? (team.member3?.phone || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (team.member4?.name || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (team.member4?.email || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.teamSize >= 4 ? (team.member4?.phone || "—") : "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{new Date(team.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs max-w-xs truncate">{team.problemStatement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && !error && sortedTeams.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Showing {sortedTeams.length} of {teams.length} teams
          </div>
        )}
      </main>
    </div>
  );
}