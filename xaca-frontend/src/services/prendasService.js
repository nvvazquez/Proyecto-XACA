import api from './api';

export const createPrenda = (tipoId, data) =>
    api.post(`/tipos/${tipoId}/prendas/`, data)

export const updatePrenda = (id, data) =>
    api.put(`/prendas/${id}/`, data)

export const deletePrenda = (id) =>
    api.delete(`/prendas/${id}/`)

export const cambiarEstado = (id, prestado) =>
    api.patch(`/prendas/${id}/estado/`, { prestado })

export const getPrendasPrestadas = (categoriaId = null) => {
    const params = { prestado: true };
    if (categoriaId) {
        params.id_categoria = categoriaId;
    }
    return api.get('/prendas/', { params });
}