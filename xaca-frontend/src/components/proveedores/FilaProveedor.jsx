import styles from './FilaProveedor.module.css'

function FilaProveedor({ proveedor, onEditar, onEliminar, onCambiarEstado, onGestionarPrendas }) {
    return (
        <tr className={styles.fila}>
            <td className={styles.td}>
                <div className={styles.nombre}>{proveedor.nombre}</div>
                <div className={styles.codigo}>{proveedor.codigo}</div>
            </td>
            <td className={styles.td}>
                <div className={styles.contactoFila}>
                    <span className={styles.icono}>✉</span>
                    {proveedor.email}
                </div>
                <div className={styles.contactoFila}>
                    <span className={styles.icono}>📞</span>
                    {proveedor.telefono}
                </div>
            </td>
            <td className={styles.td}>
                <span className={styles.prendas}>{proveedor.num_prendas ?? 0} prendas</span>
            </td>
            <td className={styles.td}>
                <span className={`${styles.badge} ${proveedor.activo ? styles.activo : styles.inactivo}`}>
                    {proveedor.activo ? '● Activo' : '● Inactivo'}
                </span>
            </td>
            <td className={styles.td}>
                <div className={styles.acciones}>
                    <button className={styles.btnPrendas} onClick={() => onGestionarPrendas(proveedor)} title="Gestionar prendas">
                        👕
                    </button>
                    <button className={styles.btnEditar} onClick={() => onEditar(proveedor)} title="Editar">
                        ✏️
                    </button>
                    <button className={styles.btnEliminar} onClick={() => onEliminar(proveedor)} title="Eliminar">
                        🗑️
                    </button>
                    <button
                        className={proveedor.activo ? styles.btnDesactivar : styles.btnActivar}
                        onClick={() => onCambiarEstado(proveedor)}
                        title={proveedor.activo ? 'Desactivar' : 'Activar'}
                    >
                        {proveedor.activo ? '🔴' : '🟢'}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default FilaProveedor;