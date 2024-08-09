import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './../Entities/Sessions.entity';
import { SessionParticipant } from './../Entities/Session_Participants.entity';



/**
 * Service managing session-related operations.
 */
@Injectable()
export class SessionService {
    constructor(
        // @InjectRepository(Session)
        // private sessionRepository: Repository<Session>,
        @InjectRepository(Session) private sessionRepository: Repository<Session>,
        @InjectRepository(SessionParticipant) private sessionParticipantRepository: Repository<SessionParticipant>

    ) { }

    /**
     * Creates a new session.
     * @param data - The session data.
     * @returns The newly created session.
     */
    async createSession(data: any): Promise<Session> {

        const { hostId, sessionName, sessionDescription } = data;
        if (!hostId) {
            throw new Error('hostId is required');
        }
        const session = this.sessionRepository.create({
            hostId,
            sessionName,
            sessionDescription,
            sessionStatus: 'unactive',
            startTime: new Date(),
        });
        await this.sessionRepository.save(session);
        return session;
    }

    /**
     * Retrieves a session by its ID.
     * @param sessionId - The ID of the session.
     * @returns The session if found, otherwise throws an error.
     */
    async getSessionById(sessionId: number): Promise<Session> {
        return this.sessionRepository.findOneBy({ sessionId });
    }

    /**
     * Updates a session's information.
     * @param sessionId - The ID of the session to update.
     * @param updatedData - The new data for the session.
     * @returns The updated session, or throws an error if not found.
     */
    async updateSession(sessionId: number, updatedData: any): Promise<Session> {
        const session = await this.sessionRepository.findOneBy({ sessionId });
        if (session) {
            this.sessionRepository.merge(session, updatedData);
            await this.sessionRepository.save(session);
            return session;
        }
        throw new Error('Session not found');
    }

    /**
     * Deletes a session by its ID.
     * @param sessionId - The ID of the session to delete.
     * @returns void, or throws an error if the session is not found or the deletion failed.
     */
    async deleteSession(sessionId: number): Promise<void> {
        const result = await this.sessionRepository.delete(sessionId);
        if (result.affected === 0) {
            throw new Error('Session not found or delete failed');
        }
    }

    /**
     * Retrieves all sessions.
     * @returns An array of all sessions.
     */
    async getAllSessions(): Promise<Session[]> {
        const sessions = await this.sessionRepository.find();
        console.log('Fetched Sessions:', sessions);
        return sessions;
    }

    /**
     * Allows a user to join an active session.
     * @param userId - The ID of the user joining the session.
     * @param sessionId - The ID of the session to join.
     * @returns A status message regarding the join operation.
     */
    async joinSession(userId: number, sessionId: number) {
        const activeSession = await this.sessionRepository.findOneBy({
            sessionId: sessionId,
            sessionStatus: 'active'
        });

        if (!activeSession) {
            return { status: 400, message: "Session is not active or does not exist" };
        }

        const existingParticipant = await this.sessionParticipantRepository.findOneBy({
            user: { userId: userId },
            leaveTime: null
        });

        if (existingParticipant) {
            return { status: 400, message: "User is already in a session" };
        }

        const newParticipant = this.sessionParticipantRepository.create({
            session: { sessionId: sessionId },
            user: { userId: userId },
            joinTime: new Date()
        });

        await this.sessionParticipantRepository.save(newParticipant);
        return { status: 200, message: "Joined session successfully" };
    }


    /**
     * Retrieves all sessions hosted by a specific host.
     * @param hostId - The ID of the host.
     * @returns An array of sessions hosted by the specified host.
     */
    async getSessionsByHostId(hostId: number): Promise<Session[]> {
        return this.sessionRepository.findBy({ hostId });
    }


    /**
     * Starts a session, changing its status to 'active'.
     * @param sessionId - The ID of the session to start.
     * @returns The session that was started, or throws an error if not found.
     */
    async startSession(sessionId: number): Promise<Session> {
        const session = await this.sessionRepository.findOneBy({ sessionId });
        if (session) {
            session.sessionStatus = 'active';
            session.startTime = new Date();
            await this.sessionRepository.save(session);
            return session;
        }
        throw new Error('Session not found');
    }

}