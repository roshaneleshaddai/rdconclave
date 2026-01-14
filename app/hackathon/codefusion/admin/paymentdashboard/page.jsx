"use client";

import { useState, useEffect } from "react";
import { Search, Download, X, ExternalLink, CheckCircle, Clock, XCircle, ChevronDown, Users, IndianRupee, TrendingUp, AlertCircle } from "lucide-react";

export default function PaymentsDashboard() {
  const [payments, setPayments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [domains, setDomains] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "submittedAt", direction: "desc" });
  
  // Image modal
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
    totalAmount: 0
  });

  // Unpaid teams state
  const [unpaidTeams, setUnpaidTeams] = useState([]);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [isLoadingUnpaid, setIsLoadingUnpaid] = useState(true);
  const [unpaidSearchQuery, setUnpaidSearchQuery] = useState("");
  const [selectedUnpaidDomain, setSelectedUnpaidDomain] = useState("all");
  const [unpaidDomains, setUnpaidDomains] = useState([]);

  useEffect(() => {
    fetchPayments();
    fetchUnpaidTeams();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://rd-backend-7cuu.onrender.com/api/payment/allpayments");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const paymentsData = data.payments || [];
        setPayments(paymentsData);
        setTotalCount(data.count || 0);
        
        // Extract unique domains
        const domainSet = new Set();
        paymentsData.forEach(payment => {
          if (payment.problemStatement) {
            domainSet.add(payment.problemStatement);
          }
        });
        setDomains(Array.from(domainSet).sort());
        
        calculateStats(paymentsData);
      } else {
        throw new Error("Failed to fetch payments data");
      }
    } catch (err) {
      setError(err.message || "Failed to load payments. Please try again.");
      console.error("Error fetching payments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnpaidTeams = async () => {
    setIsLoadingUnpaid(true);

    try {
      const response = await fetch("https://rd-backend-7cuu.onrender.com/api/payment/allunpaidteams");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const unpaidData = data.unpaidTeams || [];
        setUnpaidTeams(unpaidData);
        setUnpaidCount(data.total || 0);

        // Extract unique domains from unpaid teams
        const unpaidDomainSet = new Set();
        unpaidData.forEach(team => {
          if (team.problemStatement) {
            unpaidDomainSet.add(team.problemStatement);
          }
        });
        setUnpaidDomains(Array.from(unpaidDomainSet).sort());
      } else {
        console.error("Failed to fetch unpaid teams data");
      }
    } catch (err) {
      console.error("Error fetching unpaid teams:", err);
    } finally {
      setIsLoadingUnpaid(false);
    }
  };

  const calculateStats = (paymentsData) => {
    const total = paymentsData.length;
    const pending = paymentsData.filter(p => p.status === "PENDING").length;
    const verified = paymentsData.filter(p => p.status === "VERIFIED").length;
    const rejected = paymentsData.filter(p => p.status === "REJECTED").length;
    
    // Calculate total amount (assuming 300 per participant)
    const totalAmount = paymentsData.reduce((sum, payment) => {
      return sum + (payment.participants?.length || 0) * 300;
    }, 0);

    setStats({
      total,
      pending,
      verified,
      rejected,
      totalAmount
    });
  };

  const downloadPaymentsCSV = () => {
    let csvContent = "CODEFUSION PAYMENTS DETAILS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    
    csvContent += "Final Team ID,Registration ID,Team Name,Team Size,Problem Statement,Participant Name,Transaction ID,Payment Status,Submitted On\n";
    
    sortedPayments.forEach(payment => {
      const submittedDate = new Date(payment.submittedAt).toLocaleDateString();
      payment.participants.forEach(participant => {
        csvContent += `"${payment.finalTeamId}","${payment.registrationId}","${payment.teamName}",${payment.teamSize},"${payment.problemStatement}","${participant.name}","${participant.transactionId}","${payment.status}","${submittedDate}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Payments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadUnpaidTeamsCSV = () => {
    let csvContent = "CODEFUSION UNPAID TEAMS\n";
    csvContent += new Date().toLocaleDateString() + "\n\n";
    
    csvContent += "Team ID,Team Name,Problem Statement,Leader Name,Leader Email,Leader Phone,College\n";
    
    filteredUnpaidTeams.forEach(team => {
      csvContent += `"${team.teamId}","${team.teamName}","${team.problemStatement}","${team.leaderName}","${team.leaderEmail}","${team.leaderPhone}","${team.leaderCollege}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `CodeFusion_Unpaid_Teams_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.finalTeamId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.participants?.some(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;
    const matchesDomain = selectedDomain === "all" || payment.problemStatement === selectedDomain;
    
    return matchesSearch && matchesStatus && matchesDomain;
  });

  const filteredUnpaidTeams = unpaidTeams.filter(team => {
    const matchesSearch = 
      team.teamName.toLowerCase().includes(unpaidSearchQuery.toLowerCase()) ||
      team.teamId.toLowerCase().includes(unpaidSearchQuery.toLowerCase()) ||
      team.leaderName.toLowerCase().includes(unpaidSearchQuery.toLowerCase()) ||
      team.leaderEmail.toLowerCase().includes(unpaidSearchQuery.toLowerCase());
    
    const matchesDomain = selectedUnpaidDomain === "all" || team.problemStatement === selectedUnpaidDomain;
    
    return matchesSearch && matchesDomain;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (sortConfig.key === "submittedAt") {
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

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      verified: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200"
    };
    
    const icons = {
      pending: <Clock className="w-3.5 h-3.5" />,
      verified: <CheckCircle className="w-3.5 h-3.5" />,
      rejected: <XCircle className="w-3.5 h-3.5" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 sm:px-6 lg:px-8 pt-20 pb-12 mt-60">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Payment Proof"
              className="max-w-md max-h-96 object-contain rounded-xl shadow-2xl border-4 border-white"
              onClick={(e) => e.stopPropagation()}
            />
            <a
              href={selectedImage}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white text-gray-800 px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Open Original
            </a>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-start">
          <div className="mt-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              Payment Submissions
            </h1>
            <div className="w-20 h-0.5 bg-blue-600 mb-3"></div>
            <p className="text-xs sm:text-sm text-gray-600">
              CodeFusion 2026 • Payment Verification Dashboard
            </p>
          </div>
          <button
            onClick={() => {
              fetchPayments();
              fetchUnpaidTeams();
            }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium whitespace-nowrap mt-6"
          >
            Refresh Data
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-blue-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Total</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {isLoading ? "..." : stats.total}
            </p>
            <p className="text-xs text-gray-500 mt-1">Submissions</p>
          </div>

          <div className="bg-white rounded-xl border border-yellow-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Pending</p>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {isLoading ? "..." : stats.pending}
            </p>
            <p className="text-xs text-gray-500 mt-1">Under Review</p>
          </div>

          <div className="bg-white rounded-xl border border-green-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Verified</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {isLoading ? "..." : stats.verified}
            </p>
            <p className="text-xs text-gray-500 mt-1">Approved</p>
          </div>

          <div className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Rejected</p>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">
              {isLoading ? "..." : stats.rejected}
            </p>
            <p className="text-xs text-gray-500 mt-1">Declined</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-200 text-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider font-bold opacity-90">Total Amount</p>
              <IndianRupee className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">
              {isLoading ? "..." : `₹${stats.totalAmount.toLocaleString()}`}
            </p>
            <p className="text-xs opacity-90 mt-1">Revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search teams, IDs, or transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>

            <button
              onClick={downloadPaymentsCSV}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading payment submissions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-800 font-bold text-lg mb-2">Error Loading Payments</p>
            <p className="text-red-600 text-sm mb-5">{error}</p>
            <button
              onClick={fetchPayments}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && payments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-lg font-semibold">No Payment Submissions Yet</p>
            <p className="text-gray-500 text-sm mt-2">Payment data will appear here once submissions are received</p>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && !error && payments.length > 0 && sortedPayments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-lg font-semibold">No Matching Results</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Payments Table */}
        {!isLoading && !error && sortedPayments.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Payment Details</h2>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white border-b">
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-700" onClick={() => handleSort("teamName")}>
                      <div className="flex items-center gap-2">
                        Team Name
                        {sortConfig.key === "teamName" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Registration ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Final Team ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Team Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Problem Statement</th>
                    <th className="px-4 py-3 text-left font-semibold">Participant</th>
                    <th className="px-4 py-3 text-left font-semibold">Participant Id</th>
                    <th className="px-4 py-3 text-left font-semibold">Transaction ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Payment Proof</th>
                    <th className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-700" onClick={() => handleSort("submittedAt")}>
                      <div className="flex items-center gap-2">
                        Submitted On
                        {sortConfig.key === "submittedAt" && (
                          <ChevronDown className={`w-4 h-4 transition ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPayments.map((payment, paymentIdx) => 
                    payment.participants.map((participant, participantIdx) => (
                      <tr 
                        key={`${paymentIdx}-${participantIdx}`}
                        className={`border-b hover:bg-gray-50 transition ${(paymentIdx + participantIdx) % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">{participantIdx === 0 && payment.teamName}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{participantIdx === 0 && payment.registrationId}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{participantIdx === 0 && payment.finalTeamId}</td>
                        <td className="px-4 py-3 text-gray-700">{participantIdx === 0 && (
                          <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded font-semibold text-xs">
                            {payment.teamSize}
                          </span>
                        )}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs max-w-xs truncate">{participantIdx === 0 && payment.problemStatement}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{participant.name}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{participant.participantId}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs font-mono">{participant.transactionId}</td>
                        <td className="px-4 py-3">
                          {participant.paymentProofUrl ? (
                            <button
                              onClick={() => setSelectedImage(participant.paymentProofUrl)}
                              className="relative w-12 h-12 rounded overflow-hidden border border-gray-300 hover:border-blue-500 transition-all cursor-pointer group bg-gray-100"
                            >
                              <img
                                src={participant.paymentProofUrl}
                                alt="Payment proof"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all"></div>
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">No proof</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{participantIdx === 0 && new Date(payment.submittedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 bg-white inline-block px-6 py-3 rounded-full border border-gray-200 shadow-sm font-medium">
                Showing <span className="font-bold text-blue-600">{sortedPayments.length}</span> of <span className="font-bold text-gray-900">{payments.length}</span> submissions
              </p>
            </div>
          </div>
        )}

        {/* Unpaid Teams Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Unpaid Teams</h2>
              <div className="w-16 h-0.5 bg-orange-600 mb-2"></div>
              <p className="text-sm text-gray-600">Teams that have registered but not completed payment</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {isLoadingUnpaid ? "..." : unpaidCount}
                </p>
                <p className="text-xs text-gray-600">Pending Payment</p>
              </div>
            </div>
          </div>

          {/* Unpaid Teams Filters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search unpaid teams, IDs, or leaders..."
                  value={unpaidSearchQuery}
                  onChange={(e) => setUnpaidSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              <select
                value={selectedUnpaidDomain}
                onChange={(e) => setSelectedUnpaidDomain(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="all">All Domains</option>
                {unpaidDomains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>

              <button
                onClick={downloadUnpaidTeamsCSV}
                disabled={isLoadingUnpaid}
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Export Unpaid
              </button>
            </div>
          </div>

          {/* Loading State for Unpaid */}
          {isLoadingUnpaid && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading unpaid teams...</p>
            </div>
          )}

          {/* Empty State for Unpaid */}
          {!isLoadingUnpaid && unpaidTeams.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-gray-700 text-lg font-semibold">All Teams Have Paid!</p>
              <p className="text-gray-500 text-sm mt-2">There are no unpaid teams at the moment</p>
            </div>
          )}

          {/* No Results for Unpaid */}
          {!isLoadingUnpaid && unpaidTeams.length > 0 && filteredUnpaidTeams.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-700 text-lg font-semibold">No Matching Results</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          )}

          {/* Unpaid Teams Table */}
          {!isLoadingUnpaid && filteredUnpaidTeams.length > 0 && (
            <div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-orange-600 text-white border-b">
                      <th className="px-4 py-3 text-left font-semibold">Team ID</th>
                      <th className="px-4 py-3 text-left font-semibold">Team Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Problem Statement</th>
                      <th className="px-4 py-3 text-left font-semibold">Leader Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Leader Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Leader Phone</th>
                      <th className="px-4 py-3 text-left font-semibold">College</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnpaidTeams.map((team, idx) => (
                      <tr 
                        key={team.teamId}
                        className={`border-b hover:bg-orange-50 transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-4 py-3 font-semibold text-orange-700">{team.teamId}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{team.teamName}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.problemStatement}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leaderName}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leaderEmail}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{team.leaderPhone}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs max-w-xs truncate">{team.leaderCollege}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Unpaid Results Count */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 bg-white inline-block px-6 py-3 rounded-full border border-gray-200 shadow-sm font-medium">
                  Showing <span className="font-bold text-orange-600">{filteredUnpaidTeams.length}</span> of <span className="font-bold text-gray-900">{unpaidTeams.length}</span> unpaid teams
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}