const { Router } = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require('../models/User');
const router = new Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      foundUser.validatePassword(password, cb);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log(user);
  process.nextTick(function () {
    cb(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/view",
    failureRedirect: "/",
  })
  
);

module.exports = router;
