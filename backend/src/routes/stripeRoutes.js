const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  stripeWebhook,
} = require("../controllers/stripeController");
const auth = require("../middleware/authMiddleware");

// checkout route (logged-in users only; the webhook below must stay public)
router.post("/create-checkout-session", auth, createCheckoutSession);

// webhook route
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

module.exports = router;
