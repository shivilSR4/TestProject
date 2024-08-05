import React from 'react';
import './Loader.css';
import Loadergif from '../../../Assets/9e453ff908f27377ae619339cfc2db6e.gif';

function Loader() {
  return (
    <div className='loader-container'>
      <div className='spinner-container'>
        <img src={Loadergif} alt='Loading' height='30px' />
      </div>
      <div className='spinner'></div>
    </div>
  );
}

export default Loader;
