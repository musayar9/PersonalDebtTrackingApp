import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import { MdErrorOutline } from "react-icons/md";
import {useTranslation} from "react-i18next";
import api from "../utils/api";

interface CheckoutFormProps {
  debtId: string | undefined;
  paymentId: string | undefined;
}

const CheckoutForm = ({ debtId, paymentId }: CheckoutFormProps) => {
 const {t} = useTranslation()
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message || errMsg) {
      setTimeout(() => {
        setMessage("");
        setErrMsg("");
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsProcessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: "if_required",
      });

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const res = await api.patch(
          `/v1/debt/paymentDebt/${debtId}/${paymentId}`
        );
        const data = await res.data;

        navigate("/success");
        setMessage(`${paymentIntent.status + data.message}`);
      } else if (error) {
        setMessage(error.message);
      } else {
        setMessage("an expected errror");
      }

      setIsProcessing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Requested failed");
      }
    }
  };

  return (
    <form
      id=""
      className="border border-[#f6f9fc ] m-5 rounded-md p-5"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={{ layout: "tabs" }}  />

      <button
        className="px-6 py-2 text-sm  rounded-full bg-orange-500 text-gray-50 hover:bg-orange-600 ease-linear duration-150"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ?
              <div className="flex items-center justify-center gap-2">
            <span className="loading loading-infinity loading-xs"></span>

          </div>: <>{t("complete_payment")}</>}
        </span>
      </button>
      {message && (
        <div className="px-4 py-2 my-4 bg-primary  rounded-md">
          {message}
        </div>
      )}

      {errMsg && (
        <AlertMessage
          icon={<MdErrorOutline />}
          message={errMsg}
          color="bg-red-500"
        />
      )}
    </form>
  );
};

export default CheckoutForm;
