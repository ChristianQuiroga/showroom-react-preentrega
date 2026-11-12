// Importaciones de firebase (si es necesario)
import { db } from "../firebase/config";
import { doc, runTransaction } from "firebase/firestore"; // Función para crear un producto con un ID consecutivo en Firestore

export async function crearProductoConsecutivo(nuevoProducto) {
  const contadorRef = doc(db, "contadores", "productos");

  return await runTransaction(db, async (transaction) => {
    const contadorSnap = await transaction.get(contadorRef);

    if (!contadorSnap.exists()) {
      throw new Error("No existe el contador de productos.");
    }

    const ultimoId = contadorSnap.data().ultimoId;

    if (!Number.isSafeInteger(ultimoId) || ultimoId < 0) {
      throw new Error("Contador de productos inválido.");
    }

    const siguienteId = ultimoId + 1;
    if (!Number.isSafeInteger(siguienteId)) {
      throw new Error("Se alcanzó el límite de IDs consecutivos.");
    }
    
    const productoRef = doc(db, "productos", String(siguienteId));

    const productoSnap = await transaction.get(productoRef);

    if (productoSnap.exists()) {
      throw new Error("El ID siguiente ya está ocupado.");
    }

    transaction.set(productoRef, nuevoProducto);
    transaction.update(contadorRef, { ultimoId: siguienteId });

    return String(siguienteId);
  });
}
