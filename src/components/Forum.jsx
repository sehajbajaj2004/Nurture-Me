import React, { useState } from "react";

function Forum() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = () => {
    if (newQuestion.trim() === "") return;
    setQuestions([...questions, newQuestion]);
    setNewQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold mb-10 text-indigo-600">
        Nurture Me - FAQ
      </h1>

      {/* FAQs Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mental Health */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Mental Health
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>How to reduce stress?</li>
            <li>Tips for better sleep?</li>
            <li>Managing anxiety?</li>
          </ul>
        </div>

        {/* Physical Health */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Physical Health
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>How to eat healthily?</li>
            <li>Best exercises for beginners?</li>
            <li>Staying hydrated tips?</li>
          </ul>
        </div>
      </div>

      {/* User Question Submission */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Have more questions?
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question"
            className="border border-gray-300 rounded-lg w-full md:flex-1 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* User-Submitted Questions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          Your Submitted Questions
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="list-disc pl-6 text-gray-600">
            {questions.length === 0 ? (
              <li>No questions submitted yet.</li>
            ) : (
              questions.map((question, index) => (
                <li key={index} className="mt-2">
                  {question}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Forum;
