import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getStripeConfig = async () => {
      try {
        const res = await axios.get("/api/v1/stripe");
        const data = await res.data;
        console.log("data", data);
        const stripe = await loadStripe(data?.publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        console.log(error);
      }
    };

    getStripeConfig();
  }, []);

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await axios.post("/api/v1/stripe/create-payment");
        console.log(res, );
        const data =  res.data;

        console.log("createPayment data", data);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    createPayment();
  }, []);

  console.log(stripePromise, "stripe");
  console.log("clientSecret", clientSecret);
  return (
    <div className="w-full ">
      <div className="border-b border-slate-400 m-4 p-2">
        <h2 className="text-2xl text-gray-400">Payment Debt</h2>
      </div>
      <div className="max-w-2xl mx-auto ">
        <div className="flex items-center justify-center">
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
