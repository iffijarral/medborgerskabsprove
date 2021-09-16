import React, { useState, useRef, useContext } from 'react';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { changePasswordSchema } from 'Components/Validation/ChangePasswordValidation';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import MySnackbar from 'Util/SnackBar';
import * as myConstants from 'Constants';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import 'Styles/Auth.css';
import { AuthContext } from 'Components/Contexts/AuthContext';

export default function ChangePasswordDialog(props) {

    const [loading, setLoading] = useState(false);
    const [redirectOnPasswordChanged, setRedirectOnPasswordChanged] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [snakkebarState, setSnakkebarState] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");

    let firstref = useRef('');
    let formRef = useRef('');        

    // To get logged user data
    var contextUser = useContext(AuthContext);
    const authState = contextUser.authState;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') 
        {
            return;
        }
        setOpen(false);        

        if(severity === 'success') 
        {
            handleDialogClose();

            setRedirectOnPasswordChanged(true);
        }
        
    };
    const showSnakkebar = (severity) => {

        setOpen(true);

        setSeverity(severity);        

    };

    // This is for validation 
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(changePasswordSchema),
    });

    // Submit form data to api 
    const submitForm = async (data, e) => {

        if (authState.status) 
        {

            const apiUrl = myConstants.apiUrl + 'newPassword';

            
            const { oldPassword, newPassword } = data;
 
            const passwordData = {                
                oldPassword: e.target.oldPassword.value,
                newPassword: e.target.newPassword.value,
                userID: authState.id,
                email: authState.email
            }

            setLoading(true);

            try 
            {

                const response = await axios({
                    url: apiUrl,
                    method: 'POST',
                    data: passwordData
                });

                setLoading(false);
                
                if (response.data.status) 
                {

                    setMsg(response.data.message);

                    showSnakkebar('success');

                } 
                else 
                {

                    setMsg(response.data.message);

                    showSnakkebar('error');
                }                

            } 
            catch (error) 
            {
                console.log(error);
            }

        }
        else 
        {
            showSnakkebar('info');
            setMsg('You are not logged in');
        }
        
    };

    const handleDialogClose = () => {
        
        formRef.current.reset();        

        props.onClick(); // to close dialog
    }
    return (
        <>
        {redirectOnPasswordChanged && <Redirect to="/" />}

        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
                Change Password
                <div className="closeDialog">
                    <HighlightOffIcon onClick={props.onClick}  />
                </div>
            </DialogTitle>
            <DialogContent>
                
                <div className="authContainer">
                    <form ref={formRef} onSubmit={handleSubmit(submitForm)} autoComplete="off">
                        <TextField
                            autoFocus={true}
                            error={errors.oldPassword ? true : false}
                            inputRef={firstref}
                            name="oldPassword"
                            id="oldPassword"
                            type="password"
                            label="Old Password"
                            variant="outlined"
                            helperText={errors.oldPassword?.message}
                            {...register("oldPassword")}
                        />

                        <TextField

                            id="newPassword"
                            name="newPassword"
                            type="password"
                            label="New Password"
                            variant="outlined"
                            error={errors.newPassword ? true : false}
                            helperText={errors.newPassword?.message}
                            {...register("newPassword")}
                        />

                        <TextField

                            error={errors.confirmPassword ? true : false}
                            inputRef={firstref}
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            helperText={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />
                        <Button variant="outlined" className="btnLogin" type="submit" > {loading ? <CircularProgress /> : 'Change Password' } </Button>
                        <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
        </>

    );
}
