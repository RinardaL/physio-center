const stripe = require("../config/stripe");
const { Payment } = require("../models");


exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Physio Clinic Payment",
            },
            unit_amount: amount * 100, // cents
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3001/payments?success=true",
      cancel_url: "http://localhost:3001/payments?canceled=true",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.stripeWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      await Payment.update(
        { status: "paid" },
        {
          where: { stripe_payment_id: paymentIntent.id },
        }
      );
    }

    res.json({ received: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};