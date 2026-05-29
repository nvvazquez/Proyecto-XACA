import { useEffect, useState } from "react"
import styles from './FormPrenda.module.css'

const Estado_Inicial = {
    codigo: '', medidas: '', color: ''
}

function FormPrenda(props) {
    const [form, setForm] = useState(Estado_Inicial);

    useEffect(() => {
        if (props.prenda) {
            setForm({
                codigo: props.prenda.codigo || '',
                medidas: props.prenda.medidas || '',
                color: props.prenda.color || '',
            })
        } else {
            setForm(Estado_Inicial)
        }
    }, [props.prenda])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (!form.codigo) {
            alert('Código es obligatorio');
            return;
        } else if (!form.medidas) {
            alert('Medidas son obligatorias');
            return;
        } else if (!form.color) {
            alert('Color es obligatorio')
            return
        }
        props.onGuardar(form);
    }

    return (
        <div className={styles.form}>
            <h3 className={styles.titulo}>
                {props.prenda ? 'Editar prenda' : 'Nueva prenda'}
            </h3>

            <div className={styles.campos}>
                <div className={styles.campo}>
                    <label className={styles.label}>Código *</label>
                    <input className={styles.input} name="codigo" value={form.codigo} onChange={handleChange} placeholder="Ej: P001" />
                </div>

                <div className={styles.fila}>
                    <div className={styles.campo}>
                        <label className={styles.label}>Medidas *</label>
                        <input className={styles.input} name="medidas" value={form.medidas} onChange={handleChange} placeholder="Ej: 50 cm" />
                    </div>

                    <div className={styles.campo}>
                        <label className={styles.label}>Color *</label>
                        <input className={styles.input} name="color" value={form.color} onChange={handleChange} placeholder="Ej: Gris" />
                    </div>
                </div>
            </div>

            <div className={styles.acciones}>
                <button className={styles.btnCancelar} onClick={props.onCancelar}>
                    Cancelar
                </button>
                <button className={styles.btnGuardar} onClick={handleSubmit}>
                    {props.prenda ? 'Guardar cambios' : 'Crear prenda'}
                </button>
            </div>
        </div>
    )
}

export default FormPrenda;