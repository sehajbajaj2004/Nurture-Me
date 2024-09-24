export const navLinks = [{
    id: "about",
    title: "About",
},
{
    id: "work",
    title: "Work",
},
{
    id: "contact",
    title: "Contact",
},
];

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

export {userActivities, publicProfileData, privateProfileData};