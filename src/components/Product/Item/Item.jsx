//  import ProductCard from "../ProducCard/ProductCard";
import { useState } from "react";
import styles from "./Item.module.css";

function Item({
  nombre,
  precio,
  imagen,
  talles,
  talleSeleccionado,
  stockTalle,
  onSeleccionarTalle,
}) {
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  const incrementar = () => {
    if (talleSeleccionado && cantidad < stockTalle) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad >= 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (!talleSeleccionado) {
      alert("Por favor, selecciona un talle antes de agregar al carrito.");
      return;
    }

    if (cantidad === 0) {
      alert(
        "Por favor, selecciona una cantidad mayor a 0 antes de agregar al carrito.",
      );
      return;
    }

    alert(
      `Agregaste ${cantidad} unidades de ${nombre}, talle ${talleSeleccionado} al carrito`,
    );
  };

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.card}>
      <img src={imagen} className={styles.imagen} alt={nombre} />

      <div className={styles.cardTitle}>
        <h3>{nombre}</h3>

        <span className={styles.favorito} onClick={marcarComoFavorito}>
          {esFavorito ? "⭐" : "☆"}
        </span>
      </div>

      <p>Precio: ${precio}</p>

      <div className={styles.talles}>
        {talles.map((item) => (
          <button
            key={item.talle}
            type="button"
            disabled={item.cantidad === 0}
            onClick={() => {
              setCantidad(0); // Reinicia la cantidad al seleccionar un nuevo talle
              onSeleccionarTalle(item.talle);
            }}
            className={
              talleSeleccionado === item.talle
                ? styles.seleccionado
                : styles.talle
            }
          >
            {item.talle}
          </button>
        ))}
      </div>

      {/* <p>Stock: {stockTalle}</p> */}
      <p>Stock: {stockTalle !== null ? stockTalle : "Seleccione un talle"}</p>

      <div className={styles.contador}>
        <button
          onClick={decrementar}
          disabled={!talleSeleccionado || cantidad === 0}
        >
          -
        </button>

        <span>{cantidad}</span>

        <button
          onClick={incrementar}
          disabled={!talleSeleccionado || cantidad >= stockTalle}
        >
          +
        </button>
      </div>

      <button onClick={agregarAlCarrito}>Agregar al Carrito</button>
    </div>
  );
}

export default Item;
