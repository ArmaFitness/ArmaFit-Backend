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
exports.WorkoutsController = void 0;
const common_1 = require("@nestjs/common");
const workouts_service_1 = require("./workouts.service");
const create_workout_dto_1 = require("./dto/create-workout.dto");
const add_exercises_dto_1 = require("./dto/add-exercises.dto");
const add_sets_dto_1 = require("./dto/add-sets.dto");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
let WorkoutsController = class WorkoutsController {
    constructor(workoutsService) {
        this.workoutsService = workoutsService;
    }
    createWorkout(req, dto) {
        const athleteId = req.user.id;
        return this.workoutsService.createWorkout(athleteId, dto);
    }
    addExercises(req, workoutId, dto) {
        const athleteId = req.user.id;
        return this.workoutsService.addExercises(athleteId, workoutId, dto);
    }
    addSets(req, workoutId, workoutExerciseId, dto) {
        const athleteId = req.user.id;
        return this.workoutsService.addSets(athleteId, workoutId, workoutExerciseId, dto);
    }
    getWorkout(req, workoutId) {
        const athleteId = req.user.id;
        return this.workoutsService.getWorkout(athleteId, workoutId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_workout_dto_1.CreateWorkoutDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "createWorkout", null);
__decorate([
    (0, common_1.Post)(':workoutId/exercises'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('workoutId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, add_exercises_dto_1.AddExercisesDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "addExercises", null);
__decorate([
    (0, common_1.Post)(':workoutId/exercises/:weId/sets'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('workoutId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('weId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, add_sets_dto_1.AddSetsDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "addSets", null);
__decorate([
    (0, common_1.Get)(':workoutId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('workoutId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "getWorkout", null);
WorkoutsController = __decorate([
    (0, common_1.Controller)('workouts'),
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.RolesGuard),
    (0, decorator_1.Roles)('athlete'),
    __metadata("design:paramtypes", [workouts_service_1.WorkoutsService])
], WorkoutsController);
exports.WorkoutsController = WorkoutsController;
//# sourceMappingURL=workouts.controller.js.map