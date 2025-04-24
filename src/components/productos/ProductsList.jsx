import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../../utils/axiosConfig";

function Products(){
    const [product, setProduct] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productSelected, setProductSelected] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setPending(true);
            const response = await api.get('/products')
            setProduct(response.data);
            setPending(false);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setPending(false)
        }
    }
    
    const deleteProduct = async () => {
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
                await api.delete(`/products/${id}`);
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
    }

    const customStyles = {
        headCells:{
            style:{
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
                    backgroundColor: '#f8f9fa', 
                },
                '&:hover': {
                    backgroundColor: '#e9ecef !important', 
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
            },
        },
    }

    const columns = [
        {
            name: 'Producto',
            selector: row => row.ProductName,
            sortable: true,
        },
        {
            name: 'Cantidad Inicial',
            selector: row => row.InitialQuantity,
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => row.CurrentStock,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: row => row.UnityPrice,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className='btn-group' role="group">
                    <button
                        onClick={() => deleteProduct(row.id)}
                        className='btn btn-danger btn-sm rounded-2 p-2'
                        title="Eliminar"
                    >
                        <i className="bi bi-trash fs-6"></i>
                    </button>
                    <button
                        onClick={() => {
                            console.log('Editando producto: ', row);
                            setProductSelected(row);
                        }}
                        className='btn btn-primary btn-sm ms-2 rounded-2 p-2'
                        title="Editar"
                    >
                        <i className="bi bi-pencil-square fs-6"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverFlow: true,
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
        <div className='container mt-4'>
            <div className='card'>
                <div className='card-header bg-primary text-white'>
                    <h1 className='h4'>Gestion de Productos</h1>
                </div>
                
                <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='btn btn-success'
                        >
                            <i className='bi bi-plus-circle'></i> Crear Producto
                        </button>
                    </div>

                    <DataTable
                        title="Lista de Productos"
                        columns={columns}
                        data={product}
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
                        noDataComponent={<div className="alert alert-info">No hay productos registrados</div>}
                    />
                </div>
            </div>
            {/* {mostrarModal && (
                <CreateProductModal
                        onClose={() => setMostrarModal(false)}
                        onProductCreated={obtenerProductos}
                    />
                )}

            {productoSeleccionado && (
                <EditProductModal
                    product={productoSeleccionado}
                    onClose={() => setProductoSeleccionado(null)}
                    onProductUpdate={obtenerProductos}
                />
            )} */}
        </div>
    );

}
export default Products