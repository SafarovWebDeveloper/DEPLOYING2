// // music play
// const icon = document.querySelector('.far.fa-bell');
// const mySong = document.querySelector('#my-song');
// const stopSong = document.querySelector('.top');

// window.addEventListener('keypress', (e) => {
//     if (e.key == "Enter") {
//         mySong.play();
//     }
//     if (e.key == "Enter" && e.shiftKey == true) {
//         mySong.pause();
//     }
// });
// music play


// register js

const navLink = document.querySelector(".proSign");
const navLink1 = document.querySelector(".proSignIn");
const form = document.querySelector(".register");
const form1 = document.querySelector("#signInHome");
const bodyOverlay = document.querySelector(".body-overlay");
const closes = document.querySelector(".far.fa-times-circle");
const html = document.querySelector("html");

// console.log(form);
if (navLink) {
    navLink.addEventListener("click", (e) => {
        form.classList.add("active");
        bodyOverlay.classList.add("active");
        html.classList.add("active");
    });
}
if (navLink1) {
    navLink1.addEventListener("click", (e) => {
        form1.classList.add("active");
        bodyOverlay.classList.add("active");
        html.classList.add("active");
    });
}

if (bodyOverlay) {
    bodyOverlay.addEventListener("click", () => {
        form.classList.remove("active");
        form1.classList.remove("active");
        bodyOverlay.classList.remove("active");
        html.classList.remove("active");
    });
}

if (closes) {
    closes.addEventListener("click", () => {
        form.classList.remove("active");
        form1.classList.remove("active");
        bodyOverlay.classList.remove("active");
        html.classList.remove("active");
    });
}
// register js

// ============== card page utishi ============== //


window.addEventListener('load', () => {
    let sale = document.querySelectorAll('.sale'),
        price = document.querySelectorAll('.sale_price');
    //  console.log(price)

    sale.forEach((element, index) => {
        if (element.innerHTML == "") {
            element.style.display = 'none'
            price[index].style.display = 'none'
        }
    });

    let userId = document.querySelectorAll(".card_img");
    // console.log(userId);
    userId.forEach((element, index) => {
        element.addEventListener("click", () => {
            let userID = $(element).attr("userId");
            // console.log(userID);
            window.location.href = userID;
        });
    });

    // ============== card page utishi ============== //


    // ============== Click likes ============== //

    let like = document.querySelectorAll(".like");
    let writeLike = document.querySelectorAll(".write_like");
    // console.log(writeLike);

    like.forEach((element, value) => {
        element.addEventListener("click", (e) => {
            let userIDs = $(element).attr("userId");
            // console.log(userIDs);
            fetch(userIDs, {
                method: "POST"
            })
                .then(data => data.json())
                .then(data => {
                    writeLike.forEach((elem, val) => {
                        if (val == value) {
                            elem.innerHTML = data.like;
                            // console.log(elem);
                        }
                    });
                });
        });
    });
    // ============== Click likes ============== //

    // ==================== img not copy ================ //

    const img = document.querySelectorAll("img");
    img.forEach((element, index) => {
        element.addEventListener("mousedown", (e) => {
            if (img) {
                e.preventDefault();
            }
        });
    });

    // ==================== img copy not ================ //

    // =================== dollor valyuta =============== //

    // fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/", {
    //     "Access-Control-Allow-Origin": "*"
    // }).then(data => console.log(data));

    // bank sistemasida malumotni faqat backend osa buladi. frontendga bermaydo data ni

    // =================== dollor valyuta =============== //

    // ================ message chat ================= //

    const message = document.querySelector(".message");
    const msgActive = document.querySelector(".fixed");
    const closeMsg = document.querySelector("#closeMsg")

    if (msgActive) {
        msgActive.addEventListener("click", () => {
            message.classList.add("active");
        });
    };
    if (closeMsg) {
        closeMsg.addEventListener("click", () => {
            message.classList.remove("active");
        });
    }

    // ================ message chat ================= //



    $(".owl-carousel.popular").owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: true,
        animateOut: "fadeOut",
        navText: [$(".owl-nav.navigation .owl-prev"), $(".owl-nav.navigation .owl-next")],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            },
        }
    });
    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        navText: [$(".owl-nav.first .owl-prev"), $(".owl-nav.first .owl-next")],
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            },
        }
    });

    // ============== Message err || succesfully! ok!! ================ //

    const msg = document.querySelectorAll(".homeMsg");
    console.log(msg);
    msg.forEach((element, index) => {
        setInterval(() => {
            element.classList.add("active");
        }, 2000);
    });

    // ============== Message err || succesfully! ok!! ================ //
});
