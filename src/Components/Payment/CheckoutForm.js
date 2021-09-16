import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from 'Components/Contexts/AuthContext';
import 'Styles/Stripe.css';
import * as myConstants from 'Constants';
import axios from 'axios';
import imgCard from 'images/cards.png';

export default function CheckoutForm() {

  const { packageID } = useParams();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [packageName, setPackageName] = useState('');
  const [packagePrice, setPackagePrice] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);

  const apiEndpoint = myConstants.apiUrl + 'payment';

  const transactionApiEndpoint = myConstants.apiUrl + 'transaction';

  useEffect(async () => {

    try 
    {
      const userData =
      {
        email: 'email',
        password: 'password'
      }

      const response = await axios({
        url: apiEndpoint,
        method: 'POST',
        data: { packageID: packageID }
      });

      if (response.data) 
      {
        setClientSecret(response.data.clientSecret);
        setPackageName(response.data.packageName);
        setPackagePrice(response.data.amount);        
      }

    } 
    catch (error) 
    {
      console.log(error);
    }
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
          
      // console.log(payload.paymentIntent);
      saveTransaction(payload.paymentIntent);
        
    }
  };

  const saveTransaction = async (payload) => {
    
    const paymentData = {
      userid: auth.authState.id,
      txn_id: payload.id,
      packageid: packageID,
      payment_gross: (payload.amount)/100,
      currency_code: payload.currency,
      payer_email: auth.authState.email,
      payment_status: payload.status
    }    
    
    const response = await axios({
      url: transactionApiEndpoint,
      method: 'POST',
      data: paymentData
    });
    
    if(response.data.status) 
    {
      
      auth.setAuthState(response.data.user);

      auth.saveCookie(response.data.user);

      setError(null);
      setProcessing(false);
      setSucceeded(true); 
    } 
    else 
    {
      setError(`Transaction failed, please try again later. Sorry for inconvenience.`);
      setProcessing(false);
    }
    

  }

  return (
    <section>

      <form id="payment-form" className="stripeForm" onSubmit={handleSubmit}>
        {packageName != '' && <h2 style={{textAlign: 'center'}}>Package: {packageName}</h2>}
        {packagePrice != '' && <h4 style={{ textAlign: 'center', color: '#056aa8'  }}>Amout: {packagePrice / 100} dkk</h4>}        
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, Thank you so much for your purchase.
          Please login again to get access to tests. Thanks

        </p>
        <div className="supportedCards">
          <img src={imgCard} width='15em' alt="supported cards" />
        </div>

      </form>
    </section>
  );
}
