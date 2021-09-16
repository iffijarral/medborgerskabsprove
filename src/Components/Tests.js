import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import * as myConstants from 'Constants';
import { useContext } from 'react';
import { AuthContext } from 'Components/Contexts/AuthContext';
import MySnackbar from 'Util/SnackBar';
import 'Styles/Tests.css';

const apiMethod = myConstants.apiUrl + 'tests';

function Tests() {

    const [testsList, setTestsList] = useState([]);

    var authContext = useContext(AuthContext);

    const authState = authContext.authState;

    const history = useHistory();

    // to handle snakkebar
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("");

    useEffect(async () => {

        const response = await axios({ url: apiMethod });

        if (response.data.status) {

            setTestsList(response.data.tests);

        } else {
            return (
                <div> No Data Available</div>
            );
        }

    }, []);

    // handling snakkebar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);

    };
    const showSnakkebar = (severity) => {

        setOpen(true);

        setSeverity(severity);

    }

    var testButtons = [];

    const handleClick = (e, testID, totalTests) => {

        e.preventDefault();

        const id = e.target.id; // it holds the index not database id.

        if (authState.status && id < parseInt(authState.totalTests)) {
            history.push(`/tests/${testID}`);
        }
        else if (id < 1) {
            history.push(`/tests/${testID}`)
        }
        else {
            showSnakkebar('info');
            setMsg('Please purchase or upgrade your package');
        }
    }    

    return (
        <section>
            <div className="tests">
                <h1>Available Tests</h1>
                <div>
                    {
                        testsList.map((test, index) => (
                            <Link
                                to={`/tests/${test.id}`}
                                id={index}
                                key={test.id}                                
                                onClick={(event) => { handleClick(event, test.id, test.totalTests); }}
                            >
                                Test {index + 1}
                            </Link>
                        ))
                    }                    
                </div>
            </div>
            <MySnackbar open={open} handleClose={handleClose} severity={severity} msg={msg} />
        </section>
    );
}

export default Tests;
