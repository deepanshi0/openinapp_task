const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  status: {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date }
});

subTaskSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('SubTask', subTaskSchema);
