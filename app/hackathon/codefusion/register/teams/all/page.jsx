"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeamsListPage() {
  const router = useRouter();
  
  // State management
  const [teams, setTeams] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState("");

  // AUTH GUARD: Check authentication on mount and page refresh
  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
      const storedAdminName = localStorage.getItem("adminName");
      
      if (isAuthenticated !== "true") {
        // Not authenticated, redirect to login page
        router.push("/hackathon/codefusion/register/teams");
        return false;
      }
      
      // Authenticated, set admin name for display
      setAdminName(storedAdminName || "Admin");
      setIsAuthChecking(false);
      return true;
    };

    // Perform auth check
    const isAuth = checkAuthentication();
    
    // Only fetch teams if authenticated
    if (isAuth) {
      fetchTeams();
    }
  }, [router]);

  // Fetch teams data from API
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
        setTeams(data.teams || []);
        setTotalCount(data.count || 0);
        // Logging after state update - these will show old values due to async nature
        // To see new values, use useEffect or log data.teams directly
        console.log("Fetched teams:", data.teams);
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

  // Handle logout
  const handleLogout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminName");
    localStorage.removeItem("loginTimestamp");
    
    // Redirect to login page
    router.push("/hackathon/codefusion/register/teams");
  };

  // Show loading state while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                CodeFusion Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, <span className="font-semibold">{adminName}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Registrations</p>
              <p className="text-4xl font-bold text-indigo-600 mt-2">
                {isLoading ? "..." : totalCount}
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-full">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teams data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-medium mb-2">Error loading teams</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchTeams}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && teams.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No teams registered yet</p>
          </div>
        )}

        {/* Teams List */}
        {!isLoading && !error && teams.length > 0 && (
          <div className="space-y-6">
            {teams.map((team, index) => (
              <div
                key={team._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {/* Team Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-t-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{team.teamName}</h2>
                      <p className="text-indigo-100 text-sm">
                        Registration ID: {team.registrationId}
                      </p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      Team #{index + 1}
                    </div>
                  </div>
                </div>

                {/* Team Details */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Team Size</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {team.teamSize} Members
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Problem Statement</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {team.problemStatement}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Registered On</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(team.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Leader Details - Only show if leader data exists */}
                  {team.leader && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-bold mr-2">
                          LEADER
                        </span>
                        Team Leader
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-4 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-600">Name</p>
                          <p className="font-medium text-gray-900">{team.leader.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Email</p>
                          <p className="font-medium text-gray-900">{team.leader.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Phone</p>
                          <p className="font-medium text-gray-900">{team.leader.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">College</p>
                          <p className="font-medium text-gray-900">{team.leader.college}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Department</p>
                          <p className="font-medium text-gray-900">{team.leader.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Year</p>
                          <p className="font-medium text-gray-900">Year {team.leader.year}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show message if leader data is missing */}
                  {!team.leader && (
                    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Leader information is incomplete for this team
                      </p>
                    </div>
                  )}

                  {/* Team Members */}
                  {team.members && (team.members.member2 || team.members.member3) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold mr-2">
                          MEMBERS
                        </span>
                        Team Members
                      </h3>
                      <div className="space-y-4">
                        {/* Member 2 */}
                        {team.members.member2 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50 p-4 rounded-lg">
                            <div>
                              <p className="text-xs text-gray-600">Name</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member2.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Email</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member2.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Phone</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member2.phone}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Member 3 */}
                        {team.members.member3 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50 p-4 rounded-lg">
                            <div>
                              <p className="text-xs text-gray-600">Name</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member3.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Email</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member3.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Phone</p>
                              <p className="font-medium text-gray-900">
                                {team.members.member3.phone}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}