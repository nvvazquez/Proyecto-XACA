import styles from './MensajeVacio.module.css';

function MensajeVacio(props) {
    return (
        <div className={styles.wrapper}>
            <span className={styles.icono}>📭</span>
            <span>{props.mensaje}</span>
        </div>
    )
}

export default MensajeVacio;