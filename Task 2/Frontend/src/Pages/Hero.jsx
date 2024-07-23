import React, { useContext } from 'react'
import Stats from '../Components/Stats'
import ProjectInfo from '../Components/ProjectInfo'
import Projects from '../Components/Projects'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'

const Hero = () => {
  const { isAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()

  return (
    <div className='bg-slate-50 min-h-screen'>
        <Stats/>
        <ProjectInfo/>
        <Projects/>
    </div>
  )
}

export default Hero