const { Router } = require('express');
const multer = require("multer");
const path = require("path");
const userSchema = require("../model/Register");
const router = Router();
const bcryptJs = require("bcryptjs");
const passport = require('passport');


// ============== multer settings =============== //

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/img");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".jfif") {
            const err = new Error("avatar da xato bor.");
            err.code = 404;
        }
        cb(null, true);
    },
    preservePath: true
}).single("avatar");

// ============== multer settings =============== //

router.get("/signUp", (req, res) => {
    userSchema.find({}, (err, data) => {
        res.render("signUp", {
            title: "Sign Up",
            sign: data
        });
    });
});

// register page methof of Post
router.post("/signUp", upload, (req, res) => {
    // console.log(req.file);
    // console.log(req.body);

    req.checkBody("name", "name bo'sh qoldirish mumkin emas.").notEmpty();
    req.checkBody("username", "username bo'sh qoldirish mumkin emas.").notEmpty();
    req.checkBody("emailUp", "email bosh qoldirish mumkin emas.").notEmpty();
    req.checkBody("password", "password bosh qoldirish mumkin emas.").notEmpty();
    req.checkBody("password2", "password password bilan bir xil bulsin.").notEmpty().equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        res.render("signUp", {
            title: "Error",
            errors: errors
        });
    } else {
        const db = new userSchema({
            name: req.body.name,
            username: req.body.username,
            emailUp: req.body.emailUp,
            password: req.body.password,
            avatar: req.file.path
        });
        bcryptJs.genSalt(10, (err, pass) => {
            bcryptJs.hash(db.password, pass, (err, hash) => {
                if (err) console.log(err);
                else {
                    db.password = hash
                    db.save((err) => {
                        if (err) {
                            console.log(err, "xato signUp");
                        } else {
                            req.flash("success", "Ro'yhatdan muvaffaqqiyatli o'tdingiz!!");
                            res.redirect("/");
                        }
                    });
                }
            });
        });
    }
});

// router.get("/login/log", (req, res) => {
//     res.render("login", { title: "SignIn Page" });

// });

router.get("/account/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Tizimnidan chiqdingiz!");
    res.redirect("/");
});

router.post("/login/log", (req, res, next) => {
    // console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true,
        successFlash: "Xush kelibsiz!! Tizimga kirishingiz mumkin!"
    })(req, res, next);
});


module.exports = router;