import React, { createContext, useRef, useState, Context } from 'react';
import io, { Socket } from 'socket.io-client';

interface WebRTCContextType {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    setupWebRTC: () => Promise<void>;
    createOffer: () => Promise<void>;
    setupSocketConnection: (sessionId: number) => void;
    waitForOffer: () => void;
}

export const WebRTCContext: Context<WebRTCContextType> = createContext<WebRTCContextType>({
    localStream: null,
    remoteStream: null,
    setupWebRTC: async () => {},
    createOffer: async () => {},
    setupSocketConnection: () => {},
    waitForOffer: () => {}
});

/**
 * WebRTCProvider provides WebRTC context to its children.
 * @param {React.FC<{ children: React.ReactNode; sessionId: number }>} props - The props for WebRTCProvider.
 * @returns {React.Component} The WebRTCProvider component.
 */
export const WebRTCProvider: React.FC<{ children: React.ReactNode; sessionId: number }> = ({ children, sessionId }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const peerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    }));
    const socket = useRef<Socket | null>(null);

    const setupSocketConnection = (sessionId: number) => {
        socket.current = io('http://localhost:3002/', { transports: ['websocket'] });

        socket.current.on('connect', () => {
            console.log(`Socket connected with id: ${socket.current?.id}`);
            socket.current?.emit('join-room', { sessionId });
        });

        socket.current.on('offer', (data) => handleReceiveOffer(data.offer));
        socket.current.on('answer', (data) => handleReceiveAnswer(data.answer));
        socket.current.on('ice-candidate', (data) => handleNewICECandidateMsg(data.candidate));
    };

    const setupWebRTC = async () => {
        if (!localStream) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        }

        peerConnection.current.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.current?.emit('ice-candidate', { candidate: event.candidate, sessionId });
            }
        };
    };

    const createOffer = async () => {
        await setupWebRTC();
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.current?.emit('offer', { offer, sessionId });
    };

    const handleReceiveOffer = async (offer: RTCSessionDescriptionInit) => {
        await setupWebRTC();
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.current?.emit('answer', { answer, sessionId });
    };

    const handleReceiveAnswer = async (answer: RTCSessionDescriptionInit) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleNewICECandidateMsg = async (candidate: RTCIceCandidateInit) => {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const waitForOffer = () => {
        console.log('Waiting for offer...');
        socket.current?.on('offer', (offer) => {
            console.log('Offer received:', offer);
            handleReceiveOffer(offer);
        });
    };

    return (
        <WebRTCContext.Provider value={{ localStream, remoteStream, setupWebRTC, createOffer, setupSocketConnection, waitForOffer }}>
            {children}
        </WebRTCContext.Provider>
    );
};

export default WebRTCProvider;
