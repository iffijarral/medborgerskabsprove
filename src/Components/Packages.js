import React, { useState, useEffect } from 'react';
import MyPackage from 'Components/SubComponents/MyPackage';
import axios from 'axios';
import * as myConstants from 'Constants';
import 'Styles/Packages.css';

export default function Packages() {
    const [loading, setLoading] = useState(false);
    const [packagesList, setPackagesList] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const apiEndpoint = myConstants.apiUrl + 'packages';

    useEffect(async () => {
        try 
        {
            setLoading(true);

            const response = await axios({
                url: apiEndpoint,
                method: 'GET',
            });
            
            setLoading(false);
            console.log(response.data);
            if (response.data.status) 
            {
                setPackagesList(response.data.packages);
            }
            else
            {
                setError(true);

                setErrorMsg(response.data.message);
            }

        }
        catch (error) 
        {
            console.log(error);
            setError(true);
                
            setErrorMsg(error);
        }
    }, []);    

    return (
        <section>
            <h1>Packages</h1>
            <div className="container">
                {
                    !error ?
                    packagesList.map((data, index) => (
                        <MyPackage key={index} {...data} />
                    ))
                    :
                    <div> {errorMsg} </div>
                }                
            </div>
        </section>
    );
}