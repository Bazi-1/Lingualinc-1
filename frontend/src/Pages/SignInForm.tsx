import React, { useEffect } from "react";
import '../Components/Images/image.d.ts';
import { useNavigate, NavLink } from "react-router-dom";
import UserService from "../services/UserService.tsx";
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setAuthenticatedUser, resetCredentials } from '../Redux Management/userSlice.tsx';
import { setLocalStorageUser } from "../utils/localStorageUtils.ts";
import { RootState } from "../Redux Management/store.tsx"; // Import RootState
import LinguaLogo from '../Components/Images/LinguaLogo.png';


/**
 * SignInForm component handles user authentication.
 * @param {function} onLogin - Callback function executed after successful login.
 * @returns {React.Component} The SignInForm component.
 */
const SignInForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.user.email); 
  const password = useSelector((state: RootState) => state.user.password); 

  useEffect(() => {});


   /**
   * Handles the login process.
   * @param {React.FormEvent} e - The form event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        const result = await UserService.authenticate({ email, password });
  
        if (result?.data?.access_token) {
          let authenticatedUser = { ...result.data.user, token: result.data.access_token };
          setLocalStorageUser(authenticatedUser);
          dispatch(setAuthenticatedUser(authenticatedUser));
          onLogin();
          navigate("/HomeView");
        }
      } catch (error) {
        console.error('Login Error:', error); 
        alert("Wrong email/password");
        dispatch(resetCredentials());
      }
    }
  };
 

  return (
    <div className="App">
      <div className="appAside">
        <img src={LinguaLogo} alt="Lingua Logo" className="logo" />
      </div>

      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="/sign-in"
            className="pageSwitcherItem"
            // activeclassname="pageSwitcherItem-active"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/sign-up"
            className="pageSwitcherItem"
            // activeclassname="pageSwitcherItem-active"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formTitle">
          {/* Additional navigation items if needed */}
        </div>

        <div className="formCenter">
          <form className="formFields" onSubmit={handleLogin}>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}

              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </div>

            <div className="formField">
              <button className="formFieldButton" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
