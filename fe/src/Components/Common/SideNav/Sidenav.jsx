import React from 'react';
import './Sidenav.css';
import { useSelector } from 'react-redux';
import AxiosInstance from 'Config/apicalls';
import { ToastContainer } from 'react-toastify';
import { Errortoast, Successtoast } from 'plugin/Toast/Toast';

function Sidenav() {
  const { orderIds } = useSelector(state => state.order);

  const handleDelete = () => {
    if (orderIds.length > 0) {
      
      AxiosInstance.post('users/ordercancel',orderIds)
        .then((res) => {
          
          Successtoast(res.data.message)
          window.location.reload()
        })
        .catch((err) => {
          Errortoast('Error deleting orders:', err);
        });
    }
  };

  return (
   
    <div className="sidenav">
       <ToastContainer />
      <ul className="nav flex-column">
        <li className="nav-items">
          <a className="nav-link active" href="#">Orders</a>
        </li>
        <li className="nav-items">
          <a className="nav-link" href="#" onClick={handleDelete}>Cancel</a>
        </li>
        <li className="nav-items">
          <a className="nav-link" href="#">Edit</a>
        </li>
        <li className="nav-items">
          <a className="nav-link" href="#">About</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
