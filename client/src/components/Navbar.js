import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/images/bgnav.jpg';

function Navbar() {
    const navbarstyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <nav className={`navbar navbar-expand-sm navbar-light bg-light fixed-top`} style={navbarstyle}>
            <div className="container">
                <Link className="navbar-brand" to={"/"}>My Blog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto fw-bold">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
