import React, { useState } from 'react';
import StatCard from './StatCard';

const ProgressOverview = () => {
  const [stats, setStats] = useState([
    { label: 'Distance Walked', value: '12', progress: 60, goal: '20', unit: 'km', icon: '🚶‍♂️' },
    { label: 'Mood Overview', value: '😊 Happy', progress: 85, goal: 'Be Happy', unit: '', icon: '🙂' }, // No unit for mood
    { label: 'Water Intake', value: '2.5', progress: 70, goal: '3.5', unit: 'L', icon: '💧' },
    { label: 'Sleep Hours', value: '7.5', progress: 75, goal: '8', unit: 'hrs', icon: '🛌' },
  ]);

  const handleGoalChange = (index, newGoal) => {
    const updatedStats = [...stats];
    updatedStats[index].goal = newGoal; // Update the goal
    setStats(updatedStats); // Set the new state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Your Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            progress={stat.progress} 
            goal={stat.goal} // Pass the goal to StatCard
            unit={stat.unit} // Pass the unit to StatCard
            onGoalChange={(newGoal) => handleGoalChange(index, newGoal)} // Pass the goal change handler
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;