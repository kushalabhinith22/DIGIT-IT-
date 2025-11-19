// validators/taskValidators.js
const { body } = require('express-validator');

const createTaskValidator = [
  body('title').isString().notEmpty().withMessage('Title required'),
  body('description').optional().isString(),
  body('dueDate').optional().isISO8601().toDate(),
  body('progress').optional().isIn(['not-started','in-progress','completed'])
];

const updateTaskValidator = [
  body('title').optional().isString().notEmpty(),
  body('description').optional().isString(),
  body('dueDate').optional().isISO8601().toDate(),
  body('progress').optional().isIn(['not-started','in-progress','completed'])
];

module.exports = { createTaskValidator, updateTaskValidator };
