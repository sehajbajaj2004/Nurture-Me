import React, { useState } from 'react';

const StatCard = ({ icon, label, value, goal, unit, onGoalChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  // Calculate progress percentage (value/goal * 100), with a fallback for no goal set
  const progress = value && goal && !isNaN(value) && !isNaN(goal)
    ? Math.min((value / goal) * 100, 100) // cap at 100%
    : 0;

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
      <p className="text-gray-500 mb-2">
        {value} {unit} / {goal} {unit}
      </p>

      {/* Editable Goal */}
      {isEditing ? (
        <div className="flex items-center mb-2">
          {label === 'Mood Overview' ? (
            <select
              value={newGoal}
              onChange={handleMoodChange}
              className="border rounded-lg px-2 py-1 text-sm w-24"  // Smaller size
            >
              <option value="Be Happy">Be Happy</option>
              <option value="Stay Positive">Stay Positive</option>
              <option value="Grind">Grind</option>
            </select>
          ) : (
            <input
              type="text"
              className="border rounded-lg px-2 py-1 text-sm w-16" // Smaller size
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          )}
          <button onClick={handleGoalChange} className="ml-2 text-blue-500 text-sm">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="ml-2 text-red-500 text-sm">
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center mb-2">
          <p className="text-gray-500">{goal} {unit}</p>
          <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-500 text-sm">
            Edit
          </button>
        </div>
      )}

      {/* Conditional Progress Bar */}
      {label !== 'Mood Overview' && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className={`bg-blue-500 h-4 rounded-full transition-all duration-300 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-gray-500">{progress.toFixed(1)}% complete</p>
        </>
      )}
    </div>
  );
};

export default StatCard;
