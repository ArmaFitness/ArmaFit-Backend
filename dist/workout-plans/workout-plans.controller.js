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
exports.WorkoutPlansController = void 0;
const common_1 = require("@nestjs/common");
const workout_plans_service_1 = require("./workout-plans.service");
const create_plan_dto_1 = require("./dto/create-plan.dto");
const add_plan_exercises_dto_1 = require("./dto/add-plan-exercises.dto");
const assign_plan_dto_1 = require("./dto/assign-plan.dto");
const reorder_plan_exercises_dto_1 = require("./dto/reorder-plan-exercises.dto");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
let WorkoutPlansController = class WorkoutPlansController {
    constructor(service) {
        this.service = service;
    }
    createPlan(req, dto) {
        return this.service.createPlan(req.user.id, dto);
    }
    getPlan(req, planId) {
        return this.service.getPlan(req.user.id, planId);
    }
    myPlansAsAthlete(req) {
        return this.service.myPlansAsAthlete(req.user.id);
    }
    myPlansAsCoach(req) {
        return this.service.myPlansAsCoach(req.user.id);
    }
    addExercises(req, planId, dto) {
        return this.service.addExercises(req.user.id, planId, dto);
    }
    reorderExercises(req, planId, dto) {
        return this.service.reorderExercises(req.user.id, planId, dto);
    }
    removePlanExercise(req, planExerciseId) {
        return this.service.removePlanExercise(req.user.id, planExerciseId);
    }
    assign(req, planId, dto) {
        return this.service.assignPlanToAthlete(req.user.id, planId, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)('athlete', 'coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)(':planId'),
    (0, decorator_1.Roles)('athlete', 'coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('planId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "getPlan", null);
__decorate([
    (0, common_1.Get)('me/athlete'),
    (0, decorator_1.Roles)('athlete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "myPlansAsAthlete", null);
__decorate([
    (0, common_1.Get)('me/coach'),
    (0, decorator_1.Roles)('coach'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "myPlansAsCoach", null);
__decorate([
    (0, common_1.Post)(':planId/exercises'),
    (0, decorator_1.Roles)('athlete', 'coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('planId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, add_plan_exercises_dto_1.AddPlanExercisesDto]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "addExercises", null);
__decorate([
    (0, common_1.Patch)(':planId/exercises/reorder'),
    (0, decorator_1.Roles)('athlete', 'coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('planId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, reorder_plan_exercises_dto_1.ReorderPlanExercisesDto]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "reorderExercises", null);
__decorate([
    (0, common_1.Delete)('exercise/:planExerciseId'),
    (0, decorator_1.Roles)('athlete', 'coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('planExerciseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "removePlanExercise", null);
__decorate([
    (0, common_1.Post)(':planId/assign'),
    (0, decorator_1.Roles)('coach'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('planId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, assign_plan_dto_1.AssignPlanDto]),
    __metadata("design:returntype", void 0)
], WorkoutPlansController.prototype, "assign", null);
WorkoutPlansController = __decorate([
    (0, common_1.Controller)('plans'),
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.RolesGuard),
    __metadata("design:paramtypes", [workout_plans_service_1.WorkoutPlansService])
], WorkoutPlansController);
exports.WorkoutPlansController = WorkoutPlansController;
//# sourceMappingURL=workout-plans.controller.js.map