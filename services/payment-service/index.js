import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/razorpay", async (req, res) => {
  const { amount } = req.body;

  const payment = await razorpay.orders.create({
    amount: parseInt(amount) * 100,
    currency: "INR",
    receipt: "receipt#1",
  });

  res.json({
    key: process.env.RAZORPAY_KEY_ID,
    amount: payment.amount,
    order_id: payment.id,
  });
});

app.listen(5000, () => console.log("Razorpay backend running on port 5000"));