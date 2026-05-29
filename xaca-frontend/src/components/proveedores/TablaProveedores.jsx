import { useState, useMemo } from "react"
import FilaProveedor from './FilaProveedor'
import MensajeVacio from '../shared/MensajeVacio'
import styles from './TablaProveedores.module.css'

function TablaProveedores({ proveedores, onEditar, onEliminar, onCambiarEstado, onGestionarPrendas }) {
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");

    const proveedoresFiltrados = useMemo(() => {
        return proveedores.filter(p => {
            const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
            const coincideEstado =
                filtroEstado === "todos" ||
                (filtroEstado === "activo" && p.activo === true) ||
                (filtroEstado === "inactivo" && p.activo === false);
            return coincideNombre && coincideEstado
        })
    }, [proveedores, busqueda, filtroEstado])

    if (proveedores.length === 0) {
        return <MensajeVacio mensaje="No hay proveedores registrados todavía" />
    }

    return (
        <div>
            <div className={styles.controles}>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className={styles.inputBusqueda}
                />
                <div className={styles.filtroEstado}>
                    {["todos", "activo", "inactivo"].map(opcion => (
                        <button
                            key={opcion}
                            onClick={() => setFiltroEstado(opcion)}
                            className={`${styles.botonFiltro} ${filtroEstado === opcion ? styles.activo : ""}`}
                        >
                            {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.wrapper}>
                <table className={styles.tabla}>
                    <thead>
                        <tr className={styles.thead}>
                            <th className={styles.th}>Proveedor</th>
                            <th className={styles.th}>Contacto</th>
                            <th className={styles.th}>Prendas</th>
                            <th className={styles.th}>Estado</th>
                            <th className={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedoresFiltrados.length > 0 ? (
                            proveedoresFiltrados.map(proveedor => (
                                <FilaProveedor
                                    key={proveedor.id}
                                    proveedor={proveedor}
                                    onEditar={onEditar}
                                    onEliminar={onEliminar}
                                    onCambiarEstado={onCambiarEstado}
                                    onGestionarPrendas={onGestionarPrendas}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className={styles.sinResultados}>
                                    No se encontraron proveedores
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaProveedores;