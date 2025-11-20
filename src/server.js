const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/auth');
const workoutsRoutes = require('./routes/workouts');
const weightsRoutes = require('./routes/weights');
const workoutPlansRoutes = require('./routes/workoutPlans');
const commentsRoutes = require('./routes/comments');
const athletesRoutes = require('./routes/athletes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/auth', authRoutes);
app.use('/workouts', workoutsRoutes);
app.use('/weights', weightsRoutes);
app.use('/workout_plans', workoutPlansRoutes);
app.use('/comments', commentsRoutes);
app.use('/athletes', athletesRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
