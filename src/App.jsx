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
import UnityViewer from './components/UnityViewer'
import Chat from './components/Chat'
import Admin from './components/AdminPage'
import "./UnityViewer.css";
import AdminPage from './components/AdminPage'

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
        <div className='relative z-0'>
          <div
            className="bg-cover bg-no-repeat bg-center h-[100px]"
          >
            <Navbar />
            {/* <Hero />
            <UnityViewer/> */}
          </div>
        </div>

        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Chat" element={<Chat />} />
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
