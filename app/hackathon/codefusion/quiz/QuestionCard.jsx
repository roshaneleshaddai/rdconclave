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

export default function QuestionCard({ question, onAnswer, selected, currentIndex, totalQuestions, timeLeft, answeredQuestions }) {
  const timePercentage = (timeLeft / 30) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-8 border-2" style={{ borderColor: COLORS.primary + '15' }}>
      
      {/* Header Section - Question Info & Timer */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2" style={{ borderColor: COLORS.primary + '15' }}>
        <div>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: COLORS.grayText }}>QUESTION</p>
          <h3 className="text-lg sm:text-xl font-bold mt-1" style={{ color: COLORS.primary }}>
            {currentIndex + 1} <span style={{ color: COLORS.grayText }}>of {totalQuestions}</span>
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs sm:text-sm font-semibold" style={{ color: COLORS.grayText }}>TIME REMAINING</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-right">
              <h3 
                className={`text-2xl sm:text-3xl font-bold ${isLowTime ? 'animate-pulse' : ''}`}
                style={{ color: isLowTime ? COLORS.error : COLORS.primary }}
              >
                {timeLeft}s
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="mb-6 sm:mb-8">
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

      {/* Progress Dots */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold mb-3" style={{ color: COLORS.grayText }}>PROGRESS</p>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all border-2"
              style={{
                backgroundColor: answeredQuestions.includes(idx) ? COLORS.primary : 'transparent',
                borderColor: idx === currentIndex ? COLORS.primary : '#d1d5db',
              }}
              title={`Question ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-lg sm:text-2xl font-bold mb-6 sm:mb-8 leading-relaxed" style={{ color: COLORS.primary }}>
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 sm:space-y-4">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className="w-full text-left border-2 p-4 sm:p-5 rounded-lg transition-all duration-200 text-sm sm:text-base hover:shadow-md"
            style={{
              borderColor: selected === idx ? COLORS.primary : '#e5e7eb',
              backgroundColor: selected === idx ? COLORS.primary + '10' : '#ffffff',
            }}
          >
            <div className="flex items-center">
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mr-3 sm:mr-4 transition-all flex-shrink-0"
                style={{
                  borderColor: selected === idx ? COLORS.primary : '#d1d5db',
                  backgroundColor: selected === idx ? COLORS.primary : 'transparent',
                }}
              >
                {selected === idx && (
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                )}
              </div>
              <span className="text-gray-700 font-medium">{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}