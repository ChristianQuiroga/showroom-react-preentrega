import styles from "./CartPage.module.css";
import { useCart } from "../../context/useCart";
import { formatearPrecio } from "../../utils/formatearPrecio";

function CartPage() {
  const { carrito, removeFromCart, getCartTotal, clearCart, updateQuantity } =
    useCart();

  if (carrito.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <h1>El carrito está vacío.</h1>
        <p>Agrega productos para continuar la compra.</p>
      </div>
    );
  }

  // Si hay productos, los mostramos.
  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Carrito de Compras</h1>

      {carrito.map((item) => (
        <div key={`${item.id}-${item.talle}`} className={styles.cartItem}>
          <img
            src={item.imagen}
            alt={item.nombre}
            className={styles.productImage}
          />

          <div className={styles.productInfo}>
            <h4>{item.nombre}</h4>
            <p>Talle: {item.talle}</p>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio unitario: {formatearPrecio(item.precio)}</p>

            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                disabled={item.cantidad <= 1}
                onClick={() =>
                  updateQuantity(item.id, item.talle, item.cantidad - 1)
                }
              >
                -
              </button>

              <span className={styles.quantityValue}>{item.cantidad}</span>

              <button
                className={styles.quantityButton}
                disabled={item.cantidad >= item.stock}
                onClick={() =>
                  updateQuantity(item.id, item.talle, item.cantidad + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.productActions}>
            <p>Subtotal</p>
            <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>

            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id, item.talle)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className={styles.cartSummary}>
        <h3>Total a pagar: {formatearPrecio(getCartTotal())}</h3>

        <button className={styles.clearButton} onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

export default CartPage;
