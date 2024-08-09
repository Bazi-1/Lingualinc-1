import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings } from '../Redux Management/meetingSlice.tsx'; // Import the action
import { AppDispatch, RootState } from '../Redux Management/store.tsx'; // Import the RootState
import { WebRTCContext } from "./WebRtcContext.tsx"; // Assuming this is the correct import path
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import meetingServices from "../services/meetingService.tsx";
import {
  clearLocalStorageUser,
  getLocalStorageUser,
} from "../utils/localStorageUtils.ts";

/**
 * AvailableMeetings component displays available meetings and allows users to join them.
 * @returns {React.Component} The AvailableMeetings component.
 */
const AvailableMeetings = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for typing dispatch
  const meetings = useSelector((state: RootState) => state.meeting.meetings);
  const meetingStatus = useSelector((state: RootState) => state.meeting.status);
  const { setupWebRTC, waitForOffer, setupSocketConnection } = useContext(WebRTCContext);
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);



  /**
   * Function to handle joining a meeting session.
   * @param {number} sessionId - The ID of the session to join.
   */
  const joinSession = async (sessionId: number) => {
    try {
      setupSocketConnection(sessionId);
      const response = await meetingServices.joinMeeting(getLocalStorageUser()?.userId, sessionId);
      if (response.status === 201) {
        waitForOffer(); // Updated line
        navigate(`/meetingViews/${sessionId}`);
      } else {
        console.log('Join session response:', response.data);
      }
    } catch (error) {
      console.error("Error handling join session:", error);
    }
  };

   /**
     * Handles user logout.
     */
  const handleLogout = () => {
    clearLocalStorageUser();
    navigate("/sign-in");
  };

    /**
     * Effect for handling session expiration.
     */
  useEffect(() => {
    let logoutTimer;
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => setSessionExpired(true), 600000); // 10 minutes
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
   * Effect to fetch meetings when the meeting status is idle.
   */
  useEffect(() => {
    if (meetingStatus === 'idle') {
      dispatch(fetchMeetings()); // Correct usage
    }
  }, [meetingStatus, dispatch]);

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

  // Render the component view
  return (
    <div className="trainer_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>Available Meetings</h2>
        </div>
        <div style={{ paddingLeft: "5%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {meetings.map((meeting) => (
              <div
                key={meeting.sessionId}
                style={{
                  width: "350px",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#212529",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Grid container alignItems="center" paddingBottom={2}>
                      <Avatar src="/broken-image.jpg" />
                      <Grid item xs paddingLeft={2}>
                        <Typography gutterBottom variant="h6" component="div">
                          {meeting.sessionName}
                        </Typography>
                      </Grid>

                      {meeting.sessionStatus === "active" ? (
                        <div className="circle" style={{ backgroundColor: "green" }}></div>
                      ) : (
                        <div className="circle" style={{ backgroundColor: "red" }}></div>
                      )}
                    </Grid>
                    <Typography color="white" variant="body2">
                      {meeting.sessionDescription}
                    </Typography>
                  </Box>
                  <Divider variant="middle" />
                  <div style={{ paddingLeft: "78%", paddingTop: "10px", paddingBottom: "5px" }}>
                    <Button
                      fullWidth
                      sx={{
                        width: "60%",
                        height: "90%",
                        backgroundColor: "#d23931",
                        color: "#ffffff",
                        borderRadius: "5px",
                        "&:hover": {
                          backgroundColor: "#1a9696",
                        },
                      }}
                      onClick={() => joinSession(meeting.sessionId)}
                    >
                      Join
                    </Button>
                  </div>
                </Box>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableMeetings;
