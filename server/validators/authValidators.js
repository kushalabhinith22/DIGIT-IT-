// validators/authValidators.js
const { body } = require('express-validator');

const signupValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').isIn(['student','teacher']).withMessage('Role must be student or teacher'),
  body('teacherId').custom((value, { req }) => {
    if (req.body.role === 'student') {
      if (!value) throw new Error('teacherId is required for students');
    }
    return true;
  })
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required')
];

module.exports = { signupValidator, loginValidator };
