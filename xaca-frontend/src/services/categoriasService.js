import api from './api';

export const getCategorias = () => 
    api.get('/categorias/')

export const getSubcategorias = (categoriaId) =>
    api.get(`/categorias/${categoriaId}/subcategorias/`)

export const getTipos = (subcategoriaId) =>
    api.get(`/subcategorias/${subcategoriaId}/tipos/`)

export const getPrendasPorTipo = (tipoId) =>
    api.get(`/tipos/${tipoId}/prendas/`)

export const getTipoDetalle = (tipoId) =>
    api.get(`/tipos/${tipoId}/`)