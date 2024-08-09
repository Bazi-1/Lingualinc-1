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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionParticipant = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const Sessions_entity_1 = require("./Sessions.entity");
let SessionParticipant = class SessionParticipant {
};
exports.SessionParticipant = SessionParticipant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SessionParticipant.prototype, "participantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SessionParticipant.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SessionParticipant.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], SessionParticipant.prototype, "joinTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], SessionParticipant.prototype, "leaveTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sessions_entity_1.Session, (session) => session.sessionParticipants),
    (0, typeorm_1.JoinColumn)({ name: 'sessionId' }),
    __metadata("design:type", Sessions_entity_1.Session)
], SessionParticipant.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.sessionParticipants),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", users_entity_1.User)
], SessionParticipant.prototype, "user", void 0);
exports.SessionParticipant = SessionParticipant = __decorate([
    (0, typeorm_1.Entity)('session_participants')
], SessionParticipant);
//# sourceMappingURL=Session_Participants.entity.js.map