import BotonDevolver from "./BotonDevolver"
import styles from "./FilaPrestada.module.css"

function FilaPrestada({ prenda, onDevolucion }) {
    const fecha = new Date(prenda.fecha_prestamo)
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const diasPrestada = Math.floor((Date.now() - fecha) / (1000 * 60 * 60 * 24))

    return (
        <tr className={styles.fila}>
            <td className={styles.td}>{prenda.codigo}</td>
            <td className={styles.td}>{prenda.tipo_nombre}</td>
            <td className={styles.td}>{prenda.subcategoria_nombre}</td>
            <td className={styles.td}>{prenda.categoria_nombre}</td>
            <td className={styles.td}>{prenda.medidas}</td>
            <td className={styles.td}>
                <span className={styles.fecha}>{fechaFormateada}</span>
                <span className={`${styles.dias} ${diasPrestada > 30 ? styles.alerta : ''}`}>
                    Hace {diasPrestada} días
                </span>
            </td>
            <td className={styles.td}>
                <BotonDevolver prendaId={prenda.id} onDevolucion={onDevolucion} />
            </td>
        </tr>
    )
}

export default FilaPrestada