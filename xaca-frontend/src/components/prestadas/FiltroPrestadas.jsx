import styles from "./FiltroPrestadas.module.css"

const CATEGORIAS = [
    { label: 'Todas', value: null },
    { label: 'Ropa hombre', value: 1 },
    { label: 'Ropa mujer', value: 2 },
    { label: 'Calzado', value: 3 },
]

function FiltroPrestadas({ categoriaActiva, onChange }) {
    return (
        <div className={styles.filtros}>
            {CATEGORIAS.map((cat) => (
                <button
                    key={cat.label}
                    onClick={() => onChange(cat.value)}
                    className={`${styles.boton} ${categoriaActiva === cat.value ? styles.activo : ''}`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    )
}

export default FiltroPrestadas