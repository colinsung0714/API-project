import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      });
  };

  const loginDemoUser = (e) => {
    e.preventDefault();
    setErrors({});
    const demoUser = {
      credential:'Demo-lition',
      password:'password'
    }
    return dispatch(sessionActions.login(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      });
  };


  return (
    <>
      <h1>Log In</h1>
      <form className='login-input-form-container' onSubmit={handleSubmit}>


        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username or Email"
        />


        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {errors.message && (
          <p>{errors.message}</p>
        )}
        <button type="submit" disabled={password.length < 6 || credential.length < 4}>Log In</button>
        <button id='demo-user-button' onClick={loginDemoUser} >
          Log in as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;