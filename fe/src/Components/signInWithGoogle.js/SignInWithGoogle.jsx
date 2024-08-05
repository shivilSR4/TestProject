import React from 'react';
import './SignInWithGoogle.css';
import googleimg from '../../Assets/4LSMF.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/userSlice';
import { showhideLoader } from '../../Redux/generalSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Errortoast, Successtoast } from 'plugin/Toast/Toast';
import axios from 'axios';

function SignInWithGoogle() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                user.getIdToken().then(idToken => {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        idToken
                    };
                    axios.post(`${process.env.REACT_APP_BASE_URL}auth/doLogin`, userData)
                        .then((res) => {
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('user', JSON.stringify(res.data.user));
                            dispatch(setUserData(res.data.user));
                            navigate('/home');
                            Successtoast(res.data.message);
                        })
                        .catch((err) => {
                            Errortoast(err?.response?.data?.message || 'something went wrong');
                        });
                });
            })
            .catch((error) => {
                console.error('Error during sign in:', error);
            });
    };

    return (
        <div>
            <ToastContainer/>
            <p className='continue-p'>--Or continue with --</p>
            <div onClick={googleLogin}>
                <img src={googleimg} alt="Google Sign-In" height={'100px'} width={'220px'} className='py-1 imgoogle'/>
            </div>
        </div>
    );
}

export default SignInWithGoogle;
