import React from 'react'
import './Showdetails.css'
import Cusnavbar from 'Components/Common/Cusnavbar/Cusnavbar'
import Sidenav from 'Components/Common/SideNav/Sidenav'
import Orders from 'Components/Orders/Orders'

function Showdetails() {
  return (
    <div>

      <Cusnavbar />
    
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 col-md-6 col-12'>
        <Sidenav />
        </div>
      
      <div className='orderDetails col-lg-8 col-md-6 col-12 mt-5'>
        <h4>Booking Orders</h4>
      <Orders />
      </div>
     
      </div>
    </div>
     

      
     

    </div>
  )
}

export default Showdetails