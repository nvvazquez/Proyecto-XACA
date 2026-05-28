import TarjetaItem from "./TarjetaItem";
import MensajeVacio from "../shared/MensajeVacio";
import styles from './ListaItems.module.css';

function ListaItems(props) {
    if (props.items.length === 0) {
        return <MensajeVacio mensaje="No hay elementos disponibles" />;
    }

    return (
        <div className={styles.grid}>
            {props.items.map(item => (
                <TarjetaItem key={item.id} item={item} color={props.color} onClick={props.onSeleccionar} />
            ))}
        </div>
    )
}

export default ListaItems;