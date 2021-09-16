import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpeedDial from '@material-ui/lab/SpeedDial';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ChangePasswordDialog from 'Components/Auth/ChangePassword';
import LoginDialog from 'Components/Auth/Login';
import RegisterDialog from 'Components/Auth/Register';
import ForgotPasswordDialog from 'Components/Auth/ForgotPassword';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from 'Components/Contexts/AuthContext';
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "Util/DeviceSize";

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },

    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(-2),
        height: 0,
    },
    
    buttonClass: {
        backgroundColor: '#056aa8',        
        minHeight: 0,
        width: '40px',
        height: '40px',
        "&:hover": {
            backgroundColor: 'salmon',
        }
    },
    mobileButtonClass: {
        backgroundColor: '#056aa8',        
        minHeight: 0,
        width: '30px',
        height: '30px',
        "&:hover": {
            backgroundColor: 'salmon',
        }
    },
       
}));

export default function SpeedDials() {
    
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    var authContext = useContext(AuthContext);

    const authState = authContext.authState;    

    const history = useHistory();

    //Change Password Dialog
    const [changePasswordState, setChangePasswordState] = useState(false);

    //login dialog
    const [loginDialog, setLoginDialogState] = useState(false);

    //Register Dialog
    const [registerDialog, setRegisterDialogState] = useState(false);

    //Forgot Password
    const [forgotPasswordDialog, setForgotPasswordDialogState] = useState(false);

    const handleChangeClosePasswordDialog = () => {

        setChangePasswordState(false);

        handleClose();
    };

    const handleLoginCloseDialog = () => {

        setLoginDialogState(false);

        handleClose();
    };

    const handleRegisterDialogClose = () => {

        setRegisterDialogState(false);

        handleClose();
    };

    const handleRegisterDialogOpen = () => {

        setRegisterDialogState(true);

        handleLoginCloseDialog();
    };

    const handleLoginDialogState = () => {

        if(loginDialog) 
            setLoginDialogState(false);
        else
            setLoginDialogState(true);

        setRegisterDialogState(false);

        setForgotPasswordDialogState(false);
        
    }

    const handleForgotPasswordDialog = () => {
        
        if (forgotPasswordDialog) 
        {            
            setForgotPasswordDialogState(false);
        }            
        else 
        {            
            setForgotPasswordDialogState(true);
        }
            
        setLoginDialogState(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAction = (event, action) => {

        if (action === 'Change Password') 
        {
            setOpen(false);
            setChangePasswordState(true);

        }
        else if (action === 'Login') 
        {
            setOpen(false);
            setLoginDialogState(true);
        }
        else if (action === 'Register') 
        {
            setOpen(false);
            setRegisterDialogState(true);
        }
        else if(action === 'Statistics') 
        {
            
            history.push('/statistics');
        }
        else if(action === 'Logout') 
        {
            setOpen(false);
            authContext.logout();
        }
    }

    let actions;

    if (authState.status) 
    {
        actions = [
            { icon: <EditOutlinedIcon />, name: 'Change Password' },
            { icon: <TableChartOutlinedIcon />, name: 'Statistics' },
            { icon: <LockOutlinedIcon />, name: 'Logout' },
        ];
    }
    else 
    {
        actions = [
            { icon: <LockOpenIcon />, name: 'Login' },
            { icon: <PersonAddOutlinedIcon />, name: 'Register' },
        ];
    }

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <div className={classes.root}>

            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"                    
                    classes={{ fab: isMobile ? classes.mobileButtonClass : classes.buttonClass }}
                    icon={<AccountCircleIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction='down'

                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={(event) => { handleAction(event, action.name); }}
                        />
                    ))}
                </SpeedDial>
                <LoginDialog open={loginDialog} openForgotPasswordDialog={handleForgotPasswordDialog} openRegisterDialog={handleRegisterDialogOpen} onClick={handleLoginCloseDialog} toLocation='/' />
                <RegisterDialog open={registerDialog} openLoginDialog={handleLoginDialogState} onClick={handleRegisterDialogClose} toLocation="/" />
                <ForgotPasswordDialog open={forgotPasswordDialog} openLoginDialog={handleLoginDialogState} onClick={handleForgotPasswordDialog} />
                <ChangePasswordDialog open={changePasswordState} onClick={handleChangeClosePasswordDialog} />

            </div>
        </div>
    );
}
