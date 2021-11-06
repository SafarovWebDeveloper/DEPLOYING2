const {
    Router
} = require('express');
const dbSchema = require('../model/Schema');
const userSchema = require('../model/Register');
const router = Router();
// mod.cjs // this is valute 
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));


// home page methof of Get
// router.get('/', (req, res) => {
//     dbSchema.find({}, (err, data) => {
//         res.render('index', {
//             title: "Home page",
//             page: 'Hamma Maxsulotlar',
//             datas: data
//         });
//     });
// });

router.get('/', (req, res) => {
    dbSchema.find({}, (err, data) => {
        fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
            .then(data => data.json())
            .then(body => {
                res.render('index', {
                    title: "Home page",
                    page: 'Hamma Maxsulotlar',
                    kurs: body,
                    datas: data
                });
            });
    });
});

// card page methof of Get
router.get('/product/edit/:userId', (req, res) => {

    dbSchema.findById(req.params.userId, (err, data) => {
        if(data.dirUser != req.user._id){
            req.flash('danger', 'Bezorilik qilma')
            res.redirect('/')
        }else{
            res.render("add", {
                title: "Update page",
                page: "Maxsulot o'zgartirish",
                button: "update"
            });
        }
        
    });

});

// card page methof of Post
router.get('/product/:id', async (req, res) => {
    let db = await dbSchema.find({});
    dbSchema.findById(req.params.id, (err, data) => {
        userSchema.findById(data.dirUser, {}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                res.render("card", {
                    title: "Card Page",
                    page: "Card Maxsulot",
                    datas: data,
                    prof: data,
                    db
                });
            }
        });
    });
});

// search
router.get('/search', (req, res) => {
    // console.log(req.query);
    let {
        search
    } = req.query;
    const ss = search.toLowerCase();
    // console.log(ss);
    dbSchema.find({
        title: {
            $regex: ss // $regex bu aggregate ma'lumotlar ichiga kirish
        }
    }, (err, data) => {
        if (data == "") {
            res.redirect("/")
        } else {
            res.render('index', {
                title: "Home page",
                page: 'Hamma Maxsulotlar',
                datas: data
            });
        }
    });
});

// for to like
// router.post("/:id", (req, res) => {
//     dbSchema.findById(req.params.id, (err, data) => {
//         if (err) console.log(err, "xato");
//         else {
//             data.like += 1
//             data.save();
//             res.send(data);
//         }
//     });
// });

// dollor valute

module.exports = router;