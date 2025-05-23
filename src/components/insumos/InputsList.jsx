import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import api from "../../utils/axiosConfig";
import CreateInputModal from "./CreateInputModal";
import EditInputModal from "./EditInputModal";


function Inputs() {
    const [input, setInput] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputSelected, setInputSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        getInputs();
    }, []);

    const getInputs = async () => {
        try {
            setPending(true);
            const response = await api.get('/inputs');
            setInput(response.data);
            setPending(false);
        } catch (error) {
            console.error('Error al mostrar todos los Insumos: ', error);
            setPending(false);
        }
    };

    const deleteInput = async (id) => {
        const result = await Swal.fire({
            title:'¿Estas seguro de eliminar este registro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/inputs/${id}`);
                await Swal.fire({
                    title: '¡Eliminado!',
                    text:'El insumo ha sido eliminado.',
                    icon: 'success'
                });
            } catch (error) {
                console.error('Error al eliminar el Insumo:', error);
                Swal.fire(
                    'Error',
                    'No se pudo eliminar el insumo',
                    'error'
                );
            }
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
            name: 'Insumo',
            selector: row => row.InputName,
            sortable: true,
        },
        {
            name: 'Precio Unidad',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.UnityPrice}`: 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Cantidad Inicial',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.InitialQuantity} ${lastOrder.UnitMeasurement}`: 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Precio Cantidad',
            selector: row => {
                const lastOrder = row.input_orders?.[0];
                return lastOrder ? `${lastOrder.PriceQuantity}`: 'N/A'
            },
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => `${row.CurrentStock} ${row.UnitMeasurementGrams}`,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="btn-group" role="group">
                    <button 
                        onClick={() => deleteInput(row.id)} 
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button 
                        onClick={() => {
                            console.log('Editando insumo:', row); 
                            setInputSelected(row);
                        }} 
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ];

    const paginationOptions = {
        rowsPerPageText: 'Registros por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: false,
    };

    return (
        <div className='container-fluid mt-4'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    <h1 className='h3'>Gestión de Insumos</h1>
                </div>

                <div className='card-body p-4'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className='btn btn-success'
                        >
                            <i className="bi bi-plus-circle"></i> Crear Insumo
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Insumos"
                        columns={columns}
                        data={input}
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
                        noDataComponent={<div className="alert alert-info">No hay insumos registrados</div>}
                    />
                </div>
            </div>

            {showModal && (
                <CreateInputModal
                    onClose={() => setShowModal(false)}
                    onInputCreated={getInputs}
                />
            )}

            {inputSelected && (
                <EditInputModal
                    input={inputSelected}
                    onClose={() => setInputSelected(null)}
                    onInputUpdated={getInputs}
                />
            )}
        </div>
    );
}   

export default Inputs;