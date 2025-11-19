// routes/tasks.js
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { createTaskValidator, updateTaskValidator } = require('../validators/taskValidators');

router.get('/', auth, async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    if (role === 'student') {
      const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
      return res.json({ success: true, tasks });
    }
    if (role === 'teacher') {
      const students = await User.find({ teacherId: userId }).select('_id');
      const studentIds = students.map(s => s._id);
      const tasks = await Task.find({ $or: [{ userId: userId }, { userId: { $in: studentIds } }] }).sort({ createdAt: -1 });
      return res.json({ success: true, tasks });
    }
    return res.status(403).json({ success: false, message: 'Unauthorized role' });
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, createTaskValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { id: userId } = req.user;
    const taskData = {
      userId,
      title: req.body.title,
      description: req.body.description || '',
      dueDate: req.body.dueDate || null,
      progress: req.body.progress || 'not-started'
    };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, updateTaskValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.userId.toString() !== req.user.id.toString()) return res.status(403).json({ success: false, message: 'Only task owner can update' });

    ['title','description','dueDate','progress'].forEach(f => { if (req.body[f] !== undefined) task[f] = req.body[f]; });
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.userId.toString() !== req.user.id.toString()) return res.status(403).json({ success: false, message: 'Only task owner can delete' });
    await task.deleteOne();
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
