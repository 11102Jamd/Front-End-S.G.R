import React, { useState } from "react";
import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";

function EditProductModal( { product, onClose, onProductUpdate} ) {
    const [productUpdate, setProductUpdate] = useState(product);

    const updateProduct = async () => {
        try {
            await api.put(`/products/${product.id}`, productUpdate);
            await Swal.fire('Éxito', 'Producto Actualizado Exitosamente', 'success');
            onProductUpdate();
            onClose();
        } catch (error) {
            console.error("Error al Actualizar el Producto: ", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo Actualizar el producto',
                icon: 'error'
            });
        }
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Editar Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Producto</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id='ProductName'
                                value={productUpdate.ProductName} 
                                onChange={(e) => setProductUpdate({ ...productUpdate, ProductName: e.target.value })} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="InitialQuantity" className="form-label">Cantidad Inicial</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg" 
                                id="InitialQuantity" 
                                value={productUpdate.InitialQuantity} 
                                onChange={(e) => setProductUpdate({ ...productUpdate, InitialQuantity: e.target.value })} 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="CurrentStock" className="form-label">Stock</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg" 
                                id="CurrentStock" 
                                value={productUpdate.CurrentStock} 
                                onChange={(e) => setProductUpdate({ ...productUpdate, CurrentStock: e.target.value })} 
                                required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="UnityPrice" className="form-label">Precio por Unidad</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg" 
                                id="UnityPrice" 
                                value={productUpdate.UnityPrice} 
                                onChange={(e) => setProductUpdate({ ...productUpdate, UnityPrice: e.target.value })} 
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={updateProduct}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditProductModal