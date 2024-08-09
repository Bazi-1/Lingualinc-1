import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Components/style/Designs/homeapp.css";
import "../Components/style/Responsives/ResponsiveHomeApp.css";
import NavBar from "../Components/resuables/NavigationBar.tsx";
import HostSection from "./hostsection.tsx";

/**
 * Host component serves as a container for the HostSection component.
 * @returns {React.Component} The Host component.
 */
const Host = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <NavBar />
          </div>
        </header>
      </div>

      <HostSection />
    </div>
  );
};


export default Host;
