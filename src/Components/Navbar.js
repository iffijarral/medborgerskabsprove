import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavbarContext } from 'Components/Contexts/NavbarContext';
import SpeedDials from 'Util/SpeedDial';
import { NavLinks } from 'Components/SubComponents/NavLinks';
import { useMediaQuery } from "react-responsive";
import { DeviceSize } from "Util/DeviceSize";
import { MobileNavLinks } from "Components/SubComponents/MobileLinks";
import FloatingActionButton from "Util/Fab";
import 'Styles/Navbar.css';

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [fixedClass, setFixedClass] = useState(false);

    var contextNavbar = useContext(NavbarContext);
    const navbarType = contextNavbar.navbar;
    const location = useLocation();

    const changeNavbarBackground = () => { 

        if (window.scrollY > 80) 
        {
            setNavbar(true);
        } 
        else 
        {
            setNavbar(false);
        }
    }

    useEffect(() => {

        if (location.pathname === '/') 
        {
            setFixedClass(true);            
        } 
        else 
        {
            setFixedClass(false);
        }        
    }, [location]);

    window.addEventListener('scroll', changeNavbarBackground);

    return (
        <>
            {
                navbarType &&
                <div className={fixedClass ? navbar ? 'navbar fixed active' : 'fixed navbar' : 'active navbar'}>
                    <MainNavbar />
                </div>
            }
        </>
    );
}

export default Navbar;

function MainNavbar(props) {

    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <>
            <div className="menuLeft">
                {isMobile && <MobileNavLinks />}
                {!isMobile &&
                    <Link className="logo" to="/">Medborgerskabs<span>Prøve</span></Link>
                }
            </div>

            <div className="menuMiddle">
                {!isMobile && <NavLinks />}
                {isMobile &&
                    <Link className="logo" to="/">Medborgerskabs<span>Prøve</span></Link>
                }
            </div>

            <div className="menuRight">
                <SpeedDials />
            </div>

            {isMobile && <FloatingActionButton />}
        </>
    );
}

