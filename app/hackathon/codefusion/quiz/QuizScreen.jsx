"use client";
import { useEffect, useState } from "react";
import { fetchQuestions, submitQuiz } from "./quizApi";
import QuestionCard from "./QuestionCard";

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

export default function QuizScreen({ registrationId, onSubmit }) {
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

        <div className="flex justify-end mt-5 sm:mt-8 gap-3 sm:gap-4">

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
}