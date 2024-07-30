import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("paymetn statsu " + paymentIntent.status + " 123");
    } else {
      setMessage("an expected errror");
    }

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occured.");
    // }

    setIsProcessing(false);
  };

  return (
    <form
      id=""
      className="border border-[#f6f9fc ] m-5 rounded-md p-5"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <button
        className="px-4 py-2 rounded-md bg-orange-500 text-gray-50 hover:bg-orange-400 ease-linear duration-150"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div className="px-4 py-2 my-4 bg-primary text-white rounded-md">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
