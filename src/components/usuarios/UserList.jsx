import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
// import CreateUserModal from './CrearUsuario';
// import EditarUsuarioModal from './EditarUsuario';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS


const API_USUARIO = 'http://localhost:8000/api/usuarios';

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            setPending(true);
            const response = await axios.get(API_USUARIO);
            setUsers(response.data);
            setPending(false);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            setPending(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_USUARIO}/${id}`);
            getUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#343a40', 
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                minHeight: '50px',
                '&:nth-child(even)': {
                    backgroundColor: '#f8f9fa', // Color claro alterno
                },
                '&:hover': {
                    backgroundColor: '#e9ecef !important', // Color hover
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
            },
        },
    };

    const columnas = [
        {
            name: 'Primer Nombre',
            selector: row => row.name1,
            sortable: true,
        },
        {
            name: 'Segundo Nombre',
            selector: row => row.name2,
            sortable: true,
        },
        {
            name: 'Primer Apellido',
            selector: row => row.surname1,
            sortable: true,
        },
        {
            name: 'Segundo Apellido',
            selector: row => row.surname2,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        onClick={() => deleteUser(row.id)} 
                        className='btn btn-danger btn-sm'
                    >
                        Eliminar
                    </button>
                    <button 
                        onClick={() => {
                            console.log('Editando usuario:', row); 
                            setUserSelected(row);
                        }} 
                        className='btn btn-primary btn-sm ms-2'
                    >
                        Editar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Registros por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: false,
    };

    return (
        <div className='container mt-4'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    <h1 className='h4'>Gestión de Usuarios</h1>
                </div>

                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Usuario
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Usuarios"
                        columns={columnas}
                        data={users}
                        pagination
                        paginationPerPage={5} 
                        paginationRowsPerPageOptions={[5, 10, 15, 20]} 
                        paginationComponentOptions={paginationOptions}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        striped
                        customStyles={customStyles}
                        progressPending={pending}
                        progressComponent={<div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>}
                        noDataComponent={<div className="alert alert-info">No hay usuarios registrados</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onUserCreated={getUsers}
                />
            )}

            {userSelected && (
                <EditarUsuarioModal
                    user={userSelected}
                    onClose={() => setUserSelected(null)}
                    onUserUpdated={getUsers}
                />
            )}
        </div>
    );
}

export default Usuarios;