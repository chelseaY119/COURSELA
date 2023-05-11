
require('dotenv').config();
const Joi = require("joi");
require("../utils.js");

const errorMessages = {
  emptyUserName: 'Please provide a user name',
  emptyEmail: 'Please provide an email address',
  emptyID: 'Please provide an id',
  emptyPassword: 'Please provide a password',
}

const signupScheme = Joi.object({
  username: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email().required(),
  id: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(2).max(20).required()
});

const signupValidation = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  let id = req.body.id;

  const validationResult = signupScheme.validate({username, email, password, id});

  let errorMessage = '';

  // if there is an empty input or error
  if (validationResult.error != null) {
    if (username.length < 1) {
      errorMessage = errorMessages.emptyUserName;
    } else if (email.length < 1) {
      errorMessage = errorMessages.emptyEmail;
    } else if (password.length < 1) {
      errorMessage = errorMessages.emptyPassword;
    } else if (id.length < 1) {
      errorMessage = errorMessages.emptyID;
    } else {
      errorMessage = validationResult.error.message;
    }
    res.render('signup-submit', { signupFail: true, errorMessage });
    return;
  }

  next();
}

module.exports = {
  signupValidation
}