import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'


import Profile from './components/Profile'
import PrivateProfile from './components/PrivateProfile'

import bgHero from './assets/bg-hero1.png'
import {userActivities, publicProfileData, privateProfileData} from './constants'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter className='bg-white'>

        <div className='relative z-0'>
          <div
            style={{ backgroundImage: `url(${bgHero})` }}
            className="bg-cover bg-no-repeat bg-center h-screen"
          >
            <Navbar />
            <Hero />
          </div>
        </div>
        
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

      </BrowserRouter>
    </>
  )
}

export default App
