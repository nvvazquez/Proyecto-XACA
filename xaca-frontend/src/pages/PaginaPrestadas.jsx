import { useEffect, useState } from "react"
import { getPrendasPrestadas } from "../services/prendasService"
import FilaPrestada from "../components/prestadas/FilaPrestada"
import FiltroPrestadas from "../components/prestadas/FiltroPrestadas"
import TablaPrestadas from "../components/prestadas/TablaPrestadas"
import Breadcrumb from "../components/navegacion/Breadcrumb"
import Spinner from "../components/shared/Spinner"
import MensajeError from "../components/shared/MensajeError"
import styles from "./PaginaPrestadas.module.css"

const nivelesBreadcrumb = [
    { label: 'Inicio', ruta: '/' },
    { label: 'Ropa prestada' },
]

function PaginaPrestadas() {
    const [busqueda, setBusqueda] = useState("");
    const [prendas, setPrendas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [categoriaFiltro, setCategoriaFiltro] = useState(null);
    const [recargas, setRecargas] = useState(0);

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                setError(null);
                const response = await getPrendasPrestadas(categoriaFiltro);
                setPrendas(response.data);
            } catch {
                setError('No se pudieron cargar las prendas prestadas');
            } finally {
                setCargando(false);
            }
        }
        cargar();
    }, [categoriaFiltro, recargas])

    const handleDevolucion = () => setRecargas(r => r + 1);

    const prendasFiltradas = prendas.filter(p => 
        p.codigo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className={styles.pagina}>
            <Breadcrumb niveles={nivelesBreadcrumb} />
            <div className={styles.header}>
                <div>
                    <h1 className={styles.titulo}>Ropa prestada</h1>
                    <p className={styles.subtitulo}>Prendas fuera del almacén · Ordenadas por fecha de préstamo</p>
                </div>
            </div>

            <div className={styles.controles}>
                <input 
                    className={styles.inputBusqueda}
                    type="text" 
                    placeholder="Buscar por código..." 
                    value={busqueda} 
                    onChange={e => setBusqueda(e.target.value)}
                />
                <FiltroPrestadas categoriaActiva={categoriaFiltro} onChange={setCategoriaFiltro} />
            </div>

            {error && <MensajeError mensaje={error} />}

            {cargando ? (
                <Spinner />
            ) : (
                <TablaPrestadas prendas={prendasFiltradas} onDevolucion={handleDevolucion} />
            )}
        </div>
    )
}

export default PaginaPrestadas;