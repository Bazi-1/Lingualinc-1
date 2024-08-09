import { SessionService } from 'src/Services/session.service';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    createSession(body: any): Promise<{
        message: string;
        sessionId: number;
    }>;
    getAllSessions(): Promise<{
        message: string;
        sessions?: undefined;
    } | {
        sessions: import("../Entities/Sessions.entity").Session[];
        message?: undefined;
    }>;
    getSession(sessionId: number): Promise<{
        message: string;
        session?: undefined;
    } | {
        session: import("../Entities/Sessions.entity").Session;
        message?: undefined;
    }>;
    startSession(sessionId: number): Promise<{
        message: string;
        session: import("../Entities/Sessions.entity").Session;
    }>;
    joinSession(body: {
        userId: number;
        sessionId: number;
    }): Promise<{
        status: number;
        message: string;
    }>;
    updateSession(sessionId: number, updatedData: any): Promise<{
        message: string;
        session: import("../Entities/Sessions.entity").Session;
    }>;
    deleteSession(sessionId: number): Promise<{
        message: string;
    }>;
    getSessionsByHost(hostId: number): Promise<{
        sessions: import("../Entities/Sessions.entity").Session[];
    }>;
}
