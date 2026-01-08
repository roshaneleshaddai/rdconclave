export default function QuizResult({ score }) {
  return (
    <div className="text-center mt-40">
      <h1 className="text-3xl font-bold text-green-600">
        Quiz Submitted Successfully 🎉
      </h1>
      <p className="mt-4">Your score has been recorded.</p>
    </div>
  );
}
