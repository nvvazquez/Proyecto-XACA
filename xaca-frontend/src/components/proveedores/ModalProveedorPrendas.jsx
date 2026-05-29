import { useEffect, useState } from 'react'
import { getProveedorPrendas, addPrendaProveedor, removePrendaProveedor } from '../../services/proveedoresService'
import { getPrendasPorCodigo } from '../../services/prendasService'
import styles from './ModalProveedorPrendas.module.css'

function ModalProveedorPrendas({ proveedor, onCerrar }) {
    const [prendas, setPrendas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [cargando, setCargando] = useState(true);

    const cargarPrendas = async () => {
        try {
            setCargando(true);
            const res = await getProveedorPrendas(proveedor.id);
            setPrendas(res.data);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => { cargarPrendas() }, [proveedor.id]);

    const buscarPrendas = async (valor) => {
        setBusqueda(valor);
        if (valor.length < 2) { setResultados([]); return }
        try {
            setBuscando(true);
            const res = await getPrendasPorCodigo(valor);
            const yaVinculadas = new Set(prendas.map(p => p.id));
            setResultados(res.data.filter(p => !yaVinculadas.has(p.id)));
        } finally {
            setBuscando(false)
        }
    }

    const handleVincular = async (prenda) => {
        await addPrendaProveedor(prenda.id, proveedor.id);
        setBusqueda('');
        setResultados([]);
        cargarPrendas();
    }

    const handleDesvincular = async (prenda) => {
        await removePrendaProveedor(prenda.id, proveedor.id);
        cargarPrendas();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div>
                        <h3 className={styles.titulo}>Prendas de {proveedor.nombre}</h3>
                        <p className={styles.subtitulo}>{prendas.length} prendas vinculadas</p>
                    </div>
                    <button className={styles.btnCerrar} onClick={onCerrar}>✕</button>
                </div>

                <div className={styles.buscador}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Buscar prenda por código para vincular..."
                        value={busqueda}
                        onChange={e => buscarPrendas(e.target.value)}
                    />
                    {resultados.length > 0 && (
                        <div className={styles.dropdown}>
                            {resultados.map(p => (
                                <div key={p.id} className={styles.dropdownItem} onClick={() => handleVincular(p)}>
                                    <span className={styles.dropdownCodigo}>{p.codigo}</span>
                                    <span className={styles.dropdownMeta}>{p.medidas} · {p.color}</span>
                                    <span className={styles.dropdownVincular}>+ Vincular</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {buscando && <p className={styles.buscandoTexto}>Buscando...</p>}
                    {busqueda.length >= 2 && !buscando && resultados.length === 0 && (
                        <p className={styles.buscandoTexto}>Sin resultados</p>
                    )}
                </div>

                <div className={styles.lista}>
                    {cargando ? (
                        <p className={styles.buscandoTexto}>Cargando...</p>
                    ) : prendas.length === 0 ? (
                        <p className={styles.vacio}>Este proveedor no tiene prendas vinculadas</p>
                    ) : (
                        prendas.map(p => (
                            <div key={p.id} className={styles.fila}>
                                <div className={styles.filaDatos}>
                                    <span className={styles.codigo}>{p.codigo}</span>
                                    <span className={styles.meta}>{p.medidas} · {p.color}</span>
                                </div>
                                <button
                                    className={styles.btnDesvincular}
                                    onClick={() => handleDesvincular(p)}
                                >
                                    Desvincular
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <button className={styles.btnCerrarFooter} onClick={onCerrar}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalProveedorPrendas;