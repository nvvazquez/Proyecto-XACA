import BadgeEstado from "./BadgeEstado";
import styles from './FilaPrenda.module.css'

const COLOR_MAP = {
  'Negro': '#000000',
  'Blanco': '#FFFFFF',
  'Rojo': '#E53E3E',
  'Azul': '#3182CE',
  'Verde': '#38A169',
  'Amarillo': '#ECC94B',
  'Gris': '#718096',
  'Rosa': '#ED64A6',
  'Naranja': '#ED8936',
  'Morado': '#805AD5',
};

function FilaPrenda({ prenda, onEditar, onEliminar, onCambiarEstado }) {
    return (
        <tr className={styles.fila}>
            <td className={styles.td}>
                <div className={styles.codigo}>{prenda.codigo}</div>
            </td>
            <td className={styles.td}>
                <span className={styles.medidas}>{prenda.medidas}</span>
            </td>
            <td className={styles.td}>
                <div className={styles.colorWrap}>
                    <span className={styles.colorDot} style={{ backgroundColor: COLOR_MAP[prenda.color] ?? prenda.color }}></span>
                    {prenda.color}
                </div>
            </td>
            <td className={styles.td}>
                <BadgeEstado prestado={prenda.prestado} />
            </td>
            <td className={styles.td}>
                <div className={styles.acciones}>
                    <button className={styles.btnEditar} onClick={() => onEditar(prenda)} title="Editar">
                        ✏️
                    </button>
                    <button className={styles.btnEliminar} onClick={() => onEliminar(prenda)} title="Eliminar">
                        🗑️
                    </button>
                    <button className={prenda.prestado ? styles.btnDevolver : styles.btnPrestar} onClick={() => onCambiarEstado(prenda)}>
                        👤
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default FilaPrenda;