import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cusnavbar.css'
import games from'../../../Assets/cartoon-soccer-player-running-with-ball-vector-illustration-orange-background_1142-87845.avif'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Cusnavbar({ openModal }) {
  const {user} = useSelector(state=>state.user)
  console.log(user);
  const navigate = useNavigate()
  const logout = ()=>{
    window.location.href = '/'
    localStorage.clear()
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light " id='navbar'>
      <span className="navbar-brand" href="#" onClick={()=>{navigate('/home')}}>Green Gr<img src={games}/>d</span>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="#" onClick={()=>{navigate('/home')}}>Home</a>
          </li>
          {user.role===1 && <li className="nav-item">
            <a className="nav-link" href="#" onClick={()=>{navigate('/newcourt')}}>AddNewCourt</a>
          </li>}
          <li className="nav-item active">
            <a className="nav-link" href="#" onClick={()=>{navigate('/courts/courtlist')}}>Courts</a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.Name}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#"  onClick={() => { navigate('/profile'); openModal(); }}>Profile</a></li>
              <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Cusnavbar;
