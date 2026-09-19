const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const session = require("express-session");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================================================
// ADMIN CONFIG
// ============================================================

const ADMIN_USER =
    process.env.ADMIN_USER || "admin";

const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD ||
    "change-this-password";

const SESSION_SECRET =
    process.env.SESSION_SECRET ||
    "change-this-session-secret";


// ============================================================
// RAZORPAY CONFIG
// ============================================================

const RAZORPAY_KEY_ID =
    process.env.RAZORPAY_KEY_ID || "";

const RAZORPAY_KEY_SECRET =
    process.env.RAZORPAY_KEY_SECRET || "";


if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {

    console.warn(
        "WARNING: Razorpay keys are not configured."
    );

}


const razorpay =
    RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET
        ? new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        })
        : null;


// ============================================================
// DATABASE
// ============================================================

const dbPath =
    path.join(__dirname, "ff-vault.db");

const db =
    new Database(dbPath);

console.log("Database connected");


// ============================================================
// CREATE ORDERS TABLE
// ============================================================

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        nickname TEXT NOT NULL,
        selected_item TEXT NOT NULL,
        price TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);


// ============================================================
// DATABASE MIGRATION HELPERS
// ============================================================

function columnExists(tableName, columnName) {

    const columns =
        db.prepare(
            `PRAGMA table_info(${tableName})`
        ).all();

    return columns.some(
        column => column.name === columnName
    );
}


function addColumnIfMissing(
    tableName,
    columnName,
    definition
) {

    if (!columnExists(tableName, columnName)) {

        db.exec(
            `ALTER TABLE ${tableName}
             ADD COLUMN ${columnName} ${definition}`
        );

        console.log(
            `Added database column: ${columnName}`
        );
    }
}


// Add fields needed for Razorpay

addColumnIfMissing(
    "orders",
    "category",
    "TEXT"
);

addColumnIfMissing(
    "orders",
    "razorpay_order_id",
    "TEXT"
);

addColumnIfMissing(
    "orders",
    "razorpay_payment_id",
    "TEXT"
);


// ============================================================
// SERVER-SIDE PRODUCT CATALOG
// ============================================================
//
// IMPORTANT:
//
// Client ki price par trust nahi kiya jayega.
//
// Product ki real price yahin server par decide hogi.
//
// Category + item dono use kiye gaye hain,
// kyunki "Galaxy Dino" do categories mein hai:
//
// Rare  -> ₹179
// Dino  -> ₹149
//
// ============================================================

const PRODUCT_PRICES = {

    rare: {

        "Arctic Blue Bundle": 149,
        "Zombie Samurai": 199,
        "Knight Clown": 149,
        "Angelic Bundle": 199,
        "Bunny Warrior": 199,
        "Galaxy Dino": 179,
        "HipHop Bundle": 200,
        "Old Bundle": 149,
        "Sakura Bundle": 199

    },


    criminal: {

        "Red Criminal": 199,
        "Blue Criminal": 149,
        "Green Criminal": 199,
        "Purple Criminal": 199,
        "Yellow Criminal": 199,
        "Black Criminal": 249

    },


    dino: {

        "Galaxy Dino": 149,
        "Green Dino": 199,
        "Blue Dino": 199,
        "Pink Dino": 99,
        "Yellow Dino": 199

    },


    guns: {

        "AK47 EVO Gun": 249,
        "M1014 EVO Gun": 199,
        "XM8 EVO Gun": 199,
        "MP40 EVO Gun": 249,
        "GROZA EVO Gun": 149,
        "M4A1 EVO Gun": 149,
        "P90 EVO Gun": 199,
        "UMP EVO Gun": 149,

        "AK47 Rare Skin": 149,
        "M4A1 Rare Skin": 149,
        "SCAR Old Fashion": 149,
        "XM8 Livey Beast": 99,
        "AN94 BOOYAH": 149,
        "Groza Heartseeker": 149,

        "PARAFAL Sickly Sweet": 139,
        "MP40 Red Poker": 199,
        "MP5 Old Fashion": 139,
        "UMP Lively Beast": 149,
        "P90 Old Fashin": 199,
        "Thompson Lucky Koi": 149,

        "M1014 Underground Howl": 115,
        "M1887": 199,
        "MAG-7": 69,
        "SPAS12": 110,

        "AWM Old Fashion": 149,
        "Kar98k Great Plunder": 129,
        "M82B Dragon Mob": 120,
        "SVD Swordsman Legends": 99,

        "M249 Fire Bones": 99,
        "AC80": 139,
        "M60 Lively Beast": 115,

        "Desert Eagle Ornamenal Touch": 79,
        "G18 Persia Prowess": 69,
        "USP Rare Skin": 59

    },


    emotes: {

        "LOL EMOTE": 249,
        "DEVIL MOVE": 249,
        "ROSE EMOTE": 149,
        "PIRATE FLAG": 149,
        "I HEART YOU": 110,
        "FFWC EMOTE": 199,
        "CAR EMOTE": 199,
        "PUSH-UP EMOTE": 199,
        "HIGH FIVE": 149,
        "MONEY GUN": 179,
        "SELFIE": 149,
        "PUSHPA RAAJ": 179,
        "MUMMY DANCE": 115,
        "CHAIR EMOTE": 179

    },


    entryEmotes: {

        "LAMBOHGINI RIDER": 199,
        "TORNADO": 249,
        "OVER-CHARGE": 199,
        "DRAGON RIDE": 149,
        "HORSE RIDE": 179,
        "WOLF ZAP": 189,
        "CARPET": 199,
        "ENTRY EMOTE": 149

    },


    gloo: {

        "AZURE Dragon Gloo Wall": 79,
        "Cobra Gloo Wall": 99,
        "ROARING PROTECTOR": 99,
        "Demon SLAYER": 149,
        "MINI GLOO WALL": 199,
        "SPIRIT GLOO WALL": 179,
        "NUTTY QUIRK": 149,
        "DRAGON SHIELD": 179

    },


    grenade: {

        "Explosive Brick": 99,
        "Pumpkin Bomb": 99,
        "Pineapple Fizz": 99,
        "Egg Grenade": 99

    },


    diamonds: {

        "1,000 Diamonds": 60,
        "10,000 Diamonds": 149,
        "20,000 Diamonds": 400,
        "50,000 Diamonds": 500

    }

};


// ============================================================
// PRICE HELPERS
// ============================================================

function getProductPrice(
    category,
    selectedItem
) {

    if (!category || !selectedItem) {
        return null;
    }


    const categoryProducts =
        PRODUCT_PRICES[category];

    if (!categoryProducts) {
        return null;
    }


    const price =
        categoryProducts[selectedItem];

    if (
        typeof price !== "number" ||
        !Number.isFinite(price)
    ) {
        return null;
    }


    return price;
}


function formatINR(amount) {

    return `₹${amount}`;
}


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


app.use(
    session({

        secret: SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            sameSite: "lax",

            secure: false,

            maxAge:
                24 * 60 * 60 * 1000
        }

    })
);


// ============================================================
// STATIC FILES
// ============================================================

app.use(
    express.static(__dirname)
);


// ============================================================
// HOME
// ============================================================

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "index.html"
            )
        );

    }
);


// ============================================================
// ADMIN MIDDLEWARE
// ============================================================

function requireAdmin(
    req,
    res,
    next
) {

    if (
        req.session &&
        req.session.isAdmin
    ) {

        return next();

    }


    return res.status(401).json({

        success: false,

        message: "Unauthorized"

    });

}


// ============================================================
// ADMIN LOGIN
// ============================================================

app.post(
    "/api/admin/login",
    (req, res) => {

        const {
            username,
            password
        } = req.body;


        if (
            username === ADMIN_USER &&
            password === ADMIN_PASSWORD
        ) {

            req.session.isAdmin = true;


            return res.json({

                success: true,

                message:
                    "Login successful"

            });

        }


        return res.status(401).json({

            success: false,

            message:
                "Invalid username or password"

        });

    }
);


// ============================================================
// ADMIN LOGOUT
// ============================================================

app.post(
    "/api/admin/logout",
    requireAdmin,
    (req, res) => {

        req.session.destroy(
            () => {

                res.json({

                    success: true

                });

            }
        );

    }
);


// ============================================================
// RAZORPAY PUBLIC KEY
// ============================================================

app.get(
    "/api/payment/key",
    (req, res) => {

        if (!RAZORPAY_KEY_ID) {

            return res.status(500).json({

                success: false,

                message:
                    "Razorpay Key ID is not configured."

            });

        }


        return res.json({

            success: true,

            keyId:
                RAZORPAY_KEY_ID

        });

    }
);


// ============================================================
// CREATE ORDER + RAZORPAY ORDER
// ============================================================

app.post(
    "/api/orders",
    async (req, res) => {

        try {

            const {
                email,
                nickname,
                selectedItem,
                category
            } = req.body;


            // ------------------------------------------------
            // BASIC VALIDATION
            // ------------------------------------------------

            if (
                !email ||
                !nickname ||
                !selectedItem ||
                !category
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email, nickname, item and category are required."

                });

            }


            const cleanEmail =
                String(email).trim();

            const cleanNickname =
                String(nickname).trim();

            const cleanItem =
                String(selectedItem).trim();

            const cleanCategory =
                String(category).trim();


            // ------------------------------------------------
            // SERVER-SIDE PRICE
            // ------------------------------------------------

            const lockedPrice =
                getProductPrice(
                    cleanCategory,
                    cleanItem
                );


            if (lockedPrice === null) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid product."

                });

            }


            // ------------------------------------------------
            // RAZORPAY CHECK
            // ------------------------------------------------

            if (!razorpay) {

                return res.status(500).json({

                    success: false,

                    message:
                        "Razorpay is not configured on server."

                });

            }


            // ------------------------------------------------
            // AMOUNT IN PAISE
            // ------------------------------------------------

            const amountInPaise =
                lockedPrice * 100;


            // ------------------------------------------------
            // UNIQUE RECEIPT
            // ------------------------------------------------

            const receipt =
                `ff_${Date.now()}_${crypto
                    .randomBytes(4)
                    .toString("hex")}`;


            // ------------------------------------------------
            // CREATE RAZORPAY ORDER
            // ------------------------------------------------
            //
            // Price comes ONLY from server.
            //
            // User cannot send ₹1 here for a ₹249 product.
            //
            // partial_payment false = full amount required.
            //
            // ------------------------------------------------

            const razorpayOrder =
                await razorpay.orders.create({

                    amount:
                        amountInPaise,

                    currency:
                        "INR",

                    receipt:

                        receipt,

                    partial_payment:
                        false,

                    notes: {

                        product:
                            cleanItem,

                        category:
                            cleanCategory
                    }

                });


            // ------------------------------------------------
            // SAVE LOCAL ORDER
            // ------------------------------------------------

            const insert =
                db.prepare(`

                    INSERT INTO orders
                    (
                        email,
                        nickname,
                        selected_item,
                        price,
                        status,
                        category,
                        razorpay_order_id
                    )

                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        'pending',
                        ?,
                        ?
                    )

                `);


            const result =
                insert.run(

                    cleanEmail,

                    cleanNickname,

                    cleanItem,

                    formatINR(
                        lockedPrice
                    ),

                    cleanCategory,

                    razorpayOrder.id

                );


            // ------------------------------------------------
            // RESPONSE TO FRONTEND
            // ------------------------------------------------

            return res.json({

                success: true,

                orderId:
                    result.lastInsertRowid,

                razorpayOrderId:
                    razorpayOrder.id,

                price:
                    formatINR(
                        lockedPrice
                    ),

                amount:
                    amountInPaise,

                currency:
                    "INR",

                selectedItem:
                    cleanItem,

                category:
                    cleanCategory,

                message:
                    "Order created successfully."

            });

        }

        catch (error) {

            console.error(
                "Create order error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to create payment order."

            });

        }

    }
);


// ============================================================
// VERIFY RAZORPAY PAYMENT
// ============================================================

app.post(
    "/api/payment/verify",
    async (req, res) => {

        try {

            const {

                localOrderId,

                razorpay_order_id,

                razorpay_payment_id,

                razorpay_signature

            } = req.body;


            // ------------------------------------------------
            // BASIC VALIDATION
            // ------------------------------------------------

            if (
                !localOrderId ||
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Incomplete payment verification data."

                });

            }


            const numericOrderId =
                Number(localOrderId);


            if (
                !Number.isInteger(
                    numericOrderId
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid local order ID."

                });

            }


            // ------------------------------------------------
            // GET LOCAL ORDER
            // ------------------------------------------------
            //
            // IMPORTANT:
            // Razorpay order ID used for signature is taken
            // from our database, not blindly trusted from
            // frontend.
            //
            // ------------------------------------------------

            const localOrder =
                db.prepare(`

                    SELECT
                        id,
                        email,
                        nickname,
                        selected_item AS selectedItem,
                        price,
                        status,
                        category,
                        razorpay_order_id AS razorpayOrderId,
                        razorpay_payment_id AS razorpayPaymentId

                    FROM orders

                    WHERE id = ?

                `).get(
                    numericOrderId
                );


            if (!localOrder) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            // ------------------------------------------------
            // ALREADY COMPLETED
            // ------------------------------------------------

            if (
                localOrder.status ===
                "completed"
            ) {

                return res.json({

                    success: true,

                    alreadyVerified:
                        true,

                    price:
                        localOrder.price,

                    selectedItem:
                        localOrder.selectedItem,

                    message:
                        "Payment already verified."

                });

            }


            // ------------------------------------------------
            // ORDER ID MATCH
            // ------------------------------------------------

            if (
                localOrder.razorpayOrderId !==
                razorpay_order_id
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Razorpay order mismatch."

                });

            }


            // ------------------------------------------------
            // SIGNATURE VERIFICATION
            // ------------------------------------------------
            //
            // Razorpay requires:
            //
            // HMAC_SHA256(
            //     razorpay_order_id
            //     + "|"
            //     + razorpay_payment_id,
            //     key_secret
            // )
            //
            // ------------------------------------------------

            const generatedSignature =
                crypto
                    .createHmac(
                        "sha256",
                        RAZORPAY_KEY_SECRET
                    )
                    .update(
                        `${localOrder.razorpayOrderId}|${razorpay_payment_id}`
                    )
                    .digest("hex");


            const receivedBuffer =
                Buffer.from(
                    razorpay_signature,
                    "utf8"
                );

            const generatedBuffer =
                Buffer.from(
                    generatedSignature,
                    "utf8"
                );


            if (
                receivedBuffer.length !==
                generatedBuffer.length ||
                !crypto.timingSafeEqual(
                    receivedBuffer,
                    generatedBuffer
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid payment signature."

                });

            }


            // ------------------------------------------------
            // FETCH PAYMENT FROM RAZORPAY
            // ------------------------------------------------
            //
            // Signature alone is not enough for our final
            // business check. We also verify the payment
            // belongs to this order and has the expected
            // amount.
            //
            // ------------------------------------------------

            const payment =
                await razorpay.payments.fetch(
                    razorpay_payment_id
                );


            // ------------------------------------------------
            // EXPECTED AMOUNT
            // ------------------------------------------------

            const expectedPrice =
                getProductPrice(
                    localOrder.category,
                    localOrder.selectedItem
                );


            if (
                expectedPrice === null
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Product price could not be verified."

                });

            }


            const expectedAmount =
                expectedPrice * 100;


            // ------------------------------------------------
            // VERIFY PAYMENT ORDER ID
            // ------------------------------------------------

            if (
                payment.order_id !==
                localOrder.razorpayOrderId
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Payment order does not match."

                });

            }


            // ------------------------------------------------
            // VERIFY PAYMENT AMOUNT
            // ------------------------------------------------

            if (
                Number(payment.amount) !==
                Number(expectedAmount)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Payment amount does not match the order."

                });

            }


            // ------------------------------------------------
            // VERIFY CURRENCY
            // ------------------------------------------------

            if (
                payment.currency !==
                "INR"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid payment currency."

                });

            }


            // ------------------------------------------------
            // VERIFY CAPTURE STATUS
            // ------------------------------------------------

            if (
                payment.status !==
                "captured"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Payment is not captured yet."

                });

            }


            // ------------------------------------------------
            // MARK ORDER COMPLETED
            // ------------------------------------------------

            db.prepare(`

                UPDATE orders

                SET
                    status = 'completed',
                    razorpay_payment_id = ?

                WHERE id = ?

            `).run(

                razorpay_payment_id,

                numericOrderId

            );


            // ------------------------------------------------
            // SUCCESS
            // ------------------------------------------------

            return res.json({

                success: true,

                price:
                    localOrder.price,

                selectedItem:
                    localOrder.selectedItem,

                paymentId:
                    razorpay_payment_id,

                message:
                    "Payment verified successfully."

            });

        }

        catch (error) {

            console.error(
                "Payment verification error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Payment verification failed."

            });

        }

    }
);


// ============================================================
// GET ORDERS - ADMIN
// ============================================================

app.get(
    "/api/orders",
    requireAdmin,
    (req, res) => {

        try {

            const orders =
                db.prepare(`

                    SELECT

                        id,

                        email,

                        nickname,

                        selected_item AS selectedItem,

                        price,

                        status,

                        category,

                        razorpay_order_id AS razorpayOrderId,

                        razorpay_payment_id AS razorpayPaymentId,

                        created_at AS createdAt

                    FROM orders

                    ORDER BY id DESC

                `).all();


            return res.json({

                success: true,

                orders

            });

        }

        catch (error) {

            console.error(
                "Get orders error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Database error."

            });

        }

    }
);


// ============================================================
// UPDATE ORDER STATUS - ADMIN
// ============================================================

app.patch(
    "/api/orders/:id/status",
    requireAdmin,
    (req, res) => {

        try {

            const id =
                Number(req.params.id);

            const status =
                String(
                    req.body.status || ""
                ).trim();


            const allowedStatuses = [

                "pending",

                "completed",

                "cancelled"

            ];


            if (
                !Number.isInteger(id) ||
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid request."

                });

            }


            const result =
                db.prepare(`

                    UPDATE orders

                    SET status = ?

                    WHERE id = ?

                `).run(
                    status,
                    id
                );


            if (
                result.changes === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            return res.json({

                success: true,

                message:
                    "Status updated."

            });

        }

        catch (error) {

            console.error(
                "Status update error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Database error."

            });

        }

    }
);


// ============================================================
// DELETE ORDER - ADMIN
// ============================================================

app.delete(
    "/api/orders/:id",
    requireAdmin,
    (req, res) => {

        try {

            const id =
                Number(req.params.id);


            if (
                !Number.isInteger(id)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid order ID."

                });

            }


            const result =
                db.prepare(`

                    DELETE FROM orders

                    WHERE id = ?

                `).run(id);


            if (
                result.changes === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            return res.json({

                success: true,

                message:
                    "Order deleted."

            });

        }

        catch (error) {

            console.error(
                "Delete order error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Database error."

            });

        }

    }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `FF Vault running on port ${PORT}`
        );

    }
);
