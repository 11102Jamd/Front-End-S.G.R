import React, { useState } from "react";
import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";

function EditInputModal({ input, onClose, onInputUpdated}) {
    const [inputUpdate, setInputUpdate] = useState(input);

    const updateInput = async () => {
        try {
            await api.put(`/inputs/${input.id}`, inputUpdate)
            await Swal.fire({
                title: '¡Éxito!',
                text: 'Insumo Actualizado exitosamente',
                icon: 'success'
            });
            onInputUpdated();
            onClose();
        } catch (error) {
            console.error("Error al Actualizar el insumo: ", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo Actualizar el insumo',
                icon: 'error'
            });
        }
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Editar Insumo</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg"
                                id='InputName'
                                value={inputUpdate.InputName} 
                                onChange={(e) => setInputUpdate({ ...inputUpdate, InputName: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={updateInput}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditInputModal