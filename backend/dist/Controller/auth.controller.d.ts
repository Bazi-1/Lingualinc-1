/// <reference types="multer" />
import { AuthService } from '../Services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(body: any, file: Express.Multer.File): Promise<any>;
    getUserProfilePic(userId: string): Promise<any>;
}
