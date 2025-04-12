import React from 'react';
import '../App.css';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="h4 mb-0">Pan de Yuca Que Rico</h1>
                <div className="user-info">
                    <span className="mr-2">Administrador@vcii</span>
                    <i className="bi bi-person-circle"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;