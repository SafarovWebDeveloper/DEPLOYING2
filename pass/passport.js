const LocalStrategy = require("passport-local");
const passport = require("passport");
const bcryptJs = require("bcryptjs");
const dbUser = require("../model/Register");

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            dbUser.findOne({ username: username }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: "username not found!!" });
                bcryptJs.compare(password, user.password, (err, match) => {
                    if (err) console.log(err);
                    if (match) done(null, user);
                    else {
                        done(null, false, { message: "Tizimga kirishda xatolik bor." });
                    }
                });
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        dbUser.findById(id, function (err, user) {
            done(err, user);
        });
    });


};