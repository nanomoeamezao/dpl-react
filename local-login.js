const jwt = require("jsonwebtoken");
const db = require("./db");
const PassportLocalStrategy = require("passport-local").Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        const userData = {
            email: email.trim(),
            password: password.trim(),
        };

        // find a user by email address
        return db.getUser(userData.email, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                const error = new Error("Incorrect email or password");
                error.name = "IncorrectCredentialsError";
                return done(error);
            }
            if (user.password === userData.password) {
                const payload = {
                    sub: user.id,
                };

                // create a token string
                const token = jwt.sign(payload, "testsecret");
                return done(null, token, user);
            }
            return done(new Error("Incorrect password"))
        });
    }
);
