"use client";
import { useState, useEffect, useMemo } from 'react';

const BASE_URL = "https://rd-backend-m7gd.onrender.com/api";

// Loading Animation Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {trend && (
          <p className="text-xs text-gray-500 mt-2">{trend}</p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg ${color.replace('text', 'bg')}/10 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

// College Filter Dropdown
const CollegeFilter = ({ colleges, selectedCollege, onCollegeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      >
        <span className="text-sm font-medium text-gray-700 truncate">
          {selectedCollege || 'All Colleges'}
        </span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <button
              onClick={() => {
                onCollegeChange('');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                !selectedCollege ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
              }`}
            >
              All Colleges
            </button>
            {colleges.map((college, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onCollegeChange(college);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors border-t border-gray-100 ${
                  selectedCollege === college ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                }`}
              >
                {college}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Leaderboard Table Component
const LeaderboardTable = ({ data, loading, selectedCollege }) => {
  if (loading) return <LoadingSpinner />;

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">No leaderboard data available</p>
        <p className="text-sm text-gray-500 mt-1">
          {selectedCollege ? `No submissions from ${selectedCollege} yet` : 'Quiz submissions will appear here'}
        </p>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-md">
          <span className="text-xl">🏆</span>
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-md">
          <span className="text-xl">🥈</span>
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-md">
          <span className="text-xl">🥉</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200">
        <span className="text-sm font-bold text-gray-600">{rank}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">College</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registration ID</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((team, idx) => (
              <tr 
                key={team.registrationId} 
                className={`hover:bg-gray-50 transition-colors ${
                  idx < 3 ? 'bg-gradient-to-r from-yellow-50/40 to-transparent' : ''
                }`}
              >
                <td className="px-6 py-4">
                  {getRankBadge(team.rank)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{team.teamName}</p>
                    <p className="text-sm text-gray-600">{team.leaderName}</p>
                    <p className="text-xs text-gray-500">{team.leaderEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-700">{team.college}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {team.registrationId}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center justify-center min-w-[3rem] h-12 px-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <span className="text-xl font-bold text-green-700">{team.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    {new Date(team.submittedAt).toLocaleDateString('en-IN', { 
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(team.submittedAt).toLocaleTimeString('en-IN', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden divide-y divide-gray-100">
        {data.map((team, idx) => (
          <div 
            key={team.registrationId} 
            className={`p-5 ${idx < 3 ? 'bg-gradient-to-r from-yellow-50/40 to-transparent' : ''}`}
          >
            <div className="flex items-start gap-4">
              {getRankBadge(team.rank)}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{team.teamName}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{team.leaderName}</p>
                  </div>
                  <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 flex-shrink-0">
                    <span className="text-lg font-bold text-green-700">{team.score}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-2">{team.leaderEmail}</p>
                <p className="text-sm text-gray-700 mb-3">{team.college}</p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {team.registrationId}
                  </span>
                  <p className="text-xs text-gray-500">
                    {new Date(team.submittedAt).toLocaleDateString('en-IN', { 
                      day: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Teams Grid Component
const TeamsGrid = ({ data, loading, searchTerm }) => {
  if (loading) return <LoadingSpinner />;

  const filteredTeams = data.filter(team => 
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredTeams.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">No teams found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {filteredTeams.map((team) => (
        <div 
          key={team._id} 
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-indigo-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">{team.teamName}</h3>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                {team.registrationId}
              </span>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-semibold flex-shrink-0">
              {team.teamSize}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="border-l-3 border-indigo-500 pl-3 py-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Team Leader</p>
              <p className="font-semibold text-gray-900">{team.leader.name}</p>
              <p className="text-sm text-gray-600 mt-0.5">{team.leader.email}</p>
              <p className="text-sm text-gray-600">{team.leader.phone}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div>
                <p className="text-xs font-medium text-gray-500">College</p>
                <p className="text-sm text-gray-900">{team.leader.college}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Department</p>
                  <p className="text-sm text-gray-900">{team.leader.department}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Year</p>
                  <p className="text-sm text-gray-900">{team.leader.year}</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <p className="text-xs font-medium text-indigo-600 mb-1">Problem Statement</p>
              <p className="text-sm font-semibold text-indigo-900">{team.problemStatement}</p>
            </div>
          </div>

          {team.members && Object.keys(team.members).length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Team Members</p>
              {Object.values(team.members).map((member, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{member.email}</p>
                </div>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Registered on {new Date(team.createdAt).toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
export default function LeaderboardDashboard() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [leaderboard, setLeaderboard] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');

  useEffect(() => {
    fetchLeaderboard();
    fetchTeams();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true);
      const res = await fetch(`${BASE_URL}/quiz/leaderboard`);
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const fetchTeams = async () => {
    try {
      setLoadingTeams(true);
      const res = await fetch(`${BASE_URL}/teams/all`);
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoadingTeams(false);
    }
  };

  // Extract unique colleges from leaderboard
  const colleges = useMemo(() => {
    const collegeSet = new Set(leaderboard.map(team => team.college).filter(Boolean));
    return Array.from(collegeSet).sort();
  }, [leaderboard]);

  // Filter leaderboard by selected college
  const filteredLeaderboard = useMemo(() => {
    if (!selectedCollege) return leaderboard;
    return leaderboard.filter(team => team.college === selectedCollege);
  }, [leaderboard, selectedCollege]);

  // Calculate stats based on filtered data
  const stats = useMemo(() => {
    const filtered = selectedCollege 
      ? leaderboard.filter(team => team.college === selectedCollege)
      : leaderboard;
    
    const filteredTeams = selectedCollege
      ? teams.filter(team => team.leader.college === selectedCollege)
      : teams;

    return [
      {
        title: 'Total Teams',
        value: filteredTeams.length,
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>,
        color: 'text-blue-600',
        trend: selectedCollege ? `From ${selectedCollege}` : 'Across all colleges'
      },
      {
        title: 'Quiz Completed',
        value: filtered.length,
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
        color: 'text-green-600',
        trend: `${filteredTeams.length > 0 ? Math.round((filtered.length / filteredTeams.length) * 100) : 0}% completion rate`
      },
      {
        title: 'Top Score',
        value: filtered[0]?.score || 0,
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
        color: 'text-yellow-600',
        trend: filtered[0]?.teamName || 'No submissions yet'
      },
      {
        title: 'Pending Quiz',
        value: filteredTeams.length - filtered.length,
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>,
        color: 'text-orange-600',
        trend: 'Awaiting submission'
      }
    ];
  }, [leaderboard, teams, selectedCollege]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 pt-40 sm:pt-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Quiz Dashboard
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Track team performance and leaderboard rankings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-3 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 flex-1">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🏆 Leaderboard
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'teams'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                👥 All Teams
              </button>
            </div>
            
            {activeTab === 'leaderboard' && colleges.length > 0 && (
              <CollegeFilter 
                colleges={colleges}
                selectedCollege={selectedCollege}
                onCollegeChange={setSelectedCollege}
              />
            )}
          </div>
        </div>

        {/* Search Bar (only for teams tab) */}
        {activeTab === 'teams' && (
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search teams, ID, leader, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 focus:outline-none transition-all text-sm"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'leaderboard' ? (
          <LeaderboardTable 
            data={filteredLeaderboard} 
            loading={loadingLeaderboard}
            selectedCollege={selectedCollege}
          />
        ) : (
          <TeamsGrid data={teams} loading={loadingTeams} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}