import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Components/style/Designs/homeapp.css";
import "../Components/style/Responsives/ResponsiveHomeApp.css";
import NavBar from "../Components/resuables/NavigationBar.tsx";
import Fab from "@mui/material/Fab";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useNavigate } from "react-router-dom";
import { clearLocalStorageUser } from "../utils/localStorageUtils.ts";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";

/**
 * AvailableMeetings component displays description and provides navigation to host or explore meetings.
 * @returns {React.Component} The AvailableMeetings component.
 */
const AvailableMeetings = () => {
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  /**
     * Handles the user logout.
     */
  const handleLogout = () => {
    clearLocalStorageUser();
    navigate("/sign-in");
  };

   /**
     * Effect for handling session timeout.
     */
  useEffect(() => {
    let logoutTimer;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => setSessionExpired(true), 600000);
    };

    document.addEventListener("mousemove", resetLogoutTimer);
    document.addEventListener("keydown", resetLogoutTimer);

    resetLogoutTimer();

    return () => {
      clearTimeout(logoutTimer);
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keydown", resetLogoutTimer);
    };
  }, []);

  if (sessionExpired) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={handleLogout}>
            RETURN TO LOGIN PAGE
          </Button>
        }
      >
        Your session has expired
      </Alert>
    );
  }

  return (
    <div className="trainer_section layout_padding">
      <div className="container">
        <div className="t_s_s_1">
          <h2>WELCOME TO</h2>
          <h2>LINGUALINC</h2>
        </div>
        <div className="t_s_s">
          <h2> Embark on a journey of linguistic </h2>
          <h2> discovery and elevate your language </h2>
          <h2> skills with our diverse and enriching </h2>
          <h2> language sessions.</h2>
        </div>

        <div className="t_s_s_2" style={{ paddingLeft: "30%" }}>
          <td>
            <Fab
              variant="extended"
              className="click"
              sx={{
                backgroundColor: "#CD5C5B",
              }}
              href="/host-meeting"
            >
              <h2> host meeting </h2>
              <MeetingRoomIcon sx={{ ml: 1, fontSize: "DensityLarge" }} />
            </Fab>
          </td>
          <td style={{ paddingLeft: "1dvb" }}>
            <Fab
              variant="extended"
              className="click"
              sx={{
                backgroundColor: "#CD5C5B",
              }}
              href="/MeetingView"
            >
              <h2> EXPLORE </h2>
              <MeetingRoomIcon sx={{ ml: 1, fontSize: "DensityLarge" }} />
            </Fab>
          </td>
        </div>
      </div>
    </div>
  );
};

const HomeView = () => {
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

export default HomeView;
