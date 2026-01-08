"use client";
import { useState, useEffect } from 'react';

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
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div style={{ perspective: '1200px', width: '150px', height: '150px' }}>
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
        <p className="mt-6 text-lg font-semibold text-gray-800">{message}</p>
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
const QuestionCard = ({ question, onAnswer, selected, currentIndex, totalQuestions, timeLeft }) => {
  const timePercentage = (timeLeft / 30) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      {/* Timer Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Time Remaining</span>
          <span className={`text-lg font-bold ${isLowTime ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              isLowTime ? 'bg-red-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex
                  ? 'bg-indigo-600'
                  : idx < currentIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className={`w-full text-left border-2 p-4 rounded-lg transition-all duration-200 ${
              selected === idx
                ? 'bg-indigo-50 border-indigo-500 shadow-md'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  selected === idx
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}
              >
                {selected === idx && (
                  <div className="w-3 h-3 bg-white rounded-full" />
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
    <div className="max-w-2xl mx-auto pt-32 text-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Submitted Successfully! 🎉
        </h1>
        <p className="text-gray-600 text-lg">
          Your answers have been recorded. Thank you for participating!
        </p>
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (loading || submitting || quizSubmitted || !questions.length) return;

    setTimeLeft(30); // Reset timer when question changes

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - move to next question or submit
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

    // Fill unanswered questions with -1 (no answer)
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
    if (quizSubmitted) return; // Prevent changes after submission
    
    const q = questions[index];
    const updated = responses.filter(r => r.questionId !== q.questionId);
    setResponses([...updated, { questionId: q.questionId, selectedOption: option }]);
  };

  const handleSubmit = async () => {
    if (quizSubmitted) return;
    
    // Fill unanswered questions with -1 (no answer)
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
      <div className="max-w-2xl mx-auto pt-32 px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="max-w-2xl mx-auto pt-32 text-center px-4">
        <p className="text-gray-600">No questions available.</p>
      </div>
    );
  }

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pt-32">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
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
      />

      <div className="flex justify-between mt-8 gap-4">
        <button
          disabled={index === 0 || quizSubmitted}
          onClick={() => setIndex(i => i - 1)}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>

        {index === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={quizSubmitted}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setIndex(i => i + 1)}
            disabled={quizSubmitted}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
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
    onVerified(regId);
  };

  if (loading) return <CoinFlip message="Verifying Registration..." />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Verification</h1>
          <p className="text-gray-600">Enter your registration ID to begin</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration ID
            </label>
            <input
              value={regId}
              onChange={(e) => setRegId(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="e.g., RD01"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleVerify}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {stage === "start" && <QuizStart onVerified={handleVerified} />}
      {stage === "quiz" && (
        <QuizScreen registrationId={registrationId} onSubmit={handleSubmit} />
      )}
      {stage === "result" && <QuizResult />}
    </div>
  );
}