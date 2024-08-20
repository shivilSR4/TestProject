import React, { useState } from 'react';
import './Ordertemplate.css'; 
import { useDispatch } from 'react-redux';
import { addOrderid, removeOrderid } from '../../Redux/orderid';

function Ordertamplate({ Udata }) {
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const toggleSelect = () => {
    setIsSelected(!isSelected);

    if (!isSelected) {
      dispatch(addOrderid(Udata._id));  
    } else {
      dispatch(removeOrderid(Udata._id));  
    }
  };

  return (
    <div 
      className={`order-card ${isSelected ? 'selected' : ''}`} 
      onClick={toggleSelect}
    >
      <div className='order-details'>
        <h3>Court: {Udata.courtName}</h3>
        <p><strong>Location:</strong> {Udata.courtLocation}</p>
        <p><strong>Address:</strong> {Udata.courtAddress}</p>
        <p><strong>Date:</strong> {new Date(Udata.slotDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {Udata.slotTimes.join(', ')}</p>
      </div>
      <div className='order-status'>
        <p><strong>Status:</strong> {Udata.bookingStatus}</p>
      </div>
    </div>
  );
}

export default Ordertamplate;
