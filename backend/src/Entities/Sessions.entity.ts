import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './users.entity';
import { SessionParticipant } from './Session_Participants.entity';

/**
 * Entity definition for the 'sessions' table.
 * Represents a session, which could be a meeting, class, or any event.
 */
@Entity('sessions')
export class Session {
  /**
   * Primary key of the session entity.
   */
  @PrimaryGeneratedColumn('increment')
  sessionId: number;

  /**
   * User ID of the session host.
   */
  @Column()
  hostId: number;


  /**
   * Name of the session.
   */
  @Column({ type: 'varchar', length: 255 })
  sessionName: string;

  /**
  * Description of the session.
  */
  @Column({ type: 'varchar', length: 1000, nullable: true })
  sessionDescription: string;

  /**
   * Scheduled start time of the session.
   */
  @Column({ type: 'datetime', nullable: true })
  startTime: Date;

  /**
  * Scheduled end time of the session.
  */
  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  /**
   * Current status of the session (e.g., planned, ongoing, completed).
   */
  @Column({ type: 'varchar', length: 50 })
  sessionStatus: string;

  /**
  * Many-to-one relationship with the User entity.
  * Represents the host of the session.
  */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'hostId', referencedColumnName: 'userId' })
  host: User;

  /**
   * One-to-many relationship with the SessionParticipant entity.
   * Represents the participants of the session.
   */
  @OneToMany(() => SessionParticipant, sessionParticipant => sessionParticipant.session)
  sessionParticipants: SessionParticipant[];

}
