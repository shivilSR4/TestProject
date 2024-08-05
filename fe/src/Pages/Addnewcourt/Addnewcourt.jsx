import React from 'react'
import Cusnavbar from 'Components/Common/Cusnavbar/Cusnavbar'
import Newcourt from 'Components/Newcourt/Newcourt'
import './Addnewcourt.css'
import { useSelector } from 'react-redux';

function Addnewcourt() {
  const { user } = useSelector(state => state.user);

  return (
    <>
      {user.role === 1 && (
        <>
          <Cusnavbar />
          <Newcourt />
        </>
      )}
    </>
  );
}

export default Addnewcourt;
