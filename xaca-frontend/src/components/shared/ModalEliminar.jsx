import styles from './ModalEliminar.module.css';

function ModalEliminar(props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.titulo}>Confirmar eliminación</h3>
                <p className={styles.mensaje}>{props.mensaje}</p>
                {props.advertencia && (
                    <p className={styles.advertencia}>⚠ {props.advertencia}</p>
                )}
                <div className={styles.acciones}>
                    <button className={styles.btnCancelar} onClick={props.onCancelar}>Cancelar</button>
                    <button className={styles.btnEliminar} onClick={props.onConfirmar}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalEliminar;