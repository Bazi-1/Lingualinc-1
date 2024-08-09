import { Controller, Post, Body, UseGuards, Request, UseInterceptors, UploadedFile, Param, Get } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { LocalAuthGuard } from '../Validators/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/ multer.config';


/**
 * Controller for authentication related operations.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }



  /**
  * Endpoint for user login.
  * Uses LocalAuthGuard for authentication.
  * @param req - The request object.
  * @returns The login response.
  */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  /**
  * Endpoint for user registration.
  * Accepts a profile picture as a part of the registration.
  * @param body - The request body containing user data.
  * @param file - The uploaded file (profile picture).
  * @returns The registration response.
  */
  @Post('register')
  @UseInterceptors(FileInterceptor('profilePic', multerConfig))  // Example
  async register(@Body() body: any,
    @UploadedFile() file: Express.Multer.File) {
    console.log(file); // Check if file is received correctly
    return this.authService.register(body, file);
  }


  /**
  * Endpoint to get a user's profile picture.
  * @param userId - The user's unique identifier.
  * @returns The user's profile picture.
  */
  @Get('user-profile-pic/:userId')
  async getUserProfilePic(@Param('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10); // Convert string to number
    if (isNaN(userIdNumber)) {
      throw new Error('Invalid user ID'); // Proper error handling
    }
    return this.authService.getUserProfilePic(userIdNumber);
  }

}
