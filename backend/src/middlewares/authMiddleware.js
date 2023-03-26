const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // get the token from the cookie
    const token = req.cookies["token"];

    // verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // if the token is not valid then throw an error
    if (!decoded) {
      res.status(401).send({ error: "Authentication Failed" });
    }

    // if the token is valid then find the user
    const user = await User.findOne({
      _id: decoded.id,
    });

    // if the user is not found then throw an error
    if (!user) {
      res.status(401).send({ error: "User is not authenticated" });
    }

    // if the user is found then add the user to the request object
    req.user = user;
    next();
  } catch (e) {
    // if there is any error then send the error message
    res.status(401).send({ error: "Authentication Failed" });
  }
};

module.exports = authMiddleware;
