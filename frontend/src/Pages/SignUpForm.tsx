import React, { useRef } from "react"; 
import '../Components/Images/image.d.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setName, setHasAgreed, setFileName, resetForm } from '../Redux Management/userSlice.tsx';
import UserService from "../services/UserService.tsx";
import { setLocalStorageUser } from "../utils/localStorageUtils.ts";
import { useNavigate, NavLink } from "react-router-dom";
import "../Components/style/App.css";
import LinguaLogo from "../Components/Images/LinguaLogo.png";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RootState } from "../Redux Management/store.tsx";


const VisuallyHiddenInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input style={{ position: "absolute", opacity: 0, zIndex: -1 }} ref={ref} {...props} />
  )
);


/**
 * SignUpForm component for user registration.
 * @param {function} onRegister - Callback function executed after successful registration.
 * @returns {React.Component} The SignUpForm component.
 */
const SignUpForm = ({ onRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, name, hasAgreed, fileName } = useSelector((state: RootState) => state.user);

  // Use useRef with specific type HTMLInputElement
  const fileInput = useRef<HTMLInputElement>(null);

  /**
   * Handles file change event for profile image upload.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setFileName(file.name));
    }
  };

   /**
   * Handles changes in form inputs.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
   */
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case "email":
        dispatch(setEmail(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "name":
        dispatch(setName(value));
        break;
      case "hasAgreed":
        dispatch(setHasAgreed(value));
        break;
      default:
        break;
    }
  };

   /**
     * Handles the registration process.
     * @param {React.FormEvent} e - The form event.
     */
  const handleregister = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (email !== "" && password !== "" && name !== "") {
      const formDataObj = new FormData();
      formDataObj.append("name", name);
      formDataObj.append("email", email);
      formDataObj.append("password", password);

      // Safely access the file using the ref
      const file = fileInput.current?.files?.[0];
      console.log('Form data:', formDataObj);
      console.log(`file signupform ${file}`)
      if (file) {
        formDataObj.append("profilePic", file);
      }

      try {
        const result = await UserService.register(formDataObj);
        if (result.status === 201) {
          setLocalStorageUser({ ...result.data.user, token: result.data.token });
          onRegister();
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Error in registration. Please try again.");
        // dispatch(resetForm());
        reset(); // Correctly used here to reset the form on error
      }
    }
  };

  /**
   * Resets the form to initial state.
   */
  const reset = () => {
    dispatch(resetForm());
    if (fileInput.current) {
      fileInput.current.value = ""; // Reset file input
    }
  };

  return (
    <div className="App">
      <div className="appAside">
        <img src={LinguaLogo} alt="Lingua Logo" className="logo" />
      </div>
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink to="/sign-in" className="pageSwitcherItem">Sign In</NavLink>
          <NavLink to="/sign-up" className="pageSwitcherItem">Sign Up</NavLink>
        </div>
        <div className="formTitle"></div>
        <div className="formCenter">
          <form onSubmit={handleregister} className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">Full Name</label>
              <input type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={name} onChange={handleChange} />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">Password</label>
              <input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={password} onChange={handleChange} />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">E-Mail Address</label>
              <input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={email} onChange={handleChange} />
            </div>
            <div className="formField">
              <Button className="formFieldButton" style={{ backgroundColor: "#54616E" }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Image
                {/* <VisuallyHiddenInput  ref={fileInput} name="profilePic" type="file" onChange={handleFileChange} /> */}
                <VisuallyHiddenInput ref={fileInput} name="profilePic" type="file" onChange={handleFileChange} />
              </Button>
              {fileName && <p>{fileName}</p>}
            </div>
            <div className="formField">
              <label className="formFieldCheckboxLabel">
                <input className="formFieldCheckbox" type="checkbox" name="hasAgreed" checked={hasAgreed} onChange={handleChange} /> I agree all statements in <a href="null" className="formFieldTermsLink">terms of service</a>
              </label>
            </div>
            <div className="formField">
              <button className="formFieldButton" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
