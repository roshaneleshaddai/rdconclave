"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Download } from "lucide-react";

export default function FinalTeamsListPage() {
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
    totalParticipants: 0,
    totalBoys: 0,
    totalGirls: 0,
    apTeams: 0,
    tnTeams: 0,
    tgTeams: 0,
    apColleges: 0,
    tnColleges: 0,
    tgColleges: 0,
    totalColleges: 0,
    college3: 0, 
    college4: 0,
    collegeCountMap: {},
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
        "https://rd-backend-7cuu.onrender.com/api/payment/finalteams"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const finalTeamsData = data.finalTeams || [];
        
        setTeams(finalTeamsData);
        setTotalCount(finalTeamsData.length);
        
        const collegeMap = new Map();
        finalTeamsData.forEach(team => {
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
        finalTeamsData.forEach(team => {
          if (team.problemStatement) {
            domainSet.add(team.problemStatement);
          }
        });
        setDomains(Array.from(domainSet).sort());
        
        calculateStats(finalTeamsData);
        
        console.log("Fetched final teams:", finalTeamsData);
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
    const apCollegeSet = new Set();
    const tnCollegeSet = new Set();
    const tgCollegeSet = new Set();
    const collegeCountMap = {};
    const domainCounts = {};

    let totalParticipants = 0;
    let totalBoys = 0;
    let totalGirls = 0;

    teamsData.forEach(team => {
      // For Quick Statistics - count all colleges from all team members
      const allMembers = [team.leader, ...(team.members || [])].filter(Boolean);
      
      allMembers.forEach(member => {
        if (member?.college) {
          const normalized = normalizeCollege(member.college);
          collegeSet.add(normalized);
          collegeCountMap[normalized] = (collegeCountMap[normalized] || 0) + 1;
        }
        
        // Count boys and girls
        if (member?.gender) {
          if (member.gender.toLowerCase() === 'male' || member.gender.toLowerCase() === 'm') {
            totalBoys++;
          } else if (member.gender.toLowerCase() === 'female' || member.gender.toLowerCase() === 'f') {
            totalGirls++;
          }
        }
      });

      if (team.problemStatement) {
        domainCounts[team.problemStatement] =
          (domainCounts[team.problemStatement] || 0) + 1;
      }

      totalParticipants += team.teamSize || 0;
    });

    const totalTeams = teamsData.length;
    const college3 = teamsData.filter(t => t.teamSize === 3).length;
    const college4 = teamsData.filter(t => t.teamSize === 4).length;

    const apTeams = teamsData.filter(t => {
      const allMembers = [t.leader, ...(t.members || [])].filter(Boolean);
      return allMembers.some(member => {
        const college = member?.college?.toLowerCase() || "";
        return college.includes("andhra") || college.includes("ap");
      });
    }).length;
    
    const tnTeams = teamsData.filter(t => {
      const allMembers = [t.leader, ...(t.members || [])].filter(Boolean);
      return allMembers.some(member => {
        const college = member?.college?.toLowerCase() || "";
        return college.includes("tamil") || college.includes("tn");
      });
    }).length;
    
    const tgTeams = teamsData.filter(t => {
      const allMembers = [t.leader, ...(t.members || [])].filter(Boolean);
      return allMembers.some(member => {
        const college = member?.college?.toLowerCase() || "";
        return college.includes("telangana") || college.includes("tg") || college.includes("hyderabad");
      });
    }).length;

    // Count colleges per state
    teamsData.forEach(team => {
      const allMembers = [team.leader, ...(team.members || [])].filter(Boolean);
      const apFound = allMembers.some(m => (m?.college?.toLowerCase() || "").includes("andhra") || (m?.college?.toLowerCase() || "").includes("ap"));
      const tnFound = allMembers.some(m => (m?.college?.toLowerCase() || "").includes("tamil") || (m?.college?.toLowerCase() || "").includes("tn"));
      const tgFound = allMembers.some(m => (m?.college?.toLowerCase() || "").includes("telangana") || (m?.college?.toLowerCase() || "").includes("tg") || (m?.college?.toLowerCase() || "").includes("hyderabad"));

      allMembers.forEach(member => {
        if (member?.college) {
          const normalized = normalizeCollege(member.college);
          if (apFound) apCollegeSet.add(normalized);
          if (tnFound) tnCollegeSet.add(normalized);
          if (tgFound) tgCollegeSet.add(normalized);
        }
      });
    });

    setStats({
      total: totalTeams,
      totalParticipants: totalParticipants,
      totalBoys: totalBoys,
      totalGirls: totalGirls,
      apTeams: apTeams,
      tnTeams: tnTeams,
      tgTeams: tgTeams,
      apColleges: apCollegeSet.size,
      tnColleges: tnCollegeSet.size,
      tgColleges: tgCollegeSet.size,
      college3: college3,
      college4: college4,
      totalColleges: collegeSet.size,
      collegeCountMap: collegeCountMap,
      domainStats: domainCounts
    });
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
          html, body {
            height: 100%;
            width: 100%;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: white;
            color: #333;
          }
          .page {
            width: 8.5in;
            height: 11in;
            background-color: white;
            page-break-after: always;
            padding: 0.5in;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .page:last-child {
            page-break-after: avoid;
          }
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .header {
            text-align: center;
            margin-bottom: 0.3in;
            border-bottom: 3px solid #002147;
            padding-bottom: 0.1in;
          }
          .header h1 {
            color: #002147;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 3px;
          }
          .header p {
            color: #666;
            font-size: 10px;
            margin: 2px 0;
          }
          .content {
            flex: 1;
            overflow: hidden;
          }
          .section-title {
            color: #002147;
            font-size: 11px;
            font-weight: bold;
            margin: 0.15in 0 0.1in 0;
            padding-bottom: 4px;
            border-bottom: 2px solid #002147;
            text-align: left;
          }
          .stats-grid-5 {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
            margin-bottom: 0.12in;
          }
          .stats-grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
            margin-bottom: 0.12in;
          }
          .stats-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-bottom: 0.12in;
          }
          .stat-card {
            background-color: #f5f5f5;
            border: 1.5px solid #002147;
            border-radius: 3px;
            padding: 8px 6px;
            text-align: center;
          }
          .stat-label {
            color: #666;
            font-size: 7px;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 4px;
            letter-spacing: 0.2px;
            line-height: 1;
          }
          .stat-value {
            color: #002147;
            font-size: 22px;
            font-weight: bold;
            line-height: 1.2;
          }
          .colleges-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
          .college-item {
            background-color: #f5f5f5;
            border: 1px solid #002147;
            border-radius: 3px;
            padding: 6px;
            text-align: center;
          }
          .college-name {
            color: #333;
            font-size: 7px;
            margin-bottom: 2px;
            font-weight: 600;
            word-break: break-word;
            line-height: 1.1;
          }
          .college-count {
            color: #002147;
            font-size: 13px;
            font-weight: bold;
          }
          .footer {
            margin-top: 0.1in;
            text-align: center;
            color: #999;
            font-size: 8px;
            border-top: 1px solid #ddd;
            padding-top: 4px;
          }
          @media print {
            body, html {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
            .page {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0.5in;
              page-break-after: always;
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1 -->
        <div class="page">
          <div class="container">
            <div class="header">
              <h1>CodeFusion 2026 - Final Teams Report</h1>
              <p>Dashboard Statistics - Page 1</p>
              <p>${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section-title">Quick Statistics - Row 1</div>
            <div class="stats-grid-5">
              <div class="stat-card">
                <div class="stat-label">Total Teams</div>
                <div class="stat-value">${stats.total}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Total Participants</div>
                <div class="stat-value">${stats.totalParticipants}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Different Colleges</div>
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

            <div class="section-title">Quick Statistics - Row 2</div>
            <div class="stats-grid-2">
              <div class="stat-card">
                <div class="stat-label">Total Boys</div>
                <div class="stat-value">${stats.totalBoys}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Total Girls</div>
                <div class="stat-value">${stats.totalGirls}</div>
              </div>
            </div>

            <div class="section-title">State-wise Colleges</div>
            <div class="stats-grid-3">
              <div class="stat-card">
                <div class="stat-label">AP Colleges</div>
                <div class="stat-value">${stats.apColleges}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">TN Colleges</div>
                <div class="stat-value">${stats.tnColleges}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">TG Colleges</div>
                <div class="stat-value">${stats.tgColleges}</div>
              </div>
            </div>

            <div class="section-title">State-wise Teams Registration</div>
            <div class="stats-grid-3">
              <div class="stat-card">
                <div class="stat-label">AP Teams</div>
                <div class="stat-value">${stats.apTeams}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">TN Teams</div>
                <div class="stat-value">${stats.tnTeams}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">TG Teams</div>
                <div class="stat-value">${stats.tgTeams}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGE 2 -->
        <div class="page page-break">
          <div class="container">
            <div class="header">
              <h1>CodeFusion 2026 - Final Teams Report</h1>
              <p>Colleges & Domains Distribution - Page 2</p>
              <p>${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section-title">Colleges Distribution (Team Leader Count)</div>
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
        </div>

        <script>
          window.onload = function() {
            setTimeout(() => { window.print(); }, 500);
          };
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Final_Statistics_${new Date().toISOString().split('T')[0]}.pdf`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    
    const printWindow = window.open(url, "_blank");
    setTimeout(() => {
      if (printWindow) {
        printWindow.print();
      }
    }, 500);
    
    document.body.removeChild(link);
  };

  const downloadTeamsAsExcel = () => {
    let csvContent = "CODEFUSION FINAL TEAMS DETAILS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    
    csvContent += "Final Team ID,Team Name,Registration ID,Team Size,Leader ParticipantID,Leader Name,Leader Email,Leader Phone,Leader College,Member1 ParticipantID,Member1 Name,Member1 Email,Member1 Phone,Member1 College,Member2 ParticipantID,Member2 Name,Member2 Email,Member2 Phone,Member2 College,Member3 ParticipantID,Member3 Name,Member3 Email,Member3 Phone,Member3 College,Problem Statement,Registered On\n";
    
    sortedTeams.forEach(team => {
      const registeredDate = new Date(team.createdAt).toLocaleDateString();
      
      let row = `"${team.finalTeamId}","${team.teamName}","${team.registrationId}",${team.teamSize},`;
      
      row += `"${team.leader?.participantId || "—"}","${team.leader?.name || "—"}","${team.leader?.email || "—"}","${team.leader?.phone || "—"}","${team.leader?.college || "—"}",`;
      
      if (team.members && team.members.length > 0) {
        for (let i = 0; i < 3; i++) {
          const member = team.members[i];
          if (member) {
            row += `"${member.participantId || "—"}","${member.name || "—"}","${member.email || "—"}","${member.phone || "—"}","${member.college || "—"}",`;
          } else {
            row += `"—","—","—","—","—",`;
          }
        }
      } else {
        row += `"—","—","—","—","—","—","—","—","—","—","—","—","—","—","—",`;
      }
      
      row += `"${team.problemStatement}","${registeredDate}"\n`;
      csvContent += row;
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

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminName");
    localStorage.removeItem("loginTimestamp");
    router.push("/hackathon/codefusion/register/teams");
  };

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
                CodeFusion Final Teams Dashboard
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

        <div className="mb-8 flex items-center justify-end">
          <button
            onClick={fetchTeams}
            className="px-4 py-2 bg-[#002147] text-white rounded-lg hover:bg-blue-900 transition text-sm font-medium"
          >
            Refresh
          </button>
        </div>

  
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Final Teams</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.total}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-green-600 p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Participants</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {isLoading ? "..." : stats.totalParticipants}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Different Colleges</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.totalColleges}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">3 Members Teams</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.college3}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#002147] p-6 hover:shadow-lg transition">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">4 Members Teams</p>
              <p className="text-4xl font-bold text-[#002147] mt-2">
                {isLoading ? "..." : stats.college4}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="bg-white rounded-lg border-2 border-blue-600 p-6 hover:shadow-lg transition flex-1 max-w-sm">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Boys</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {isLoading ? "..." : stats.totalBoys}
              </p>
            </div>

            <div className="bg-white rounded-lg border-2 border-pink-600 p-6 hover:shadow-lg transition flex-1 max-w-sm">
              <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Girls</p>
              <p className="text-4xl font-bold text-pink-600 mt-2">
                {isLoading ? "..." : stats.totalGirls}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-teal-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-center font-bold text-[#002147] mb-6 text-base">State-wise Colleges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-red-200 p-4 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-2">Andhra Pradesh</p>
                <p className="text-3xl font-bold text-red-600">{isLoading ? "..." : stats.apColleges}</p>
              </div>
              <div className="bg-white rounded-lg border border-yellow-200 p-4 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-2">Tamil Nadu</p>
                <p className="text-3xl font-bold text-yellow-600">{isLoading ? "..." : stats.tnTeams}</p>
              </div>
              <div className="bg-white rounded-lg border border-teal-200 p-4 text-center">
                <p className="text-xs font-semibold text-gray-600 mb-2">Telangana</p>
                <p className="text-3xl font-bold text-teal-600">{isLoading ? "..." : stats.tgTeams}</p>
              </div>
            </div>
          </div>

        {!isLoading && colleges.length > 0 && (
          <div className="bg-[#00214710] rounded-lg p-5 mb-8 border border-[#002147]">
            <h3 className="font-bold text-[#002147] mb-4 text-sm">College Statistics (Team Leader Count)</h3>
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
            <p className="text-gray-600 text-lg font-semibold">No final teams have registered yet</p>
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
                        Team ID
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
                    <th className="px-4 py-3 text-left font-semibold">Leader ParticipantID</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">Leader College</th>
                    <th className="px-4 py-3 text-left font-semibold">M1 PID</th>
                    <th className="px-4 py-3 text-left font-semibold">M1 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M1 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M1 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">M1 College</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 PID</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">M2 College</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 PID</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Name</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Email</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">M3 College</th>
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
                      key={team.finalTeamId} 
                      className={`border-b hover:bg-[#00214710] transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-900">{team.finalTeamId}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 truncate">{team.teamName}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.registrationId}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="bg-[#00214710] text-[#002147] px-2 py-1 rounded font-semibold">
                          {team.teamSize}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.participantId || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.leader?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[0]?.participantId || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[0]?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[0]?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[0]?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[0]?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[1]?.participantId || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[1]?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[1]?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[1]?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[1]?.college || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[2]?.participantId || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[2]?.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[2]?.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[2]?.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{team.members?.[2]?.college || "—"}</td>
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
            Showing {sortedTeams.length} of {teams.length} final teams ({stats.totalParticipants} total participants)
          </div>
        )}
      </main>
    </div>
  );
}