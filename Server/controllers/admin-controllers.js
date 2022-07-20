const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Admin = require('../models/admin');

const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ admins: admins.map(admin => admin.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingAdmin) {
    const error = new HttpError(
      'Admin exists already, please login instead.',
      422
    );
    return next(error);
  }

  const createdAdmin = new Admin({
    name,
    email,
    password,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({ admin: createdAdmin.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingAdmin || existingAdmin.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    user: existingAdmin.toObject({ getters: true })
  });
};

exports.getAdmins = getAdmins;
exports.signup = signup;
exports.login = login;
