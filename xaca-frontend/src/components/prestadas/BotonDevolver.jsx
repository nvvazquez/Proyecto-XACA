import { useState } from "react"
import { cambiarEstado } from "../../services/prendasService"
import styles from "./BotonDevolver.module.css"

function BotonDevolver({ prendaId, onDevolucion }) {
    const [cargando, setCargando] = useState(false)

    const handleDevolver = async () => {
        try {
            setCargando(true)
            await cambiarEstado(prendaId, false)
            onDevolucion()
        } catch {
            console.error('Error al registrar la devolución')
        } finally {
            setCargando(false)
        }
    }

    return (
        <button
            onClick={handleDevolver}
            disabled={cargando}
            className={styles.boton}
        >
            {cargando ? 'Devolviendo...' : 'Registrar devolución'}
        </button>
    )
}

export default BotonDevolver