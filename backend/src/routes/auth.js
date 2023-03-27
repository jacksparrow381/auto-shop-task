const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/nodeMailerHelpers");
const generator = require("generate-password");
const { check, validationResult } = require("express-validator");

// creation of a new user
router.post(
  "/signUp",
  [
    check("name", "Name is required").isString().not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],

  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Lets get the name and email from the request body
      const { name, email } = req.body;

      // Lets check if the email is already in the database
      const userExists = await User.findOne({ email });

      // If the user exists then we will send an error message
      if (userExists) {
        res.status(401).json({ message: "Email is already in use." });
        return;
      }

      // Lets generate a random password
      const password = generator.generate({
        length: 8,
        numbers: true,
      });

      // Lets send the password to the user via email
      sendEmail(
        email,
        "Welcome to our site!",
        `Your password is ${password}. Please go to this url ${`http://localhost:3000/login`} and login with your password and email. Thank You`
      );

      // Lets hash the password
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Lets create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.send("Sign Up Routes");
    } catch (error) {
      res.json(error);
    }
  }
);

// User login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      // check if the email exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      // check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).send("Wrong password");
        return;
      }
      // creation and saving of a token in the cookie
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      if (token) {
        res.cookie("token", token, { httpOnly: true });
        res.send(user.name);
      }
    } catch (error) {
      res.json(error);
    }
  }
);

// User logout
router.post("/logout", (req, res) => {
  // clear the cookie from the browser
  res.clearCookie("token");
  res.send("Logout");
});

module.exports = router;
