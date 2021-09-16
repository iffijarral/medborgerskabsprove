import React, { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { resetPasswordSchema } from 'Components/Validation/ResetpasswordValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import MySnackbar from 'Util/SnackBar';
import * as myConstants from 'Constants';
import 'Styles/Auth.css';
import 'Styles/Navbar.css';
import axios from 'axios';

const apiUrl = myConstants.apiUrl+'changePassword';


export default function ResetPassword() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);    
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");

    const { token } = useParams(); // Retrieve token sent by server
    
    const history = useHistory();    
    
    let firstref = useRef('');

    // This is for validation 
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(resetPasswordSchema),
    });    

    // This is to handle snakkebar for msgs.
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        
        if(severity === 'success') {
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
            token   : token, // extracted from useParams hook. Sent from resetPassword.php in server                                  
            password: e.target.password.value
        }
        
        try {
            const response = await axios({
                url: apiUrl,                
                method: 'POST',
                data: userData
            });
            
            if (response.data.status) {
                               
                showSnakkebar('success');

                setMsg(response.data.message);
                
            } else {
                
                setMsg(response.data.message);

                showSnakkebar('error');
            }           
            
        } catch (error) {
            console.log(error);
        }


    };
  
    
    return (
        <div className="authContainer">            

            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
                <h2 style={{textAlign: 'center'}}>Reset Password </h2>
                
                <TextField
                    error={errors.password ? true : false}
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    helperText={errors.password?.message}

                    {...register("password")}             
                />

                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />
                
                <Button variant="outlined" className="btnLogin" type="submit" >{loading ? <CircularProgress /> : 'Reset Password'}</Button>

                <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />                

            </form>
        </div>
    );
}