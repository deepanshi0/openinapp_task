const cron = require("node-cron");
const { makeVoiceCall } = require("./twilio");
const Task = require("../models/Task");
const dotenv = require("dotenv");

dotenv.config();


const updateTaskPriorities = async () => {
  try {
    const tasks = await Task.find({});
    const now = new Date();
    for (const task of tasks)  {
      let priority;
      const dueDate = new Date(task.due_date);
      const diffDays = (dueDate - now) / (1000 * 60 * 60 * 24);

      if (diffDays <= 0) {
        priority = 0;
      } else if (diffDays <= 2) {
        priority = 1;
      } else if (diffDays <= 4) {
        priority = 2;
      } else {
        priority = 3;
      }

      if (task.priority !== priority) {
        task.priority = priority;
        await task.save();
      }
    };
    console.log("Task priorities updated");
  } catch (error) {
    console.error("Error updating task priorities:", error);
  }
};

const callUsersWithOverdueTasks = async () => {
  console.log("Running Call Users with Overdue Tasks Job");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTasks = await Task.find({
    due_date: { $lt: today },
    deleted_at: { $exists: false },
  })
    .populate("user")
    .sort({ priority: 1 });

  for (const task of overdueTasks) {
    try {
      const callSid = await makeVoiceCall(task.user.phone_number);
      console.log(`Call placed with SID: ${callSid}`);
    } catch (error) {
      console.error("Failed to place call:", error);
    }
  }
};

cron.schedule("0 9 * * *", callUsersWithOverdueTasks);

cron.schedule("0 0 * * *", updateTaskPriorities);
