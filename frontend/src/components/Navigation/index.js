import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ loaded, type, step }) {
  const sessionUser = useSelector(state => state.session.user);
  const histroy = useHistory()
  const handleClick = () => {
    const header = document.querySelector('header')
    header.style.display = ''
  }
  return (
    <header>
      <div className='logo-container'>
        <NavLink onClick={handleClick} id='logo' exact to="/"><i className="fa-brands fa-airbnb"></i> AirBrB</NavLink>
      </div>
      {type === 'cancel' ?
        <div className='cancel-nav-container'>
          <div style={step === 1 || step ===2 || step === 3 ? {color:"black"}: null}>
              1. Select reason
          </div>
          <i className="fas fa-chevron-right"></i>
          <div style={step === 2 || step === 3 ? {color:"black"}: null}>
              2. Send message
          </div>
          <i className="fas fa-chevron-right"></i>
          <div style={step === 3 ? {color:"black"}: null}>
              3. Confirm cancellation
          </div>
        </div> : null}
      {loaded && (
        <div className='navigation-left'>
          <div>
            {sessionUser && <button onClick={() => histroy.push('/spots/new')} id='create-spot-button' >Create a New Spot</button>}
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