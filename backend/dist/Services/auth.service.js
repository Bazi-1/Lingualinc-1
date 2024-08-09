"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../Entities/users.entity");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async validateUser(email, pass) {
        const user = await this.usersRepository.findOne({ where: { userEmail: email } });
        if (user && user.userPassword === pass) {
            const { userPassword, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.userEmail, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
            user: { ...user, password: undefined },
        };
    }
    async register(data, profilePic) {
        const { name, email, password } = data;
        const fileName = profilePic.originalname;
        const newUser = new users_entity_1.User();
        newUser.userName = name;
        newUser.userEmail = email;
        newUser.userPassword = password;
        newUser.uProfileImg = profilePic.filename;
        await this.usersRepository.save(newUser);
        const payload = { email: newUser.userEmail, sub: newUser.userId };
        const token = this.jwtService.sign(payload);
        return {
            message: "Successful",
            user: newUser,
            token: token,
        };
    }
    async getUserProfilePic(userId) {
        const user = await this.usersRepository.findOne({ where: { userId: userId } });
        if (user) {
            return { profilePic: user.uProfileImg };
        }
        else {
            throw new Error('User not found');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map