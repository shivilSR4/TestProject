import React from 'react'
import './Uspblocks.css'
import users from '../../Assets/users-2-svgrepo-com.svg'

function Uspblocks() {
  return (
   <div className='d-flex flex-wrap justify-content-center mt-3 mb-5 brand-promo-container gap-4 '>
    <div className='brand-promo-box text-center'>
    <img src={users} alt='' height={30} />
    <h4>10000+</h4>
    <p>Happy Customer</p>
    </div>

    <div className='brand-promo-box text-center'>
    <img src='' alt='' />
    <h4>100+Location</h4>
    <p>Availabe 20+ State In India</p>
    </div>

    <div className='brand-promo-box text-center'>
    <img src='' alt='' />
    <h4>24/7 Access</h4>
    <p>choose Favourite Slot</p>
    </div>

    <div className='brand-promo-box text-center'>
    <img src='' alt='' />
    <h4>Welcome Offers</h4>
    <p>Get Free Access To All Courts</p>
    </div>

    <div className='brand-promo-box text-center'>
    <img src='' alt='' />
    <h4>Free And Rented Accessories</h4>
    <p>Happy Customer</p>
    </div>

   </div>
  )
}

export default Uspblocks