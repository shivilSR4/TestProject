import React, { useEffect } from 'react'
import './Home.css'
import Cusnavbar from '../../Components/Common/Cusnavbar/Cusnavbar'
import Cuscarousal from 'Components/Cuscurousal/Cuscarousal'
import Blocks from 'Components/Blocks/Blocks'
import Uspblocks from 'Components/Uspblocks/Uspblocks'
import { useNavigate } from 'react-router-dom'
import Footer from 'Components/Common/footer/Footer'


function Home() {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    } else {
      
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    }
  }, [navigate]);

  return (
    <div className='main-div'>
      <div className='one mb-2'> <Cusnavbar /></div>
      <div className='two'> <Cuscarousal/></div>
      <div className='three'> <Blocks /></div>
      <div className='four'> <Uspblocks /></div>
      <div className='five'><Footer /></div>
       
       
       
       
    </div>
  )
}

export default Home