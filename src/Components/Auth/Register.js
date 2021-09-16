import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import { userRegisterSchema } from 'Components/Validation/RegisterFormValidation';
import { AuthContext } from 'Components/Contexts/AuthContext';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MySnackbar from 'Util/SnackBar';
import * as myConstants from 'Constants';
import 'Styles/Auth.css';
import axios from 'axios';

const apiUrl = myConstants.apiUrl + 'register';

export default function RegisterDialog(props) {

    const history = useHistory();    
    
    const [open, setOpen] = useState(false);
    
    const [severity, setSeverity] = useState("success");
    
    const [msg, setMsg] = useState("");

    let formRef = useRef('');

    const authContext = useContext(AuthContext);    

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(userRegisterSchema),
    });

    // This is to handle snakkebar for msgs.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

        if (severity === 'success') {

            handleDialogClose();

            if(props.toLocation)
                history.push(props.toLocation);
            else
                // history.push("/");
                window.location.reload();
        }
    };
    const showSnakkebar = (severity, message) => {

        setOpen(true);

        setSeverity(severity);

        setMsg(message);
    }

    // Data handler on form submit
    const submitForm = async (data, e) => { //data contains form fields values                

        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: '' + e.target.phone.value,
            password: e.target.password.value
        }

        try {
            const response = await axios(
                {
                    url: apiUrl,
                    method: 'POST',
                    data: userData
                });
            
            if (response.data.status) 
            {                                 

                authContext.setAuthState(response.data.user);

                authContext.saveCookie(response.data.user);

                const msg = props.toLocation ? response.data.message : response.data.message+' Please login to proceed.';
                
                showSnakkebar('success', msg);

            } 
            else 
            {

                showSnakkebar('error', response.data.message);
            }

        } 
        catch (error) 
        {
            console.log(error);
        }

    };

    const handleDialogClose = () => {
        
        formRef.current.reset();

        // formRef.setErrors(null);

        props.onClick(); // to close dialog
    };

    const handleSiblingDialogs = (e) => {

        e.preventDefault();

        props.openLoginDialog();
    }

    return (
        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
                Register New User
                <div className="closeDialog">
                    <HighlightOffIcon onClick={handleDialogClose} />
                </div>
            </DialogTitle>
            <DialogContent>
                
                <div className="authContainer">
                    <form ref={formRef} onSubmit={handleSubmit(submitForm)} autoComplete="off">
                        <TextField
                            id="name"
                            name="name"
                            label="Full name"
                            variant="outlined"
                            autoFocus
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                            {...register("name")}
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                            {...register("email")}
                        />
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            error={errors.phone ? true : false}
                            helperText={errors.phone?.message}
                            {...register("phone")}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                            {...register("password")}
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="ConfirmPassword"
                            variant="outlined"
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />

                        <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />
                        <Button variant="outlined" className="btnLogin" type="submit" >Register</Button>
                        <div className="register">
                            <p>Do you have an account? <Link to="#" onClick={handleSiblingDialogs}> Login here</Link> </p>
                        </div>

                    </form>
                </div>
            </DialogContent>
            
        </Dialog>
    );
}