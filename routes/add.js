const {
    Router
} = require('express');
const multer = require('multer');
const Schema = require('../model/Schema');
const user = require('../model/Register');
const path = require('path');
const { db, findById } = require('../model/Schema');
const router = Router();

//multer settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        // cd(null, Math.random().toString.slice(-5) + path.extname(file.originalname));
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// img to uploads folder
const uploads = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".jfif") {
            const err = new Error("Xatolik bor")
            err.code = 404
            return cb(err);
        }
        cb(null, true);
    },
    preservePath: true
}).single("photo");
//multer settings

// add page page methof of Get
router.get('/add', (req, res) => {
    res.render('add', {
        title: "Add page",
        page: "Maxsulotlar Qo'shish",
        button: "Submit"
    });
});

// data add page methof of Post
router.post('/add', uploads, (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    req.checkBody("title", "Maxsulot nomini bosh qoldirish mumkin emas.").notEmpty();
    req.checkBody("price", "Maxsulot price bosh qoldirish mumkin emas.").notEmpty();
    req.checkBody("category", "Maxsulot category bosh qoldirish mumkin emas.").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.render("add", {
            title: "Error",
            errors: errors
        });
    } else {
        // console.log("Test");
        const db = new Schema({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            comments: req.body.comments,
            sale: req.body.sale,
            photo: req.file.path,
            dirUser: req.user.id
        });
        db.save((err) => {
            if (err) {
                console.log(err);
            } else {
                req.flash("success", "All succesfully! Ok!!!");
                res.redirect("/");
            }
        });
    }
});
// edit product setting
router.get('/product/edit/:userId', (req , res) => {
    Schema.findById(req.params.userId, (err , data)=>{
        if(data.dirUser != req.user._id){
            req.flash("danger" , "bunaqa sahifa topilmadi")
            req.redirect("/")
        }
        else{
            res.render("add", {
                title: "maxsulot ozgartirish",
                datas: data
            })
        }
    })
})
// card update page methof of Post
router.post('/product/edit/:userId', uploads, (req, res) => {
    const errors = req.validationErrors();
    if (errors) {
        res.render("add", {
            title: "Error",
            errors: errors
        });
    } else {
        // console.log("Test");
        const db = ({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            comments: req.body.comments,
            sale: req.body.sale,
            photo: req.file.path
        });
        const ids = {
            _id: req.params.userId
        }
        Schema.updateOne(ids, db, (err) => {
            if (err) {
                console.log(err);
            } else {
                req.flash("info", "Maxsulot o'zgartirildi");
                res.redirect("/");
            }
        });
    }
});

// card delete page methof of Get
router.get("/product/remove/:id", (req, res) => {
    if(!req.user.id){
        req.statusCode(500).send();
    }
    let id = {_id : req.params.id}
    Schema.findById(req.params.id, (err , data)=>{
        if(data.dirUser != req.user._id){
            req.flash("danger" , "bunaqa sahifa topilmadi")
            res.redirect('/')
        }
        else{
            Schema.findByIdAndRemove(id , (err)=>{
                if(err) {
                    req.flash("danger" , "Error not found");
                    res.redirect("/");
                }
                else{
                   req.flash("success" , "maxsulot ochirildi");
                   res.redirect('/'); 
                }
                
            })
        }
    })
    
});

module.exports = router;