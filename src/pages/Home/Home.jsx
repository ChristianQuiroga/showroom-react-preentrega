
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import ItemListContainerProductos from "../../components/Product/ItemListContainer/ItemListContainerProductos";

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>
          CASA CUERO
        </span>

        <h1>Cuero auténtico. Estilo que perdura.</h1>

        <p>
          Descubrí nuestra colección de prendas de cuero seleccionadas, donde el diseño y la calidad se encuentran.
        </p>

        <Link to="/productos" className={styles.catalogButton}>
          Explorar colección
        </Link>
      </div>

      <section className={styles.destacados}>
        <h2>Productos destacados</h2>

        <ItemListContainerProductos
          soloDestacados={true}
        />

        <Link to="/productos" className={styles.viewAll}>
          Ver todos los productos →
        </Link>
      </section>
    </section>
  );
}

export default Home;
