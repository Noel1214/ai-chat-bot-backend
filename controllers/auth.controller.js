const passport = require("passport");
const sql = require("../utils/db");
const jwt = require("jsonwebtoken");

const authController = {
  // Initiate Google OAuth
  googleLogin: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false, // Disable session if using JWT
  }),

  // Google OAuth callback
  googleCallback: (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      async (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/login");
        }
        try {
          let userInDB;

          // stores user data if user exists in db
          [userInDB] =
            await sql`SELECT * from USERS WHERE EMAIL = ${user._json.email}`;

          // if user dose not exists in db creates and stores created user to userIn
          if (!userInDB) {
            [userInDB] =
              await sql`INSERT INTO USERS (username, email, avatar_url) VALUES (${user._json.given_name}, ${user._json.email}, ${user._json.picture}) RETURNING *`;
          }

          //  create a jwt token with email and time
          const token = jwt.sign(
            { email: userInDB.email, createdAt: Date.now() },
            process.env.JWT_SECRET
          );

          // sets jwt token to client browser
          res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.redirect(`http://localhost:3000`);
        } catch (error) {
          console.log("Error in google auth call back");
          next(error);
        }
      }
    )(req, res, next);
  },
};

module.exports = authController;
