const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3000;

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD || "change-this-password";

const SESSION_SECRET =
    process.env.SESSION_SECRET || "change-this-session-secret";


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
            selectedItem,
            price
        } = req.body;


        if (
            !email ||
            !nickname ||
            !selectedItem ||
            !price
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email, nickname, item and price are required."

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

            String(email).trim(),

            String(nickname).trim(),

            String(selectedItem).trim(),

            String(price).trim()

        );


        return res.json({

            success: true,

            id: result.lastInsertRowid,

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