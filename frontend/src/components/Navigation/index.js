import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const histroy = useHistory()
  return (
    <header>
      <div className='logo-container'>
        <NavLink id='logo' exact to="/"><i className="fa-brands fa-airbnb"></i>AirBrB</NavLink>
      </div>
      {isLoaded && (
        <div className='navigation-left'>
          <div>
            {sessionUser && <button onClick={()=>histroy.push('/spots/new')} id='create-spot-button' >Create a New Spot</button>}
          </div>
          <div id='user-button' >
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;