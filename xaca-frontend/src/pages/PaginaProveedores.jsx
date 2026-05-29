import { useEffect, useState } from 'react'
import { getProveedores, deleteProveedor, updateProveedor, createProveedor } from '../services/proveedoresService'
import TablaProveedores from '../components/proveedores/TablaProveedores'
import ModalEliminar from '../components/shared/ModalEliminar'
import Breadcrumb from '../components/navegacion/Breadcrumb'
import Spinner from '../components/shared/Spinner'
import MensajeError from '../components/shared/MensajeError'
import FormProveedor from '../components/proveedores/FormProveedor'
import ModalProveedorPrendas from '../components/proveedores/ModalProveedorPrendas'
import styles from './PaginaProveedores.module.css'

const nivelesBreadcrumb = [
    { label: 'Inicio', ruta: '/' },
    { label: 'Proveedores' },
]

function PaginaProveedores() {
    const [proveedores, setProveedores] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [proveedorEliminando, setProveedorEliminando] = useState(null)
    const [proveedorEditando, setProveedorEditando] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [proveedorPrendas, setProveedorPrendas] = useState(null);

    const cargar = async () => {
        try {
            setCargando(true);
            setError(null);
            const response = await getProveedores();
            setProveedores(response.data);
        } catch {
            setError('No se pudieron cargar los proveedores');
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => { cargar() }, [])

    const handleEditar = (proveedor) => {
        setProveedorEditando(proveedor);
        setMostrarForm(true);
    }

    const handleGuardar = async (datos) => {
        try {
            if (proveedorEditando) {
                await updateProveedor(proveedorEditando.id, datos);
            } else {
                await createProveedor(datos);
            }
            setMostrarForm(false);
            setProveedorEditando(null);
            cargar();
        } catch {
            setError('No se pudo guardar el proveedor');
        }
    }

    const handleCancelarForm = () => {
        setMostrarForm(false);
        setProveedorEditando(null);
    }

    const handleEliminar = async () => {
        try {
            await deleteProveedor(proveedorEliminando.id);
            setProveedorEliminando(null);
            cargar();
        } catch {
            setError('No se pudo eliminar el proveedor');
        }
    }

    const handleCambiarEstado = async (proveedor) => {
        try {
            await updateProveedor(proveedor.id, { ...proveedor, activo: !proveedor.activo });
            cargar();
        } catch {
            setError('No se pudo cambiar el estado del proveedor');
        }
    }

    return (
        <div className={styles.pagina}>
            <Breadcrumb niveles={nivelesBreadcrumb} />
            <div className={styles.header}>
                <div className={styles.header1}>
                    <div className={styles.pageIcono} style={{ backgroundColor: '#6fd4c685' }}>
                        <span style={{ color: '#209283', fontSize: '22px' }}>◈</span>
                    </div>
                    <div>
                        <h1 className={styles.titulo}>Proveedores</h1>
                        <p className={styles.subtitulo}>Gestión de proveedores de prendas</p>
                    </div>
                </div>
                <button className={styles.btnAdd} onClick={() => handleEditar(null)}>
                    + Añadir proveedor
                </button>
            </div>

            {(mostrarForm || proveedorEditando) && (
                <FormProveedor
                proveedor={proveedorEditando}
                onGuardar={handleGuardar}
                onCancelar={handleCancelarForm}
                />
            )}

            {error && <MensajeError mensaje={error} />}

            {cargando ? (
                <Spinner />
            ) : (
                <TablaProveedores
                    proveedores={proveedores}
                    onEditar={handleEditar}
                    onEliminar={setProveedorEliminando}
                    onCambiarEstado={handleCambiarEstado}
                    onGestionarPrendas={setProveedorPrendas}
                />
            )}

            {proveedorEliminando && (
                <ModalEliminar
                    mensaje={`¿Seguro que quieres eliminar "${proveedorEliminando.nombre}"?`}
                    onConfirmar={handleEliminar}
                    onCancelar={() => setProveedorEliminando(null)}
                />
            )}

            {proveedorPrendas && (
                <ModalProveedorPrendas
                    proveedor={proveedorPrendas}
                    onCerrar={() => setProveedorPrendas(null)}
                />
            )}
        </div>
    )
}

export default PaginaProveedores