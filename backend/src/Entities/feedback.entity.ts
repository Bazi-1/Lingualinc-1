// feedback.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';

import { User } from './users.entity';


/**
 * Entity definition for the 'feedback' table.
 * Represents feedback given by users.
 */
@Entity('feedback')
export class Feedback {
  /**
    * Primary key of the feedback entity.
  */
  @PrimaryGeneratedColumn()
  feedback_id: number;

  /**
  * Many-to-one relationship with the User entity.
  * Represents the user who gave the feedback.
  */
  @ManyToOne(() => User, user => user.feedback)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * The content of the feedback.
   */
  @Column('text')
  content: string;

  /**
   * The date when the feedback was created.
   */
  @CreateDateColumn({ type: 'timestamp' })
  feedback_date: Date;
}
