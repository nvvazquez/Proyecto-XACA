import { useState, useMemo } from "react"
import FilaPrenda from "./FilaPrenda"
import MensajeVacio from "../shared/MensajeVacio"
import styles from "./TablaPrendas.module.css"

function TablaPrendas(props) {
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");

    const prendasFiltradas = useMemo(() => {
        return props.prendas.filter((prenda) => {
            const coincideCodigo = prenda.codigo.toLowerCase().includes(busqueda.toLowerCase())
            const coincideEstado =
                filtroEstado === "todos" ||
                (filtroEstado === "prestada" && prenda.prestado === true) ||
                (filtroEstado === "disponible" && prenda.prestado === false)
            return coincideCodigo && coincideEstado
        })
    }, [props.prendas, busqueda, filtroEstado])

    if (props.prendas.length === 0) {
        return <MensajeVacio mensaje="No hay prendas de este tipo todavía" />
    }

    return (
        <div>
            <div className={styles.controles}>
                <div className={styles.barraBusqueda}>
                    <input
                        type="text"
                        placeholder="Buscar por código..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className={styles.inputBusqueda}
                    />
                </div>

                <div className={styles.filtroEstado}>
                    {["todos", "disponible", "prestada"].map((opcion) => (
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
                            <th className={styles.th}>Código</th>
                            <th className={styles.th}>Medidas</th>
                            <th className={styles.th}>Color</th>
                            <th className={styles.th}>Estado</th>
                            <th className={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prendasFiltradas.length > 0 ? (
                            prendasFiltradas.map(prenda => (
                                <FilaPrenda
                                    key={prenda.id}
                                    prenda={prenda}
                                    onEditar={props.onEditar}
                                    onEliminar={props.onEliminar}
                                    onCambiarEstado={props.onCambiarEstado}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className={styles.sinResultados}>
                                    No se encontraron prendas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaPrendas;