import { SessionParticipant } from './Session_Participants.entity';
import { Feedback } from './feedback.entity';
export declare class User {
    userId: number;
    userEmail: string;
    userPassword: string;
    userName: string;
    uProfileImg: string;
    sessionParticipants: SessionParticipant[];
    feedback: Feedback[];
}
