"use client";
import { useEffect, useState } from "react";
import { fetchQuestions, submitQuiz } from "./quizApi";
import QuestionCard from "./QuestionCard";

export default function QuizScreen({ registrationId, onSubmit }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (option) => {
    const q = questions[index];
    const updated = responses.filter(r => r.questionId !== q.questionId);

    setResponses([
      ...updated,
      { questionId: q.questionId, selectedOption: option }
    ]);
  };

  const handleSubmit = async () => {
    const res = await submitQuiz({ registrationId, responses });
    onSubmit(res);
  };

  if (!questions.length) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <QuestionCard
        question={questions[index]}
        selected={responses.find(r => r.questionId === questions[index].questionId)?.selectedOption}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between mt-6">
        <button
          disabled={index === 0}
          onClick={() => setIndex(i => i - 1)}
        >
          Previous
        </button>

        {index === questions.length - 1 ? (
          <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">
            Submit
          </button>
        ) : (
          <button onClick={() => setIndex(i => i + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
