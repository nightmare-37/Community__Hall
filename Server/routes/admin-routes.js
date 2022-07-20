const express = require('express');
const { check } = require('express-validator');

const adminsController = require('../controllers/admin-controllers');

const router = express.Router();

router.get('/', adminsController.getAdmins);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').not()
    .isEmpty(),
  ],
  adminsController.signup
);

router.post('/login', adminsController.login);

module.exports = router;
