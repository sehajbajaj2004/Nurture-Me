import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Make sure to import axios
import { UserContext } from "../context/UserContext"; // Import UserContext

function Forum() {
  const { user } = useContext(UserContext); // Access the username from the global UserContext
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = user?.username || "Guest"; // Use the logged-in username or default to "Guest"

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getQuestions/${username}`);
        if (response.data.success) {
          setQuestions(response.data.questions);
        }
      } catch (err) {
        setError("Failed to load questions");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username !== "Guest") {
      fetchQuestions();
    } else {
      setLoading(false);
    }
  }, [username]);

  // Save questions to database
  const saveQuestions = async (updatedQuestions) => {
    try {
      const response = await axios.post("http://localhost:8080/saveQuestions", {
        username,
        questions: updatedQuestions,
      });

      if (!response.data.success) {
        setError("Failed to save question");
      }
    } catch (err) {
      setError("Failed to save question");
      console.error("Error saving questions:", err);
    }
  };

  const handleSubmit = async () => {
    if (newQuestion.trim() === "") return;

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setNewQuestion("");

    if (username !== "Guest") {
      await saveQuestions(updatedQuestions);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-36">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold mb-10 text-indigo-600">
        Hi <span className="text-yellow-500">{username}</span>, What's on your mind?
      </h1>

           {/* FAQs Section */}
           <div className="grid md:grid-cols-2 gap-6">
        {/* Mental Health */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Mental Health</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  How to reduce stress?
                </summary>
                <p className="mt-2 text-gray-700">
                  Practice mindfulness, regular exercise, and maintain a balanced diet. Deep breathing exercises can also help.
                </p>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  Tips for better sleep?
                </summary>
                <p className="mt-2 text-gray-700">
                  Maintain a consistent sleep schedule, limit screen time before bed, and create a relaxing bedtime routine.
                </p>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  Managing anxiety?
                </summary>
                <p className="mt-2 text-gray-700">
                  Engage in regular physical activity, practice deep breathing, and consider speaking to a mental health professional.
                </p>
              </details>
            </li>
          </ul>
        </div>

        {/* Physical Health */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Physical Health</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  How to eat healthily?
                </summary>
                <p className="mt-2 text-gray-700">
                  Incorporate more fruits, vegetables, lean protein, and whole grains into your diet while reducing sugar and processed foods.
                </p>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  Best exercises for beginners?
                </summary>
                <p className="mt-2 text-gray-700">
                  Start with low-impact exercises like walking, yoga, or swimming. Gradually include strength training and cardio.
                </p>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  Staying hydrated tips?
                </summary>
                <p className="mt-2 text-gray-700">
                  Drink water throughout the day, and carry a reusable water bottle. Include water-rich foods like cucumbers and oranges.
                </p>
              </details>
            </li>
          </ul>
        </div>
      </div>

      {/* User Question Submission */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Have more questions?</h2>
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
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Submitted Questions</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="list-disc pl-6 text-gray-600">
            {questions.length === 0 ? (
              <li>No questions submitted yet.</li>
            ) : (
              questions.map((question, index) => (
                <li key={index} className="mt-2">
                  <details className="group">
                    <summary className="cursor-pointer text-blue-600 font-medium">
                      {question}
                    </summary>
                    <p className="mt-2 text-gray-700">
                      This is a brief answer to your question. For more details, explore the FAQ or submit follow-up questions!
                    </p>
                  </details>
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
