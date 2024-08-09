import { User } from './users.entity';
export declare class Feedback {
    feedback_id: number;
    user: User;
    content: string;
    feedback_date: Date;
}
