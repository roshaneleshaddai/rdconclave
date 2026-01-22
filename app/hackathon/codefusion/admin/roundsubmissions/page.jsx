'use client';
import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, FileText, Award, Trophy, Calendar, Users, Code, Github, Globe } from 'lucide-react';

// Loading Skeleton Component
const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-gray-200 h-16 rounded-lg"></div>
      ))}
    </div>
  );
};

// Error Display Component
const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-8 text-center">
      <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-red-800 mb-2">Failed to Load Data</h3>
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ roundName }) => {
  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-12 text-center">
      <FileText size={64} className="text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-700 mb-2">No Submissions Yet</h3>
      <p className="text-gray-500">No teams have submitted for {roundName} yet.</p>
    </div>
  );
};

// Round 1 Table Component
const Round1Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <EmptyState roundName="Round 1" />;
  }

  // Sort by latest first
  const sortedData = [...data].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#002147] text-white">
            <th className="px-4 py-3 text-left text-sm font-bold">Team ID</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Team Name</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Track</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Problem #</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Tech Stack</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Submitted</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((submission, index) => (
            <tr 
              key={submission._id} 
              className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 text-sm font-semibold text-[#002147]">
                {submission.finalTeamId}
              </td>
              <td className="px-4 py-3 text-sm">{submission.teamName}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                  {submission.trackSelected}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-center">
                {submission.problemStatementNumber}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="max-w-xs truncate" title={submission.techStack}>
                  {submission.techStack}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(submission.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => {
                    const details = `
Problem Understanding: ${submission.problemUnderstanding}

Proposed Solution: ${submission.proposedSolution}

Feasibility: ${submission.feasibility}
                    `.trim();
                    alert(details);
                  }}
                  className="px-3 py-1 bg-[#002147] text-white text-xs rounded hover:bg-[#001a35] transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Round 2 Table Component
const Round2Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <EmptyState roundName="Round 2" />;
  }

  // Sort by latest first
  const sortedData = [...data].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#002147] text-white">
            <th className="px-4 py-3 text-left text-sm font-bold">Team ID</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Team Name</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Track</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Problem #</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Prototype Status</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Demo Video</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((submission, index) => (
            <tr 
              key={submission._id} 
              className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 text-sm font-semibold text-[#002147]">
                {submission.finalTeamId}
              </td>
              <td className="px-4 py-3 text-sm">{submission.teamName}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                  {submission.trackSelected}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-center">
                {submission.problemStatementNumber}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="max-w-xs truncate" title={submission.prototypeStatus}>
                  {submission.prototypeStatus}
                </div>
              </td>
              <td className="px-4 py-3">
                <a
                  href={submission.demoVideoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  View Video
                </a>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(submission.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Final Round Table Component
const FinalTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <EmptyState roundName="Final Round" />;
  }

  // Sort by latest first
  const sortedData = [...data].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <th className="px-4 py-3 text-left text-sm font-bold">Team ID</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Team Name</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Track</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Live Demo</th>
            <th className="px-4 py-3 text-left text-sm font-bold">GitHub</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Submitted</th>
            <th className="px-4 py-3 text-left text-sm font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((submission, index) => (
            <tr 
              key={submission._id} 
              className={`border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 text-sm font-semibold text-[#002147]">
                {submission.finalTeamId}
              </td>
              <td className="px-4 py-3 text-sm">{submission.teamName}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                  {submission.trackSelected}
                </span>
              </td>
              <td className="px-4 py-3">
                {submission.liveDeploymentLink ? (
                  <a
                    href={submission.liveDeploymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Globe size={14} />
                    <span>View</span>
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">N/A</span>
                )}
              </td>
              <td className="px-4 py-3">
                <a
                  href={submission.githubRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-800 hover:text-black text-sm"
                >
                  <Github size={14} />
                  <span>Repo</span>
                </a>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(submission.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => {
                    const details = `Scalability & Future Scope:\n\n${submission.scalabilityAndFutureScope}`;
                    alert(details);
                  }}
                  className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                >
                  View Scope
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('round1');
  const [data, setData] = useState({
    round1: null,
    round2: null,
    final: null
  });
  const [loading, setLoading] = useState({
    round1: false,
    round2: false,
    final: false
  });
  const [errors, setErrors] = useState({
    round1: null,
    round2: null,
    final: null
  });

  // Fetch data for a specific round
  const fetchRoundData = async (round) => {
    const endpoints = {
      round1: 'https://rd-backend-m7gd.onrender.com/api/submission/round1/',
      round2: 'https://rd-backend-m7gd.onrender.com/api/submission/round2/',
      final: 'https://rd-backend-m7gd.onrender.com/api/submission/final/'
    };

    setLoading(prev => ({ ...prev, [round]: true }));
    setErrors(prev => ({ ...prev, [round]: null }));

    try {
      const response = await fetch(endpoints[round]);
      const result = await response.json();

      if (result.success) {
        setData(prev => ({ ...prev, [round]: result.submissions }));
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error(`Error fetching ${round} data:`, error);
      setErrors(prev => ({ 
        ...prev, 
        [round]: error.message || 'Network error. Please try again.' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [round]: false }));
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchRoundData('round1');
    fetchRoundData('round2');
    fetchRoundData('final');
  }, []);

  // Tab configuration
  const tabs = [
    { id: 'round1', label: 'Round 1', icon: FileText, color: 'blue' },
    { id: 'round2', label: 'Round 2', icon: Award, color: 'purple' },
    { id: 'final', label: 'Final Round', icon: Trophy, color: 'yellow' }
  ];

  // Get stats for each round
  const getStats = () => {
    return {
      round1: data.round1?.length || 0,
      round2: data.round2?.length || 0,
      final: data.final?.length || 0,
      total: (data.round1?.length || 0) + (data.round2?.length || 0) + (data.final?.length || 0)
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 px-4 font-[SUSE,sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#002147] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                CodeFusion 2026 • Submission Management
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Total Submissions</div>
              <div className="text-3xl font-bold text-[#002147]">{stats.total}</div>
            </div>
          </div>
          <div className="w-32 h-1 bg-[#002147]"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <FileText size={32} className="text-blue-600" />
              <span className="text-3xl font-bold text-blue-600">{stats.round1}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Round 1</h3>
            <p className="text-sm text-gray-500">Concept Submissions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <Award size={32} className="text-purple-600" />
              <span className="text-3xl font-bold text-purple-600">{stats.round2}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Round 2</h3>
            <p className="text-sm text-gray-500">Prototype Submissions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-100">
            <div className="flex items-center justify-between mb-2">
              <Trophy size={32} className="text-yellow-600" />
              <span className="text-3xl font-bold text-yellow-600">{stats.final}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Final Round</h3>
            <p className="text-sm text-gray-500">Final Submissions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold text-base transition-all ${
                    isActive
                      ? 'bg-[#002147] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    isActive 
                      ? 'bg-white text-[#002147]' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stats[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Round 1 Content */}
            {activeTab === 'round1' && (
              <div>
                {loading.round1 ? (
                  <TableSkeleton />
                ) : errors.round1 ? (
                  <ErrorDisplay 
                    message={errors.round1} 
                    onRetry={() => fetchRoundData('round1')}
                  />
                ) : (
                  <Round1Table data={data.round1} />
                )}
              </div>
            )}

            {/* Round 2 Content */}
            {activeTab === 'round2' && (
              <div>
                {loading.round2 ? (
                  <TableSkeleton />
                ) : errors.round2 ? (
                  <ErrorDisplay 
                    message={errors.round2} 
                    onRetry={() => fetchRoundData('round2')}
                  />
                ) : (
                  <Round2Table data={data.round2} />
                )}
              </div>
            )}

            {/* Final Round Content */}
            {activeTab === 'final' && (
              <div>
                {loading.final ? (
                  <TableSkeleton />
                ) : errors.final ? (
                  <ErrorDisplay 
                    message={errors.final} 
                    onRetry={() => fetchRoundData('final')}
                  />
                ) : (
                  <FinalTable data={data.final} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;