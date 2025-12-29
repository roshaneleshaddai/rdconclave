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
  const [colleges, setColleges] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  
  // Statistics
  const [stats, setStats] = useState({ total: 0, college3: 0, college4: 0, totalColleges: 0 });

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
        
        // Extract unique colleges
        const collegeSet = new Set();
        teamsData.forEach(team => {
          if (team.leader?.college) {
            collegeSet.add(team.leader.college);
          }
        });
        setColleges(Array.from(collegeSet).sort());
        
        // Calculate statistics
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

  const calculateStats = (teamsData) => {
    const college3Count = teamsData.filter(t => t.teamSize == 3).length;
    const college4Count = teamsData.filter(t => t.teamSize == 4).length;
    const collegeSet = new Set();
    
    teamsData.forEach(team => {
      if (team.leader?.college) {
        collegeSet.add(team.leader.college);
      }
    });
    
    setStats({
      total: teamsData.length,
      college3: college3Count,
      college4: college4Count,
      totalColleges: collegeSet.size
    });
  };

  const downloadStatisticsAsPDF = () => {
    // Create HTML content for PDF
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
            padding: 20px;
          }
          .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #002147;
            padding-bottom: 15px;
          }
          .header h1 {
            color: #002147;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 3px;
          }
          .header p {
            color: #666;
            font-size: 11px;
            margin-top: 5px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
          }
          .stat-card {
            background-color: #f9f9f9;
            border: 1.5px solid #002147;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
          }
          .stat-label {
            color: #666;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          .stat-value {
            color: #002147;
            font-size: 32px;
            font-weight: bold;
          }
          .colleges-section {
            margin-top: 30px;
          }
          .colleges-title {
            color: #002147;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1.5px solid #002147;
            padding-bottom: 8px;
          }
          .colleges-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .college-item {
            background-color: #00214710;
            border: 1px solid #002147;
            border-radius: 5px;
            padding: 12px;
            text-align: center;
          }
          .college-name {
            color: #333;
            font-size: 9px;
            margin-bottom: 6px;
            font-weight: 600;
            word-break: break-word;
          }
          .college-count {
            color: #002147;
            font-size: 18px;
            font-weight: bold;
          }
          .footer {
            margin-top: 25px;
            text-align: center;
            color: #999;
            font-size: 10px;
            border-top: 1px solid #ddd;
            padding-top: 12px;
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

          <div class="colleges-section">
            <div class="colleges-title">Colleges Distribution</div>
            <div class="colleges-grid">
              ${colleges.map(college => {
                const count = teams.filter(t => t.leader?.college === college).length;
                return `
                  <div class="college-item">
                    <div class="college-name">${college}</div>
                    <div class="college-count">${count}</div>
                  </div>
                `;
              }).join('')}
            </div>
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

    // Create blob and download as PDF
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Statistics_${new Date().toISOString().split('T')[0]}.pdf`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    
    // Open in new tab to print as PDF
    const printWindow = window.open(url, "_blank");
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    document.body.removeChild(link);
  };

  const downloadTeamsAsExcel = () => {
    // Create CSV content
    let csvContent = "CODEFUSION TEAMS DETAILS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    
    csvContent += "Team Name,Registration ID,Team Size,Leader Name,Leader Email,College,Department,Registered On,Problem Statement\n";
    
    sortedTeams.forEach(team => {
      const registeredDate = new Date(team.createdAt).toLocaleDateString();
      csvContent += `"${team.teamName}","${team.registrationId}",${team.teamSize},"${team.leader?.name || "—"}","${team.leader?.email || "—"}","${team.leader?.college || "—"}","${team.leader?.department || "—"}","${registeredDate}","${team.problemStatement}"\n`;
    });

    // Create blob and download
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

  // Filter and sort teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCollege = selectedCollege === "all" || team.leader?.college === selectedCollege;
    
    return matchesSearch && matchesCollege;
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
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[220px] sm:mt-[240px] lg:mt-[220px] pb-12">

        {/* Live Status */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Live Status</span>
          </div>
        </div>

        {/* Statistics Grid with Download Button */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Teams */}
            <div className="bg-white rounded-lg border-2 border-[#002147] p-8 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Teams</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#002147] mt-3">
                {isLoading ? "..." : stats.total}
              </p>
            </div>

            {/* Total Colleges */}
            <div className="bg-white rounded-lg border-2 border-[#002147] p-8 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Colleges</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#002147] mt-3">
                {isLoading ? "..." : stats.totalColleges}
              </p>
            </div>

            {/* 3+ Members Teams */}
            <div className="bg-white rounded-lg border-2 border-[#002147] p-8 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">3 Members</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#002147] mt-3">
                {isLoading ? "..." : stats.college3}
              </p>
            </div>

            {/* 4+ Members Teams */}
            <div className="bg-white rounded-lg border-2 border-[#002147] p-8 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">4 Members</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#002147] mt-3">
                {isLoading ? "..." : stats.college4}
              </p>
            </div>
          </div>
        </div>

        {/* Colleges Stats */}
        {!isLoading && colleges.length > 0 && (
          <div className="bg-[#00214710] rounded-lg p-6 mb-8 border border-[#002147]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {colleges.map(college => {
                const count = teams.filter(t => t.leader?.college === college).length;
                return (
                  <div key={college} className="text-center">
                    <p className="text-xs text-gray-600 truncate">{college}</p>
                    <p className="text-2xl font-bold text-[#002147]">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
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

            {/* College Filter */}
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

            {/* Refresh Button */}
            <button
              onClick={fetchTeams}
              className="px-4 py-2 bg-[#002147] text-white rounded-lg hover:bg-blue-900 transition text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teams data...</p>
          </div>
        )}

        {/* Error State */}
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

        {/* Empty State */}
        {!isLoading && !error && teams.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg font-semibold">No teams have registered yet</p>
          </div>
        )}

        {/* No Filters Match State */}
        {!isLoading && !error && teams.length > 0 && sortedTeams.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">No teams match your filters</p>
          </div>
        )}

        {/* Teams Table */}
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
                        Registration ID
                        {sortConfig.key === "registrationId" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("teamSize")}>
                      <div className="flex items-center gap-2">
                        Team Size
                        {sortConfig.key === "teamSize" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Email</th>
                    <th className="px-4 py-3 text-left font-semibold">College</th>
                    <th className="px-4 py-3 text-left font-semibold">Department</th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-blue-900" onClick={() => handleSort("createdAt")}>
                      <div className="flex items-center gap-2">
                        Registered On
                        {sortConfig.key === "createdAt" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Problem Statement</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
                    <tr 
                      key={team._id} 
                      className={`border-b hover:bg-[#00214710] transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900">{team.teamName}</td>
                      <td className="px-4 py-3 text-gray-700">{team.registrationId}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="bg-[#00214710] text-[#002147] px-2 py-1 rounded font-semibold">
                          {team.teamSize}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{team.leader?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{team.leader?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{team.leader?.department || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{new Date(team.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{team.problemStatement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {!isLoading && !error && sortedTeams.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Showing {sortedTeams.length} of {teams.length} teams
          </div>
        )}
      </main>
    </div>
  );
}