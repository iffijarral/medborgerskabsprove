import React, { useState, useEffect, useContext } from "react";
import Navbar from 'Components/Navbar';
import Home from 'Components/Home';
import Packages from 'Components/Packages';
import Tests from 'Components/Tests';
import Tips from 'Components/Tips';
import Footer from 'Components/Footer';
import { Route, Switch } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './Styles/Global.css';
import About from 'Components/About';
import TestDetails from 'Components/TestDetails';
import { NavbarProvider } from 'Components/Contexts/NavbarContext';
import { TimerProvider } from 'Components/Contexts/TimerContext';
import { AuthContext } from "Components/Contexts/AuthContext";
import Statistics from "Components/Statistics";
import * as myConstants from 'Constants';
import CheckoutForm from "Components/Payment/CheckoutForm";
import PrivacyPolicy from "Components/PrivacyPolicy";
import CookiesPolicy from "Components/CookiesPolicy";
import ResetPassword from "Components/Auth/ResetPassword";
 

const stripePromise = loadStripe(myConstants.stripeKey);

function App() {
  
  const [timer, setTimer] = useState();

  const auth = useContext(AuthContext);

  useEffect(async () => {

    auth.authenticate();

  }, []);


  console.log(auth.authState);
  return (
    <>
      <NavbarProvider>
        <TimerProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/packages" component={Packages} />
                          
            <Route path="/about/:action" component={About} />
              
            <Route exact path="/tests" component={Tests} />
              
            <Route path="/tests/:testID" component={TestDetails} />
              
            <Route path="/tips" component={Tips} />
                          
            <Route path="/statistics" component={Statistics} />

            <Route path="/resetpassword/:token" component={ResetPassword} />
              
            <Route path="/payment/:packageID">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Route>

            <Route path="/privacypolicy" component={PrivacyPolicy} />

            <Route path="/cookiespolicy" component={CookiesPolicy} />

            <Route component={() => (<div style={{textAlign: 'center'}}>404 Not found, please use menu links </div>)} />

          </Switch>

          <Footer />

          </TimerProvider>
      </NavbarProvider>

    </>

  );
}

export default App;
