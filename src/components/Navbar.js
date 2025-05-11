import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar" style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', backgroundColor: '#ddd' }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    );
}
export default Navbar;
