import styles from './TarjetaItem.module.css';

function TarjetaItem(props) {
    return (
        <div className={styles.tarjeta} style={{ borderColor: props.color.borde }} onClick={() => props.onClick(props.item)}>
            <div className={styles.body}>
                <div className={styles.nombre} style={{ color: props.color.texto }}>
                    {props.item.nombre}
                </div>
                {props.item.descripcion && (
                    <div className={styles.descripcion}>{props.item.descripcion}</div>
                )}
            </div>
            <span className={styles.flecha} style={{ color: props.color.borde }}>›</span>
        </div>
    )
}

export default TarjetaItem;