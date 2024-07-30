import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, {  useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>("");
  const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    
//         if (!paymentIntent) {
//           setMessage("Something went wrong.");
//           return;
//         }
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

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
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"  />

      <button className="btn btn-primary" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
