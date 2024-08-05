import React, { useState } from 'react'
import Authimage from '../../Assets/pexels-tomfisk-3448250.jpg'
import './Authpage.css'
import LoginBox from '../../Components/Authbox/LoginBox'
import SignupBox from '../../Components/Authbox/SignupBox'
function Authpage() {
    const [boxtype,setBoxtype] = useState('login')
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 authen'>
        <div className='row '>

            <div className='col-lg-6 col-md-8 left-image  col-12' style={{backgroundImage:`url(${Authimage})` }}>
             <p>Reserve your spot,create memories and let the gemes begin!</p>
            </div>

            <div className='col-lg-6 col-md-4 right-image  col-12'>
             <h3 className='w-100 text-center mt-4 mb-4'>{boxtype==='login'? 'Login':'Signup'}</h3>
             {boxtype==='login'?<LoginBox setBoxtype={setBoxtype} />:<SignupBox setBoxtype={setBoxtype}/>}
            </div>

        </div>

    </div>
  )
}

export default Authpage