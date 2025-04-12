import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard-container">
        <h1>Bienvenido, {user?.name || 'Usuario'}</h1>
        <button onClick={logout} className="logout-button">
            Cerrar sesión
        </button>
        </div>
    );
}

export default Dashboard;