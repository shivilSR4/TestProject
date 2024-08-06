import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import './Loginbox.css'
import Custominput from '../Common/Custominput/Custominput'
import axios from 'axios'
import  { Successtoast , Errortoast}  from '../../plugin/Toast/Toast'
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import { showhideLoader } from '../../Redux/generalSlice';
import { useDispatch } from 'react-redux';


function SignupBox({ setBoxtype }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [signupData, setSignupData] = useState({});
  
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const validateEmail = (email)=>{
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email)
  }


  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return passwordRegex.test(password);
  };

  const doSignup = () => {
    
    const { email, mobileNumber, password, confirmPassword } = signupData;

    

    if (!validateEmail(email)) {
      Errortoast('Invalid email format');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      Errortoast('Invalid mobile number');
      return;
    }

    if (!validatePassword(password)) {
      Errortoast('Password must be at least 5 characters long and contain at least one letter and one number');
      return;
    }

    if (password !== confirmPassword) {
      Errortoast('Passwords do not match');
      return;
    }

    dispatch(showhideLoader(true));

    axios({
      method: 'POST',
      url: process.env.REACT_APP_BASE_URL + '/auth/doSignup',
      data: signupData
    })
      .then((res) => {

      //  Successtoast('OTP Generated SuccesFully')
        
        const email = res.data.user.email;
        const mobileNumber = res.data.user.mobileNumber
       
        
        navigate('/otp', { state: { email,mobileNumber } });

      })
      .catch((err) => {
        Errortoast(err?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => {
        dispatch(showhideLoader(false));
      });
  };


  return (
    <div className='d-flex flex-column'>
      <ToastContainer />
      <div className='mt-4'>
        <Custominput label={'Name'} name={'Name'} value={signupData.Name} onchange={handleChange} />
      </div>
      <div className='mt-4'>
        <Custominput label={'Email'} name={'email'} type={'email'} value={signupData.email} onchange={handleChange} />
      </div>
      <div className='mt-4'>
        <Custominput label={'MobileNumber'} type={'Number'} name={'mobileNumber'} value={signupData.mobileNumber} onchange={handleChange} />
      </div>
      <div className='mt-4'>
        <Custominput label={'Password'} name={'password'} type={'password'} value={signupData.password} onchange={handleChange} />
      </div>
      <div className='mt-4'>
        <Custominput label={'Confirm Password'} name={'confirmPassword'} type={'password'} value={signupData.confirmPassword} onchange={handleChange} />
      </div>
      <button className='common-button mt-4 align-self-center' onClick={doSignup}>Signup</button>
      <p className='already-account mt-4'>Already have an account<i onClick={() => setBoxtype('login')}> login here</i></p>
    </div>
  )
}

export default SignupBox;
