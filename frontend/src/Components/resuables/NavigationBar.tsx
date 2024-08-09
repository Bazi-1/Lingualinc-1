import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "../style/Designs/homeapp.css";
import "../style/Responsives/ResponsiveHomeApp.css";
import { getLocalStorageUser } from "../../utils/localStorageUtils.ts";
import { fetchProfilePic } from "./fetchprofpic.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux Management/store.tsx";

/**
 * NavBar component to display the navigation bar.
 * @returns {React.Component} The NavBar component.
 */
const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const profilePic = useSelector((state: RootState) => state.user.profilePic);

  useEffect(() => {
    const userId = getLocalStorageUser()?.userId;
    // const userId = getLocalStorageUser().userId;
    if (userId) {
      dispatch(fetchProfilePic(userId));
    }
  }, [dispatch]);


  return (
    <nav className="navbar navbar-expand-lg custom_nav-container ">
      <NavLink className="navbar-brand" to="/">
        <span>LINGUALINC</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/HomeView">
                Home
              </a>
            </li>
            <li className="nav-item custom-menu-item ">
              <NavLink className="nav-link" to="/host-meeting">
                Create
              </NavLink>
            </li>
            <li className="nav-item custom-menu-item ">
              <NavLink className="nav-link" to="/host-view">
                Host
              </NavLink>
            </li>
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/MeetingView">
                Explore
              </a>
            </li>
            <li className="nav-item custom-menu-item">
              <a className="nav-link" href="/TranslateView">
                {" "}
                Translate
              </a>
            </li>
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/botview">
                Bot
              </a>
            </li>
            <li className="nav-item custom-menu-item ">
              <a className="nav-link" href="/CSView">
                Feedback
              </a>
            </li>

            <li className="translate" style={{ paddingLeft: "16dvb" }}>
              {" "}
              <Image
                className="nav-Image"
                src={
                  profilePic
                    ? require(`../Images/${profilePic}`)
                    : `${process.env.PUBLIC_URL}/Images/bw.jpeg`
                }
                roundedCircle
              />
              <span className="nav-items">
                {getLocalStorageUser()?.userName}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
