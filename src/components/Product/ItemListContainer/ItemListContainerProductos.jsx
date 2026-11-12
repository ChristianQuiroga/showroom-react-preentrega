import ItemList from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";
import { useState, useEffect } from "react";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

function ItemListContainerProductos({ mensaje, soloDestacados = false }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosRef = collection(db, "productos");

        const respuesta = await getDocs(productosRef);

        const datos = respuesta.docs.map((documento) => ({
          ...documento.data(),
          id: Number(documento.id),
        }));

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

  // Filtrar los productos según el límite proporcionado
  const productosAMostrar = soloDestacados
    ? productos.filter((producto) => producto.destacado === true)
    : productos;

  return (
    <div className={styles.container}>
      {/*<h1 className={styles.subtitulo}>{Mensaje}</h1> */}
      {/*<ItemList products={productos} mensaje={"Black Friday"} /> */}
      <ItemList products={productosAMostrar} mensaje={mensaje} />
    </div>
  );
}

export default ItemListContainerProductos;
