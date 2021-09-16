import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        backgroundColor: 'salmon',
        color: 'white',
        height: '45px',
        width: '45px',
    }

}));

export default function FloatingActionButton() {
    const classes = useStyles();    

    const history = useHistory();

    const handleClick = () => {
        
        history.push('/tests');
    }

    return (
        <div className={classes.root}>
            <Fab className={classes.fab} aria-label="tests" onClick={handleClick}> 
                Tests
            </Fab>            
        </div>
    );
}