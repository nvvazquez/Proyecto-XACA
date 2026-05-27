import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <div className={styles.logo}></div>
                <span className={styles.title}>Almacén XACA</span>
            </div>
            <div className={styles.links}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Inicio</NavLink>
                <NavLink to="/prestadas" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Prestadas</NavLink>
                <NavLink to="/proveedores" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>Proveedores</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;