import { Link } from 'react-router-dom';
import SpeedDials from 'Util/SpeedDial';
import 'Styles/Navbar.css';

export const MenuLeft = () => {
    return (
        <div className="menuLeft">
            <Link className="logo" to="/">Medborgerskabs<span>Prøve</span></Link>
        </div>
    );
}

export const MenuMiddle = () => {
    return (
        <div className="menuMiddle">
            <ul>
                <li className="current"><Link to="/">Home</Link></li>
                <li><Link to="/packages/">Packages</Link></li>
                <li><Link to="/tests/">Tests</Link></li>
                <li><Link to="/aboutexam/">About</Link></li>
                <li><Link to="/tips/">Tips</Link></li>
            </ul>
        </div>
    );
}

export const MenuRight = () => {
    return (
        <div className="menuRight">
            <SpeedDials />
        </div>
    );
}