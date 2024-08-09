// MeetingViewComponent.js
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import VideoComponent from './videoComponent.tsx';
import WebRTCProvider, { WebRTCContext } from './WebRtcContext.tsx';

/**
 * MeetingViewComponent displays the video component for a specific meeting session.
 * @returns {React.Component} The MeetingViewComponent.
 */
const MeetingViewComponent = () => {
  const { sessionId } = useParams(); 
  const { setupWebRTC } = useContext(WebRTCContext);
console.log(`sessionid 333 ${sessionId}`);

  /**
   * Sets up WebRTC on component mount.
   */
  useEffect(() => {
    setupWebRTC();
  }, [setupWebRTC]);

  // Check if sessionId exists
  if (!sessionId) {
    return <div>Session ID is required.</div>;
  }

  return (
    <div>
      <VideoComponent sessionId={sessionId} />
    </div>
  );
};

/**
 * MeetingView wraps the MeetingViewComponent within a WebRTCProvider.
 * @returns {React.Component} The MeetingView component.
 */
const MeetingView = () => {
  console.log('1sessionid');
  const { sessionId } = useParams(); 
  console.log('2sessionid');
  console.log(`meetingview ${sessionId}`)
  console.log('3sessionid');

  if (!sessionId) {  
    return <div>Session ID is required.</div>;
  }
  return (
    
    <WebRTCProvider sessionId={sessionId}>
      <MeetingViewComponent />
    </WebRTCProvider>
  );
};

export default MeetingView;
