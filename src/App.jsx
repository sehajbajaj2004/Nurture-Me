import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Profile from './components/Profile'
import PrivateProfile from './components/PrivateProfile'
import bgHero from './assets/bg-hero4.jpg'
import { userActivities, publicProfileData, privateProfileData } from './constants'
import ProgressOverview from './components/ProgressiveOverview'
import axios from 'axios'
import Register from './components/Register'
import Forum from './components/Forum'
import Chat from './components/Chat'
import Admin from './components/AdminPage'
import "./UnityViewer.css";
import Login from './components/Login'
import BreathingTiles from './components/BreathingTiles'
import EndlessRunner from './components/EndlessRunner'
import WorkoutWheel from './components/WorkoutWheel'
import ShooterGame from './components/ShooterGame'
import MiniGames from './components/MiniGames'


function App() {
  const [count, setCount] = useState(0)
  
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <BrowserRouter>
            <Navbar/>

            
        <Routes>
          <Route path = "/" element ={<Hero/>}/>
          <Route path="/Register" element={<Register />} />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Mini-games" element={<MiniGames />} />
          <Route path="/profile" element={<Profile
          name={publicProfileData.name}
          university={publicProfileData.university}
          bio={publicProfileData.bio}
          posts={publicProfileData.posts}
          followers={publicProfileData.followers}
          following={publicProfileData.following}
          activities={publicProfileData.activities}
        />} />
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
    </>
  )
}

export default App
