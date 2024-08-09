import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';


/**
 * Local strategy for authentication using email and password.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Specifying the 'email' field as the username
  }

  /**
   * Validates a user's credentials.
   * @param email - User's email.
   * @param password - User's password.
   * @returns The user's information if validation is successful, otherwise throws an UnauthorizedException.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  
  }
}
