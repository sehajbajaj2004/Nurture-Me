// import { useState } from 'react'
// import Profile from "./components/Profile";

// function App() {
//   const [count, setCount] = useState(0)
//   const userActivities = [
//     { description: "Completed a meditation session", time: "2 hours ago" },
//     { description: "Shared a post about mental health tips", time: "5 hours ago" },
//   ];

//   return (
//     <><>
//       <h1 className='text-red-600'>Hello</h1>
//     </>
//     <div>
//         <Profile
//           name="John Doe"
//           university="XYZ University"
//           bio="Passionate about balancing academic life with mental and physical wellness. Dedicated to helping fellow students find equilibrium and live their best life through practical advice, exercises, and mindfulness."
//           posts={54}
//           followers={128}
//           following={76}
//           activities={userActivities} />
//       </div></>
//   )
// }

// export default App
// App.jsx
import { useState } from "react";
import Profile from "./components/Profile";
import PrivateProfile from "./components/PrivateProfile";

function App() {
  const [count, setCount] = useState(0);
  
  const userActivities = [
    { description: "Completed a meditation session", time: "2 hours ago" },
    { description: "Shared a post about mental health tips", time: "5 hours ago" },
  ];

  // Dummy data for public profile
  const publicProfileData = {
    name: "John Doe",
    university: "XYZ University",
    bio: "Passionate about balancing academic life with mental and physical wellness.",
    posts: 54,
    followers: 128,
    following: 76,
    activities: userActivities,
  };

  // Dummy data for private profile
  const privateProfileData = {
    name: "John Doe",
    university: "XYZ University",
    photo: "https://via.placeholder.com/150", // Replace with the actual photo URL
    height: 170, // in cm
    weight: 65,  // in kg
    mood: "Happy",
    habits: ["Drinking water", "Meditating", "Exercising"],
    suggestions: [
      "Go for a run",
      "Write in a diary",
      "Read a book",
      "Practice yoga",
    ],
  };

  return (
    <>
      <h1 className="text-red-600">Hello</h1>
      <div>
        <Profile
          name={publicProfileData.name}
          university={publicProfileData.university}
          bio={publicProfileData.bio}
          posts={publicProfileData.posts}
          followers={publicProfileData.followers}
          following={publicProfileData.following}
          activities={publicProfileData.activities}
        />
      </div>
      <div>
        <PrivateProfile
          name={privateProfileData.name}
          university={privateProfileData.university}
          photo={privateProfileData.photo}
          height={privateProfileData.height}
          weight={privateProfileData.weight}
          mood={privateProfileData.mood}
          habits={privateProfileData.habits}
          suggestions={privateProfileData.suggestions}
        />
      </div>
    </>
  );
}

export default App;
