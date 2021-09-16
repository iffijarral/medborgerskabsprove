import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavbarContext } from 'Components/Contexts/NavbarContext';
import MailtoButton from 'Util/MailtoButton';

export default function Footer() {

    var contextNavbar = useContext(NavbarContext);
        
    const navbarType = contextNavbar.navbar;

    return (
        <> 
            {navbarType && 
            <div className="footer">
                <div>
                    <ul>
                        <li>
                            <Link to="/privacypolicy"> Privacy Policy </Link>
                        </li>
                        <li>
                            <Link to="/cookiespolicy"> Cookies Policy </Link>
                        </li>                        
                        <li>
                            <MailtoButton label="admin@medborgerskabsprove.dk" mailto="mailto:admin@medborgerskabsprove.dk" />                            
                        </li>                        
                    </ul>
                </div>                             

            </div>
            }
        </>
    );
}

