import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Session } from './Sessions.entity';


/**
 * Entity for session participants.
 * Represents participants in a session.
 */
@Entity('session_participants')
export class SessionParticipant {

  /**
  * Primary key for the session participant.
  */
  @PrimaryGeneratedColumn()
  participantId: number;

  /**
  * The session ID to which the participant belongs.
  */
  @Column()
  sessionId: number;

  /**
   * The user ID of the participant.
   */
  @Column()
  userId: number;

  /**
   * The time the participant joined the session.
   */
  @Column({ type: 'datetime', nullable: true })
  joinTime: Date;

  /**
  * The time the participant left the session.
  */
  @Column({ type: 'datetime', nullable: true })
  leaveTime: Date;

  /**
  * Many-to-one relationship with the Session entity.
  */
  @ManyToOne(() => Session, (session) => session.sessionParticipants)
  @JoinColumn({ name: 'sessionId' })
  session: Session;

  /**
  * Many-to-one relationship with the User entity.
  */
  @ManyToOne(() => User, (user) => user.sessionParticipants)
  @JoinColumn({ name: 'userId' })
  user: User;


}
