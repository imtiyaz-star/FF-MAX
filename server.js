const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const session = require("express-session");
const QRCode = require("qrcode");

const app = express();

const PORT = process.env.PORT || 3000;

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD ||
    "change-this-password";

const SESSION_SECRET =
    process.env.SESSION_SECRET ||
    "change-this-session-secret";


/* =========================
   DATABASE
========================= */

const dbPath = path.join(__dirname, "ff-vault.db");

const db = new Database(dbPath);

console.log("Database connected");


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


/* =========================
   SERVER PRICE LIST
========================= */

const PRODUCT_PRICES = {

    /* RARE */

    "Arctic Blue Bundle": "₹149",
    "Zombie Samurai": "₹199",
    "Knight Clown": "₹149",
    "Angelic Bundle": "₹199",
    "Bunny Warrior": "₹199",
    "Galaxy Dino": "₹179",
    "HipHop Bundle": "₹200",
    "Old Bundle": "₹149",
    "Sakura Bundle": "₹199",


    /* CRIMINAL */

    "Red Criminal": "₹199",
    "Blue Criminal": "₹149",
    "Green Criminal": "₹199",
    "Purple Criminal": "₹199",
    "Yellow Criminal": "₹199",
    "Black Criminal": "₹249",


    /* DINO */

    "Green Dino": "₹199",
    "Blue Dino": "₹199",
    "Pink Dino": "₹99",
    "Yellow Dino": "₹199",


    /* GUNS */

    "AK47 EVO Gun": "₹249",
    "M1014 EVO Gun": "₹199",
    "XM8 EVO Gun": "₹199",
    "MP40 EVO Gun": "₹249",
    "GROZA EVO Gun": "₹149",
    "M4A1 EVO Gun": "₹149",
    "P90 EVO Gun": "₹199",
    "UMP EVO Gun": "₹149",

    "AK47 Rare Skin": "₹149",
    "M4A1 Rare Skin": "₹149",
    "SCAR Old Fashion": "₹149",
    "XM8 Livey Beast": "₹99",
    "AN94 BOOYAH": "₹149",
    "Groza Heartseeker": "₹149",

    "PARAFAL Sickly Sweet": "₹139",
    "MP40 Red Poker": "₹199",
    "MP5 Old Fashion": "₹139",
    "UMP Lively Beast": "₹149",
    "P90 Old Fashin": "₹199",
    "Thompson Lucky Koi": "₹149",

    "M1014 Underground Howl": "₹115",
    "M1887": "₹199",
    "MAG-7": "₹69",
    "SPAS12": "₹110",

    "AWM Old Fashion": "₹149",
    "Kar98k Great Plunder": "₹129",
    "M82B Dragon Mob": "₹120",
    "SVD Swordsman Legends": "₹99",

    "M249 Fire Bones": "₹99",
    "AC80": "₹139",
    "M60 Lively Beast": "₹115",

    "Desert Eagle Ornamenal Touch": "₹79",
    "G18 Persia Prowess": "₹69",
    "USP Rare Skin": "₹59",


    /* EMOTES */

    "LOL EMOTE": "₹249",
    "DEVIL MOVE": "₹249",
    "ROSE EMOTE": "₹149",
    "PIRATE FLAG": "₹149",
    "I HEART YOU": "₹110",
    "FFWC EMOTE": "₹199",
    "CAR EMOTE": "₹199",
    "PUSH-UP EMOTE": "₹199",
    "HIGH FIVE": "₹149",
    "MONEY GUN": "₹179",
    "SELFIE": "₹149",
    "PUSHPA RAAJ": "₹179",
    "MUMMY DANCE": "₹115",
    "CHAIR EMOTE": "₹179",


    /* ENTRY EMOTES */

    "LAMBOHGINI RIDER": "₹199",
    "TORNADO": "₹249",
    "OVER-CHARGE": "₹199",
    "DRAGON RIDE": "₹149",
    "HORSE RIDE": "₹179",
    "WOLF ZAP": "₹189",
    "CARPET": "₹199",
    "ENTRY EMOTE": "₹149",


    /* GLOO */

    "AZURE Dragon Gloo Wall": "₹79",
    "Cobra Gloo Wall": "₹99",
    "ROARING PROTECTOR": "₹99",
    "Demon SLAYER": "₹149",
    "MINI GLOO WALL": "₹199",
    "SPIRIT GLOO WALL": "₹179",
    "NUTTY QUIRK": "₹149",
    "DRAGON SHIELD": "₹179",


    /* GRENADE */

    "Explosive Brick": "₹99",
    "Pumpkin Bomb": "₹99",
    "Pineapple Fizz": "₹99",
    "Egg Grenade": "₹99",


    /* DIAMONDS */

    "1,000 Diamonds": "₹60",
    "10,000 Diamonds": "₹149",
    "20,000 Diamonds": "₹400",
    "50,000 Diamonds": "₹500"

};


/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

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
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);


app.use(express.static(__dirname));


/* =========================
   HOME
========================= */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


/* =========================
   ADMIN MIDDLEWARE
========================= */

function requireAdmin(req, res, next) {

    if (req.session && req.session.isAdmin) {

        return next();

    }

    return res.status(401).json({

        success: false,

        message: "Unauthorized"

    });

}

/* =========================
   PAYMENT PAGE ORDER + DYNAMIC QR
========================= */

app.get("/api/payment/order/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const order = db.prepare(`
            SELECT
                id,
                selected_item AS selectedItem,
                price
            FROM orders
            WHERE id = ?
        `).get(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        /* ₹199 -> 199.00 */
        const amount = Number(
            String(order.price).replace(/[₹,]/g, "").trim()
        );

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(500).json({
                success: false,
                message: "Invalid payment amount"
            });
        }

        /* UPI payment URL */
        const upiUrl =
            `upi://pay?pa=mdmtiyaz562@okhdfcbank` +
            `&pn=FF%20Vault` +
            `&am=${amount.toFixed(2)}` +
            `&cu=INR`;

        /* Generate QR */
        const qr = await QRCode.toDataURL(upiUrl, {
            width: 500,
            margin: 2
        });

        return res.json({
            success: true,
            orderId: order.id,
            selectedItem: order.selectedItem,
            price: order.price,
            amount: amount.toFixed(2),
            qr: qr
        });

    } catch (error) {

        console.error("Payment QR error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

});


/* =========================
   ADMIN LOGIN
========================= */

app.post("/api/admin/login", (req, res) => {

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

            message: "Login successful"

        });

    }


    return res.status(401).json({

        success: false,

        message: "Invalid username or password"

    });

});


/* =========================
   ADMIN LOGOUT
========================= */

app.post(
    "/api/admin/logout",
    requireAdmin,
    (req, res) => {

        req.session.destroy(() => {

            res.json({

                success: true

            });

        });

    }
);


/* =========================
   CREATE ORDER
========================= */

app.post("/api/orders", (req, res) => {

    try {

        const {
            email,
            nickname,
            selectedItem
        } = req.body;


        if (
            !email ||
            !nickname ||
            !selectedItem
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email, nickname and item are required."

            });

        }


        const cleanEmail =
            String(email).trim();

        const cleanNickname =
            String(nickname).trim();

        const cleanItem =
            String(selectedItem).trim();


        /*
            IMPORTANT:

            Client ki bheji hui price ko
            ab trust nahi kiya ja raha.

            Server khud product ki price
            PRODUCT_PRICES se nikal raha hai.
        */

        const lockedPrice =
            PRODUCT_PRICES[cleanItem];


        if (!lockedPrice) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid product."

            });

        }


        const insert = db.prepare(`
            INSERT INTO orders
            (
                email,
                nickname,
                selected_item,
                price,
                status
            )
            VALUES
            (?, ?, ?, ?, 'pending')
        `);


        const result = insert.run(

            cleanEmail,

            cleanNickname,

            cleanItem,

            lockedPrice

        );


        return res.json({

            success: true,

            orderId: result.lastInsertRowid,

            price: lockedPrice,

            selectedItem: cleanItem,

            message: "Order created successfully"

        });

    }

    catch (error) {

        console.error(
            "Create order error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: "Database error"

        });

    }

});


/* =========================
   GET ORDERS
========================= */

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
                        created_at AS createdAt
                    FROM orders
                    ORDER BY id DESC
                `)
                .all();


            res.json({

                success: true,

                orders

            });

        }

        catch (error) {

            console.error(
                "Get orders error:",
                error
            );


            res.status(500).json({

                success: false,

                message: "Database error"

            });

        }

    }
);


/* =========================
   UPDATE ORDER STATUS
========================= */

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

                    message: "Invalid request"

                });

            }


            const result =
                db.prepare(`
                    UPDATE orders
                    SET status = ?
                    WHERE id = ?
                `)
                .run(status, id);


            if (result.changes === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Order not found"

                });

            }


            res.json({

                success: true,

                message: "Status updated"

            });

        }

        catch (error) {

            console.error(
                "Status update error:",
                error
            );


            res.status(500).json({

                success: false,

                message: "Database error"

            });

        }

    }
);


/* =========================
   DELETE ORDER
========================= */

app.delete(
    "/api/orders/:id",
    requireAdmin,
    (req, res) => {

        try {

            const id =
                Number(req.params.id);


            if (!Number.isInteger(id)) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid order ID"

                });

            }


            const result =
                db.prepare(`
                    DELETE FROM orders
                    WHERE id = ?
                `)
                .run(id);


            if (result.changes === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Order not found"

                });

            }


            res.json({

                success: true,

                message: "Order deleted"

            });

        }

        catch (error) {

            console.error(
                "Delete order error:",
                error
            );


            res.status(500).json({

                success: false,

                message: "Database error"

            });

        }

    }
);


/* =========================
   START SERVER
========================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `FF Vault running on port ${PORT}`
        );

    }
);
