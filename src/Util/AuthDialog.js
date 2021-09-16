import React, { useState, useEffect } from "react";
import ChangePasswordDialog from 'Components/Auth/ChangePassword';
import LoginDialog from 'Components/Auth/Login';
import RegisterDialog from 'Components/Auth/Register';
import ForgotPasswordDialog from 'Components/Auth/ForgotPassword';

export default function AuthDialog(props) {

    //Change Password Dialog
    const [changePasswordState, setChangePasswordState] = useState(false);

    //login dialog
    const [loginDialog, setLoginDialogState] = useState(props.handleopen);

    //Register Dialog
    const [registerDialog, setRegisterDialogState] = useState(false);

    //Forgot Password
    const [forgotPasswordDialog, setForgotPasswordDialogState] = useState(false);
    
    const handleForgotPasswordDialog = () => {
        setForgotPasswordDialogState(true);
        setLoginDialogState(false);
    }

    const handleRegisterDialogOpen = () => {
        setRegisterDialogState(true);
        setLoginDialogState(false);
    }

    const handleLoginDialog = () => {
        setLoginDialogState(!loginDialog);
    }

    const handleRegisterDialogClose = () => {
        setRegisterDialogState(false);
    }

    return (
        <>
            <LoginDialog open={loginDialog} openForgotPasswordDialog={handleForgotPasswordDialog} openRegisterDialog={handleRegisterDialogOpen} onClick={handleLoginDialog} />
            {/* <RegisterDialog open={registerDialog} openLoginDialog={handleLoginDialog} onClick={handleRegisterDialogClose} /> */}
            {/* <ForgotPasswordDialog open={forgotPasswordDialog} openLoginDialog={handleLoginDialogState} onClick={handleForgotPasswordDialog} />
            <ChangePasswordDialog open={changePasswordState} onClick={handleChangeClosePasswordDialog} /> */}
        </>
    );
}


