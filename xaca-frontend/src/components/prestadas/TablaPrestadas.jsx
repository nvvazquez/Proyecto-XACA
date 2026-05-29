import FilaPrestada from "./FilaPrestada"
import MensajeVacio from "../shared/MensajeVacio"
import styles from "./TablaPrestadas.module.css"

function TablaPrestadas({ prendas, onDevolucion }) {
    const prendasOrdenadas = [...prendas].sort(
        (a, b) => new Date(a.fecha_prestamo) - new Date(b.fecha_prestamo)
    )

    if (prendas.length === 0) {
        return <MensajeVacio mensaje="No hay prendas prestadas actualmente" />
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.tabla}>
                <thead>
                    <tr className={styles.thead}>
                        <th className={styles.th}>Código</th>
                        <th className={styles.th}>Tipo</th>
                        <th className={styles.th}>Subcategoría</th>
                        <th className={styles.th}>Categoría</th>
                        <th className={styles.th}>Medidas</th>
                        <th className={styles.th}>Fecha préstamo</th>
                        <th className={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prendasOrdenadas.map(prenda => (
                        <FilaPrestada
                            key={prenda.id}
                            prenda={prenda}
                            onDevolucion={onDevolucion}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaPrestadas