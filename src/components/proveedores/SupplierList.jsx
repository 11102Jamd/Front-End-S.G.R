import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import CreateSupplierModal from "./CreateSupplierModal";
import api from "../../utils/axiosConfig";
import EditSupplierModal from "./EditSupplierModal";

function Supplier(){
    const [suppliers, setSupplier] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [supplierSelected, setSupplierSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getSupplier();
    }, []);

    const getSupplier = async () => {
        try {
            setPending(true);
            const response = await api.get('/suppliers');
            setSupplier(response.data);
            setPending(false);
        } catch (error) {
            console.error("Error al obtener la lista de Proveedores: ", error);
            setPending(false);
        }
    }

    const deleteSupplier = async (id) => {
        try {
            await api.delete(`/suppliers/${id}`);
            getSupplier();
        } catch (error) {
            console.error("Error al eliminar el proveedor",error);
        }
    };

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#343a40', 
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        cells:{
            style: {
                fontSize: '18px',  // Tamaño de fuente aumentado para el contenido
                padding: '12px 10px'  // Más espacio en celdas
            },
        },
        rows: {
            style: {
                minHeight: '60px',
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

    const columns = [
        {
            name:'Proveedor',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Correo Electronico',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Direccion',
            selector: row => row.Addres,
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: row => row.Phone,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        onClick={() => deleteSupplier(row.id)} 
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button 
                        onClick={() => {
                            console.log('Editando Proveedor:', row); 
                            setSupplierSelected(row);
                        }} 
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Registros por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: false,
    };

    return(
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    <h1 className='h4'>Gestión de Proveedores</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Proveedor
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Proveedores"
                        columns={columns}
                        data={suppliers}
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
                <CreateSupplierModal
                onClose={() => setShowModal(false)}
                onSupplierCreated={getSupplier}
                />
            )}

            {supplierSelected && (
                <EditSupplierModal
                    supplier={supplierSelected}
                    onClose={() => setSupplierSelected(null)}
                    onSupplierUpdated={getSupplier}
                />
            )}
        </div>
    );
}

export default Supplier;