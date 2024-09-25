import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

import Profile from './components/Profile'
import PrivateProfile from './components/PrivateProfile'

import bgHero from './assets/bg-hero4.jpg'
import {userActivities, publicProfileData, privateProfileData} from './constants'

import ProgressOverview from './components/ProgressiveOverview'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter className='bg-white'>

        <div className='relative z-0'>
          <div
            style={{ backgroundImage: `url(${bgHero})` }}
            className="bg-cover bg-no-repeat bg-center h-[700px]"
          >
            <Navbar />
            <Hero />
          </div>
        </div>

        <ProgressOverview/>
        
          {/* <Profile
            name={publicProfileData.name}
            university={publicProfileData.university}
            bio={publicProfileData.bio}
            posts={publicProfileData.posts}
            followers={publicProfileData.followers}
            following={publicProfileData.following}
            activities={publicProfileData.activities}
          /> */}
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

      </BrowserRouter>
    </>
  )
}

export default App
