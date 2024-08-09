import { Repository } from 'typeorm';
import { Feedback } from 'src/Entities/feedback.entity';
export declare class FeedbackService {
    private feedbackRepository;
    constructor(feedbackRepository: Repository<Feedback>);
    userFeedback(userId: number, content: string): Promise<Feedback>;
    displayAllFeedback(): Promise<Feedback[]>;
}
