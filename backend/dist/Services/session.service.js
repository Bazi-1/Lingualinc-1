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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Sessions_entity_1 = require("./../Entities/Sessions.entity");
const Session_Participants_entity_1 = require("./../Entities/Session_Participants.entity");
let SessionService = class SessionService {
    constructor(sessionRepository, sessionParticipantRepository) {
        this.sessionRepository = sessionRepository;
        this.sessionParticipantRepository = sessionParticipantRepository;
    }
    async createSession(data) {
        const { hostId, sessionName, sessionDescription } = data;
        if (!hostId) {
            throw new Error('hostId is required');
        }
        const session = this.sessionRepository.create({
            hostId,
            sessionName,
            sessionDescription,
            sessionStatus: 'unactive',
            startTime: new Date(),
        });
        await this.sessionRepository.save(session);
        return session;
    }
    async getSessionById(sessionId) {
        return this.sessionRepository.findOneBy({ sessionId });
    }
    async updateSession(sessionId, updatedData) {
        const session = await this.sessionRepository.findOneBy({ sessionId });
        if (session) {
            this.sessionRepository.merge(session, updatedData);
            await this.sessionRepository.save(session);
            return session;
        }
        throw new Error('Session not found');
    }
    async deleteSession(sessionId) {
        const result = await this.sessionRepository.delete(sessionId);
        if (result.affected === 0) {
            throw new Error('Session not found or delete failed');
        }
    }
    async getAllSessions() {
        const sessions = await this.sessionRepository.find();
        console.log('Fetched Sessions:', sessions);
        return sessions;
    }
    async joinSession(userId, sessionId) {
        const activeSession = await this.sessionRepository.findOneBy({
            sessionId: sessionId,
            sessionStatus: 'active'
        });
        if (!activeSession) {
            return { status: 400, message: "Session is not active or does not exist" };
        }
        const existingParticipant = await this.sessionParticipantRepository.findOneBy({
            user: { userId: userId },
            leaveTime: null
        });
        if (existingParticipant) {
            return { status: 400, message: "User is already in a session" };
        }
        const newParticipant = this.sessionParticipantRepository.create({
            session: { sessionId: sessionId },
            user: { userId: userId },
            joinTime: new Date()
        });
        await this.sessionParticipantRepository.save(newParticipant);
        return { status: 200, message: "Joined session successfully" };
    }
    async getSessionsByHostId(hostId) {
        return this.sessionRepository.findBy({ hostId });
    }
    async startSession(sessionId) {
        const session = await this.sessionRepository.findOneBy({ sessionId });
        if (session) {
            session.sessionStatus = 'active';
            session.startTime = new Date();
            await this.sessionRepository.save(session);
            return session;
        }
        throw new Error('Session not found');
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Sessions_entity_1.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(Session_Participants_entity_1.SessionParticipant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SessionService);
//# sourceMappingURL=session.service.js.map