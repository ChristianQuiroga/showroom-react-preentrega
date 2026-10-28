import { useCart } from "../../context/useCart";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  // Usamos el hook para acceder a la función.
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span className={styles.titleEyebrow}>Showroom</span>
        <span className={styles.titleBrand}>Casa Cuero</span>
      </h1>

      <div className={styles.tituloDerecho}>
        <nav className={styles.nav} aria-label="Navegación principal">
          <Link className={styles.link} to="/">
            Inicio
          </Link>

          <Link className={styles.link} to="/productos">
            Productos
          </Link>

          <Link className={styles.link} to="/alta">
            Alta
          </Link>

          <Link className={styles.link} to="/nosotros">
            Nosotros
          </Link>

          <Link className={styles.link} to="/contacto">
            Contacto
          </Link>

          <Link className={styles.link} to="/carrito" aria-label="Carrito">
            {totalItems > 0 && <span>{totalItems}</span>}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              style={{ verticalAlign: "middle" }}
            >
              <path d="M2 3h3l3 13h11l3-9H6" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
