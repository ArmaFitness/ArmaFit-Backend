Workout Coaching Platform — Backend API

This is a NestJS + Prisma + PostgreSQL backend for a fitness coaching platform, where:

Athletes can track workouts, log sets, view progress, track weight

Coaches can manage athletes, assign workout plans, view workout sessions, and communicate with athletes.


Features :

Authentication

JWT authentication

Athlete & Coach registration

Login with token

Role-based access control (RBAC)


Athlete functionality:

Create workout plans

Add exercises to plans

Create workout sessions from plans

Log sets (reps, weight, RPE)

View workout session history

Enter daily weight

View weight trend

Send messages to their coach


Coach functionality:

View all athletes assigned to them

Add athletes (coach–athlete relationship)

Create plans (and assign them to athletes)

View athletes’ workout session logs

View athletes’ weight logs

Message athletes


Proper HTTP status codes:

201 created

200/204 deleted

400 bad request

401 unauthorized

403 forbidden

404 not found

422 business rule errors

