import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostSessions, setActiveSessionId } from '../Redux Management/hostSlice.tsx';
import { AppDispatch, RootState } from '../Redux Management/store.tsx';
import { WebRTCContext } from "./WebRtcContext.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import VideoComponent from "./videoComponent.tsx";
import { useNavigate } from "react-router-dom";
import { fetchProfilePic } from "../Components/resuables/fetchprofpic.tsx";
import {
  getLocalStorageUser,
  clearLocalStorageUser,
} from "../utils/localStorageUtils.ts";
import meetingService from "../services/meetingService.tsx";
import Alert from "@mui/material/Alert";
import { setSessionExpired } from "../Redux Management/feedbackSlice.tsx";


/**
 * HostSection component for displaying and managing sessions hosted by the user.
 * @returns {React.Component} The HostSection component.
 */
const HostSection = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { hostSessions, activeSessionId } = useSelector((state: RootState) => state.host);
  const loggedInUserId = getLocalStorageUser()?.userId;
  const { setupWebRTC, createOffer, setupSocketConnection } = useContext(WebRTCContext);
  const navigate = useNavigate();


  const profilePic = useSelector((state: RootState) => state.user.profilePic);

   /**
     * Starts a session and navigates to the session view.
     * @param {number} sessionId - The ID of the session to start.
     */
  const startSession = async (sessionId: number) => {
    try {
      setupSocketConnection(sessionId);
      const response = await meetingService.startSession(sessionId);
      if (response.status === 200) {
        dispatch(setActiveSessionId(sessionId));
        await setupWebRTC();
        createOffer();
        navigate(`/meetingViews/${sessionId}`);
      } else {
        console.error('Failed to start session:', response.data.message);
      }
    } catch (error) {
      console.error("Error starting session", error);
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
   * Fetches hosted sessions on component mount.
   */
  useEffect(() => {
    if (loggedInUserId) {
      dispatch(fetchHostSessions(loggedInUserId));
    }
  }, [loggedInUserId, dispatch]);

  /**
   * Effect for handling session expiration.
   */
  useEffect(() => {
    let logoutTimer = setTimeout(() => setSessionExpired(true), 600000); // 10 minutes
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => setSessionExpired(true), 600000);
    };
    document.addEventListener("mousemove", resetLogoutTimer);
    document.addEventListener("keydown", resetLogoutTimer);
    return () => {
      clearTimeout(logoutTimer);
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keydown", resetLogoutTimer);
    };
  }, []);


  return (
    <div className="trainer_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2 style={{ paddingTop: 6 }}>Your Hosted Meetings</h2>
        </div>
      </div> 

      <div className="container" style={{ width: 700 }}>
        {hostSessions.map((session) => (
          <div className="heading_container" key={session.sessionId} style={{ paddingTop: "20px" }}>
            <Box sx={{ bgcolor: "#212529", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box sx={{ p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {session.sessionName}
                    </Typography>
                  </Grid>
                  <div style={{ paddingRight: "3%" }}>
                    <Avatar
                     src={
                      profilePic
                        ? require(`../Components/Images/${profilePic}`)
                        : `${process.env.PUBLIC_URL}/Images/bw.jpeg`
                    }
                    // src="/broken-image.jpg"
                    
                    />
                  </div>
                </Grid>
                <Typography color="white" variant="body2" style={{ margin: '0 10' }}>
                  {session.sessionDescription}
                </Typography>
              </Box>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '15px', paddingTop: '10px' }}>
                <IconButton style={{ width: '5px', margin: '0 255px' }}>
                  <Badge style={{ color: "#CD5C5B" }}>
                    <DeleteIcon />
                  </Badge>
                </IconButton>
                <IconButton style={{ margin: '0 5px', fontSize: 'large' }} onClick={() => startSession(session.sessionId)}>
                  <Badge style={{ color: "#CD5C5B" }}>
                    <PlayArrowIcon style={{ color: "#CD5C5B" }}></PlayArrowIcon>
                  </Badge>
                </IconButton>
              </div>
            </Box>
          </div>
        ))}
      </div>
      {activeSessionId && <VideoComponent sessionId={activeSessionId} />} {/* Assuming VideoComponent accepts sessionId as prop */}
    </div>
  );
};

export default HostSection;
