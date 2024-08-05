import React, { useEffect, useState } from "react";
import "./Profile.css";
import Cusnavbar from "Components/Common/Cusnavbar/Cusnavbar";
import Modal from "../../Components/Common/Modal/Modal";
import profile from "../../Assets/profile.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
    useEffect(()=>{
      setTimeSlote(true)
    },[])

    const openModal = () => {
      setTimeSlote(true);
    };

    const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const [timeSlote, setTimeSlote] = useState(true);
  return (
    <div>
      <Cusnavbar openModal={openModal}/>
      {timeSlote && (
        <Modal heading={"Profile"} closeModal={() => setTimeSlote(false)}>
          <div className="profile d-flex flex-column align-items-center">
            <img src={profile} alt="" height={"110px"} className="mb-3" />
            <div className="d-flex flex-column align-items-start">
              <label htmlFor="" className="mb-2">
                Name : <span className="mx-2 p-1">{user.Name}</span>
              </label>
              <label htmlFor="" className="mb-2">
                Email id :<span className="mx-2 p-1">{user.email}</span>
              </label>
              <label htmlFor="" className="mb-2">
                Phone :<span className="mx-2 p-1">{user.mobileNumber}</span>
              </label>
            </div>
            <button className="common-button  mb-3 p-2" onClick={()=>{navigate('/home')}}>
                    Back to Home
                  </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Profile;
