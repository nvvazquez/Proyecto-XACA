import { useEffect, useState } from "react"
import styles from './FormProveedor.module.css'

const ESTADO_INICIAL = { nombre: '', email: '', telefono: '' }

function FormProveedor({ proveedor, onGuardar, onCancelar }) {
    const [form, setForm] = useState(ESTADO_INICIAL)

    useEffect(() => {
        if (proveedor) {
            setForm({
                nombre: proveedor.nombre || '',
                email: proveedor.email || '',
                telefono: proveedor.telefono || '',
            })
        } else {
            setForm(ESTADO_INICIAL)
        }
    }, [proveedor])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (!form.nombre) { alert('El nombre es obligatorio'); return }
        if (!form.email)   { alert('El email es obligatorio'); return }
        if (!form.telefono){ alert('El teléfono es obligatorio'); return }
        onGuardar(form)
    }

    return (
        <div className={styles.form}>
            <h3 className={styles.titulo}>
                {proveedor ? 'Editar proveedor' : 'Nuevo proveedor'}
            </h3>

            <div className={styles.campos}>
                <div className={styles.campo}>
                    <label className={styles.label}>Nombre *</label>
                    <input className={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Textiles García S.L." />
                </div>

                <div className={styles.fila}>
                    <div className={styles.campo}>
                        <label className={styles.label}>Email *</label>
                        <input className={styles.input} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Ej: garcia@textiles.com" />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.label}>Teléfono *</label>
                        <input className={styles.input} name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="Ej: 631 000 111" />
                    </div>
                </div>
            </div>

            <div className={styles.acciones}>
                <button className={styles.btnCancelar} onClick={onCancelar}>Cancelar</button>
                <button className={styles.btnGuardar} onClick={handleSubmit}>
                    {proveedor ? 'Guardar cambios' : 'Crear proveedor'}
                </button>
            </div>
        </div>
    )
}

export default FormProveedor