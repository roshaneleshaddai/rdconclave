"use client";
import { useState, useEffect } from 'react';

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

// API Functions
const BASE_URL = "https://rd-backend-7cuu.onrender.com/api";

const verifyRegistration = async (registrationId) => {
  try {
    const res = await fetch(`${BASE_URL}/quiz/verify-team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

const fetchQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/quiz/questions`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load questions. Please try again.");
  }
};

const submitQuiz = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Submission failed. Please try again." };
  }
};

// Loading Animation Component
const CoinFlip = () => {
   return (
     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
       <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div style={{ perspective: '1200px', width: '150px', height: '150px' }}>
        <div className="coin">
          {/* FRONT */}
       <div className="coin-face front">
              <img
                src="/rdlogo.webp"
               alt="RD Logo"
                 className="w-full h-full rounded-full object-cover"
               />
             </div>

             {/* BACK */}
             <div className="coin-face back">
               <img
                 src="/golden.png"
                 alt="Golden Logo"
                 className="w-full h-full rounded-full object-cover"
               />
             </div>
           </div>
         </div>
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

// Warning Popup Component
const WarningPopup = ({ message, onOkClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999999]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border-4"
        style={{ borderColor: COLORS.error }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: COLORS.error + "20" }}
        >
          <svg
            className="w-12 h-12"
            style={{ color: COLORS.error }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4v2m0 0m0 0m0 0"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
          ⚠️ WARNING
        </h2>

        <p
          className="text-base mb-8 leading-relaxed whitespace-pre-line"
          style={{ color: COLORS.grayText }}
        >
          {message}
        </p>

        <button
          onClick={onOkClick}
          className="w-full py-3 px-6 rounded-lg font-bold text-white text-lg transition-all shadow-lg hover:shadow-xl"
          style={{ backgroundColor: COLORS.primary }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = COLORS.primaryLight)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = COLORS.primary)
          }
        >
          OK – Return to Quiz
        </button>

        <style jsx>{`
          div {
            user-select: none;
            -webkit-user-select: none;
          }
        `}</style>
      </div>
    </div>
  );
};

// Question Card Component
// Question Card Component
const QuestionCard = ({ question, onAnswer, selected, currentIndex, totalQuestions, timeLeft, answeredQuestions }) => {
  const timePercentage = (timeLeft / 30) * 100;
  const isLowTime = timeLeft <= 10;
  const isMultiple = question.isMultiple || false;
  const selectedArray = Array.isArray(selected) ? selected : (selected !== undefined && selected !== -1 ? [selected] : []);

  const handleOptionClick = (idx) => {
    if (isMultiple) {
      // Multiple choice: toggle selection
      const newSelected = selectedArray.includes(idx)
        ? selectedArray.filter(i => i !== idx)
        : [...selectedArray, idx];
      onAnswer(newSelected);
    } else {
      // Single choice: replace selection
      onAnswer(idx);
    }
  };

  const isSelected = (idx) => {
    return isMultiple ? selectedArray.includes(idx) : selected === idx;
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-5 sm:p-8 border-2" style={{ borderColor: COLORS.primary + '20' }}>
      {/* Question Number */}
      <div className="mb-4 sm:mb-5 flex items-center gap-3">
        <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        {isMultiple && (
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.warning + '20', color: COLORS.warning }}>
            Multiple Answers
          </span>
        )}
      </div>

      {/* Timer Bar */}
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium" style={{ color: COLORS.grayText }}>Time Remaining</span>
          <span 
            className={`text-lg sm:text-xl font-bold ${isLowTime ? 'animate-pulse' : ''}`}
            style={{ color: isLowTime ? COLORS.error : COLORS.primary }}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-1000"
            style={{ 
              width: `${timePercentage}%`,
              backgroundColor: isLowTime ? COLORS.error : COLORS.primary
            }}
          />
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="mb-5 sm:mb-6">
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all border"
              style={{
                backgroundColor: answeredQuestions.includes(idx) ? COLORS.primary : 'transparent',
                borderColor: idx === currentIndex ? COLORS.primary : '#d1d5db',
                borderWidth: idx === currentIndex ? '2px' : '1px',
              }}
              title={`Question ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 select-none" style={{ color: COLORS.primary }} onCopy={(e) => e.preventDefault()} onDrag={(e) => e.preventDefault()}>{question.question}</h2>
      
      {isMultiple && (
        <p className="text-xs sm:text-sm mb-4 sm:mb-5 select-none" style={{ color: COLORS.grayText }}>
          Select all that apply
        </p>
      )}

      {/* Options */}
      <div className="space-y-2 sm:space-y-3 select-none">
        {question.options.map((opt, idx) => {
          const optionSelected = isSelected(idx);
          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className="w-full text-left border-2 p-3 sm:p-4 rounded-lg transition-all duration-200 text-sm sm:text-base select-none"
              style={{
                borderColor: optionSelected ? COLORS.primary : '#e5e7eb',
                backgroundColor: optionSelected ? COLORS.primary + '10' : '#ffffff',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              onCopy={(e) => e.preventDefault()}
              onDrag={(e) => e.preventDefault()}
            >
              <div className="flex items-center pointer-events-none">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 border-2 flex items-center justify-center mr-2 sm:mr-3 transition-all flex-shrink-0 ${isMultiple ? 'rounded' : 'rounded-full'}`}
                  style={{
                    borderColor: optionSelected ? COLORS.primary : '#d1d5db',
                    backgroundColor: optionSelected ? COLORS.primary : 'transparent',
                  }}
                >
                  {optionSelected && (
                    isMultiple ? (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                    )
                  )}
                </div>
                <span className="text-gray-700 font-medium select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Quiz Result Component
const QuizResult = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: COLORS.gray }}>
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-8 sm:p-12 border-2 max-w-sm w-full" style={{ borderColor: COLORS.primary + '20' }}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: COLORS.success + '20' }}>
          <svg className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: COLORS.success }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center" style={{ color: COLORS.primary }}>
          Quiz Submitted! 🎉
        </h1>
        <p className="text-center text-sm sm:text-base" style={{ color: COLORS.grayText }}>
          Your answers have been recorded. Thank you for participating!
        </p>
      </div>
    </div>
  );
};

// Quiz Instructions Component
const QuizInstructions = ({ totalQuestions, onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-10 sm:pt-20" style={{ backgroundColor: COLORS.gray }}>
      <div className="max-w-2xl w-full bg-white rounded-lg sm:rounded-2xl shadow-2xl p-6 sm:p-10 border-2" style={{ borderColor: COLORS.primary + '20' }}>
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: COLORS.primary + '10' }}>
            <svg className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: COLORS.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: COLORS.primary }}>Quiz Instructions</h1>
          <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>Please read carefully before starting</p>
        </div>

        <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>Total Questions: {totalQuestions}</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>You will be presented with {totalQuestions} questions in total.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>Time Per Question: 30 Seconds</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>Each question has a 30-second time limit. The quiz will automatically move to the next question when time expires.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>One Attempt Only</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>You get only ONE attempt per question. Once you move forward or time runs out, you cannot go back to previous questions.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">4</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>Fullscreen Mode Required</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>The quiz must be completed in fullscreen mode. Exiting fullscreen will trigger a warning.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">5</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>Penalty for Violations</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>Any violation (switching tabs, exiting fullscreen, etc.) will result in a -1 penalty to your score.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}>
              <span className="font-bold">6</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: COLORS.primary }}>Unanswered Questions</h3>
              <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>If you don't answer a question within 30 seconds, it will be automatically skipped and counted as unanswered.</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
          <p className="text-sm sm:text-base" style={{ color: COLORS.warning }}>
            <strong>⚠️ Important:</strong> Once you click "Start Quiz", the quiz will begin immediately in fullscreen mode. Make sure you're ready and in a distraction-free environment.
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full text-white py-3 sm:py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl text-base sm:text-lg"
          style={{ backgroundColor: COLORS.success }}
          onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.primary}
          onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.success}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

// Quiz Start Component
const QuizStart = ({ onVerified }) => {
  const [regId, setRegId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    window.dispatchEvent(new Event('quiz-started'));
    onVerified(regId);
  };

  if (loading) return <CoinFlip message="Verifying Registration..." />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-10 sm:pt-20" style={{ backgroundColor: COLORS.gray }}>
      <div className="max-w-sm w-full bg-white rounded-lg sm:rounded-2xl shadow-2xl p-6 sm:p-8 border-2" style={{ borderColor: COLORS.primary + '20' }}>
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>Quiz Verification</h1>
          <p className="text-xs sm:text-sm" style={{ color: COLORS.grayText }}>Enter your registration ID to begin</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              Registration ID
            </label>
            <input
              value={regId}
              onChange={(e) => setRegId(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              className="w-full border-2 p-2.5 sm:p-3 rounded-lg focus:outline-none transition-colors text-sm sm:text-base"
              style={{
                borderColor: COLORS.primary + '30',
                backgroundColor: 'white',
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.primary + '30'}
              placeholder="e.g., RD01"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleVerify}
            className="w-full text-white py-2.5 sm:py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.primaryLight}
            onMouseLeave={(e) => e.target.style.backgroundColor = COLORS.primary}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Quiz Screen Component
const QuizScreen = ({ registrationId, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions();
        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error("Invalid questions format");
        }
        enterFullscreen();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const enterFullscreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      }
    } catch (err) {
      console.log("Fullscreen request denied");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = document.fullscreenElement || document.webkitFullscreenElement;

      if (!isFs && !quizSubmitted && questions.length > 0) {
        const newViolations = violationCount + 1;
        setViolationCount(newViolations);
        setWarningMessage(`⚠️ Violation #${newViolations}!\n\nYou have exited fullscreen mode.\n\nPenalty: -1 point\n\nClick OK to return to fullscreen and continue.`);
        setShowWarning(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [quizSubmitted, questions.length, violationCount]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 5 && !quizSubmitted) {
        enterFullscreen();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [quizSubmitted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !quizSubmitted && questions.length > 0) {
        const newViolations = violationCount + 1;
        setViolationCount(newViolations);
        setWarningMessage(`⚠️ Violation #${newViolations}!\n\nYou switched tabs during the quiz.\n\nPenalty: -1 point\n\nClick OK to return to the quiz.`);
        setShowWarning(true);
        window.focus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [quizSubmitted, questions.length, violationCount]);

  useEffect(() => {
    if (!questions.length || loading) return;

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    const handleCut = (e) => {
      e.preventDefault();
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu, { passive: false });
    document.addEventListener('copy', handleCopy, { passive: false });
    document.addEventListener('cut', handleCut, { passive: false });
    document.addEventListener('paste', handlePaste, { passive: false });
    document.addEventListener('selectstart', handleSelectStart, { passive: false });
    document.addEventListener('dragstart', handleDragStart, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [questions.length, loading]);

  useEffect(() => {
    if (loading || submitting || quizSubmitted || !questions.length) return;

    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (index < questions.length - 1) {
            setIndex(i => i + 1);
          } else {
            handleAutoSubmit();
          }
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, loading, submitting, quizSubmitted, questions.length]);

  const handleAutoSubmit = async () => {
    if (quizSubmitted) return;
    
    setQuizSubmitted(true);
    setSubmitting(true);

    const allResponses = questions.map((q) => {
      const existing = responses.find(r => r.questionId === q.questionId);
      return existing || { questionId: q.questionId, selectedOption: -1 };
    });

    const res = await submitQuiz({ registrationId, responses: allResponses, violations: violationCount });
    setSubmitting(false);
    
    if (res.success) {
      setTimeout(() => {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        onSubmit(res);
      }, 500);
    } else {
      setError(res.message || "Submission failed. Please try again.");
      setQuizSubmitted(false);
    }
  };

  const handleAnswer = (option) => {
    if (quizSubmitted) return;
    
    const q = questions[index];
    const updated = responses.filter(r => r.questionId !== q.questionId);
    setResponses([...updated, { questionId: q.questionId, selectedOption: option }]);
    
    if (!answeredQuestions.includes(index)) {
      setAnsweredQuestions([...answeredQuestions, index]);
    }
  };

  const handleSubmit = async () => {
    if (quizSubmitted) return;
    
    const allResponses = questions.map((q) => {
      const existing = responses.find(r => r.questionId === q.questionId);
      return existing || { questionId: q.questionId, selectedOption: -1 };
    });

    setQuizSubmitted(true);
    setSubmitting(true);
    const res = await submitQuiz({ registrationId, responses: allResponses, violations: violationCount });
    setSubmitting(false);
    
    if (res.success) {
      setTimeout(() => {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        onSubmit(res);
      }, 500);
    } else {
      setError(res.message || "Submission failed. Please try again.");
      setQuizSubmitted(false);
    }
  };

  const handleWarningOk = () => {
    setShowWarning(false);
    setTimeout(() => {
      enterFullscreen();
    }, 100);
  };

  const currentResponse = responses.find(r => 
    r.questionId === questions[index]?.questionId
  );

  if (loading) return <CoinFlip message="Loading Questions..." />;
  if (submitting) return <CoinFlip message="Submitting Quiz..." />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: COLORS.gray }}>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl p-5 sm:p-6 max-w-sm w-full">
          <p className="text-red-600 font-medium text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 sm:px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all text-sm sm:text-base"
            style={{ backgroundColor: COLORS.error }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: COLORS.gray }}>
        <p className="text-sm sm:text-base" style={{ color: COLORS.grayText }}>No questions available.</p>
      </div>
    );
  }

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <>
      <WarningPopup 
        message={warningMessage} 
        onOkClick={handleWarningOk}
        isVisible={showWarning}
      />
      <div className="min-h-screen px-3 sm:px-4 py-4 sm:py-8" style={{ backgroundColor: COLORS.gray }}>
        <div className="max-w-2xl sm:max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-5 sm:mb-8">
            <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: COLORS.primary
                }}
              />
            </div>
          </div>

          <QuestionCard
            question={questions[index]}
            selected={currentResponse?.selectedOption}
            onAnswer={handleAnswer}
            currentIndex={index}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
            answeredQuestions={answeredQuestions}
          />

          <div className="flex justify-end mt-5 sm:mt-8 gap-3 sm:gap-4">
            {index === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={quizSubmitted}
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ backgroundColor: COLORS.success }}
              >
                Submit Quiz ✓
              </button>
            ) : (
              <button
                onClick={() => setIndex(i => i + 1)}
                disabled={quizSubmitted}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ backgroundColor: COLORS.primary }}
              >
                Next Question →
              </button>
            )}
          </div>

          {violationCount > 0 && (
            <div className="mt-6 p-4 sm:p-5 rounded-lg border-2" style={{ backgroundColor: '#fff3cd', borderColor: COLORS.warning }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.warning }}>
                  <span className="text-white font-bold text-lg">{violationCount}</span>
                </div>
                <div>
                  <p className="font-bold" style={{ color: COLORS.primary }}>Active Violations</p>
                  <p className="text-sm" style={{ color: COLORS.grayText }}>Penalty: {violationCount} point(s) will be deducted from your final score</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs sm:text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        body {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          height: 40px;
          width: 100%;
          z-index: 999999;
          pointer-events: all;
        }

        * {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        button {
          user-select: none;
          -webkit-user-select: none;
        }

        p, h1, h2, h3, h4, h5, h6, span, div {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
        }
      `}</style>
    </>
  );
};

// Main App Component
export default function QuizApp() {
  const [stage, setStage] = useState("start");
  const [registrationId, setRegistrationId] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(30);

  const handleVerified = (regId) => {
    setRegistrationId(regId);
    setStage("instructions");
  };

  const handleInstructionsStart = () => {
    setStage("quiz");
  };

  const handleSubmit = () => {
    setStage("result");
    window.dispatchEvent(new Event('quiz-ended'));
  };

  return (
    <div>
      {stage === "start" && <QuizStart onVerified={handleVerified} />}
      {stage === "instructions" && <QuizInstructions totalQuestions={totalQuestions} onStart={handleInstructionsStart} />}
      {stage === "quiz" && (
        <QuizScreen registrationId={registrationId} onSubmit={handleSubmit} />
      )}
      {stage === "result" && <QuizResult />}
    </div>
  );
}