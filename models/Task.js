const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
description: {
    type: String,
    required: true,
    trim: true
},
completed: {
    type: Boolean,
    default: false
},
dueDate: {
    type: Date,
    default: null
},
priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
