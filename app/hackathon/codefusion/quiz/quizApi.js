const BASE_URL = "https://rd-backend-m7gd.onrender.com/api";

export const verifyRegistration = async (registrationId) => {
  const res = await fetch(`${BASE_URL}/quiz/verify-team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registrationId }),
  });
  return res.json();
};

export const fetchQuestions = async () => {
  const res = await fetch(`${BASE_URL}/quiz/questions`);
  return res.json();
};

export const submitQuiz = async (payload) => {
  const res = await fetch(`${BASE_URL}/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};
