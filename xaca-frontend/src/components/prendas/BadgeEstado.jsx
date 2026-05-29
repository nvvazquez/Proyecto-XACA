import styles from './BadgeEstado.module.css';

function BadgeEstado(props) {
    return (
        <span className={props.prestado ? styles.prestado : styles.disponible}>
            <span className={styles.dot}></span>
            {props.prestado ? 'Prestada' : 'Disponible'}
        </span>
    )
}

export default BadgeEstado;