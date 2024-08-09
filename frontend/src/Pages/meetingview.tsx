import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Components/style/Designs/homeapp.css";
import "../Components/style/Responsives/ResponsiveHomeApp.css";
import NavBar from "../Components/resuables/NavigationBar.tsx";
import AvailableMeetings from "./MeetingPage.tsx";


/**
 * CurrentMeetings component serves as a container for the AvailableMeetings component.
 * @returns {React.Component} The CurrentMeetings component.
 */
const CurrentMeetings = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <NavBar />
          </div>
        </header>
      </div>


      <AvailableMeetings />
    </div>
  );
};


export default CurrentMeetings;
