"use client";

import { useState, useEffect } from "react";
import { Search, Download, X, ExternalLink, CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";

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
      return sum + (payment.participants?.length || 0) * 100;
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
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      verified: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300"
    };
    
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      verified: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
   <div className="bg-gradient-to-b from-gray-50 to-white px-4 pt-20 pb-8 font-sans mt-60">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Payment Proof"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <a
              href={selectedImage}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Open Original
            </a>
          </div>
        </div>
      )}

      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Payment Submissions</h1>
            <p className="text-gray-600 mt-1">CodeFusion 2026 - Payment Verification Dashboard</p>
          </div>
          <button
            onClick={fetchPayments}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 hover:shadow-lg transition">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Submissions</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {isLoading ? "..." : stats.total}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-yellow-200 p-6 hover:shadow-lg transition">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Pending</p>
          <p className="text-4xl font-bold text-yellow-600 mt-2">
            {isLoading ? "..." : stats.pending}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-green-200 p-6 hover:shadow-lg transition">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Verified</p>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {isLoading ? "..." : stats.verified}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-red-200 p-6 hover:shadow-lg transition">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Rejected</p>
          <p className="text-4xl font-bold text-red-600 mt-2">
            {isLoading ? "..." : stats.rejected}
          </p>
        </div>

        <div className="bg-white rounded-lg border-2 border-purple-200 p-6 hover:shadow-lg transition">
          <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Total Amount</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            {isLoading ? "..." : `₹${stats.totalAmount}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by team name, ID, transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm cursor-pointer"
          >
            <option value="all">All Domains</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>

          <button
            onClick={downloadPaymentsCSV}
            disabled={isLoading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment submissions...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-semibold mb-2">Error loading payments</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchPayments}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && payments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 text-lg font-semibold">No payment submissions yet</p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && payments.length > 0 && sortedPayments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 text-lg">No payments match your filters</p>
        </div>
      )}

      {/* Payments Grid */}
      {!isLoading && !error && sortedPayments.length > 0 && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPayments.map((payment) => (
              <div key={payment.finalTeamId} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{payment.teamName}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded">ID: {payment.registrationId}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Final ID: {payment.finalTeamId}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                        {payment.teamSize} Members
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>

                {/* Domain */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Problem Statement</p>
                  <p className="text-sm text-gray-700 font-medium">{payment.problemStatement}</p>
                </div>

                {/* Participants */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Participants & Payment Proofs</p>
                  <div className="space-y-3">
                    {payment.participants.map((participant, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{participant.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              Transaction ID: <span className="font-mono">{participant.transactionId}</span>
                            </p>
                          </div>
                        </div>
                        
                        {/* Payment Proof Image */}
                        {participant.paymentProofUrl && (
                          <div className="mt-3">
                            <img
                              src={participant.paymentProofUrl}
                              alt={`Payment proof for ${participant.name}`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-90 transition"
                              onClick={() => setSelectedImage(participant.paymentProofUrl)}
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">Click to view full size</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Submitted on {new Date(payment.submittedAt).toLocaleDateString()} at {new Date(payment.submittedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center">
            Showing {sortedPayments.length} of {payments.length} submissions
          </div>
        </div>
      )}
    </div>
  );
}