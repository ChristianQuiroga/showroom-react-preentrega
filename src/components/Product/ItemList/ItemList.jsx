import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import { useState } from "react";

function ItemList({ products, mensaje }) {
  const [tallesSeleccionados, setTallesSeleccionados] = useState({});

  const SeleccionarTalle = (productId, talle) => {
    setTallesSeleccionados({
      ...tallesSeleccionados,
      [productId]: talle
    });
  };


  return (
    <>
      <h1>{mensaje}</h1>

      <div className={styles.container}>
        {products.map((product) => {
          const talleSeleccionado = tallesSeleccionados[product.id];

          const talleActual = product.talles.find(
            (item) => item.talle === talleSeleccionado,
          );

          const stockTalle = talleActual ? talleActual.cantidad : null;

          return (
            <Item
              key={product.id}
              {...product}
              talleSeleccionado={talleSeleccionado}
              stockTalle={stockTalle}
              onSeleccionarTalle={(talle) =>
                SeleccionarTalle(product.id, talle)
              }
            />
          );
        })}
      </div>
    </>
  );
}

export default ItemList;
