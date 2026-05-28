import styles from './Breadcrumb.module.css';
import { useNavigate } from 'react-router-dom';

function Breadcrumb(props) {
    const navigate = useNavigate();

    return (
        <nav className={styles.breadcrumb}>
            {props.niveles.map((nivel, index) => {
                const isLast = index === props.niveles.length - 1;
                return (
                    <span key={index} className={styles.item}>
                        {!isLast ? (
                            <>
                                <span className={styles.enlace} onClick={() => nivel.ruta && navigate(nivel.ruta)}>
                                    {nivel.label}
                                </span>
                                <span className={styles.separador}>›</span>
                            </>
                        ) : (
                            <span className={styles.actual}>{nivel.label}</span>
                        )}
                    </span>
                )
            })}
        </nav>

    )
}

export default Breadcrumb;