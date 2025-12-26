"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Form state
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated on component mount
  useEffect(() => {
    // Check localStorage for existing authentication
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    
    if (isAuthenticated === "true") {
      // Already logged in, redirect to teams page
      router.push("/hackathon/codefusion/register/teams/all");
    }
  }, [router]);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple validation
    if (!adminName.trim() || !adminPassword.trim()) {
      setError("Please enter both admin name and password");
      setIsLoading(false);
      return;
    }

    // Frontend-only authentication logic
    // In a real scenario, you'd verify against hardcoded credentials or a simple check
    // For this hackathon dashboard, we'll use a simple check
    // You can modify these credentials as needed
    const VALID_ADMIN_NAME = "admin";
    const VALID_ADMIN_PASSWORD = "codefusion2025";

    if (adminName === VALID_ADMIN_NAME && adminPassword === VALID_ADMIN_PASSWORD) {
      // Authentication successful
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminName", adminName);
      localStorage.setItem("loginTimestamp", new Date().toISOString());
      
      // Redirect to teams page
      router.push("/hackathon/codefusion/register/teams/all");
    } else {
      // Authentication failed
      setError("Invalid admin credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CodeFusion Admin
          </h1>
          <p className="text-gray-600">
            Access registered hackathon teams
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Admin Name Input */}
          <div>
            <label 
              htmlFor="adminName" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin Name
            </label>
            <input
              id="adminName"
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter admin name"
              disabled={isLoading}
            />
          </div>

          {/* Admin Password Input */}
          <div>
            <label 
              htmlFor="adminPassword" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Authenticating..." : "Login as Admin"}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Secure frontend authentication</p>
        </div>
      </div>
    </div>
  );
}