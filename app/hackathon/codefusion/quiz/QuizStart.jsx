"use client";
import { useState } from "react";
import { verifyRegistration } from "./quizApi";

// Academic Color Palette
const COLORS = {
  primary: '#002147',
  primaryLight: '#003366',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f97316',
  gray: '#f3f4f6',
  grayText: '#6b7280',
};

// Loading Component
const CoinFlip = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
        <div style={{ perspective: '1200px', width: '120px', height: '120px' }} className="sm:w-[150px] sm:h-[150px]">
          <div className="coin">
            <div className="coin-face front">
              <img
                src="/rdlogo.webp"
                alt="RD Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="coin-face back">
              <img
                src="/golden.png"
                alt="Golden Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold" style={{ color: COLORS.primary }}>{message}</p>
      </div>

      <style jsx>{`
        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spinY 1.2s linear infinite;
        }

        @keyframes spinY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        .coin-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

// Instructions Modal Component
const InstructionsModal = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-2xl w-full border-2" style={{ borderColor: COLORS.primary + '20' }}>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Quiz Instructions
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
        </div>

        <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
          <div className="flex gap-4 items-start p-4 rounded-lg" style={{ backgroundColor: COLORS.primary + '08' }}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: COLORS.primary }}>
                <span className="text-white font-bold text-sm">1</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg" style={{ color: COLORS.primary }}>Total Questions</h3>
              <p style={{ color: COLORS.grayText }} className="text-sm sm:text-base">This quiz contains <strong>30 questions</strong> in total.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-lg" style={{ backgroundColor: COLORS.primary + '08' }}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: COLORS.primary }}>
                <span className="text-white font-bold text-sm">2</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg" style={{ color: COLORS.primary }}>Time Per Question</h3>
              <p style={{ color: COLORS.grayText }} className="text-sm sm:text-base">You have exactly <strong>30 seconds</strong> to answer each question. The timer will automatically move you to the next question when time expires.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-lg" style={{ backgroundColor: COLORS.primary + '08' }}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: COLORS.primary }}>
                <span className="text-white font-bold text-sm">3</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg" style={{ color: COLORS.primary }}>No Going Back</h3>
              <p style={{ color: COLORS.grayText }} className="text-sm sm:text-base">Once you answer a question and move forward, you <strong>cannot return</strong> to previous questions. Choose your answers carefully.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-lg" style={{ backgroundColor: COLORS.primary + '08' }}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: COLORS.primary }}>
                <span className="text-white font-bold text-sm">4</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg" style={{ color: COLORS.primary }}>Fullscreen Mode</h3>
              <p style={{ color: COLORS.grayText }} className="text-sm sm:text-base">The quiz will enter fullscreen mode. Do not attempt to exit fullscreen during the quiz.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 text-white py-3 sm:py-4 rounded-lg font-semibold transition-all text-sm sm:text-base"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.primaryLight}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            I Understand, Let's Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default function QuizStart({ onVerified }) {
  const [regId, setRegId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [pendingRegId, setPendingRegId] = useState("");

  const handleVerify = async () => {
    if (!regId.trim()) {
      setError("Please enter a registration ID");
      return;
    }

    setError("");
    setLoading(true);
    const res = await verifyRegistration(regId);
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Verification failed");
      return;
    }
    
    // Show instructions modal instead of redirecting
    setPendingRegId(regId);
    setShowInstructions(true);
  };

  const handleInstructionsConfirm = () => {
    setShowInstructions(false);
    // Dispatch event to hide header/footer
    window.dispatchEvent(new Event('quiz-started'));
    onVerified(pendingRegId);
  };

  if (loading) return <CoinFlip message="Verifying Registration..." />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 sm:pt-40 pb-10" style={{ backgroundColor: COLORS.gray }}>
      <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 border-2" style={{ borderColor: COLORS.primary + '15' }}>
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: COLORS.primary }}>
            Quiz Verification
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: COLORS.grayText }}>
            Enter your registration ID to begin the quiz
          </p>
          <div className="w-12 h-1 rounded-full mt-3 mx-auto" style={{ backgroundColor: COLORS.primary }}></div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-3" style={{ color: COLORS.primary }}>
              Registration ID
            </label>
            <input
              value={regId}
              onChange={(e) => setRegId(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              className="w-full border-2 p-3 sm:p-3.5 rounded-lg focus:outline-none transition-all text-sm sm:text-base"
              style={{
                borderColor: COLORS.primary + '30',
                backgroundColor: '#ffffff',
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.primary + '30'}
              placeholder="e.g., RD01"
            />
            <p className="text-xs mt-2" style={{ color: COLORS.grayText }}>
              Check your registration confirmation email for your ID
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fef2f2', borderColor: COLORS.error }}>
              <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            onClick={handleVerify}
            className="w-full text-white py-3 sm:py-3.5 rounded-lg font-semibold transition-all text-sm sm:text-base"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.primaryLight}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Verify & Continue
          </button>
        </div>
      </div>

      {showInstructions && <InstructionsModal onConfirm={handleInstructionsConfirm} />}
    </div>
  );
}