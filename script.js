// ============================================================
// FF VAULT - SCRIPT.JS
// Razorpay Dynamic Payment Version
// ============================================================

// ============================================================
// PRODUCT COLLECTIONS
// ============================================================

const collections = {

    rare: {
        title: "RARE COLLECTION",
        items: [
            ["Arctic Blue Bundle", "arctic-blue.jpg", "RARE", "₹149"],
            ["Zombie Samurai", "zombie-samurai.jpg", "RARE", "₹199"],
            ["Knight Clown", "knight-clown.jpg", "RARE", "₹149"],
            ["Angelic Bundle", "angelic.jpg", "RARE", "₹199"],
            ["Bunny Warrior", "bunny-warrior.jpg", "RARE", "₹199"],
            ["Galaxy Dino", "galaxy-dino.jpg", "RARE", "₹179"],
            ["HipHop Bundle", "hiphop.jpg", "RARE", "₹200"],
            ["Old Bundle", "old-b.png", "RARE", "₹149"],
            ["Sakura Bundle", "sakura.jpg", "RARE", "₹199"]
        ]
    },

    criminal: {
        title: "CRIMINAL COLLECTION",
        items: [
            ["Red Criminal", "red-criminal.jpg", "CRIMINAL", "₹199"],
            ["Blue Criminal", "blue-criminal.jpg", "CRIMINAL", "₹149"],
            ["Green Criminal", "green-criminal.jpg", "CRIMINAL", "₹199"],
            ["Purple Criminal", "purple-criminal.jpg", "CRIMINAL", "₹199"],
            ["Yellow Criminal", "yellow-criminal.jpg", "CRIMINAL", "₹199"],
            ["Black Criminal", "black-criminal.jpg", "CRIMINAL", "₹249"]
        ]
    },

    dino: {
        title: "DINO COLLECTION",
        items: [
            ["Galaxy Dino", "galaxy-dino.jpg", "DINO", "₹149"],
            ["Green Dino", "green-dino.jpg", "DINO", "₹199"],
            ["Blue Dino", "blue-dino.jpg", "DINO", "₹199"],
            ["Pink Dino", "pink-dino.jpg", "DINO", "₹99"],
            ["Yellow Dino", "yellow-dino.jpg", "DINO", "₹199"]
        ]
    },

    guns: {
        title: "GUN COLLECTION",
        items: [
            ["AK47 EVO Gun", "ak47-evo.jpg", "GUN", "₹249"],
            ["M1014 EVO Gun", "m1014-evo.jpg", "GUN", "₹199"],
            ["XM8 EVO Gun", "xm8-evo.jpg", "GUN", "₹199"],
            ["MP40 EVO Gun", "mp40-evo.jpg", "GUN", "₹249"],
            ["GROZA EVO Gun", "groza-evo.jpg", "GUN", "₹149"],
            ["M4A1 EVO Gun", "m4a1-evo.jpg", "GUN", "₹149"],
            ["P90 EVO Gun", "p90-evo.jpg", "GUN", "₹199"],
            ["UMP EVO Gun", "ump-evo.jpg", "GUN", "₹149"],
            ["AK47 Rare Skin", "ak47-rare.jpg", "GUN", "₹149"],
            ["M4A1 Rare Skin", "m4a1-rare.jpg", "GUN", "₹149"],
            ["SCAR Old Fashion", "scar-old.jpg", "GUN", "₹149"],
            ["XM8 Livey Beast", "xm8-livey.jpg", "GUN", "₹99"],
            ["AN94 BOOYAH", "an94-booyah.jpg", "GUN", "₹149"],
            ["Groza Heartseeker", "groza-heartseeker.jpg", "GUN", "₹149"],
            ["PARAFAL Sickly Sweet", "parafal-sickly.jpg", "GUN", "₹139"],
            ["MP40 Red Poker", "mp40-red-poker.jpg", "GUN", "₹199"],
            ["MP5 Old Fashion", "mp5-old.jpg", "GUN", "₹139"],
            ["UMP Lively Beast", "ump-lively.jpg", "GUN", "₹149"],
            ["P90 Old Fashin", "p90-old.jpg", "GUN", "₹199"],
            ["Thompson Lucky Koi", "thompson-lucky.jpg", "GUN", "₹149"],
            ["M1014 Underground Howl", "m1014-underground.jpg", "GUN", "₹115"],
            ["M1887", "m1887.jpg", "GUN", "₹199"],
            ["MAG-7", "mag-7.jpg", "GUN", "₹69"],
            ["SPAS12", "spas12.jpg", "GUN", "₹110"],
            ["AWM Old Fashion", "awm-old.jpg", "GUN", "₹149"],
            ["Kar98k Great Plunder", "kar98k.jpg", "GUN", "₹129"],
            ["M82B Dragon Mob", "m82b.jpg", "GUN", "₹120"],
            ["SVD Swordsman Legends", "svd.jpg", "GUN", "₹99"],
            ["M249 Fire Bones", "m249.jpg", "GUN", "₹99"],
            ["AC80", "ac80.jpg", "GUN", "₹139"],
            ["M60 Lively Beast", "m60.jpg", "GUN", "₹115"],
            ["Desert Eagle Ornamenal Touch", "desert-eagle.jpg", "GUN", "₹79"],
            ["G18 Persia Prowess", "g18.jpg", "GUN", "₹69"],
            ["USP Rare Skin", "usp.jpg", "GUN", "₹59"]
        ]
    },

    emotes: {
        title: "EMOTE COLLECTION",
        items: [
            ["LOL EMOTE", "lol.jpg", "EMOTE", "₹249"],
            ["DEVIL MOVE", "devil-move.jpg", "EMOTE", "₹249"],
            ["ROSE EMOTE", "rose.jpg", "EMOTE", "₹149"],
            ["PIRATE FLAG", "pirate-flag.jpg", "EMOTE", "₹149"],
            ["I HEART YOU", "i-heart-you.jpg", "EMOTE", "₹110"],
            ["FFWC EMOTE", "ffwc.jpg", "EMOTE", "₹199"],
            ["CAR EMOTE", "car.jpg", "EMOTE", "₹199"],
            ["PUSH-UP EMOTE", "push-up.jpg", "EMOTE", "₹199"],
            ["HIGH FIVE", "high-five.jpg", "EMOTE", "₹149"],
            ["MONEY GUN", "money-gun.jpg", "EMOTE", "₹179"],
            ["SELFIE", "selfie.jpg", "EMOTE", "₹149"],
            ["PUSHPA RAAJ", "pushpa-raaj.jpg", "EMOTE", "₹179"],
            ["MUMMY DANCE", "mummy-dance.jpg", "EMOTE", "₹115"],
            ["CHAIR EMOTE", "chair.jpg", "EMOTE", "₹179"]
        ]
    },

    entryEmotes: {
        title: "ENTRY EMOTES",
        items: [
            ["LAMBOHGINI RIDER", "lamborghini.jpg", "ENTRY EMOTE", "₹199"],
            ["TORNADO", "tornado.jpg", "ENTRY EMOTE", "₹249"],
            ["OVER-CHARGE", "over-charge.jpg", "ENTRY EMOTE", "₹199"],
            ["DRAGON RIDE", "dragon-ride.jpg", "ENTRY EMOTE", "₹149"],
            ["HORSE RIDE", "horse-ride.jpg", "ENTRY EMOTE", "₹179"],
            ["WOLF ZAP", "wolf-zap.jpg", "ENTRY EMOTE", "₹189"],
            ["CARPET", "carpet.jpg", "ENTRY EMOTE", "₹199"],
            ["ENTRY EMOTE", "entry-emote.jpg", "ENTRY EMOTE", "₹149"]
        ]
    },

    gloo: {
        title: "GLOO WALL COLLECTION",
        items: [
            ["AZURE Dragon Gloo Wall", "azure-dragon.jpg", "GLOO", "₹79"],
            ["Cobra Gloo Wall", "cobra.jpg", "GLOO", "₹99"],
            ["ROARING PROTECTOR", "roaring-protector.jpg", "GLOO", "₹99"],
            ["Demon SLAYER", "demon-slayer.jpg", "GLOO", "₹149"],
            ["MINI GLOO WALL", "mini-gloo.jpg", "GLOO", "₹199"],
            ["SPIRIT GLOO WALL", "spirit-gloo.jpg", "GLOO", "₹179"],
            ["NUTTY QUIRK", "nutty-quirk.jpg", "GLOO", "₹149"],
            ["DRAGON SHIELD", "dragon-shield.jpg", "GLOO", "₹179"]
        ]
    },

    grenade: {
        title: "GRENADE COLLECTION",
        items: [
            ["Explosive Brick", "explosive-brick.jpg", "GRENADE", "₹99"],
            ["Pumpkin Bomb", "pumpkin-bomb.jpg", "GRENADE", "₹99"],
            ["Pineapple Fizz", "pineapple-fizz.jpg", "GRENADE", "₹99"],
            ["Egg Grenade", "egg-grenade.jpg", "GRENADE", "₹99"]
        ]
    },

    diamonds: {
        title: "DIAMONDS",
        items: [
            ["1,000 Diamonds", "1000-diamonds.jpg", "DIAMONDS", "₹60"],
            ["10,000 Diamonds", "10000-diamonds.jpg", "DIAMONDS", "₹149"],
            ["20,000 Diamonds", "20000-diamonds.jpg", "DIAMONDS", "₹400"],
            ["50,000 Diamonds", "50000-diamonds.jpg", "DIAMONDS", "₹500"]
        ]
    }
};


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let selectedItem = "";
let selectedPrice = "";
let selectedCategory = "";

let buyerEmail = "";
let buyerNickname = "";

let localOrderId = null;
let razorpayOrderId = null;

let countdownInterval = null;
let timeLeft = 120;


// ============================================================
// BASIC HELPERS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


function showElement(id) {
    const element = getElement(id);

    if (element) {
        element.classList.remove("hidden");
    }
}


function hideElement(id) {
    const element = getElement(id);

    if (element) {
        element.classList.add("hidden");
    }
}


// ============================================================
// CATEGORY OPEN
// ============================================================

function openCategory(category) {

    const collection = collections[category];

    if (!collection) {
        console.error("Category not found:", category);
        return;
    }

    selectedCategory = category;

    const collectionView = getElement("collectionView");
    const collectionTitle = getElement("collectionTitle");
    const itemsGrid = getElement("itemsGrid");

    if (!itemsGrid) {
        console.error("itemsGrid not found");
        return;
    }

    if (collectionTitle) {
        collectionTitle.textContent = collection.title;
    }

    itemsGrid.innerHTML = "";

    collection.items.forEach(item => {

        const itemName = item[0];
        const image = item[1];
        const type = item[2];
        const price = item[3];

        const card = document.createElement("div");

        card.className = "item-card";

        card.innerHTML = `
            <div class="item-image">
                <img
                    src="${image}"
                    alt="${itemName}"
                    onerror="this.style.display='none'"
                >
            </div>

            <div class="item-info">
                <div class="item-name">${itemName}</div>
                <div class="item-type">${type}</div>
                <div class="item-price">${price}</div>

                <button
                    class="buy-btn"
                    onclick='openBuyForm(${JSON.stringify(itemName)}, ${JSON.stringify(price)}, ${JSON.stringify(category)})'
                >
                    BUY NOW
                </button>
            </div>
        `;

        itemsGrid.appendChild(card);
    });

    if (collectionView) {
        collectionView.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================================
// BUY FORM
// ============================================================

function openBuyForm(item, price, category) {

    selectedItem = item;
    selectedPrice = price;
    selectedCategory = category;

    const itemName = getElement("buyItemName");
    const itemPrice = getElement("buyItemPrice");

    if (itemName) {
        itemName.textContent = item;
    }

    if (itemPrice) {
        itemPrice.textContent = price;
    }

    const emailInput = getElement("buyerEmail");
    const nicknameInput = getElement("buyerNickname");

    if (emailInput) {
        emailInput.value = "";
    }

    if (nicknameInput) {
        nicknameInput.value = "";
    }

    showElement("buyModal");
}


function closeBuyForm() {
    hideElement("buyModal");
}


// ============================================================
// ORDER FORM
// ============================================================

const buyForm = getElement("buyForm");

if (buyForm) {

    buyForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const emailInput = getElement("buyerEmail");
        const nicknameInput = getElement("buyerNickname");

        if (!emailInput || !nicknameInput) {
            alert("Buyer form fields not found.");
            return;
        }

        buyerEmail = emailInput.value.trim();
        buyerNickname = nicknameInput.value.trim();

        if (!buyerEmail) {
            alert("Please enter your email.");
            return;
        }

        if (!buyerNickname) {
            alert("Please enter your nickname / UID.");
            return;
        }

        if (!selectedItem) {
            alert("Please select a product.");
            return;
        }

        if (!selectedCategory) {
            alert("Product category missing.");
            return;
        }

        const submitButton =
            buyForm.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "CREATING ORDER...";
        }

        try {

            // IMPORTANT:
            // Price is intentionally NOT sent from frontend.
            // Server will calculate the real price.

            const response = await fetch("/api/orders", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: buyerEmail,
                    nickname: buyerNickname,
                    selectedItem: selectedItem,
                    category: selectedCategory
                })
            });


            const result = await response.json();


            if (!response.ok || !result.success) {

                throw new Error(
                    result.message || "Unable to create order."
                );
            }


            // Local database order ID
            localOrderId = result.orderId;


            // Razorpay order ID
            razorpayOrderId = result.razorpayOrderId;


            // IMPORTANT:
            // This price comes from SERVER.
            selectedPrice = result.price;


            // Update existing modal fields if present
            const submitItemName = getElement("submitItemName");
            const submitItemPrice = getElement("submitItemPrice");

            if (submitItemName) {
                submitItemName.textContent = result.selectedItem || selectedItem;
            }

            if (submitItemPrice) {
                submitItemPrice.textContent = result.price;
            }


            closeBuyForm();


            // Open real Razorpay payment
            await openRazorpayPayment();

        }

        catch (error) {

            console.error("Order error:", error);

            alert(
                error.message ||
                "Something went wrong while creating the order."
            );
        }

        finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "CONTINUE";
            }
        }

    });
}


// ============================================================
// RAZORPAY CHECKOUT LOADER
// ============================================================

function loadRazorpayCheckout() {

    return new Promise((resolve, reject) => {

        // Already loaded
        if (window.Razorpay) {
            resolve();
            return;
        }


        const existingScript =
            document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            );


        if (existingScript) {

            existingScript.addEventListener(
                "load",
                () => resolve()
            );

            existingScript.addEventListener(
                "error",
                () => reject(
                    new Error("Razorpay Checkout failed to load.")
                )
            );

            return;
        }


        const script = document.createElement("script");

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = function () {
            resolve();
        };

        script.onerror = function () {
            reject(
                new Error("Unable to load Razorpay Checkout.")
            );
        };

        document.head.appendChild(script);

    });
}


// ============================================================
// OPEN RAZORPAY PAYMENT
// ============================================================

async function openRazorpayPayment() {

    if (!localOrderId) {
        alert("Order ID missing.");
        return;
    }

    if (!razorpayOrderId) {
        alert("Razorpay order ID missing.");
        return;
    }


    try {

        await loadRazorpayCheckout();


        // Ask server for PUBLIC Razorpay Key ID.
        // Secret key must NEVER be placed in this JS file.

        const keyResponse =
            await fetch("/api/payment/key");


        const keyResult =
            await keyResponse.json();


        if (!keyResponse.ok || !keyResult.success) {

            throw new Error(
                keyResult.message ||
                "Unable to load payment configuration."
            );
        }


        const razorpayKey =
            keyResult.keyId;


        if (!razorpayKey) {
            throw new Error("Razorpay Key ID missing.");
        }


        const options = {

            key: razorpayKey,

            order_id: razorpayOrderId,

            name: "FF Vault",

            description:
                selectedItem || "FF Vault Purchase",


            // This is only display information.
            // Actual amount is locked in Razorpay Order
            // created by the server.

            prefill: {
                email: buyerEmail
            },


            notes: {
                local_order_id: String(localOrderId),
                product: selectedItem,
                category: selectedCategory
            },


            theme: {
                color: "#00eaff"
            },


            handler: async function (paymentResponse) {

                await verifyRazorpayPayment(
                    paymentResponse
                );
            },


            modal: {

                ondismiss: function () {

                    console.log(
                        "Razorpay checkout closed by user."
                    );
                }
            }
        };


        const razorpay =
            new Razorpay(options);


        razorpay.on(
            "payment.failed",
            function (response) {

                console.error(
                    "Payment failed:",
                    response
                );

                alert(
                    "Payment failed. Please try again."
                );
            }
        );


        razorpay.open();

    }

    catch (error) {

        console.error(
            "Razorpay error:",
            error
        );

        alert(
            error.message ||
            "Unable to open payment."
        );
    }
}


// ============================================================
// VERIFY RAZORPAY PAYMENT
// ============================================================

async function verifyRazorpayPayment(paymentResponse) {

    if (!paymentResponse) {
        alert("Payment response missing.");
        return;
    }


    try {

        const response = await fetch(
            "/api/payment/verify",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    localOrderId: localOrderId,

                    razorpay_order_id:
                        paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                        paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                        paymentResponse.razorpay_signature
                })
            }
        );


        const result =
            await response.json();


        if (!response.ok || !result.success) {

            throw new Error(
                result.message ||
                "Payment verification failed."
            );
        }


        // ONLY after server verification
        // do we show payment success.

        showPaymentSuccess(result);

    }

    catch (error) {

        console.error(
            "Payment verification error:",
            error
        );

        alert(
            error.message ||
            "Payment could not be verified."
        );
    }
}


// ============================================================
// PAYMENT SUCCESS
// ============================================================

function showPaymentSuccess(result) {

    hideElement("submitModal");

    const successItem =
        getElement("successItemName");

    const successPrice =
        getElement("successItemPrice");

    if (successItem) {
        successItem.textContent =
            result.selectedItem ||
            selectedItem;
    }

    if (successPrice) {
        successPrice.textContent =
            result.price ||
            selectedPrice;
    }


    showElement("successModal");
}


// ============================================================
// FINAL SUBMIT
// ============================================================

async function finalSubmit() {

    // This function is kept for any existing HTML
    // button that calls finalSubmit().

    await openRazorpayPayment();
}


// ============================================================
// SUBMIT MODAL
// ============================================================

function closeSubmitModal() {

    hideElement("submitModal");

    clearInterval(countdownInterval);
    countdownInterval = null;
}


function openSubmitModal() {

    const submitItemName =
        getElement("submitItemName");

    const submitItemPrice =
        getElement("submitItemPrice");


    if (submitItemName) {
        submitItemName.textContent =
            selectedItem;
    }


    if (submitItemPrice) {
        submitItemPrice.textContent =
            selectedPrice;
    }


    showElement("submitModal");

    startTimer();
}


// ============================================================
// TIMER
// ============================================================

function updateTimer(seconds) {

    const timer =
        getElement("timer");

    if (!timer) {
        return;
    }


    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;


    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}


function startTimer() {

    clearInterval(countdownInterval);

    timeLeft = 120;

    updateTimer(timeLeft);


    countdownInterval =
        setInterval(function () {

            timeLeft--;

            updateTimer(timeLeft);


            if (timeLeft <= 0) {

                clearInterval(countdownInterval);

                countdownInterval = null;

                updateTimer(0);

                hideElement("submitModal");

                goHome();

                setTimeout(function () {

                    showOfferPopup();

                }, 300);
            }

        }, 1000);
}


// ============================================================
// SUCCESS MODAL
// ============================================================

function closeSuccess() {

    hideElement("successModal");

    goHome();

    setTimeout(function () {

        showOfferPopup();

    }, 300);
}


// ============================================================
// OFFER POPUP
// ============================================================

function showOfferPopup() {

    const offerModal =
        getElement("offerModal");

    if (!offerModal) {
        return;
    }

    offerModal.classList.remove("hidden");
}


function closeOfferPopup() {

    hideElement("offerModal");
}


// ============================================================
// HOME
// ============================================================

function goHome() {

    const collectionView =
        getElement("collectionView");

    if (collectionView) {
        collectionView.classList.add("hidden");
    }


    const homeSection =
        getElement("home");

    if (homeSection) {

        homeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


// ============================================================
// SEARCH
// ============================================================

function searchProducts(query) {

    const searchText =
        query.trim().toLowerCase();


    if (!searchText) {
        return;
    }


    const results = [];


    Object.keys(collections).forEach(category => {

        const collection =
            collections[category];


        collection.items.forEach(item => {

            const itemName =
                item[0];


            if (
                itemName
                    .toLowerCase()
                    .includes(searchText)
            ) {

                results.push({
                    category: category,
                    item: item
                });
            }

        });

    });


    const collectionView =
        getElement("collectionView");

    const collectionTitle =
        getElement("collectionTitle");

    const itemsGrid =
        getElement("itemsGrid");


    if (!itemsGrid) {
        return;
    }


    if (collectionTitle) {
        collectionTitle.textContent =
            `SEARCH RESULTS (${results.length})`;
    }


    itemsGrid.innerHTML = "";


    if (results.length === 0) {

        itemsGrid.innerHTML = `
            <div class="no-results">
                No products found.
            </div>
        `;

    } else {

        results.forEach(result => {

            const item =
                result.item;

            const category =
                result.category;


            const itemName =
                item[0];

            const image =
                item[1];

            const type =
                item[2];

            const price =
                item[3];


            const card =
                document.createElement("div");


            card.className =
                "item-card";


            card.innerHTML = `

                <div class="item-image">

                    <img
                        src="${image}"
                        alt="${itemName}"
                        onerror="this.style.display='none'"
                    >

                </div>


                <div class="item-info">

                    <div class="item-name">
                        ${itemName}
                    </div>

                    <div class="item-type">
                        ${type}
                    </div>

                    <div class="item-price">
                        ${price}
                    </div>


                    <button
                        class="buy-btn"
                        onclick='openBuyForm(
                            ${JSON.stringify(itemName)},
                            ${JSON.stringify(price)},
                            ${JSON.stringify(category)}
                        )'
                    >
                        BUY NOW
                    </button>

                </div>
            `;


            itemsGrid.appendChild(card);

        });

    }


    if (collectionView) {
        collectionView.classList.remove("hidden");
    }
}


// ============================================================
// SEARCH INPUT EVENT
// ============================================================

const searchInput =
    getElement("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            searchProducts(
                searchInput.value
            );

        }
    );
}


// ============================================================
// BACKGROUND CLICK
// ============================================================

document.addEventListener(
    "click",
    function (event) {

        const buyModal =
            getElement("buyModal");

        const submitModal =
            getElement("submitModal");

        const successModal =
            getElement("successModal");

        const offerModal =
            getElement("offerModal");


        if (
            buyModal &&
            event.target === buyModal
        ) {

            closeBuyForm();
        }


        if (
            submitModal &&
            event.target === submitModal
        ) {

            closeSubmitModal();
        }


        if (
            successModal &&
            event.target === successModal
        ) {

            closeSuccess();
        }


        if (
            offerModal &&
            event.target === offerModal
        ) {

            closeOfferPopup();
        }

    }
);


// ============================================================
// ESC KEY
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        const buyModal =
            getElement("buyModal");

        const submitModal =
            getElement("submitModal");

        const successModal =
            getElement("successModal");

        const offerModal =
            getElement("offerModal");


        if (
            buyModal &&
            !buyModal.classList.contains("hidden")
        ) {

            closeBuyForm();

        }


        if (
            submitModal &&
            !submitModal.classList.contains("hidden")
        ) {

            closeSubmitModal();

        }


        if (
            successModal &&
            !successModal.classList.contains("hidden")
        ) {

            closeSuccess();

        }


        if (
            offerModal &&
            !offerModal.classList.contains("hidden")
        ) {

            closeOfferPopup();

        }

    }
);


// ============================================================
// INITIAL STATE
// ============================================================

// IMPORTANT:
// Yahan koi showOfferPopup() call nahi hai.
// Isliye refresh/page load par offer popup automatically
// nahi khulega.

hideElement("submitModal");


// ============================================================
// DEBUG
// ============================================================

console.log(
    "FF Vault script loaded successfully."
);
