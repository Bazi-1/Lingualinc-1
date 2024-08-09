import { Repository } from 'typeorm';
import { Session } from './../Entities/Sessions.entity';
import { SessionParticipant } from './../Entities/Session_Participants.entity';
export declare class SessionService {
    private sessionRepository;
    private sessionParticipantRepository;
    constructor(sessionRepository: Repository<Session>, sessionParticipantRepository: Repository<SessionParticipant>);
    createSession(data: any): Promise<Session>;
    getSessionById(sessionId: number): Promise<Session>;
    updateSession(sessionId: number, updatedData: any): Promise<Session>;
    deleteSession(sessionId: number): Promise<void>;
    getAllSessions(): Promise<Session[]>;
    joinSession(userId: number, sessionId: number): Promise<{
        status: number;
        message: string;
    }>;
    getSessionsByHostId(hostId: number): Promise<Session[]>;
    startSession(sessionId: number): Promise<Session>;
}
