import { useState, useEffect } from 'react';
import { getSubcategorias, getTipos } from '../services/categoriasService';

function useNavegacion(categoriaId) {
    const [subcategorias, setSubcategorias] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [subcategoriaActiva, setSubcategoriaActiva] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                const response = await getSubcategorias(categoriaId);
                setSubcategorias(response.data);
            } catch {
                setError('No se pudieron cargar las subcategorías');
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, [categoriaId]);

    const seleccionarSubcategoria = async (subcategoria) => {
        try {
            setCargando(true);
            setError(null);
            const response = await getTipos(subcategoria.id);
            setTipos(response.data);
            setSubcategoriaActiva(subcategoria);
        } catch {
            setError('No se pudieron cargar los tipos');
        } finally {
            setCargando(false);
        }
    }

    const volverSubcategorias = () => {
        setSubcategoriaActiva(null);
        setTipos([]);
    }

    return {
        subcategorias,
        tipos,
        subcategoriaActiva,
        cargando,
        error,
        seleccionarSubcategoria,
        volverSubcategorias,
    }
}

export default useNavegacion;