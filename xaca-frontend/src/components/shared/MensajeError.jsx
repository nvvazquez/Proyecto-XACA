import styles from './MensajeError.module.css';

function MensajeError(props) {
    return (
        <div className={styles.error}>
            <span className={styles.icono}>⚠️</span>
            <span>{props.mensaje}</span>
        </div>
    )
}

export default MensajeError;