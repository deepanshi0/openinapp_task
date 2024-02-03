const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const newTask = new Task({
      title,
      description,
      due_date,
      user: req.user.id,
    });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { priority, due_date, page = 1, limit = 10 } = req.query;
    let query = { user: req.user.id };
    if (priority) query.priority = priority;
    if (due_date) query.due_date = { $lte: new Date(due_date) };

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { due_date, status },
      { new: true }
    );
    if (!task) return res.status(404).send("Task not found or unauthorized");
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { deleted_at: new Date() },
      { new: true }
    );
    if (!task) return res.status(404).send("Task not found or unauthorized");
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
