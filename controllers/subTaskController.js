const SubTask = require("../models/SubTask");
const Task = require("../models/Task");

exports.createSubTask = async (req, res) => {
  try {
    const { task, status } = req.body;
    const userId = req.user.id;

    const parentTask = await Task.findOne({ _id: task, user: userId });
    if (!parentTask) {
      return res.status(404).send("Task not found or not authorized");
    }

    const newSubTask = new SubTask({ task, status });
    await newSubTask.save();
    res.status(201).send(newSubTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllSubTasks = async (req, res) => {
  try {
    const { task_id } = req.query;
      const tasks = await Task.find({ user: req.user.id, ...(task_id && { _id: task_id }) }).select('_id');
      const taskIds = tasks.map(task => task._id);
      const subTasks = await SubTask.find({ task: { $in: taskIds } });
    res.send(subTasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const subTask = await SubTask.findOne({ _id: req.params.id }).populate(
      "task"
    );

    if (!subTask || subTask.task.user !== req.user.id) {
      return res.status(404).send("SubTask not found or not authorized");
    }

    subTask.status = req.body.status || subTask.status;
    await subTask.save();
    res.send(subTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const subTask = await SubTask.findOne({ _id: req.params.id }).populate(
      "task"
    );

    if (!subTask || subTask.task.user !== req.user.id) {
      return res.status(404).send("SubTask not found or not authorized");
    }

    subTask.deleted_at = new Date();
    await subTask.save();
    res.send(subTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
