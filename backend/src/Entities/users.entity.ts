import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SessionParticipant } from './Session_Participants.entity';
import { Feedback } from './feedback.entity'; // Import Feedback entity


/**
 * Entity definition for the 'users' table.
 * Represents a user in the system.
 */
@Entity('users') // Assuming the table name is 'users'
export class User {

  /**
  * Primary key of the user entity.
  */
  @PrimaryGeneratedColumn('increment')
  userId: number;

  /**
  * Email of the user. It's unique for each user.
  */
  @Column({ type: 'varchar', length: 200, unique: true })
  userEmail: string;

  /**
  * Password of the user.
  */
  @Column({ type: 'varchar', length: 200 })
  userPassword: string;

  /**
  * Name of the user.
  */
  @Column({ type: 'varchar', length: 200, nullable: true })
  userName: string;

  /**
   * Profile image URL of the user.
   */
  @Column({ type: 'varchar', length: 400, nullable: true })
  uProfileImg: string;


  /**
  * One-to-many relationship with the SessionParticipant entity.
  * Represents the sessions the user is participating in.
  */
  @OneToMany(() => SessionParticipant, sessionParticipant => sessionParticipant.user)
  sessionParticipants: SessionParticipant[];

  /**
   * One-to-many relationship with the Feedback entity.
   * Represents the feedback given by the user.
   */
  @OneToMany(() => Feedback, feedback => feedback.user)
  feedback: Feedback[];







}



