import React from 'react';
import search from '../../Assets/istockphoto-1163108523-2048x2048.jpg'
import book from '../../Assets/kisspng-portable-network-graphics-clip-art-computer-icons-5d2c6d04a56336.8524377715631925806774.jpg'
import football from '../../Assets/8730a1008f7673d0cf70e6630b8bd474.jpg'
import './Blocks.css'
import { useNavigate } from 'react-router-dom';

function Blocks() {
  const navigate = useNavigate()
 
  return (
    <div className='d-flex flex-column flex-md-row justify-content-center w-100 h-50 mt-3 home-box'>
      <div className='d-flex flex-column text-center p-3 align-items-center' onClick={()=>navigate('/courts/courtlist')} style={{cursor:'pointer'}}>
        <img src={search} alt='' />
        <h3>FIND YOUR COURT</h3>
        <p>Are you looking to play after work, organize your Sunday five's football match? Explore the largest network of sports facilities whole over the India</p>
      </div>

      <div className='d-flex flex-column text-center p-3 align-items-center' onClick={()=>navigate('/showcourts')} style={{cursor:'pointer'}}>
        <img src={book}  alt='' />
        <h3>SHOW YOUR BOOKING STATUS</h3>
        <p>once you've found the perfect ground, court or Gym , Connect with the venue through the book now Button to make online booking & secure easier payment</p>
      </div>

      <div className='d-flex flex-column text-center p-3 align-items-center'>
        <img src={football} alt='' />
        <h3>ABCD</h3>
        <p>you are the hero you've found the stunning turf booked with ease and now its time to play. the court is ready for your epic match</p>
      </div>
    </div>
  );
}

export default Blocks;
