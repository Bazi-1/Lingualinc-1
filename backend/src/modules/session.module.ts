import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './../Services/session.service';
import { SessionController } from './../Controller/session.controller';
import { Session } from './../Entities/Sessions.entity';
import { SessionParticipant } from 'src/Entities/Session_Participants.entity';

/**
 * SessionModule is responsible for grouping all session-related functionalities.
 * It includes the session and session participant entities, service, and controller.
 */
@Module({
  /**
  * TypeOrmModule is imported to facilitate interaction with the Session and SessionParticipant entities.
  */
  imports: [TypeOrmModule.forFeature([Session, SessionParticipant])],
  /**
  * SessionService provides the business logic for session operations.
  */
  providers: [SessionService],
  /**
   * SessionController handles requests and sends responses related to session operations.
   */
  controllers: [SessionController],
})
export class SessionModule { }

