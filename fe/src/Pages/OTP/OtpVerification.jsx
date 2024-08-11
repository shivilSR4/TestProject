import React, { useState } from 'react';
import './OtpVerification.css';
import Modal from 'Components/Common/Modal/Modal';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Errortoast, Successtoast } from '../../plugin/Toast/Toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/userSlice';
import { ToastContainer } from 'react-toastify';
import { showhideLoader } from '../../Redux/generalSlice';


function OtpVerification() {
    const location = useLocation();
    const email = location.state?.email;
    const Number = location.state?.mobileNumber;
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(true);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const verifyOtp = () => {
        setLoading(true);
        const data = { email, otp };
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/verifyOtp`, data)
            .then(res => {
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                dispatch(setUserData(res.data.user));
                navigate('/home');
                Successtoast('OTP verified successfully');
            })
            .catch(err => {
                Errortoast(err.response?.data?.message || 'Invalid OTP');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resendOtp = () => {
        dispatch(showhideLoader(true));
       const  mobileNumber = JSON.stringify(Number)
        const data = { email, mobileNumber };
        axios.post(`${process.env.REACT_APP_BASE_URL}auth/resendopt`, data)
            .then((res) => {
                dispatch(showhideLoader(false));
                Successtoast('OTP resent successfully');
            }).catch(() => {
                dispatch(showhideLoader(false));
                Errortoast('Something went wrong');
            });
    }

    return (
        <div className='body-box'>
            <ToastContainer />
            {modalOpen && (
                <Modal heading={'OTP Verification'} closeModal={() => setModalOpen(false)}>
                    <>
                        <div id="recaptcha-container"></div>
                        <div className='otp-content bg-white w-fit mx-auto p-4 rounded-full text-emerald-500'>
                            <BsFillShieldLockFill size={30} />
                        </div>
                        <label htmlFor='otp' className='ltext'>Enter Your OTP</label>
                        <OtpInput
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="otp-container"
                            value={otp}
                            onChange={handleOtpChange}
                        />
                        <div className='d-flex flex-row'>
                        <button className='verify-button d-flex justify-content-center align-items-center p-2 mt-2 mx-5' onClick={verifyOtp}>
                            {loading && <CgSpinner size={20} className="mt-1 animate-spin spinner-icon" />}
                            <span className='ml-2'>Verify OTP</span>
                        </button>

                        <button className='common-button bg-black text-white mt-2 p-2 ' onClick={resendOtp}>Resend OTP</button>
                        </div>
                       
                    </>
                </Modal>
            )}
        </div>
    );
}

export default OtpVerification;
