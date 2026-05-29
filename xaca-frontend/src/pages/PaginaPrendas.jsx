import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import usePrendas from "../hooks/usePrendas";
import FormPrenda from "../components/prendas/FormPrenda";
import TablaPrendas from "../components/prendas/TablaPrendas";
import ModalEliminar from "../components/shared/ModalEliminar";
import Breadcrumb from "../components/navegacion/Breadcrumb";
import Spinner from "../components/shared/Spinner";
import MensajeError from "../components/shared/MensajeError";
import { getTipoDetalle } from '../services/categoriasService';
import styles from "./PaginaPrendas.module.css"

function PaginaPrendas() {
    const { id } = useParams();
    const tipoId = parseInt(id);

    const [infoTipo, setInfoTipo] = useState(null);

    const {
        prendas,
        cargando,
        error,
        mostrarForm,
        prendaEditando,
        prendaEliminando,
        setMostrarForm,
        setPrendaEditando,
        setPrendaEliminando,
        handleCrear,
        handleEditar,
        handleEliminar,
        handleCambiarEstado, 
    } = usePrendas(tipoId);

    useEffect(() => {
        const cargarInfo = async () => {
            try {
                const response = await getTipoDetalle(tipoId);
                setInfoTipo(response.data);
            } catch {

            }
        }
        if (tipoId) {
            cargarInfo();
        }
    }, [tipoId])
    
    const nivelesBreadcrumb = infoTipo ? [
        { label: 'Inicio', ruta: '/' },
        { label: infoTipo.categoria_nombre, ruta: `/categoria/${infoTipo.categoria_id}` },
        { label: infoTipo.subcategoria_nombre },
        { label: infoTipo.nombre },
    ] : [
        { label: 'Inicio', ruta: '/' },
        { label: 'Prendas' },
    ]

    const handleGuardar = (datos) => {
        if (prendaEditando) {
            handleEditar(datos);
        } else {
            handleCrear(datos);
        }
    }

    const handleClickEditar = (prenda) => {
        setMostrarForm(true);
        setPrendaEditando(prenda);
    }

    const handleCancelarForm = (datos) => {
        setMostrarForm(false);
        setPrendaEditando(null);
    }

    return (
        <div className={styles.pagina}>
            <Breadcrumb niveles={nivelesBreadcrumb} />
            <div className={styles.header}>
                <div>
                    <h1 className={styles.titulo}>
                        {infoTipo ? infoTipo.nombre : 'Prendas'}
                    </h1>
                    <p className={styles.subtitulo}>
                        {infoTipo ? `${infoTipo.categoria_nombre} · ${infoTipo.subcategoria_nombre}` : ''}
                    </p>
                </div>
                <button className={styles.btnAdd} onClick={() => { setMostrarForm(true); setPrendaEditando(null) }}>
                    + Añadir prenda
                </button>
            </div>

            {error && <MensajeError mensaje={error} />}

            {(mostrarForm || prendaEditando) && (
                <FormPrenda prenda={prendaEditando} onGuardar={handleGuardar} onCancelar={handleCancelarForm} />
            )}

            {cargando ? (
                <Spinner />
            ) : (
                <TablaPrendas prendas={prendas} onEditar={handleClickEditar} onEliminar={setPrendaEliminando} onCambiarEstado={handleCambiarEstado} />
            )}

            {prendaEliminando && (
                <ModalEliminar 
                    mensaje={`¿Seguro que quieres eliminar "${prendaEliminando.codigo}"?`}
                    advertencia={prendaEliminando.prestado ? 'Esta prenda está actualmente prestada' : null}
                    onConfirmar={handleEliminar}
                    onCancelar={() => setPrendaEliminando(null)}
                />
            )}

        </div>
    )
}

export default PaginaPrendas;