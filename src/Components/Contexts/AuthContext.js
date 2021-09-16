import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();
const { Provider } = AuthContext; 

const AuthProvider = ({ children }) => {

    const history = useHistory();

    const cookieName = 'user';

    const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

    const [authState, setAuthState] = useState({});

    const logout = () => {

        setAuthState({});

        removeCookie(cookieName);

        history.push('/');
    };

    const authenticate = () => {
        const toDate = new Date();
        if(cookies[cookieName]) 
        {
            const exp = cookies[cookieName].exp;
            const currentTime = toDate.getTime();
    
            if (exp > currentTime && authState.status) 
            {
    
                return true;
            }
            else if (exp > currentTime && !authState.status) 
            {
    
                const state = cookies[cookieName].value; // load state from cookies           
    
                setAuthState(state);
    
                return true;
            }
            else 
            {
                setAuthState({});
                return false;
            }
        } 
        else 
        {
            return false;
        }
        
    };

    const saveCookie = (value) => {
        const toDate = new Date();

        const exp = toDate.getTime() + (5*60*60 * 1000); //5*60*

        const objCookie = {
            value: value,
            exp: exp
        };
        setCookie(cookieName, JSON.stringify(objCookie));

    }

    const handleRemoveCookie = () => {
        removeCookie(cookieName);
    }

    return (
        <Provider
            value={{
                authState,
                setAuthState,
                cookies,
                saveCookie,
                handleRemoveCookie,
                logout,
                authenticate,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };