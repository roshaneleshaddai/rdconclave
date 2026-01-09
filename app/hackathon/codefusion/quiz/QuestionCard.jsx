export default function QuestionCard({ question, onAnswer, selected }) {
  return (
        <div>
      <h2 className="text-xl font-semibold">{question.question}</h2>

      <div className="mt-4 space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className={`w-full border p-3 rounded ${
              selected === idx
                ? "bg-indigo-100 border-indigo-500"
                : "hover:bg-gray-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
