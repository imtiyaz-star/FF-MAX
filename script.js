let orderId = null;

const collections = {

    /* RARE BUNDLES */

    rare: {
        title: "Rare Bundles",
        small: "ULTRA RARE COLLECTION",

        items: [
            ["Arctic Blue Bundle", "arctic-blue.jpg", "ULTRA RARE", "₹150"],
            ["Zombie Samurai", "zombie-samurai.jpg", "RARE", "₹150"],
            ["Knight Clown", "knight-clown.jpg", "ULTRA RARE", "₹150"],
            ["Angelic Bundle", "angelic.jpg", "HIGH DEMAND", "₹150"],
            ["Bunny Warrior", "bunny-warrior.jpg", "RARE", "₹150"],
            ["Galaxy Dino", "galaxy-dino.jpg", "ULTRA RARE", "₹150"],
            ["HipHop Bundle", "hiphop.jpg", "OG", "₹200"],
            ["Old Bundle", "old-b.png", "RARE", "₹150"],
            ["Sakura Bundle", "sakura.jpg", "HIGH DEMAND", "₹200"]
        ]
    },


    /* CRIMINAL */

    criminal: {
        title: "Criminal Bundles",
        small: "CRIMINAL COLLECTION",

        items: [
            ["Red Criminal", "criminal-r.jpg", "ULTRA RARE", "₹200"],
            ["Blue Criminal", "criminal-b.jpg", "ULTRA RARE", "₹150"],
            ["Green Criminal", "criminal-g.jpg", "ULTRA RARE", "₹150"],
            ["Purple Criminal", "criminal-p.jpg", "ULTRA RARE", "₹200"],
            ["Yellow Criminal", "criminal-y.jpg", "ULTRA RARE", "₹150"],
            ["Black Criminal", "criminal-l.jpg", "OG", "₹200"]
        ]
    },


    /* DINO */

    dino: {
        title: "Dino Bundles",
        small: "DINO COLLECTION",

        items: [
            ["Galaxy Dino", "galaxy-dino.jpg", "ULTRA RARE", "₹100"],
            ["Green Dino", "dino-green.jpg", "RARE", "₹150"],
            ["Blue Dino", "dino-blue.jpg", "RARE", "₹100"],
            ["Pink Dino", "dino-pink.jpg", "RARE", "₹100"],
            ["Yellow Dino", "dino-yellow.jpg", "RARE", "₹200"]
        ]
    },


    /* GUN SKINS */

    guns: {
        title: "Rare Gun Skins",
        small: "LEGENDARY & EVO COLLECTION",

        items: [

            ["AK47 EVO Gun", "ak-evo.png", "EVO", "₹200"],
            ["M1014 EVO Gun", "m1014.png", "EVO", "₹150"],
            ["XM8 EVO Gun", "xm8-e.png", "EVO", "₹150"],
            ["MP40 EVO Gun", "mp40-e.png", "EVO", "₹150"],
            ["GROZA EVO Gun", "groza-e.png", "EVO", "₹100"],
            ["M4A1 EVO Gun", "m4a1-e.png", "EVO", "₹100"],
            ["P90 EVO Gun", "p90-e.png", "EVO", "₹150"],
            ["UMP EVO Gun", "ump-e.png", "EVO", "₹100"],

            ["AK47 Rare Skin", "ak47p.png", "LEGENDARY", "₹70"],
            ["M4A1 Rare Skin", "m4a1.png", "LEGENDARY", "₹70"],
            ["SCAR Old Fashion", "scar.png", "EPIC", "₹69"],
            ["XM8 Livey Beast", "xm8.png", "EPIC", "₹70"],
            ["AN94 BOOYAH", "an94.png", "RARE", "₹70"],
            ["Groza Heartseeker", "groza.png", "LEGENDARY", "₹80"],

            ["PARAFAL Sickly Sweet", "parafal.png", "RARE", "₹80"],
            ["MP40 Red Poker", "mp40.png", "LEGENDARY", "₹100"],
            ["MP5 Old Fashion", "mp5.png", "EPIC", "₹80"],
            ["UMP Lively Beast", "ump.png", "EPIC", "₹70"],
            ["P90 Old Fashin", "p90.png", "RARE", "₹80"],
            ["Thompson Lucky Koi", "thompson.png", "RARE", "₹70"],

            ["M1014 Underground Howl", "m1014-n.png", "LEGENDARY", "₹100"],
            ["M1887", "m1887.png", "LEGENDARY", "₹100"],
            ["MAG-7", "mag7.png", "EPIC", "₹69"],
            ["SPAS12", "spas12.png", "RARE", "₹69"],

            ["AWM Old Fashion", "awm.png", "LEGENDARY", "₹100"],
            ["Kar98k Great Plunder", "kar98.png", "EPIC", "₹90"],
            ["M82B Dragon Mob", "m82b.png", "RARE", "₹80"],
            ["SVD Swordsman Legends", "svd.png", "EPIC", "₹90"],

            ["M249 Fire Bones", "m249.png", "EPIC", "₹99"],
            ["AC80", "ac80.png", "EPIC", "₹80"],
            ["M60 Lively Beast", "m60.png", "RARE", "₹70"],

            ["Desert Eagle Ornamenal Touch", "desert.png", "EPIC", "₹60"],
            ["G18 Persia Prowess", "g18.png", "RARE", "₹70"],
            ["USP Rare Skin", "usp.png", "RARE", "₹70"]
        ]
    },


    /* EMOTES */

    emotes: {
        title: "Rare Emotes",
        small: "OG EMOTE COLLECTION",

        items: [
            ["LOL EMOTE", "LOL-1.png", "OG", "₹200"],
            ["DEVIL MOVE", "DEVIL-M.jpg", "RARE", "₹200"],
            ["ROSE EMOTE", "ROSE-E.jpg", "EPIC", "₹100"],
            ["PIRATE FLAG", "PIRATE-S.jpg", "OG", "₹100"],
            ["I HEART YOU", "HEART-YOU.jpg", "OG", "₹90"],
            ["FFWC EMOTE", "FF-WC.jpg", "RARE", "₹100"],
            ["CAR EMOTE", "motor-sport.png", "EPIC", "₹100"],
            ["PUSH-UP EMOTE", "PUSH-UP.png", "OG", "₹80"],
            ["HIGH FIVE", "high-five.png", "OG", "₹70"],
            ["MONEY GUN", "money-m.png", "RARE", "₹100"],
            ["SELFIE", "SELFIE-CL.png", "EPIC", "₹80"],
            ["PUSHPA RAAJ", "pushpa-raaj.png", "RARE", "₹100"],
            ["MUMMY DANCE", "MUMMY-D.png", "OG", "₹90"],
            ["CHAIR EMOTE", "sitting-chair.png", "OG", "₹100"]
        ]
    },


    /* ENTRY EMOTES */

    entryEmotes: {
        title: "Entry Emotes",
        small: "ENTRY EMOTE COLLECTION",

        items: [
            ["LAMBOHGINI RIDER", "lamborghini-reder.png", "OG", "₹150"],
            ["TORNADO", "tornado.png", "OG", "₹150"],
            ["OVER-CHARGE", "over-charge.png", "RARE", "₹150"],
            ["DRAGON RIDE", "dragon-ride.png", "EPIC", "₹150"],
            ["HORSE RIDE", "horse-ride.png", "OG", "₹150"],
            ["WOLF ZAP", "wolf-zap.png", "RARE", "₹150"],
            ["CARPET", "carpet-entry.png", "EPIC", "₹200"],
            ["ENTRY EMOTE", "entry-bike.png", "OG", "₹150"]
        ]
    },


    /* GLOO WALL */

    gloo: {
        title: "Gloo Wall Skins",
        small: "SPECIAL WALL COLLECTION",

        items: [
            ["AZURE Dragon Gloo Wall", "azure-gloo.png", "LEGENDARY", "₹90"],
            ["Cobra Gloo Wall", "cobra.png", "EPIC", "₹80"],
            ["ROARING PROTECTOR", "roar-ing.png", "RARE", "₹70"],
            ["Demon SLAYER", "demon-slayer.png", "EPIC", "₹70"],
            ["MINI GLOO WALL", "mini-wall.png", "OG", "₹70"],
            ["SPIRIT GLOO WALL", "black-wall.png", "RARE", "₹70"],
            ["NUTTY QUIRK", "nutty-quirk.png", "EPIC", "₹70"],
            ["DRAGON SHIELD", "dra-gon.png", "RARE", "₹70"]
        ]
    },


    /* GRENADE */

    grenade: {
        title: "Grenade Skins",
        small: "GRENADE COLLECTION",

        items: [
            ["Explosive Brick", "explo-sive.png", "RARE", "₹80"],
            ["Pumpkin Bomb", "pump-kin.png", "EPIC", "₹69"],
            ["Pineapple Fizz", "pine-apple.png", "RARE", "₹69"],
            ["Egg Grenade", "e-gg.png", "EPIC", "₹69"]
        ]
    },


    /* DIAMONDS */

    diamonds: {
        title: "Diamond Packs",
        small: "DIAMOND COLLECTION",

        items: [
            ["1,000 Diamonds", "5-diamond.png", "EPIC", "₹60"],
            ["5,000 Diamonds", "5-diamond.png", "EPIC", "₹100"],
            ["10,000 Diamonds", "5-diamond.png", "EPIC", "₹400"],
            ["20,000 Diamonds", "5-diamond.png", "EPIC", "₹500"]
        ]
    }

};


/* =========================
   GLOBAL VARIABLES
========================= */

let selectedItem = "";
let selectedPrice = "";
let countdownInterval = null;
let buyerEmail = "";
let buyerNickname = "";


/* =========================
   OPEN CATEGORY
========================= */

function openCategory(category) {

    const data = collections[category];

    if (!data) return;

    document
        .querySelector(".hero")
        .classList.add("hidden");

    document
        .querySelector(".collections")
        .classList.add("hidden");

    document
        .getElementById("collectionView")
        .classList.remove("hidden");

    document
        .getElementById("collectionSmall")
        .textContent = data.small;

    document
        .getElementById("collectionTitle")
        .textContent = data.title;

    const grid =
        document.getElementById("itemsGrid");

    grid.innerHTML = "";

    data.items.forEach((item, index) => {

        const card =
            document.createElement("div");

        card.className = "item-card";

        card.style.animationDelay =
            `${index * 50}ms`;

        card.innerHTML = `

            <div class="item-image">

                <img
                    src="${item[1]}"
                    alt="${item[0]}"
                    loading="lazy"
                >

            </div>

            <div class="item-info">

                <h3>
                    ${item[0]}
                </h3>

                <span class="rarity">
                    ${item[2]}
                </span>

                <div class="item-price">
                    ${item[3]}
                </div>

                <button
                    class="buy-btn"
                    onclick="openBuyForm(
                        '${item[0].replace(/'/g, "\\'")}',
                        '${item[3]}'
                    )"
                >
                    BUY NOW
                </button>

            </div>

        `;

        grid.appendChild(card);

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   OPEN BUY FORM
========================= */

function openBuyForm(item, price) {

    selectedItem = item;
    selectedPrice = price;

    document
        .getElementById("buyItemName")
        .textContent = item;

    document
        .getElementById("buyItemPrice")
        .textContent = price;

    document
        .getElementById("buyModal")
        .classList
        .remove("hidden");

    setTimeout(() => {

        document
            .getElementById("buyerEmail")
            .focus();

    }, 100);
}


/* =========================
   CLOSE BUY FORM
========================= */

function closeBuyForm() {

    document
        .getElementById("buyModal")
        .classList
        .add("hidden");
}


/* =========================
   CONTINUE / CREATE ORDER
========================= */

document
    .getElementById("buyForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("buyerEmail")
                    .value
                    .trim();

            const nickname =
                document
                    .getElementById("buyerNickname")
                    .value
                    .trim();

            if (!email || !nickname) {

                alert(
                    "Email aur nickname dono enter karo."
                );

                return;
            }

            buyerEmail = email;
            buyerNickname = nickname;

            try {

                const response =
                    await fetch(
                        "/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email:
                                    buyerEmail,

                                nickname:
                                    buyerNickname,

                                selectedItem:
                                    selectedItem,

                                price:
                                    selectedPrice
                            })
                        }
                    );

                const result =
                    await response.json();

                if (
                    !response.ok ||
                    !result.success
                ) {

                    alert(
                        "Order save nahi hua:\n" +
                        (
                            result.message ||
                            "Unknown error"
                        )
                    );

                    console.log(
                        "Server response:",
                        result
                    );

                    return;
                }

                orderId =
                    result.orderId;

                closeBuyForm();

                document
                    .getElementById(
                        "submitItemName"
                    )
                    .textContent =
                    selectedItem;

                document
                    .getElementById(
                        "submitItemPrice"
                    )
                    .textContent =
                    selectedPrice;

                document
                    .getElementById(
                        "submitModal"
                    )
                    .classList
                    .remove("hidden");

                startTimer();

            } catch (error) {

                console.error(
                    "Order error:",
                    error
                );

                alert(
                    "Server connection error."
                );
            }

        }
    );


/* =========================
   2 MINUTE TIMER
========================= */

function startTimer() {

    clearInterval(
        countdownInterval
    );

    let timeLeft = 120;

    const timer =
        document.getElementById("timer");

    const submitButton =
        document.getElementById(
            "finalSubmitBtn"
        );

    submitButton.disabled = true;

    updateTimer(timeLeft);

    countdownInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer(
                timeLeft
            );

            if (timeLeft <= 0) {

                clearInterval(
                    countdownInterval
                );

                timer.textContent =
                    "00:00";

                submitButton.disabled =
                    false;
            }

        }, 1000);
}


/* =========================
   UPDATE TIMER
========================= */

function updateTimer(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        seconds % 60;

    document
        .getElementById("timer")
        .textContent =
        String(minutes)
            .padStart(2, "0") +
        ":" +
        String(remainingSeconds)
            .padStart(2, "0");
}


/* =========================
   FINAL SUBMIT
========================= */

async function finalSubmit() {
    const btn = document.getElementById("finalSubmitBtn");

    if (btn.disabled) {
        return;
    }

    clearInterval(countdownInterval);

    // Order ko completed mark karne ki koshish
    if (orderId) {
        try {
            await fetch(`/api/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "completed"
                })
            });
        } catch (error) {
            console.log("Status update error:", error);
        }
    }

    // Verification modal band
    const submitModal = document.getElementById("submitModal");

    if (submitModal) {
        submitModal.classList.add("hidden");
    }

    // Pehle DONE popup dikhao
    const successModal = document.getElementById("successModal");

    if (successModal) {
        successModal.classList.remove("hidden");
    }
}


    /*
       Close submit modal
    */

    document
        .getElementById("submitModal")
        .classList
        .add("hidden");


    /*
       Go back to HOME
    */

    goHome();


    /*
       Show offer popup
    */

    setTimeout(() => {

        showOfferPopup();

    }, 300);



/* =========================
   CLOSE SUBMIT MODAL
========================= */

function closeSuccess() {
    const successModal = document.getElementById("successModal");

    if (successModal) {
        successModal.classList.add("hidden");
    }

    // DONE ke baad Home par wapas
    goHome();

    // Thoda delay, phir BUY 3 GET 4 popup
    setTimeout(() => {
        showOfferPopup();
    }, 300);
}


/* =========================
   SPECIAL OFFER POPUP
========================= */

function showOfferPopup() {

    const offerModal =
        document.getElementById(
            "offerModal"
        );

    if (!offerModal) {
        return;
    }

    offerModal
        .classList
        .remove("hidden");
}


/* =========================
   CLOSE OFFER POPUP
========================= */

function closeOfferPopup() {

    const offerModal =
        document.getElementById(
            "offerModal"
        );

    if (!offerModal) {
        return;
    }

    offerModal
        .classList
        .add("hidden");
}


/* =========================
   HOME
========================= */

function goHome() {

    document
        .querySelector(".hero")
        .classList
        .remove("hidden");

    document
        .querySelector(".collections")
        .classList
        .remove("hidden");

    document
        .getElementById("collectionView")
        .classList
        .add("hidden");

    document
        .getElementById("searchInput")
        .value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   SEARCH
========================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function() {

            const query =
                this.value
                    .toLowerCase()
                    .trim();

            document
                .querySelectorAll(
                    ".item-card"
                )
                .forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    card.style.display =
                        text.includes(query)
                            ? ""
                            : "none";

                });

        }
    );


/* =========================
   BUY MODAL BACKGROUND CLICK
========================= */

document
    .getElementById("buyModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {
                closeBuyForm();
            }

        }
    );


/* =========================
   SUBMIT MODAL BACKGROUND CLICK
========================= */

document
    .getElementById("submitModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {
                closeSubmitModal();
            }

        }
    );


/* =========================
   OFFER MODAL BACKGROUND CLICK
========================= */

const offerModal =
    document.getElementById(
        "offerModal"
    );

if (offerModal) {

    offerModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {
                closeOfferPopup();
            }

        }
    );

}


/* =========================
   ESC KEY
========================= */

document.addEventListener
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeBuyForm();
            closeSubmitModal();
            closeOfferPopup();

        }

    }
