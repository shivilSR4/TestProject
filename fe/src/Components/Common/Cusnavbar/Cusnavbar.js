import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cusnavbar.css';
import games from '../../../Assets/EA-revenue-2021.webp';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Cusnavbar({ openModal }) {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <span className="navbar-brand" onClick={() => navigate('/home')}>
        Green Gr<img src={games} alt="Game Logo" className="navbar-logo"/>d
      </span>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">Home</NavLink>
          </li>
          {user.role === 1 && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/newcourt">Add New Court</NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/courts/courtlist">Courts</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.Name}
            </a>
            <ul className=" dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li className='list'>
                <NavLink className="dropdown-item" to="/profile" onClick={openModal}>Profile</NavLink>
              </li>
              <li className='list'>
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Cusnavbar;
