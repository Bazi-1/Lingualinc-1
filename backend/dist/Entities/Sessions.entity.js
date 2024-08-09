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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const Session_Participants_entity_1 = require("./Session_Participants.entity");
let Session = class Session {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Session.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Session.prototype, "hostId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Session.prototype, "sessionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000, nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "sessionDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Session.prototype, "sessionStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'hostId', referencedColumnName: 'userId' }),
    __metadata("design:type", users_entity_1.User)
], Session.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Session_Participants_entity_1.SessionParticipant, sessionParticipant => sessionParticipant.session),
    __metadata("design:type", Array)
], Session.prototype, "sessionParticipants", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)('sessions')
], Session);
//# sourceMappingURL=Sessions.entity.js.map