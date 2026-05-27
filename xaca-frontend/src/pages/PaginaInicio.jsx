import React, { useState, useEffect } from 'react';
import { getCategorias } from '../services/categoriasService';
import GridCategorias from '../components/categorias/GridCategorias';
import Spinner from '../components/shared/Spinner';
import MensajeError from '../components/shared/MensajeError';
import styles from './PaginaInicio.module.css';

function PaginaInicio() {

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await getCategorias();
                setCategorias(response.data);
            } catch (err) {
                setError('Error al cargar categorías');
            } finally {
                setCargando(false);
            }
        }
        cargarCategorias();
    }, []);

    return (
        <div className={styles.pagina}>
            <div className={styles.header}>
                <h1 className={styles.titulo}>Gestión del almacén</h1>
                <p className={styles.subtitulo}>Selecciona una categoría para explorar el inventario</p>
            </div>
    
            {cargando && <Spinner />}
            {error && <MensajeError mensaje={error} />}

            {!cargando && !error && <GridCategorias categorias={categorias} />}
        </div>
    )
}

export default PaginaInicio;