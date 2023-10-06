import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";
import '../Navigation/Navigation.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const header = document.querySelector('header')
    header.style.display = ''
    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    history.push('/')
  };

  const ulClassName =  "profile-dropdown" + (showMenu ? "" : " hidden") 

  return (
    <>
      <button id="user-profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        {user ? <img id="user-profile-pic" src={user.profileUrl} alt={user.profileUrl}/>:<i className="fas fa-user-circle" ></i>}
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='hello-user-header'>Hello, {user.username}</div>
            <div id='user-email-header'>{user.email}</div>
            <div id='user-manage-spot-header' onClick={()=>{
            const header = document.querySelector('header')
            header.style.display = ''
              history.push('/current')              
              setShowMenu(false)
              }}>Manage Spots</div>
            <div id='user-booking-manage-button' onClick={()=>{
              const header = document.querySelector('header')
              header.style.display = ''
              history.push('/bookings/current')
              setShowMenu(false)
            }}>Manage Bookigs</div>
            <div>
              <button id='user-logout-header-button' onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div id="sign-up-user">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div id="log-in-user">
              <OpenModalButton
                buttonText="Log in"
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;