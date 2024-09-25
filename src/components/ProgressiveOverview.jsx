import React, { useState } from 'react';
import StatCard from './StatCard'; // Assuming StatCard is in the same folder

const ProgressOverview = () => {
  const [stats, setStats] = useState([
    { label: 'Distance Walked', value: '15', goal: '20', unit: 'km', icon: '🚶‍♂️' },
    { label: 'Mood Overview', value: '😊 Happy', goal: 'Be Happy', unit: '', icon: '🙂' },
    { label: 'Water Intake', value: '2.5', goal: '3.5', unit: 'L', icon: '💧' },
    { label: 'Sleep Hours', value: '7', goal: '8', unit: 'hrs', icon: '🛌' },
  ]);

  const handleGoalChange = (index, newGoal) => {
    const updatedStats = [...stats];
    updatedStats[index].goal = newGoal;
    setStats(updatedStats);
  };

  return (
    <div className="container mx-auto p-6 mb-12 mt-20"> {/* Added margin-bottom to ensure space below */}
      <h1 className="text-5xl font-bold mb-8 text-center">Manage Your Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Stat Cards in 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              goal={stat.goal}
              unit={stat.unit}
              onGoalChange={(newGoal) => handleGoalChange(index, newGoal)}
            />
          ))}
        </div>

        {/* Right side: Profile Image */}
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/300" // Use an actual profile image URL here
            alt="Profile"
            className="rounded-full shadow-lg"
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;
