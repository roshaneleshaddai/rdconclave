"use client";

import { useState, useEffect } from "react";
import { Search, Download, X, ExternalLink, CheckCircle, Clock, XCircle, ChevronDown, Users, IndianRupee, TrendingUp } from "lucide-react";

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
    pending: 2,
    verified: 0,
    rejected: 0,
    totalAmount: 0
  });

  useEffect(() => {
    fetchPayments();
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

  const calculateStats = (paymentsData) => {
    const total = paymentsData.length;
    const pending = paymentsData.filter(p => p.status === "pending").length;
    const verified = paymentsData.filter(p => p.status === "verified").length;
    const rejected = paymentsData.filter(p => p.status === "rejected").length;
    
    // Calculate total amount (assuming 100 per participant)
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
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Payment Submissions
              </h1>
              <p className="text-gray-600 mt-2 text-sm">CodeFusion 2026 - Payment Verification Dashboard</p>
            </div>
            <button
              onClick={fetchPayments}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Refresh Data
            </button>
          </div>
        </header>

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

        {/* Payments Grid */}
        {!isLoading && !error && sortedPayments.length > 0 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedPayments.map((payment) => (
                <div key={payment.finalTeamId} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-200">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{payment.teamName}</h3>
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                            ID: {payment.registrationId}
                          </span>
                          <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                            Final: {payment.finalTeamId}
                          </span>
                          <span className="inline-flex items-center gap-1 bg-blue-600 text-white px-2.5 py-1 rounded-md text-xs font-bold">
                            <Users className="w-3 h-3" />
                            {payment.teamSize}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Problem Statement */}
                    <div className="mb-5 pb-5 border-b border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1.5">Problem Statement</p>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed">{payment.problemStatement}</p>
                    </div>

                    {/* Participants */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">
                        Payment Proofs ({payment.participants.length})
                      </p>
                      <div className="space-y-3">
                        {payment.participants.map((participant, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="mb-3">
                              <p className="font-semibold text-gray-900 text-sm">{participant.name}</p>
                              <p className="text-xs text-gray-600 mt-1 font-mono bg-white px-2 py-1 rounded inline-block border border-gray-200">
                                {participant.transactionId}
                              </p>
                            </div>
                            
                            {/* Payment Proof Image */}
                            {participant.paymentProofUrl && (
                              <div className="relative group">
                                <img
                                  src={participant.paymentProofUrl}
                                  alt={`Payment proof for ${participant.name}`}
                                  className="w-full h-52 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
                                  onClick={() => setSelectedImage(participant.paymentProofUrl)}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all pointer-events-none"></div>
                                <p className="text-xs text-gray-500 mt-2 text-center font-medium">Click to enlarge</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Submitted on {new Date(payment.submittedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} at {new Date(payment.submittedAt).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 bg-white inline-block px-6 py-3 rounded-full border border-gray-200 shadow-sm font-medium">
                Showing <span className="font-bold text-blue-600">{sortedPayments.length}</span> of <span className="font-bold text-gray-900">{payments.length}</span> submissions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}