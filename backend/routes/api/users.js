const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check('username')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Username is required"),
  check('firstName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Last Name is required'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const emailcheck = await User.findAll({
      where: {
        email
      }
    })
   
    const usernameCheck = await User.findAll({
      where: {
        username
      }
    })

    if (emailcheck.length) {
      const err = new Error();
      err.status = 500
      err.message = "User already exists"
      err.errors = {
        email: "User with that email already exists"
      }
      next(err)
    }
    
    if (usernameCheck.length) {
      const err = new Error();
      err.status = 500
      err.message = "User already exists"
      err.errors = {
        username: "User with that username already exists"
      }
      next(err)
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;