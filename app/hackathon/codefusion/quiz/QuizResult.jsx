// Academic Color Palette
const COLORS = {
  primary: '#002147',
  success: '#10b981',
  gray: '#f3f4f6',
  grayText: '#6b7280',
};

export default function QuizResult({ score }) {
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
}