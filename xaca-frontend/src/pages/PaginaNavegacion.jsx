import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useNavegacion from "../hooks/useNavegacion";
import Breadcrumb from "../components/navegacion/Breadcrumb";
import ListaItems from "../components/navegacion/ListaItems";
import Spinner from "../components/shared/Spinner";
import MensajeError from "../components/shared/MensajeError";
import { getCategorias } from "../services/categoriasService";
import styles from './PaginaNavegacion.module.css';

const COLORES = {
    1: { borde: '#6FAF5A', fondo: 'rgba(111,175,90,0.15)',  texto: '#3D7D28' },
    2: { borde: '#8d6fd4', fondo: 'rgba(123,111,212,0.15)', texto: '#673ec5' },
    3: { borde: '#D46F99', fondo: 'rgba(212,111,153,0.15)', texto: '#AA3D70' },
    4: { borde: '#d4b46f', fondo: 'rgba(212, 160, 111, 0.15)', texto: '#d47f00' },
}


function PaginaNavegacion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categoriaId = parseInt(id);

    const [nombreCategoria, setNombreCategoria] = useState('');

    const {
        subcategorias,
        tipos,
        subcategoriaActiva,
        cargando,
        error,
        seleccionarSubcategoria,
        volverSubcategorias,
    } = useNavegacion(categoriaId);

    const color = COLORES[categoriaId] || { borde: '#aaa', fondo: 'rgba(0,0,0,0.08)', texto: '#555' };

    useEffect(() => {
        const cargarNombre = async () => {
            try {
                const response = await getCategorias();
                const categoria = response.data.find(c => c.id === categoriaId);
                if (categoria) {
                    setNombreCategoria(categoria.nombre);
                }
            } catch {

            }
        }
        cargarNombre();
    }, [categoriaId]);

    const nivelesBreadcrumb = subcategoriaActiva ? [
        { label: 'Inicio', ruta: '/' },
        { label: nombreCategoria, ruta: null, accion: volverSubcategorias },
        { label: subcategoriaActiva.nombre },
    ] : [
        { label: 'Inicio', ruta: '/' },
        { label: nombreCategoria },
    ]

    const handleSeleccionarTipo = (tipo) => {
        navigate(`/tipo/${tipo.id}`);
    }

    return (
        <div className={styles.pagina}>
            <Breadcrumb niveles={nivelesBreadcrumb} />
            <div className={styles.header}>
                <div className={styles.pageIcono} style={{ backgroundColor: color.fondo }}>
                    <span style={{ color: color.borde, fontSize: '22px' }}>◈</span>
                </div>
                <div>
                    <h1 className={styles.titulo}>{nombreCategoria}</h1>
                    <p className={styles.subtitulo}>{subcategoriaActiva ? `Tipos disponibles en ${subcategoriaActiva.nombre}` : 'Selecciona una subcategoría'}</p>
                </div>
            </div>

            {cargando && <Spinner />}
            {error && <MensajeError mensaje={error} />}

            {!cargando && !error && (
                <>
                    {!subcategoriaActiva && (
                        <>
                            <p className={styles.sectionLabel}>Subcategorías</p>
                            <ListaItems items={subcategorias} color={color} onSeleccionar={seleccionarSubcategoria} />
                        </>
                    )}

                    {subcategoriaActiva && (
                        <>
                            <div className={styles.tiposHeader}>
                                <p className={styles.sectionLabel}>Tipos</p>
                                <span className={styles.btnVolver} onClick={volverSubcategorias}>🡠 Volver a subcategorías</span>
                            </div>
                            <ListaItems items={tipos} color={color} onSeleccionar={handleSeleccionarTipo} />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default PaginaNavegacion;