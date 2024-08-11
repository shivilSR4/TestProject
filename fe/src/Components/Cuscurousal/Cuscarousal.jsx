import React from 'react';
import image1 from "../../Assets/duffy-brook-IwDTKKFmWAc-unsplash.jpg"; 
import './Cuscarousal.css';

function Cuscarousal() {
  return (
    <div className='container'>
      <div className='row'>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 " src={image1} alt="First slide" />
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuscarousal;
