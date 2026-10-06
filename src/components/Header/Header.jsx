import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span className={styles.titleEyebrow}>Showroom</span>
        <span className={styles.titleBrand}>Casa Cuero</span>
      </h1>

      <nav className={styles.tituloDerecho}>
        <nav className={styles.nav}>
          <a className={styles.link} href="#">
            Inicio
          </a>

          <a className={styles.link} href="#">
            Productos
          </a>

          <a className={styles.link} href="#">
            Nosotros
          </a>

          <a className={styles.link} href="#">
            Contacto
          </a>

          <a className={styles.link} href="#" aria-label="Carrito">
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
          </a>
        </nav>
      </nav>
    </header>
  );
}

export default Header;
