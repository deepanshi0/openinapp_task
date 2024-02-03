const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    default: 3,
    enum: [0, 1, 2, 3]
  },
  status: {
    type: String,
    default: 'TODO',
    enum: ['TODO', 'IN_PROGRESS', 'DONE']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deleted_at: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Task', taskSchema);
