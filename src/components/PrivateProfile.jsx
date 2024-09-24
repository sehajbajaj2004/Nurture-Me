import React from "react";

const PrivateProfile = ({ name, university, photo, height, weight, mood, habits, suggestions }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#FFFFFF] shadow-lg rounded-lg border ">
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <div className="w-32 h-32 bg-[#86D5F4] rounded-full overflow-hidden border-4 border-[#33CEC5]">
          <img
            src={photo}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Profile Info */}
        <div>
          <h1 className="text-3xl font-semibold text-[#353535]">{name}</h1>
          <p className="text-lg text-[#33CEC5]">{university}</p>
        </div>
      </div>
        {/*  Personal information */ }
      <h2 className="mt-6 text-2xl font-semibold text-[#353535]">Personal Information</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Height</h3>
          <p className="text-xl text-[#353535]">{height} cm</p>
        </div>
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Weight</h3>
          <p className="text-xl text-[#353535]">{weight} kg</p>
        </div>
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Mood</h3>
          <p className="text-xl text-[#353535]">{mood}</p>
        </div>
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Habits</h3>
          <ul className="list-disc pl-5 text-[#353535]">
            {habits.map((habit, index) => (
              <li key={index}>{habit}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#353535]">Suggestions</h2>
        <ul className="mt-4 space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="bg-[#86D5F4] p-4 rounded-lg shadow-sm border border-[#E0E0E0] text-[#353535]">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrivateProfile;
