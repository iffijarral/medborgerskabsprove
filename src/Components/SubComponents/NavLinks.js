import { Link } from 'react-router-dom';

export const NavLinks = () => {

    return (
        <ul>
            <li className="current"><Link to="/">Home</Link></li>
            <li><Link to="/packages/">Packages</Link></li>
            <li><Link to="/tests/">Tests</Link></li>
            <li><Link to="/about/Medborgerskabsprøven">About</Link></li>
            <li><Link to="/tips/">Tips</Link></li>
        </ul>
    );
}
