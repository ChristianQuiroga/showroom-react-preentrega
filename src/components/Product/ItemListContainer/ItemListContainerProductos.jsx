import ItemList from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";
import { useState, useEffect } from "react";

function ItemListContainerProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch("/data/productos.json");

        if (!respuesta.ok) {
          throw new Error("No se pude cargar la información de los productos");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      {/*<h1 className={styles.subtitulo}>{Mensaje}</h1> */}
      <ItemList products={productos} mensaje={"Black Friday"} />
    </div>
  );
}

export default ItemListContainerProductos;
