import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history=useHistory()
  const checkInputValues = () => {
    if(!email || !username || !firstName || !lastName || !password || !confirmPassword) {
      return true
    }
    if(username.length < 4) {
      return true
    }
    if(password.length < 6) {
      return true
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .then(()=>history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            console.log(data)
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  return (
    <div className="sign-up-form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.username && <p>{errors.username}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}

        />



        <input
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}

        />



        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />




        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}

        />



        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />



        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}

        />


        <button disabled={checkInputValues()} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;