import api from './api';

export const getProveedores = () =>
    api.get('/proveedores/')

export const createProveedor = (data) =>
    api.post('/proveedores/', data)

export const updateProveedor = (id, data) =>
    api.put(`/proveedores/${id}/`, data)

export const deleteProveedor = (id) =>
    api.delete(`/proveedores/${id}/`)

export const getProveedoresPrenda = (prendaId) =>
    api.get(`/prendas/${prendaId}/proveedores/`)

export const getProveedorPrendas = (proveedorId) =>
    api.get(`/proveedores/${proveedorId}/prendas/`)

export const addPrendaProveedor = (prendaId, proveedorId) =>
    api.post(`/prendas/${prendaId}/proveedores/`, { proveedor_id: proveedorId })

export const removePrendaProveedor = (prendaId, proveedorId) =>
    api.delete(`/prendas/${prendaId}/proveedores/${proveedorId}/`)