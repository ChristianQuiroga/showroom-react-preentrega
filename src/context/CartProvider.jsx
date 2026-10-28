import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // funcion agregar a carrito
  const addToCart = (producto, talle, cantidad, stockTalle) => {
    const existente = carrito.find(
      (item) => item.id === producto.id && item.talle === talle,
    );

    const cantidadCarrito = existente?.cantidad ?? 0;

    if (cantidadCarrito + cantidad > stockTalle) {
      return {
        ok: false,
        mensaje: "La cantidad solicitada supera el stock disponible.",
      };
    }

    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id && item.talle === talle,
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id && item.talle === talle
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [...carritoActual, { ...producto, talle, cantidad }];
    });

    return {
      ok: true,
      mensaje: "Producto agregado correctamente.",
    };
  };

  // función remover del carrito
  const removeFromCart = (id, talle) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => !(item.id === id && item.talle === talle)),
    );
  };

  // función limpiar carrito
  const clearCart = () => {
    setCarrito([]);
  };

  // función que suma las unidades de todos los productos. usa reduce() método de arrays que permite reccorrer todos sus elementos y obtner un único resultad. Ese resultado puede ser una suma, una resta, un prometio, un objeto, etc.
  const getCartQuantity = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // función obtener el total del carrito.
  const getCartTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  //
  const updateQuantity = (id, talle, nuevaCantidad) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) => {
        if (item.id !== id || item.talle !== talle) {
          return item;
        }

        console.log("Producto encontrado:", item);
        console.log("Stock:", item.stock);
        console.log("Nueva cantidad:", nuevaCantidad);

        if (nuevaCantidad < 1 || nuevaCantidad > item.stock) {
          return item;
        }

        return {
          ...item,
          cantidad: nuevaCantidad,
        };
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        addToCart,
        removeFromCart,
        clearCart,
        getCartQuantity,
        getCartTotal,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
