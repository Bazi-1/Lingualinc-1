import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from 'src/Services/feedback.service';
import { FeedbackController } from 'src/Controller/feedback.controller';
import { Feedback } from 'src/Entities/feedback.entity';


/**
 * FeedbackModule integrates components related to feedback functionalities.
 * It imports necessary modules, declares controllers, and providers related to feedback.
 */
@Module({
  /**
  * Imports TypeOrmModule to interact with the Feedback entity.
  */
  imports: [TypeOrmModule.forFeature([Feedback])],
  /**
  * Providers are services that can be injected into controllers and other services.
  */
  providers: [FeedbackService],
  /**
   * Controllers handle incoming requests and return responses to the client.
   */
  controllers: [FeedbackController],
})
export class FeedbackModule { }
