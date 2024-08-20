import React, { useState } from 'react';
import './Loginbox.css';
import '../../App.css';
import Custominput from '../Common/Custominput/Custominput';
import { useNavigate } from 'react-router-dom';
import { Errortoast, Successtoast } from 'plugin/Toast/Toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/userSlice';
import { showhideLoader } from '../../Redux/generalSlice';
import SignInWithGooglr from '../../Components/signInWithGoogle.js/SignInWithGoogle'

function LoginBox({ setBoxtype }) {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const doLogin = () => {
    dispatch(showhideLoader(true));
    axios({
      method: 'POST',
      url: process.env.REACT_APP_BASE_URL + 'auth/doLogin',
      data: loginData,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(setUserData(res.data.user));
        navigate('/home');
        dispatch(showhideLoader(false));
        Successtoast(res.data.message);
      })
      .catch((err) => {
        Errortoast(err?.response?.data?.message || 'something went wrong');
        dispatch(showhideLoader(false)); 
      });
  };

  return (
    <>
      <ToastContainer />
      <div className='d-flex flex-column'>
        <div className='mt-4'>
          <Custominput label={'Email'} name={'email'} value={loginData.email} onchange={handleChange} />
        </div>
        <div className='mt-4'>
          <Custominput label={'Password'} name={'password'} type={'password'} value={loginData.password} onchange={handleChange} />
        </div>
        <button className='common-button mt-4 align-self-center' onClick={doLogin}>Login</button>
        <p className='already-account mt-4'>Don't have an account <i onClick={() => setBoxtype('Signup')}>sign up here</i></p>
        <div className=' SignInWithGooglr d-flex justify-content-center align-item-center'> <SignInWithGooglr /></div>
      
       
      </div>
    </>
  );
}

export default LoginBox;
