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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("../Services/session.service");
const jwt_auth_guard_1 = require("../Validators/jwt-auth.guard");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async createSession(body) {
        const session = await this.sessionService.createSession(body);
        return { message: "Session created successfully", sessionId: session.sessionId };
    }
    async getAllSessions() {
        const sessions = await this.sessionService.getAllSessions();
        if (sessions.length === 0) {
            return { message: "No sessions found" };
        }
        return { sessions };
    }
    async getSession(sessionId) {
        const session = await this.sessionService.getSessionById(sessionId);
        if (!session) {
            return { message: "Session not founds" };
        }
        return { session };
    }
    async startSession(sessionId) {
        const session = await this.sessionService.startSession(sessionId);
        return { message: "Session started successfully", session };
    }
    async joinSession(body) {
        const { userId, sessionId } = body;
        const result = await this.sessionService.joinSession(userId, sessionId);
        return result;
    }
    async updateSession(sessionId, updatedData) {
        const session = await this.sessionService.updateSession(sessionId, updatedData);
        return { message: "Session updated successfully", session };
    }
    async deleteSession(sessionId) {
        await this.sessionService.deleteSession(sessionId);
        return { message: "Session deleted successfully" };
    }
    async getSessionsByHost(hostId) {
        const sessions = await this.sessionService.getSessionsByHostId(hostId);
        return { sessions };
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSession", null);
__decorate([
    (0, common_1.Put)('start/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "joinSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('update/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "updateSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('host/:hostId'),
    __param(0, (0, common_1.Param)('hostId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionsByHost", null);
exports.SessionController = SessionController = __decorate([
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map