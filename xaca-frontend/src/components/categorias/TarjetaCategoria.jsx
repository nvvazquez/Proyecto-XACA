import styles from './TarjetaCategoria.module.css';
import { useNavigate } from 'react-router-dom';

const COLORES = {
    1: { borde: '#6FAF5A', fondo: 'rgba(111,175,90,0.15)',  texto: '#3D7D28' },
    2: { borde: '#8d6fd4', fondo: 'rgba(123,111,212,0.15)', texto: '#673ec5' },
    3: { borde: '#D46F99', fondo: 'rgba(212,111,153,0.15)', texto: '#AA3D70' },
    4: { borde: '#d4b46f', fondo: 'rgba(212,111,111,0.15)', texto: '#d47f00' },
}

function TarjetaCategoria({ categoria }) {
    const navigate = useNavigate();
    const color = COLORES[categoria.id] || { borde: '#aaa', fondo: 'rgba(0,0,0,0.08)', texto: '#555' };


    const onClick = () => {
        if (categoria.nombre === 'Ropa prestada') {
            navigate('/prestadas')
        } else {
            navigate(`/categoria/${categoria.id}`)
        }
    }

    return (
        <div className={styles.tarjeta} style={{ borderColor: color.borde }} onClick={onClick}> 
            <div className={styles.nombre} style={{ color: color.texto }}>{categoria.nombre}</div>
            <div className={styles.descripcion}>{categoria.descripcion}</div>
            <div className={styles.footer}>
                <span className={styles.badge} style={{ backgroundColor: color.fondo, color: color.texto }}>
                    Ver categoría
                </span>
                <span className={styles.flecha} style={{ color: color.borde }}>›</span>
            </div>
        </div>
    )
}

export default TarjetaCategoria;