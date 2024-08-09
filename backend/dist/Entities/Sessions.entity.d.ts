import { User } from './users.entity';
import { SessionParticipant } from './Session_Participants.entity';
export declare class Session {
    sessionId: number;
    hostId: number;
    sessionName: string;
    sessionDescription: string;
    startTime: Date;
    endTime: Date;
    sessionStatus: string;
    host: User;
    sessionParticipants: SessionParticipant[];
}
