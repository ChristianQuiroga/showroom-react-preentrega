import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 1. Inicializar Firebase Admin
initializeApp({
  credential: applicationDefault(),
  projectId: "showroom-commerce-firebase",
});

const db = getFirestore();

// 2. Localizar y leer el archivo JSON
const rutaJson = new URL("../public/data/productos.json", import.meta.url);

async function ejecutarSeed() {
  const contenido = await readFile(rutaJson, "utf8");
  const productos = JSON.parse(contenido);

  // 3. Validar los datos antes de escribir
  if (!Array.isArray(productos) || productos.length === 0) {
    throw new Error("El JSON debe contener un array de productos.");
  }

  const ids = new Set();

  for (const producto of productos) {
    if (
      !Number.isSafeInteger(producto.id) ||
      producto.id <= 0 ||
      !producto.nombre ||
      !Number.isFinite(producto.precio) ||
      producto.precio < 0 ||
      !Array.isArray(producto.talles)
    ) {
      throw new Error(`Producto inválido: ${JSON.stringify(producto)}`);
    }

    if (ids.has(producto.id)) {
      throw new Error(`ID duplicado: ${producto.id}`);
    }

    ids.add(producto.id);
  }

  // 4. Preparar las escrituras
  const batch = db.batch();

  for (const producto of productos) {
    const referencia = db.collection("productos").doc(String(producto.id));

    batch.set(referencia, producto);
  }

  // 5. Confirmar la carga
  await batch.commit();

  console.log(`Seed completado: ${productos.length} productos cargados.`);
}

// 6. Ejecutar y gestionar errores
ejecutarSeed().catch((error) => {
  console.error("Error al ejecutar el seed:", error);
  process.exitCode = 1;
});
