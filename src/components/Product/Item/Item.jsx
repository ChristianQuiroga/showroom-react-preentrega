//  import ProductCard from "../ProducCard/ProductCard";
import { useState } from "react";
import styles from "./Item.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/useCart";

function Item({
  id,
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
  const { addToCart } = useCart();

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

    const resultado = addToCart(
      { id, nombre, precio, imagen, stock: stockTalle },
      talleSeleccionado,
      cantidad,
      stockTalle,
    );

    if (resultado.ok) {
      setCantidad(0);
    }

    alert(resultado.mensaje);
  };

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.card}>
      <Link to={`/producto/${id}`}>
        <img src={imagen} className={styles.imagen} alt={nombre} />
      </Link>
      <div className={styles.cardTitle}>
        <h3>{nombre}</h3>

        <span className={styles.favorito} onClick={marcarComoFavorito}>
          {esFavorito ? "⭐" : "☆"}
        </span>
      </div>

      <p>
        Precio: $
        {Number(precio).toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>

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
      <Link to={`/producto/${id}`} className={styles.detalleLink}>
        Ver Detalle
      </Link>

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

      {talleSeleccionado && cantidad === 0 && (
        <p className={styles.validationMessage}>
          Seleccioná una cantidad para agregar al carrito.
        </p>
      )}

      <button
        onClick={agregarAlCarrito}
        disabled={!talleSeleccionado || cantidad === 0}
      >
        Agregar al Carrito
      </button>
    </div>
  );
}

export default Item;
