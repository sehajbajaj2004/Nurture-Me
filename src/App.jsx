import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import PrivateProfile from './components/PrivateProfile';
import bgHero from './assets/bg-hero4.jpg';
import { userActivities, publicProfileData, privateProfileData } from './constants';
import ProgressOverview from './components/ProgressiveOverview';
import axios from 'axios';
import Register from './components/Register';
import Forum from './components/Forum';
import Chat from './components/Chat';
import Admin from './components/AdminPage';
import "./UnityViewer.css";
import Login from './components/Login';
import BreathingTiles from './components/BreathingTiles';
import EndlessRunner from './components/EndlessRunner';
import WorkoutWheel from './components/WorkoutWheel';
import ShooterGame from './components/ShooterGame';
import MiniGames from './components/MiniGames';
import { UserProvider, UserContext } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);

  // Fetch example API data
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? children : <Navigate to="/Login" />;
  };

  // Public route wrapper for login
  const PublicRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? <Navigate to="/" /> : children;
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Hero />} />

          {/* Register page */}
          <Route path="/Register" element={<Register />} />

          {/* Forum - protected */}
          <Route
            path="/Forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />

          {/* Chat - protected */}
          <Route
            path="/Chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Admin - protected */}
          <Route
            path="/Admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Login - public */}
          <Route
            path="/Login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Mini-games - always accessible */}
          <Route path="/Mini-games" element={<MiniGames />} />

          {/* Profile - protected */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  name={publicProfileData.name}
                  university={publicProfileData.university}
                  bio={publicProfileData.bio}
                  posts={publicProfileData.posts}
                  followers={publicProfileData.followers}
                  following={publicProfileData.following}
                  activities={publicProfileData.activities}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* <ProgressOverview /> */}

        {/* <Profile
          name={publicProfileData.name}
          university={publicProfileData.university}
          bio={publicProfileData.bio}
          posts={publicProfileData.posts}
          followers={publicProfileData.followers}
          following={publicProfileData.following}
          activities={publicProfileData.activities}
        />
        <PrivateProfile
          name={privateProfileData.name}
          university={privateProfileData.university}
          photo={privateProfileData.photo}
          height={privateProfileData.height}
          weight={privateProfileData.weight}
          mood={privateProfileData.mood}
          habits={privateProfileData.habits}
          suggestions={privateProfileData.suggestions}
        /> */}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
