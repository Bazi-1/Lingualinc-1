// feedback.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from 'src/Entities/feedback.entity';


/**
 * Service providing functionalities related to feedback.
 */
@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) { }

  /**
  * Records user feedback.
  * @param userId - The user's ID.
  * @param content - The content of the feedback.
  * @returns The saved feedback object.
  */
  async userFeedback(userId: number, content: string): Promise<Feedback> {
    const feedback = this.feedbackRepository.create({ user: { userId }, content });
    await this.feedbackRepository.save(feedback);
    return feedback;
  }

  /**
  * Retrieves all feedback.
  * @returns An array of all feedback.
  */
  async displayAllFeedback(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['user'] });
  }
}
