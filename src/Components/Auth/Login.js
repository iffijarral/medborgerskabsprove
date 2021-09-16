import React, { useState, useRef, useContext } from "react";
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import { userSchema } from 'Components/Validation/UserValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from 'Components/Contexts/AuthContext';
import MySnackbar from 'Util/SnackBar';
import * as myConstants from 'Constants';
import 'Styles/Auth.css';
import 'Styles/Navbar.css';
import axios from 'axios';

const apiMethod = myConstants.apiUrl+'login';


export default function LoginDialog(props) {

    const [loginLoading, setLoginLoading] = useState(false);
    const [redirectOnLogin, setRedirectOnLogin] = useState(false);

    // Following three statements are to control snakkebar
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");

    const authContext = useContext(AuthContext);    

    let firstref = useRef('');
    let formRef = useRef('');
    // This is for validation 
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(userSchema),
    });

    // This is to handle snakkebar for msgs.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') 
        {
            return;
        }
        setOpen(false);        
    };
    const showSnakkebar = (severity) => {

        setOpen(true);

        setSeverity(severity);

    }

    // Submit form data to api 
    const submitForm = async (formData, e) => {

        // Following part is executed when validation is passed.        

        const userData =
        {
            email: e.target.email.value,
            password: e.target.password.value
        }
        
        try 
        {

            setLoginLoading(true);

            const response = await axios({
                url: apiMethod,
                method: 'POST',
                data: userData
            });                        
                        
            if (response.data.status) 
            {                                

                authContext.setAuthState(response.data.user);

                authContext.saveCookie(response.data.user);

                setLoginLoading(false);

                handleDialogClose(); // To close dialog

                setRedirectOnLogin(true);
                // setTimeout(() => {
                //     setRedirectOnLogin(true);
                // }, 700);

            } 
            else 
            {                
                showSnakkebar('error');
                setMsg(response.data.message);
                setLoginLoading(false);
            }

            firstref.current.value = "";
            firstref.current.focus();

        } catch (error) {
            console.log(error);
        }


    };
    const handleDialogClose = () => {

        formRef.current.reset();        

        props.onClick(); // to close dialog
    }

    const handleSiblingDialogs = (e, action) => {

        e.preventDefault();

        if (action === 'register')
            props.openRegisterDialog();
        else
            props.openForgotPasswordDialog();
    }
    return (

        <>
            {redirectOnLogin && <Redirect to={props.toLocation ? props.toLocation : '/'} />}

            <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
                    Login
                    <div className="closeDialog">
                        <HighlightOffIcon onClick={props.onClick}  />
                    </div>
                </DialogTitle>
                <DialogContent>

                    <div className="authContainer">
                        <form ref={formRef} onSubmit={handleSubmit(submitForm)} autoComplete="off">
                            <TextField
                                error={errors.email ? true : false}
                                name="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                autoFocus
                                helperText={errors.email?.message}

                                {...register("email")}
                            />

                            <TextField

                                error={errors.password ? true : false}
                                inputRef={firstref}
                                name="password"
                                id="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                helperText={errors.password?.message}
                                {...register("password")}
                            />

                            <Button variant="outlined" className="btnLogin" type="submit" >{loginLoading ? <CircularProgress /> : 'Login'} </Button>

                            <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />

                            <div className="register">
                                <Link
                                    to="#"
                                    className="forgot-password"
                                    onClick={(event) => { handleSiblingDialogs(event, 'forgotPassword'); }}
                                >
                                    Forgot Password ?

                                </Link>
                                <Link
                                    to="#"
                                    onClick={(event) => { handleSiblingDialogs(event, 'register'); }}
                                >
                                    Register here
                                </Link>
                            </div>

                        </form>
                    </div>
                </DialogContent>
                
            </Dialog>
        </>
    );
}