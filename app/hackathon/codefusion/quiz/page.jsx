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
const BASE_URL = "https://rd-backend-m7gd.onrender.com/api";

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

// Question Card Component
const QuestionCard = ({ question, onAnswer, selected, currentIndex, totalQuestions, timeLeft, answeredQuestions }) => {
  const timePercentage = (timeLeft / 30) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-5 sm:p-8 border-2" style={{ borderColor: COLORS.primary + '20' }}>
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
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all border border-gray-300"
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
      <h2 className="text-lg sm:text-2xl font-bold mb-5 sm:mb-6" style={{ color: COLORS.primary }}>{question.question}</h2>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className="w-full text-left border-2 p-3 sm:p-4 rounded-lg transition-all duration-200 text-sm sm:text-base"
            style={{
              borderColor: selected === idx ? COLORS.primary : '#e5e7eb',
              backgroundColor: selected === idx ? COLORS.primary + '10' : '#ffffff',
            }}
          >
            <div className="flex items-center">
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 transition-all flex-shrink-0"
                style={{
                  borderColor: selected === idx ? COLORS.primary : '#d1d5db',
                  backgroundColor: selected === idx ? COLORS.primary : 'transparent',
                }}
              >
                {selected === idx && (
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                )}
              </div>
              <span className="text-gray-700 font-medium">{opt}</span>
            </div>
          </button>
        ))}
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

// Quiz Screen Component with Fullscreen
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

  // Prevent fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !quizSubmitted && !submitting && questions.length > 0) {
        enterFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [quizSubmitted, submitting, questions.length]);

  // Disable right-click and keyboard shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.key === 'F11' || (e.ctrlKey && e.shiftKey && e.key === 'I') || 
          (e.ctrlKey && e.key === 's') || e.key === 'Escape') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Timer effect
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

    const res = await submitQuiz({ registrationId, responses: allResponses });
    setSubmitting(false);
    
    if (res.success) {
      onSubmit(res);
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
    
    // Add to answered questions if not already there
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
    const res = await submitQuiz({ registrationId, responses: allResponses });
    setSubmitting(false);
    
    if (res.success) {
      onSubmit(res);
    } else {
      setError(res.message || "Submission failed. Please try again.");
      setQuizSubmitted(false);
    }
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

        <div className="flex justify-between mt-5 sm:mt-8 gap-3 sm:gap-4">
          <button
            disabled={index === 0 || quizSubmitted}
            onClick={() => setIndex(i => i - 1)}
            className="px-4 sm:px-6 py-2 sm:py-3 border-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            style={{
              borderColor: COLORS.primary,
              color: COLORS.primary,
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = COLORS.primary + '10'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Previous
          </button>

          {index === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={quizSubmitted}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ backgroundColor: COLORS.success }}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setIndex(i => i + 1)}
              disabled={quizSubmitted}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ backgroundColor: COLORS.primary }}
            >
              Next
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-xs sm:text-sm">{error}</p>
          </div>
        )}
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
    // Dispatch event to hide header/footer
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
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function QuizApp() {
  const [stage, setStage] = useState("start");
  const [registrationId, setRegistrationId] = useState("");

  const handleVerified = (regId) => {
    setRegistrationId(regId);
    setStage("quiz");
  };

  const handleSubmit = () => {
    setStage("result");
    // Dispatch event to show header/footer again
    window.dispatchEvent(new Event('quiz-ended'));
  };

  return (
    <div>
      {stage === "start" && <QuizStart onVerified={handleVerified} />}
      {stage === "quiz" && (
        <QuizScreen registrationId={registrationId} onSubmit={handleSubmit} />
      )}
      {stage === "result" && <QuizResult />}
    </div>
  );
}