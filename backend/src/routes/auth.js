const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/nodeMailerHelpers");
const generator = require("generate-password");
const authMiddleware = require("../middlewares/authMiddleware");

// Lets create our fisrt route --  We will signUp a user
router.post("/signUp", async (req, res) => {
  try {
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
    sendEmail(email, "Welcome to our site!", `Your password is ${password}`);

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
});

router.post("/login", async (req, res) => {
  try {
    // Lets get the email and password from the request body
    const { email, password } = req.body;

    // Lets check if the email is in the database
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Lets check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).send("Wrong password");
      return;
    }
    // Lets create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.send(user.name);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("user-token");
  res.send("Logout");
});

module.exports = router;
