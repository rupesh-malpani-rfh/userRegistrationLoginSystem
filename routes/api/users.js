const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../Model/User");

// const User = require("../../Model/User");

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  "/",
  [
    check("userName", "Please enter valid user name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("firstName", "Please enter First Name").not().isEmpty(),
    check("lastName", "Please enter Last Name").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userName,
      email,
      password,
      firstName,
      lastName,
      gender,
      country,
    } = req.body;
    try {
      // See if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        userName,
        email,
        password,
        firstName,
        lastName,
        gender,
        country,
      });

      // Encrypt password using bcrypt

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Return jsonwebtoken because in the front end if the user registers then I want them to login right away and in
      // order to login, you need to have the token

      //   res.send("User Registered");
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
