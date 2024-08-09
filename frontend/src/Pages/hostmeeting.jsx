import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Components/style/Designs/homeapp.css";
import "../Components/style/Responsives/ResponsiveHomeApp.css";
import NavBar from "../Components/resuables/NavigationBar.tsx";
import Card from "react-bootstrap/Card";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import {
  clearLocalStorageUser,
  getLocalStorageUser,
} from "../utils/localStorageUtils.ts";
import meetingServices from "../services/meetingService.tsx";

/**
 * HostMeetings component for creating and managing hosted meetings.
 * @returns {React.Component} The HostMeetings component.
 */
const HostMeetings = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");

   /**
     * Handles user logout due to session inactivity.
     */
  const handleLogout = () => {
    console.log("Logging out due to inactivity");
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

   /**
     * Handles the start of a new meeting.
     */
  const handleStartMeeting = async () => {
    try {
      const hostId = getLocalStorageUser()?.userId;

        await meetingServices.createMeeting(
        hostId, // This should match the backend expected field
        meetingName,
        meetingDescription
      );


    } catch (error) {
      console.error("Error starting meeting:", error);
    }
  };

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
    <div className="trainer_section">
      <div className="container" style={{ paddingTop: "5dvb" }}>
        <div className="layout_padding2">
          <tr>
            <td>
              <div className="s_s_t">
                <h2>
                  WANT TO TEACH <br />
                  PEOPLE AND <br />
                  SHOW YOUR LANGUAGE <br /> SKILL!
                </h2>
              </div>

              <div className="t_s_s">
                <br />
                <h2> FILL THE FORM TO START HOSTING {"  --->"}</h2>
              </div>
            </td>

            <td style={{ paddingLeft: "1dvh" }}>
              <div style={{ width: "100dvh", paddingLeft: "10dvh" }}>
                <Card
                  className="heading_container"
                  style={{
                    backgroundColor: "#212529",
                    width: "80dvb",
                    height: "65dvh",
                  }}
                >
                  <Card.Body>
                    <br />

                    <div style={{ paddingLeft: "15%" }}>
                      <tr>
                        {" "}
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          value={meetingName}
                          onChange={(e) => setMeetingName(e.target.value)}
                          variant="outlined"
                          style={{ width: "50dvb" }}
                          InputLabelProps={{
                            style: { color: "#ffffff" },
                          }}
                          InputProps={{
                            style: { color: "#ffffff" },
                          }}
                          SelectProps={{
                            style: { color: "#ffffff" },
                          }}
                        />
                      </tr>

                      <br />

                      <td>
                        <TextField
                          style={{ width: "50dvb" }}
                          rows={8}
                          label="Description"
                          value={meetingDescription}
                          onChange={(e) =>
                            setMeetingDescription(e.target.value)
                          }
                          multiline
                          InputLabelProps={{
                            style: { color: "#ffffff" },
                          }}
                          InputProps={{
                            style: { color: "#ffffff" },
                          }}
                        />
                      </td>
                      <tr>
                        <div
                          style={{ paddingTop: "20px" }}
                          className="t_s_s_s_3"
                        >
                          <Fab
                            variant="extended"
                            className="click"
                            sx={{
                              backgroundColor: "#CD5C5B",
                            }}
                            href="/host-view"
                            onClick={handleStartMeeting}
                          >
                            CREATE
                          </Fab>
                        </div>
                      </tr>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
};

const Hostmeeting = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <NavBar />
          </div>
        </header>
      </div>

      <HostMeetings />
    </div>
  );
};

export default Hostmeeting;
