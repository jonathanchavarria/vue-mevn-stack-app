const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require("crypto");

let userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: 'users',
  },
)
userSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password") || !user.isNew) return next();
  try {
    crypto.pbkdf2(
      user.password,
      "salt",
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword.toString("base64");
        next();
      }
    );
  } catch (e) {
    console.error(e);
  }
});

userSchema.methods.validatePassword = async function (triedPassword, cb) {
  let user = this;
  crypto.pbkdf2(
    triedPassword,
    "salt",
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return cb(err);
      }
      const firstBuff = Buffer.from(user.password, "base64");
      const secondBuff = Buffer.from(hashedPassword, "base64");
      if (
        firstBuff.length != secondBuff.length ||
        !crypto.timingSafeEqual(firstBuff, secondBuff)
      ) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      return cb(null, user);
    }
  );
};


module.exports = mongoose.model('Users', userSchema)
