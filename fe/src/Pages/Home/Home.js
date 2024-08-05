import React, { useEffect } from 'react'
import './Home.css'
import Cusnavbar from '../../Components/Common/Cusnavbar/Cusnavbar'
import Cuscarousal from 'Components/Cuscurousal/Cuscarousal'
import Blocks from 'Components/Blocks/Blocks'
import Uspblocks from 'Components/Uspblocks/Uspblocks'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/')
  },[])
  useEffect(()=>{
    if(localStorage.getItem('token'))
      navigate('/home')
  },[])

  return (
    <div>
        <Cusnavbar />
        <Cuscarousal/>
        <Blocks />
        <Uspblocks />
    </div>
  )
}

export default Home