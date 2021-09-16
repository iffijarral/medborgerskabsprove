import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'Styles/Packages.css';
import { useContext } from 'react';
import { AuthContext } from 'Components/Contexts/AuthContext';
import { useHistory } from "react-router-dom";
import LoginDialog from 'Components/Auth/Login';
import RegisterDialog from 'Components/Auth/Register';
import ForgotPasswordDialog from 'Components/Auth/ForgotPassword';

export default function MyPackage(props) {

    const auth = useContext(AuthContext);    

    const history = useHistory();    

    //login dialog
    const [loginDialog, setLoginDialog] = useState(props.handleopen);

    //Register Dialog
    const [registerDialog, setRegisterDialog] = useState(false);

    //Forgot Password
    const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);

    const [toLocation, setToLocation] = useState('');
    
    const handleLoginForgotPasswordDialog = () => {

        setForgotPasswordDialog(!forgotPasswordDialog);

        setLoginDialog(!loginDialog);
    }

    const handleLoginRegisterDialog = () => {

        setRegisterDialog(!registerDialog);

        setLoginDialog(!loginDialog);
    }

    const handleDialogClose = () => {

        setRegisterDialog(false);

        setLoginDialog(false);

        setForgotPasswordDialog(false);

    }

    const handleClick = (e, packageID) => {
                
        e.preventDefault();

        if(auth.authState.status) 
        {
            history.push(`/payment/${packageID}`);            
        } 
        else 
        {
            setToLocation(`/payment/${packageID}`); // Redirect to given route after login.

            setLoginDialog(true);
            
        }        
    }
     
    
    return (
        <div className="card">
            <div className="cardHeading">
                <span className="priceTag">Fra {Number(props.price)},-</span>
                <h2>{props.name}</h2>
            </div>

            <ul>
                <li>
                   <h2> Days {props.duration} </h2>
                </li>
                <li>
                   <h2> Tests {props.numberOfTests} </h2>
                </li>
            </ul>
            
            <Link 
                to='#' 
                onClick = { (e) => {
                    handleClick(e, props.id);                    
                }

                } 
            >
                Get It
            </Link>
            <LoginDialog open={loginDialog} openForgotPasswordDialog={handleLoginForgotPasswordDialog} openRegisterDialog={handleLoginRegisterDialog} onClick={handleDialogClose} toLocation={toLocation} />
            <RegisterDialog open={registerDialog} openLoginDialog={handleLoginRegisterDialog} onClick={handleDialogClose} toLocation={toLocation} /> 
            <ForgotPasswordDialog open={forgotPasswordDialog} openLoginDialog={handleLoginForgotPasswordDialog} onClick={handleDialogClose} />            
        </div>
    );
}
