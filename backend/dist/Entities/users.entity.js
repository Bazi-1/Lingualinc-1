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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Session_Participants_entity_1 = require("./Session_Participants.entity");
const feedback_entity_1 = require("./feedback.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, unique: true }),
    __metadata("design:type", String)
], User.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], User.prototype, "userPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 400, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "uProfileImg", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Session_Participants_entity_1.SessionParticipant, sessionParticipant => sessionParticipant.user),
    __metadata("design:type", Array)
], User.prototype, "sessionParticipants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, feedback => feedback.user),
    __metadata("design:type", Array)
], User.prototype, "feedback", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=users.entity.js.map