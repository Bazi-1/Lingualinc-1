import { User } from './users.entity';
import { Session } from './Sessions.entity';
export declare class SessionParticipant {
    participantId: number;
    sessionId: number;
    userId: number;
    joinTime: Date;
    leaveTime: Date;
    session: Session;
    user: User;
}
