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
exports.WorkoutSessionsController = void 0;
const common_1 = require("@nestjs/common");
const workout_sessions_service_1 = require("./workout-sessions.service");
const create_session_dto_1 = require("./dto/create-session.dto");
const log_set_dto_1 = require("./dto/log-set.dto");
const guard_1 = require("../auth/guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let WorkoutSessionsController = class WorkoutSessionsController {
    constructor(service) {
        this.service = service;
    }
    createSession(req, dto) {
        return this.service.createSession(req.user.id, dto.planId);
    }
    logSet(req, sessionId, sessionExerciseId, dto) {
        return this.service.logSet(req.user.id, sessionId, sessionExerciseId, dto);
    }
    getSession(req, sessionId) {
        return this.service.getSession(req.user.id, sessionId);
    }
    getAllSessions(req) {
        return this.service.getAllSessions(req.user.id);
    }
    getAthleteSessions(req, athleteId) {
        return this.service.getAthleteSessions(req.user.id, athleteId);
    }
    getAthleteSession(req, athleteId, sessionId) {
        return this.service.getAthleteSession(req.user.id, athleteId, sessionId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "createSession", null);
__decorate([
    (0, common_1.Post)(':sessionId/exercises/:sessionExerciseId/sets'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('sessionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('sessionExerciseId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, log_set_dto_1.LogSetDto]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "logSet", null);
__decorate([
    (0, common_1.Get)(':sessionId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('sessionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "getSession", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.Get)('athlete/:athleteId'),
    (0, roles_decorator_1.Roles)('coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('athleteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "getAthleteSessions", null);
__decorate([
    (0, common_1.Get)('athlete/:athleteId/session/:sessionId'),
    (0, roles_decorator_1.Roles)('coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('athleteId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('sessionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], WorkoutSessionsController.prototype, "getAthleteSession", null);
WorkoutSessionsController = __decorate([
    (0, common_1.Controller)('sessions'),
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('athlete'),
    __metadata("design:paramtypes", [workout_sessions_service_1.WorkoutSessionsService])
], WorkoutSessionsController);
exports.WorkoutSessionsController = WorkoutSessionsController;
//# sourceMappingURL=workout-sessions.controller.js.map