import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Header() {

    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="h4 mb-0">Pan de Yuca Que Rico</h1>
                <div className="user-info">
                <div className="dropdown">
                        <button 
                            className="btn dropdown-toggle" 
                            type="button" 
                            onClick={toggleDropdown}
                            style={{ background: 'none', border: 'none', color: 'inherit' }}
                        >
                            <span className="mr-2"> {user ? user.name : 'Invitado'} </span>
                            <i className="bi bi-person-circle"></i>
                        </button>
                        {isDropdownOpen && user && (
                            <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                                <button className="dropdown-item" onClick={logout}>
                                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;