const express = require('express');
const Task = require('../models/Task');  
const mongoose = require('mongoose');   
const router = express.Router();

router.post('/tasks', async (req, res) => {
try { 
    const task = new Task(req.body);
    await task.save();

    res.status(201).send(task);
} catch (error) {
    res.status(400).send({ error: error.message });
}
});

router.get('/tasks', async (req, res) => {
try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
} catch (error) {
    res.status(500).send({ error: error.message });
}
});

router.get('/tasks/:id', async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid Task ID' });
}

try {
    const task = await Task.findById(id);

    if (!task) {
    return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send(task);
} catch (error) {
    res.status(500).send({ error: error.message });
}
});

router.put('/tasks/:id', async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid Task ID' });
}

try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!task) {
    return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send(task);
} catch (error) {
    res.status(400).send({ error: error.message });
}
});

router.delete('/tasks/:id', async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid Task ID' });
}

try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
    return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send(task);
} catch (error) {
    res.status(500).send({ error: error.message });
}
});

module.exports = router;
