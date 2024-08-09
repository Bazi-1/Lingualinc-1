import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/Validators/jwt-auth.guard';
import { FeedbackService } from 'src/Services/feedback.service';


/**
 * Controller for feedback related operations.
 */
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }



  /**
   * Endpoint to add user feedback.
   * Protected by JwtAuthGuard.
   * @param body - The request body containing feedback details.
   * @param req - The request object.
   * @returns A response indicating successful addition of feedback.
   */
  @UseGuards(JwtAuthGuard)
  @Post('add-feedback')
  async addUserFeedback(@Body() body, @Request() req) {
    const { userId, content } = body;
    const feedback = await this.feedbackService.userFeedback(userId, content);
    return {
      message: "Feedback added successfully",
      feedbackId: feedback.feedback_id,
    };
  }


  /**
  * Endpoint to display all feedback.
  * Protected by JwtAuthGuard.
  * @returns A list of all feedback.
  */
  @UseGuards(JwtAuthGuard)
  @Get('display-all-feedback')
  async displayAllFeedback() {
    const feedbackList = await this.feedbackService.displayAllFeedback();
    return feedbackList;
  }
}
