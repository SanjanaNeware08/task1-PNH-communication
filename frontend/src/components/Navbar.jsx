import {Link, useNavigate} from 'react-router-dom';
import { removeToken } from '../utils/auth';

const Navbar = () =>{
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Dashboard</Link>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;