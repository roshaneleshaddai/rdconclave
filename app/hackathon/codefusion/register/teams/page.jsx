"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated === "true") {
      router.push("/hackathon/codefusion/register/teams/all");
    }
    setIsAuthChecking(false);
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!adminName.trim() || !adminPassword.trim()) {
      setError("Please enter both admin name and password");
      setIsLoading(false);
      return;
    }

    const VALID_ADMIN_NAME = "admin";
    const VALID_ADMIN_PASSWORD = "codefusion2025";

    setTimeout(() => {
      if (adminName === VALID_ADMIN_NAME && adminPassword === VALID_ADMIN_PASSWORD) {
        localStorage.setItem("isAdminAuthenticated", "true");
        localStorage.setItem("adminName", adminName);
        localStorage.setItem("loginTimestamp", new Date().toISOString());
        
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/hackathon/codefusion/register/teams/all");
        }, 1500);
      } else {
        setError("Invalid admin credentials. Please try again.");
        setIsLoading(false);
      }
    }, 500);
  };

  // Redirecting Screen
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 fixed inset-0 z-50">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#002147] p-8 max-w-sm w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="animate-spin">
              <svg className="w-16 h-16 text-[#002147]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#002147] mb-2">
            Authentication Successful
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Auth Checking Screen
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto mb-4" />
          <p className="text-gray-600 font-SUSE">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 lg:pt-64 pb-12 font-SUSE" style={{ fontFamily: "SUSE, sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#002147] overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-6 sm:p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-white/20 p-3 rounded-full">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              CodeFusion Dashboard
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm">
              Admin Access Portal
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="space-y-5">
              {/* Admin Name */}
              <div>
                <label 
                  htmlFor="adminName" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Admin Name
                </label>
                <input
                  id="adminName"
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] outline-none transition text-sm bg-white"
                  placeholder="Enter admin name"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              {/* Admin Password */}
              <div>
                <label 
                  htmlFor="adminPassword" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Admin Password
                </label>
                <input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] outline-none transition text-sm bg-white"
                  placeholder="Enter password"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-[#002147] hover:bg-[#003366] text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-base mt-8"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Login as Admin"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}