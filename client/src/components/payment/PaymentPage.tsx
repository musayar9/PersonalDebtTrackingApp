import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useParams } from "react-router-dom";
import useDebtData from "../../utils/customHooks";
import Loading from "../../pages/Loading";
import CheckoutForm from "../CheckoutForm";
import PaymentPageDetail from "./PaymentPageDetail";
import ErrorMessage from "../../pages/ErrorMessage";
import api from "../../utils/api";

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const [clientSecret, setClientSecret] = useState("");
  const params = useParams();
  const [errMsg, setErrMsg] = useState("");
  const { loading } = useDebtData({ id: params?.debtId });
  useEffect(() => {
    const getStripeConfig = async () => {
      try {
        const res = await api.get("/v1/stripe");
        const data = await res.data;

        const stripe = await loadStripe(data?.publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrMsg(error.message);
        } else {
          setErrMsg("Request Failed");
        }
      }
    };

    getStripeConfig();
  }, []);

  useEffect(() => {
    if (params) {
      const createPayment = async () => {
        try {
          const res = await api.post("/v1/stripe/create-payment", params);

          const data = res.data;

          setClientSecret(data.clientSecret);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setErrMsg(error.message);
          } else {
            setErrMsg("Request Failed");
          }
        }
      };

      createPayment();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="border-b border-gray-200 my-4 p-2">
        <h2 className="text-2xl text-gray-500 font-semibold">
          Payment Information
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-8">
        <div className="lg:col-span-3 p-4 rounded-md">
          <PaymentPageDetail id={params?.debtId} paymentId={params.paymentId} />
        </div>

        <div className="lg:border-l-2 border-gray-200 lg:col-span-5 my-8 ">
          {clientSecret && stripePromise && (
            <>
              <p className="mt-3 text-sm pl-6  text-slate-600">
                You can make your payment safely using Debit or Credit Card.
              </p>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  debtId={params.debtId}
                  paymentId={params.paymentId}
                />
              </Elements>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
