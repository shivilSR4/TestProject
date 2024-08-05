
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtoYUq3MJhSG4A3H0v9QX0MfBm3nxWvmU",
  authDomain: "otp-project-b6b7b.firebaseapp.com",
  projectId: "otp-project-b6b7b",
  storageBucket: "otp-project-b6b7b.appspot.com",
  messagingSenderId: "866546198651",
  appId: "1:866546198651:web:da8418e982a1f54e905ade",
  measurementId: "G-CZSE7ECBMR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
