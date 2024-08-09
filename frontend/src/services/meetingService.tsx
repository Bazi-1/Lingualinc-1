// meetingService.js
import { getToken } from "../utils/localStorageUtils.ts";
import http from "../utils/http-common.ts";

const createMeeting = (hostId, sessionName, sessionDescription) => {
    return http.post('/session/create', { hostId, sessionName, sessionDescription }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    });
};

const getMeetings = () => {
    return http.get('/session/all', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};
 
const getHostSessions = (hostId) => {
    return http.get(`/session/host/${hostId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


const startSession = (sessionId) => {
    return http.put(`/session/start/${sessionId}`, {
        // headers: {
        //     Authorization: `Bearer ${getToken()}`
        // }
       
    });
};


const joinMeeting = (userId ,sessionId) => {
    return http.post('/session/join', { userId, sessionId }
   
    );
};

const leaveMeeting = (sessionId) => {
    return http.post('/session/leave', { sessionId }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    });
};

const isHost = (sessionId) => {
    return http.get(`/session/is-host/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


const sessiondetails = (sessionId) => {
    return http.get(`/session/details/${sessionId}`);
};


/**
 * Service methods for meeting-related operations.
 */
const meetingServices = {
    sessiondetails,
    isHost,
    joinMeeting,
    leaveMeeting,
    startSession,
    createMeeting,
    getMeetings,
    getHostSessions
};

export default meetingServices;
