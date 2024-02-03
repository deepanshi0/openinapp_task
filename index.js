const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const taskRoutes = require('./routes/task');
const subTaskRoutes = require('./routes/subtask');
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 3000;

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/tasks', taskRoutes);
app.use('/subtasks', subTaskRoutes);
require('./cron/cronJobs');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
