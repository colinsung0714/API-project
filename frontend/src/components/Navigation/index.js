import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header>
      <div className='logo-container'>
        <NavLink id='logo' exact to="/"><i className="fa-brands fa-airbnb"></i>AirBrB</NavLink>
      </div>
      {isLoaded && (
        <div id='user-button' >
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </header>
  );
}

export default Navigation;