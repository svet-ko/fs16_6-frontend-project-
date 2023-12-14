import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { StripeCardElementOptions } from '@stripe/stripe-js';

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe or Elements not yet available.
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      // Card Element not found.
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  
    if (!error && paymentMethod) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id: id,
        });
  
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error ? error.message : "Unknown error");
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button type="submit">Pay</button>
        </form>
      ) : (
        <div>
          <h2>You just bought a sweet spatula congrats this is the best decision of your life</h2>
        </div>
      )}
    </>
  );
}

export default PaymentForm;