import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import PrivateProfile from "./components/PrivateProfile";
import bgHero from "./assets/bg-hero4.jpg";
import {
  userActivities,
  publicProfileData,
  privateProfileData,
} from "./constants";
import ProgressOverview from "./components/ProgressiveOverview";
import axios from "axios";
import Register from './components/Register';
import Forum from "./components/Forum";
import Chat from "./components/Chat"; // Import Chat component
import AdminPage from "./components/AdminPage"; // Import AdminPage component

function App() {
  const [count, setCount] = useState(0);

  // Fetch API example
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");
      console.log(response.data.fruits);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="relative z-0">
          {/* Navbar */}
          <div className="bg-cover bg-no-repeat bg-center h-[100px]">
            <Navbar />
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Default landing page */}
          <Route path="/register" element={<Register />} />
          <Route path="/forum" element={<Forum />} /> {/* Forum route */}
          <Route path="/chat" element={<Chat />} /> {/* Chat route */}
          <Route path="/admin" element={<AdminPage />} /> {/* Admin route */}
          <Route
            path="/profile"
            element={
              <Profile
                name={publicProfileData.name}
                university={publicProfileData.university}
                bio={publicProfileData.bio}
                posts={publicProfileData.posts}
                followers={publicProfileData.followers}
                following={publicProfileData.following}
                activities={publicProfileData.activities}
              />
            }
          />
          <Route
            path="/private-profile"
            element={
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
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
