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
      <div className="min-h-screen bg-gradient-to-br from-[#002147] to-[#003366] flex flex-col items-center justify-center p-4">
        <style>{`
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseScale {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .float-icon { animation: float 3s ease-in-out infinite; }
          .pulse-scale { animation: pulseScale 2s ease-in-out infinite; }
          .fade-in-down { animation: fadeInDown 0.8s ease-out; }
        `}
        </style>

        <div className="flex flex-col items-center gap-8">
          <div className="float-icon">
            <div className="pulse-scale">
              <div className="bg-white/20 p-6 rounded-full border-2 border-white/30">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center fade-in-down">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Authentication Successful
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-8">
              Redirecting to your dashboard...
            </p>

            <div className="flex gap-2 justify-center mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-white/60"
                  style={{
                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  animation: "slideUp 1.5s ease-in-out infinite",
                  width: "40%",
                }}
              />
            </div>
          </div>

          <p className="text-white/60 text-xs sm:text-sm mt-8">
            Please wait while we prepare your dashboard...
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
    <div className="min-h-screen bg-gradient-to-br from-[#00214705] to-[#00214710] flex items-center justify-center p-4 font-SUSE" style={{ fontFamily: "SUSE, sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl border-2 border-[#002147] overflow-hidden">
          
          <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-white/20 p-3 rounded-full">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              CodeFusion Dashboard
            </h1>
            <p className="text-gray-200 text-sm">
              Admin Access Portal
            </p>
          </div>

          <div className="p-8">
            <div className="space-y-5">
              <div>
                <label 
                  htmlFor="adminName" 
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#002147]" />
                  Admin Name
                </label>
                <input
                  id="adminName"
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] outline-none transition text-sm bg-gray-50 hover:bg-white"
                  placeholder="Enter admin name"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              <div>
                <label 
                  htmlFor="adminPassword" 
                  className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#002147]" />
                  Admin Password
                </label>
                <input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] outline-none transition text-sm bg-gray-50 hover:bg-white"
                  placeholder="Enter password"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-[#002147] hover:bg-[#003366] text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-base mt-6"
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

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">Secure Access</span>
              </div>
            </div>

            <div className="bg-[#00214705] border border-[#002147] rounded-lg p-4 text-xs text-gray-700 space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-[#002147] font-bold">•</span>
                <span><span className="font-semibold">Demo Credentials:</span> Username: admin | Password: codefusion2025</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#002147] font-bold">•</span>
                <span>🔒 Frontend authentication for authorized access only</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-600 border-t border-gray-200">
            <p>CodeFusion Registration Dashboard © 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}