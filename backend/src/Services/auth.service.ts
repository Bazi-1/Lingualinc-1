import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../Entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { File } from 'multer';




/**
 * Service responsible for authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }



  /**
   * Validates a user's credentials.
   * @param email - User's email.
   * @param pass - User's password.
   * @returns The user details if validation is successful, otherwise null.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { userEmail: email } });
    if (user && user.userPassword === pass) {
      const { userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Handles user login.
   * @param user - The user object.
   * @returns An access token and user details.
   */
  async login(user: any) {
    const payload = { email: user.userEmail, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user, password: undefined },
    };
  }


  /**
  * Handles user registration.
  * @param data - The registration data.
  * @param profilePic - The profile picture file.
  * @returns Information about the newly registered user.
  */
  async register(data: any, profilePic: Express.Multer.File): Promise<any> {
    const { name, email, password } = data;
    const fileName = profilePic.originalname;  // Use originalname
    const newUser = new User();
    newUser.userName = name;
    newUser.userEmail = email;
    newUser.userPassword = password;  // Hash the password
    newUser.uProfileImg = profilePic.filename;   // Save the original file name
    // await this.usersRepository.save(newUser);
    // return newUser;
    await this.usersRepository.save(newUser);

    const payload = { email: newUser.userEmail, sub: newUser.userId };
    const token = this.jwtService.sign(payload);

    return {
      message: "Successful",
      user: newUser,
      token: token,
    };

  }

  /**
  * Retrieves a user's profile picture.
  * @param userId - The ID of the user.
  * @returns The URL of the user's profile picture.
  */
  async getUserProfilePic(userId: number): Promise<any> {
    // Implement logic to get user's profile picture
    const user = await this.usersRepository.findOne({ where: { userId: userId } });
    if (user) {
      return { profilePic: user.uProfileImg };
    } else {
      throw new Error('User not found');
    }
  }
}
