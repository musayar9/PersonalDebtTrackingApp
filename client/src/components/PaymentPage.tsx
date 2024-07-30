import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

import PaymentPageDetail from "./PaymentPageDetail";
import useDebtData from "../utils/customHooks";
import Loading from "../pages/Loading";
const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [clientSecret, setClientSecret] = useState("");
  const params = useParams();
  console.log(params);
  const { loading } = useDebtData({ id: params?.debtId });
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
    if (params) {
      const createPayment = async () => {
        try {
          const res = await axios.post("/api/v1/stripe/create-payment", params);
          console.log(res);
          const data = res.data;

          console.log("createPayment data", data);
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.log(error);
        }
      };

      createPayment();
    }
  }, []);

  console.log(stripePromise, "stripe");
  console.log("clientSecret", clientSecret);
  if (loading) {
    return  <div className="flex items-center justify-center h-screen">
      <Loading />;
    </div>;
  }
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="border-b border-gray-200 my-4 p-2">
        <h2 className="text-2xl text-gray-500 font-semibold">Payment Debt</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6  p-4 rounded-md">
          <PaymentPageDetail id={params?.debtId} paymentId={params.paymentId} />
        </div>

        <div className="lg:border-l-2 border-gray-200 lg:col-span-6">
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
