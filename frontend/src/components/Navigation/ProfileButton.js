import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName =  "profile-dropdown" + (showMenu ? "" : " hidden") 

  return (
    <>
      <button id="user-profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" ></i>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='hello-user-header'>Hello, {user.username}</div>
            <div id='user-email-header'>{user.email}</div>
            <div id='user-manage-spot-header'>Manage Spots</div>
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