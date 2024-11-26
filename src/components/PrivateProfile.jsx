// import React from "react";

// const PrivateProfile = ({ name, university, photo, height, weight, mood, habits, suggestions }) => {
//   return (
//     <div className="max-w-4xl mx-auto mt-20 p-6 bg-[#FFFFFF] shadow-lg rounded-lg border ">
//       <div className="flex items-center space-x-6">
//         {/* Profile Image */}
//         <div className="w-32 h-32 bg-[#86D5F4] rounded-full overflow-hidden border-4 border-[#33CEC5]">
//           <img
//             src={photo}
//             alt="Profile"
//             className="object-cover w-full h-full"
//           />
//         </div>
//         {/* Profile Info */}
//         <div>
//           <h1 className="text-3xl font-semibold text-[#353535]">{name}</h1>
//           <p className="text-lg text-[#33CEC5]">{university}</p>
//         </div>
//       </div>
//         {/*  Personal information */ }
//       <h2 className="mt-6 text-2xl font-semibold text-[#353535]">Personal Information</h2>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
//           <h3 className="text-lg font-semibold text-[#353535]">Height</h3>
//           <p className="text-xl text-[#353535]">{height} cm</p>
//         </div>
//         <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
//           <h3 className="text-lg font-semibold text-[#353535]">Weight</h3>
//           <p className="text-xl text-[#353535]">{weight} kg</p>
//         </div>
//         <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
//           <h3 className="text-lg font-semibold text-[#353535]">Mood</h3>
//           <p className="text-xl text-[#353535]">{mood}</p>
//         </div>
//         <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
//           <h3 className="text-lg font-semibold text-[#353535]">Habits</h3>
//           <ul className="list-disc pl-5 text-[#353535]">
//             {habits.map((habit, index) => (
//               <li key={index}>{habit}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-[#353535]">Suggestions</h2>
//         <ul className="mt-4 space-y-2">
//           {suggestions.map((suggestion, index) => (
//             <li key={index} className="bg-[#86D5F4] p-4 rounded-lg shadow-sm border border-[#E0E0E0] text-[#353535]">
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PrivateProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";

const moodOptions = ["Happy", "Sad", "Angry", "Excited"];

const PrivateProfile = () => {
  const [profile, setProfile] = useState(null); // Store profile data
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [updatedProfile, setUpdatedProfile] = useState({}); // Store updated profile fields
  const username = localStorage.getItem("username"); // Assume username is stored in localStorage after login

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/${username}`);
        if (response.data.success) {
          setProfile(response.data.profile);
        } else {
          console.error("Profile not found or error in response.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (username) {
      fetchProfile();
    } else {
      console.error("Username is missing in localStorage.");
    }
  }, [username]);

  const handleEdit = () => {
    setEditing(true);
    setUpdatedProfile(profile); // Populate with current profile data
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/profile/${username}`, updatedProfile);
      if (response.data.success) {
        setProfile(updatedProfile); // Update the UI with the saved profile
        setEditing(false); // Exit edit mode
      } else {
        console.error("Failed to save profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleMoodChange = async (e) => {
    const newMood = e.target.value;
    try {
      const response = await axios.put(`http://localhost:8080/profile/${username}`, {
        ...profile,
        mood: newMood,
      });
      if (response.data.success) {
        setProfile(response.data.profile); // Update profile with new suggestions
      } else {
        console.error("Failed to update mood.");
      }
    } catch (err) {
      console.error("Error updating mood:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!profile) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-[#FFFFFF] shadow-lg rounded-lg border">
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <div className="w-32 h-32 bg-[#86D5F4] rounded-full overflow-hidden border-4 border-[#33CEC5]">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Profile Info */}
        <div>
          <h1 className="text-3xl font-semibold text-[#353535]">
            {editing ? (
              <input
                type="text"
                name="name"
                value={updatedProfile.name || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              profile.name
            )}
          </h1>
          <p className="text-lg text-[#33CEC5]">
            {editing ? (
              <input
                type="text"
                name="university"
                value={updatedProfile.university || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              profile.university
            )}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="mt-6 text-2xl font-semibold text-[#353535]">Personal Information</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Height (cm)</h3>
          {editing ? (
            <input
              type="number"
              name="height"
              value={updatedProfile.height || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p className="text-xl text-[#353535]">{profile.height} cm</p>
          )}
        </div>
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Weight (kg)</h3>
          {editing ? (
            <input
              type="number"
              name="weight"
              value={updatedProfile.weight || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p className="text-xl text-[#353535]">{profile.weight} kg</p>
          )}
        </div>
        <div className="p-4 bg-[#FFEC95] rounded-lg shadow-sm border border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#353535]">Mood</h3>
          <select
            value={profile.mood}
            onChange={handleMoodChange}
            className="border rounded p-2 w-full bg-white"
          >
            {moodOptions.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#353535]">Suggestions</h2>
        <ul className="mt-4 space-y-2">
          {profile.suggestions?.map((suggestion, index) => (
            <li
              key={index}
              className="bg-[#86D5F4] p-4 rounded-lg shadow-sm border border-[#E0E0E0] text-[#353535]"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Edit and Save Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        {editing ? (
          <>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default PrivateProfile;
