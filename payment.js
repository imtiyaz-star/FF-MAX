document.addEventListener("DOMContentLoaded", async () => {

    const itemName = document.getElementById("itemName");
    const amountEl = document.getElementById("amount");
    const paymentQR = document.getElementById("paymentQR");
    const paymentStatus = document.getElementById("paymentStatus");
    const paidButton = document.getElementById("paidButton");

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (!orderId) {
        itemName.textContent = "Order ID missing";
        amountEl.textContent = "";
        paymentStatus.textContent = "No order ID found.";
        return;
    }

    try {

        const response = await fetch(
            `/api/payment/order/${encodeURIComponent(orderId)}`
        );

        const data = await response.json();

        console.log("Payment API response:", data);

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || `Server error (${response.status})`
            );
        }

        /* PRODUCT NAME */
        itemName.textContent = data.selectedItem;

        /* AMOUNT */
        const amount =
            data.amount ||
            String(data.price || "").replace(/[₹,]/g, "").trim();

        amountEl.textContent = `₹${amount}`;

        /* DYNAMIC QR */
        if (data.qr) {
            paymentQR.src = data.qr;
        } else {
            throw new Error("QR code was not received from server.");
        }

        paymentStatus.textContent =
            "Scan the QR and complete the payment.";

    } catch (error) {

        console.error("Payment page error:", error);

        itemName.textContent = "Unable to load order";
        amountEl.textContent = "—";

        paymentStatus.textContent =
            error.message || "Something went wrong.";

        if (paymentQR) {
            paymentQR.removeAttribute("src");
        }
    }

    /* I HAVE PAID */
    if (paidButton) {

        paidButton.addEventListener("click", () => {

            paymentStatus.textContent =
                "Payment submitted. Waiting for verification.";

            paidButton.disabled = true;

        });

    }

    /* =========================
   2 MINUTE PAYMENT TIMER
========================= */

let timeLeft = 120;

const timerEl = document.getElementById("timer");

const paymentTimer = setInterval(() => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if (timerEl) {
        timerEl.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    if (timeLeft <= 0) {

        clearInterval(paymentTimer);

        if (timerEl) {
            timerEl.textContent = "00:00";
        }

        /* Disable paid button */
        const paidButton =
            document.getElementById("paidButton");

        if (paidButton) {
            paidButton.disabled = true;
        }

        /* Go back to HOME */
        setTimeout(() => {
            window.location.href = "/";
        }, 500);

        return;
    }

    timeLeft--;

}, 1000);

});