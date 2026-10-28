import styles from "./ProductDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../../utils/formatearPrecio";
import { useCart } from "../../../context/useCart";

function ProductDetail() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargando(true);
      setError(null);
      setProducto(null);

      try {
        const response = await fetch("/data/productos.json");

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del producto");
        }

        const data = await response.json();

        const encontrado = data.find((item) => item.id === Number(id));

        if (activo) {
          setProducto(encontrado ?? null);
        }
      } catch (error) {
        if (activo) {
          setError(error.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!producto) {
    return <h2>Producto no encontrado.</h2>;
  }

  // obtener el stock seleccionado
  const stockTalle =
    producto.talles?.find((item) => item.talle === talleSeleccionado)
      ?.cantidad ?? 0;

  // agregar el producto
  const agregarAlCarrito = () => {
    if (!talleSeleccionado || cantidad < 1) {
      return;
    }
    const resultado = addToCart(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        stock: stockTalle,
      },
      talleSeleccionado,
      cantidad,
      stockTalle,
    );

    alert(resultado.mensaje);
  };

  return (
    <section className={styles.productDetail}>
      <Link to="/productos" className={styles.backLink}>
        ← Volver a productos
      </Link>

      <div className={styles.productLayout}>
        <div className={styles.imageContainer}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          {producto.destacado && (
            <span className={styles.featured}>Destacado</span>
          )}

          <h1>{producto.nombre}</h1>

          <p className={styles.price}>{formatearPrecio(producto.precio)}</p>

          <h3>Talles disponibles</h3>

          <div className={styles.sizes}>
            {producto.talles?.map((item) => (
              <button
                key={item.talle}
                type="button"
                disabled={item.cantidad === 0}
                onClick={() => {
                  setTalleSeleccionado(item.talle);
                  setCantidad(1);
                }}
                className={`${styles.size} ${
                  talleSeleccionado === item.talle ? styles.selectedSize : ""
                }`}
              >
                {item.talle}
                <small>Stock: {item.cantidad}</small>
              </button>
            ))}
          </div>

          <div className={styles.quantityControls}>
            <button
              type="button"
              disabled={!talleSeleccionado || cantidad <= 1}
              onClick={() => setCantidad(cantidad - 1)}
            >
              −
            </button>

            <span>{cantidad}</span>

            <button
              type="button"
              disabled={!talleSeleccionado || cantidad >= stockTalle}
              onClick={() => setCantidad(cantidad + 1)}
            >
              +
            </button>
          </div>

          {producto.descripcion && (
            <div className={styles.description}>
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>
          )}

          <button
            type="button"
            onClick={agregarAlCarrito}
            disabled={!talleSeleccionado || stockTalle === 0}
            className={styles.addToCartButton}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
