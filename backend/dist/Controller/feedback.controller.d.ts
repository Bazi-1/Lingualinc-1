import { FeedbackService } from 'src/Services/feedback.service';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    addUserFeedback(body: any, req: any): Promise<{
        message: string;
        feedbackId: number;
    }>;
    displayAllFeedback(): Promise<import("../Entities/feedback.entity").Feedback[]>;
}
