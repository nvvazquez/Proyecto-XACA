import { useEffect, useState } from "react";
import { createPrenda, updatePrenda, deletePrenda, cambiarEstado } from '../services/prendasService'
import { getPrendasPorTipo } from '../services/categoriasService'

function usePrendas(tipoId) {
    console.log('useNavegacion recibe tipoId:', tipoId);
    const [prendas, setPrendas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [prendaEditando, setPrendaEditando] = useState(null);
    const [prendaEliminando, setPrendaEliminando] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                const response = await getPrendasPorTipo(tipoId);
                setPrendas(response.data);
            } catch {
                setError('No se pudieron cargar las prendas');
            } finally {
                setCargando(false);
            }
        }
        if (tipoId) cargar();
    }, [tipoId])

    const handleCrear = async (datos) => {
        try {
            const response = await createPrenda(tipoId, datos);
            setPrendas(prev => [...prev, response.data])
            setMostrarForm(false);
            setError(null);
        } catch {
            setError('No se pudo crear la prenda');
        }
    }

    const handleEditar = async (datos) => {
        try {
            const response = await updatePrenda(prendaEditando.id, datos);
            setPrendas(prev => prev.map(p => p.id === prendaEditando.id ? response.data : p))
            setPrendaEditando(null);
            setMostrarForm(false);
        } catch {
            setError('No se pudo editar la prenda')
        }
    }

    const handleEliminar = async () => {
        try {
            await deletePrenda(prendaEliminando.id);
            setPrendas(prev => prev.filter(p => p.id !== prendaEliminando.id))
            setPrendaEliminando(null);
        } catch {
            setError('No se pudo eliminar la prenda')
        }
    }

    const handleCambiarEstado = async (prenda) => {
        try {
            const response = await cambiarEstado(prenda.id, !prenda.prestado);
            setPrendas(prev => prev.map(p => p.id === prenda.id ? response.data : p))
            setMostrarForm(false);
        } catch (err) {
            const mensaje = err.response?.data?.error || 'No se pudo cambiar el estado';
            setError(mensaje);
        }
    }

    return {
        prendas,
        cargando,
        error,
        mostrarForm,
        prendaEditando,
        prendaEliminando,
        setMostrarForm,
        setPrendaEditando,
        setPrendaEliminando,
        handleCrear,
        handleEditar,
        handleEliminar,
        handleCambiarEstado,
    }
}

export default usePrendas;