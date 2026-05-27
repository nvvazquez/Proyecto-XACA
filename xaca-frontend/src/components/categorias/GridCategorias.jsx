import TarjetaCategoria from "./TarjetaCategoria";
import styles from './GridCategorias.module.css';

function GridCategorias(props) {
    return (
        <div className={styles.grid}>
            {props.categorias.map(categoria => (
                <TarjetaCategoria key={categoria.id} categoria={categoria} />
            ))}
        </div>
    )
}

export default GridCategorias;