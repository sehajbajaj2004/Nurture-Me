import React, { useState } from 'react';

const StatCard = ({ icon, label, value, progress, goal, unit, onGoalChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  const handleGoalChange = () => {
    onGoalChange(newGoal);
    setIsEditing(false);
  };

  const handleMoodChange = (event) => {
    setNewGoal(event.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <span className="text-4xl mb-4">{icon}</span>
      <p className="text-xl font-semibold">{label}</p>
      <p className="text-gray-500 mb-2">{value} {unit} / </p>

      {/* Editable Goal */}
      {isEditing ? (
        <div className="flex items-center mb-2">
          {label === 'Mood Overview' ? (
            <select value={newGoal} onChange={handleMoodChange} className="border rounded-lg px-2 py-1">
              <option value="Be Happy">Be Happy</option>
              <option value="Stay Positive">Stay Positive</option>
              <option value="Grind">Grind</option>
            </select>
          ) : (
            <input
              type="text"
              className="border rounded-lg px-2 py-1"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          )}
          <button onClick={handleGoalChange} className="ml-2 text-blue-500">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="ml-2 text-red-500">
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center mb-2">
          <p className="text-gray-500">{goal}</p>
          <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-500">
            Edit
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;