import React, { useState, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { forgotPasswordSchema } from '../Validation/ForgotPasswordValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MySnackbar from 'Util/SnackBar';
import 'Styles/Auth.css';
import 'Styles/Navbar.css';
import axios from 'axios';
import * as myConstants from 'Constants';

const apiUrl = myConstants.apiUrl + 'forgotPassword';

export default function ForgotPasswordDialog(props) {
    
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");        
    
    const history = useHistory();

    let formRef = useRef('');

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(forgotPasswordSchema),
    });

    // This is to handle snakkebar for msgs.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') 
        {
            return;
        }
        setOpen(false);

        if (severity === 'success') //When the task performed successfully, close the dialog and redirect to home
        { 
            handleDialogClose();
            history.push("/");
        }       
    };
    const showSnakkebar = (severity) => {

        setOpen(true);

        setSeverity(severity);

    }

    // Submit form data to api 
    const submitForm = async (data, e) => {                

        const userData = {
            email: e.target.email.value
        }

        try 
        {

            setLoading(true);

            const response = await axios({
                url: apiUrl,
                method: 'POST',
                data: userData
            });            

            setLoading(false);

            if (response.data.status) 
            {
                showSnakkebar('success');

                setMsg(response.data.message);

            } 
            else 
            {
                showSnakkebar('error');

                setMsg(response.data.message);
            }

        } 
        catch (error) 
        {
            console.log(error);
            setLoading(false);
        }


    };

    const handleDialogClose = () => {
        
        formRef.current.reset();        

        props.onClick(); // to close dialog
    }

    const handleSiblingDialogs = (e) => {

        e.preventDefault();

        props.openLoginDialog();
    }
    return (
        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
                Fotgot Password
                <div className="closeDialog">
                    <HighlightOffIcon onClick={props.onClick} className="closeDialog" />
                </div>
            </DialogTitle>
            <DialogContent>

                <div className="authContainer">
                    <form ref={formRef} onSubmit={handleSubmit(submitForm)} autoComplete="off">
                        <TextField
                            error={errors.email ? true : false}
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            color="primary"
                            autoFocus
                            helperText={errors.email?.message}
                            {...register("email")}
                        />

                        <Button variant="outlined" className="btnLogin" type="submit" > {loading ? <CircularProgress /> : 'Send Email'}</Button>                        
                        <div className="register">
                            <Link to="#" onClick={handleSiblingDialogs}>Back to login</Link>
                        </div>

                    </form>
                    <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />
                </div>
            </DialogContent>            
        </Dialog>
    );
}
