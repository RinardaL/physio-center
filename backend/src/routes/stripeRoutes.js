const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  stripeWebhook,
} = require("../controllers/stripeController");

console.log("createCheckoutSession =", createCheckoutSession);
console.log("stripeWebhook =", stripeWebhook);

// checkout route
router.post("/create-checkout-session", createCheckoutSession);

// webhook route
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

module.exports = router;
console.log("stripeWebhook =", stripeWebhook);
