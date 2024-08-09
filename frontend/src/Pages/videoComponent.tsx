import React, { useEffect, useRef, useContext } from 'react';
import { WebRTCContext } from './WebRtcContext.tsx'; // Update the import path as necessary

interface VideoComponentProps {
  sessionId: number;
}


/**
 * VideoComponent for displaying local and remote video streams.
 * @param {VideoComponentProps} props - The props for the VideoComponent.
 * @returns {React.Component} The VideoComponent.
 */
const VideoComponent: React.FC<VideoComponentProps> = ({ sessionId }) => {
    const { localStream, remoteStream } = useContext(WebRTCContext); // Assuming you have localStream and remoteStream in your context
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

     /**
     * Sets the source for local video stream.
     */
    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

     /**
     * Sets the source for remote video stream.
     */
    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline muted />
            <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
    );
};

export default VideoComponent;

