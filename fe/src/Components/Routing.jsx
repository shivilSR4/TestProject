import React from 'react'
import { Router,Route,Routes } from 'react-router-dom'
import Authpage from '../Pages/AuthPage/Authpage'
import Home from '../Pages/Home/Home'
import Addnewcourt from '../Pages/Addnewcourt/Addnewcourt'
import CourtListPage from 'Pages/CourtListPage/CourtListPage'
import CourtDetailsBody from './CourtDetailsBody/CourtDetailsBody'
import CourtDetailsPage from 'Pages/CourtDetailsPage/CourtDetailsPage'
import Profile from 'Pages/Profile/Profile'
import OtpVerification from 'Pages/OTP/OtpVerification'

function Routing() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Authpage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/otp' element={<OtpVerification />}/>

            <Route path='/courts'>

              <Route path='courtlist' element={<CourtListPage />}/>
              <Route path='courtdetails/:id' element= {<CourtDetailsPage />}/>

            </Route>


            
            <Route path='/newcourt' element={<Addnewcourt />} />
        </Routes>
    </div>
  )
}

export default Routing