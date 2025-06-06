import { useState } from 'react';

const DonateForm = () => {
    const [details, setDetails] = useState({name: '', email: '', amount: ''});

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => alert("Razorpay SDK failed to load");
    script.onload = () => createOrder();
    document.body.appendChild(script);
  };

  const createOrder = async () => {
    const res = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "Website Marker",
      description: "Support Us",
      order_id: data.order_id,
      handler: function (response) {
        alert("Payment Successful!");
      },
      prefill: {
        name: details.name,
        email: details.email,
      },
    };

    const payment = new window.Razorpay(options);
    payment.open();
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Support Website Marker</h2>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        value={details.name}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={details.email}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount in ₹"
        value={details.amount}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
      />
      <button onClick={loadRazorpay} className="btn btn-primary w-full">
        Donate
      </button>
    </div>
  );
};

export default DonateForm;