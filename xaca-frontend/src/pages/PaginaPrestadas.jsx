import { useEffect, useState } from "react"
import { getPrendasPrestadas } from "../services/prendasService"
import FilaPrestada from "../components/prestadas/FilaPrestada"
import FiltroPrestadas from "../components/prestadas/FiltroPrestadas"
import TablaPrestadas from "../components/prestadas/TablaPrestadas"
import Breadcrumb from "../components/navegacion/Breadcrumb"
import Spinner from "../components/shared/Spinner"
import MensajeError from "../components/shared/MensajeError"
import styles from "./PaginaPrestadas.module.css"

const COLORES = {
    1: { borde: '#6FAF5A', fondo: 'rgba(111,175,90,0.15)',  texto: '#3D7D28' },
    2: { borde: '#8d6fd4', fondo: 'rgba(123,111,212,0.15)', texto: '#673ec5' },
    3: { borde: '#D46F99', fondo: 'rgba(212,111,153,0.15)', texto: '#AA3D70' },
    4: { borde: '#d4b46f', fondo: 'rgba(212, 160, 111, 0.15)', texto: '#d47f00' },
}

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

    const color = COLORES[4];

    return (
        <div className={styles.pagina}>
            <Breadcrumb niveles={nivelesBreadcrumb} />
            <div className={styles.header}>
                <div className={styles.pageIcono} style={{ backgroundColor: color.fondo }}>
                    <span style={{ color: color.borde, fontSize: '22px' }}>◈</span>
                </div>
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