"use client";
import { useState } from "react";
import { verifyRegistration } from "./quizApi";

export default function QuizStart({ onVerified }) {
  const [regId, setRegId] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    const res = await verifyRegistration(regId);
    if (!res.success) return setError(res.message);
    onVerified(regId);
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <h1 className="text-3xl font-bold mb-4">Quiz Verification</h1>

            <input
              value={regId}
        onChange={(e) => setRegId(e.target.value)}
        className="w-full border p-3 rounded"
        placeholder="Enter Registration ID (RD01)"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={handleVerify}
        className="mt-4 w-full bg-indigo-600 text-white py-3 rounded"
          >
        Start Quiz
          </button>
    </div>
  );
}
