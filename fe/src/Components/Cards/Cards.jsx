import React from 'react'
import courtimg from '../../Assets/champions-league-stadium-football-sports-game-soccer-stadium-wallpaper-preview.jpg'
import './Cards.css'
import { useNavigate } from 'react-router-dom'


function Cards({court}) {
    const navigate = useNavigate()
  return (
    <div className='card' onClick={()=>navigate('/courts/courtdetails/'+court._id)}>
        <img src={`${process.env.REACT_APP_BASE_URL}/images/${court?.courtPics?.[0]?.name}`} alt='' />

        <div className='card-body'>
            <h3>
                   {court.name}
            </h3>
            <p>
                {court.location} <br />
                {court.address1}
            </p>

        </div>

    </div>
  )
}

export default Cards