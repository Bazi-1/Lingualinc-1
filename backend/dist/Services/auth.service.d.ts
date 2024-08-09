/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../Entities/users.entity';
export declare class AuthService {
    private jwtService;
    private usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<User>);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(data: any, profilePic: Express.Multer.File): Promise<any>;
    getUserProfilePic(userId: number): Promise<any>;
}
