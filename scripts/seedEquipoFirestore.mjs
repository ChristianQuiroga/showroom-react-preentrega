import { readFile } from "node:fs/promises";
import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Inicializar Firebase Admin
if (getApps().length === 0) {
  initializeApp({
    credential: applicationDefault(),
    projectId: "showroom-commerce-firebase",
  });
}

const db = getFirestore();

const rutaJson = new URL("../public/data/nosotros.json", import.meta.url);

async function ejecutarSeedEquipo() {
  const contenido = await readFile(rutaJson, "utf8");
  const integrantes = JSON.parse(contenido);

  if (!Array.isArray(integrantes) || integrantes.length === 0) {
    throw new Error("El JSON debe contener un array de integrantes.");
  }

  const ids = new Set();

  for (const integrante of integrantes) {
    if (
      !Number.isSafeInteger(integrante.id) ||
      integrante.id <= 0 ||
      typeof integrante.nombre !== "string" ||
      !integrante.nombre.trim() ||
      typeof integrante.puesto !== "string" ||
      !integrante.puesto.trim() ||
      typeof integrante.foto !== "string" ||
      !integrante.foto.trim()
    ) {
      throw new Error(`Integrante inválido: ${JSON.stringify(integrante)}`);
    }

    if (ids.has(integrante.id)) {
      throw new Error(`ID duplicado: ${integrante.id}`);
    }

    ids.add(integrante.id);
  }

  const batch = db.batch();

  for (const integrante of integrantes) {
    const referencia = db.collection("equipo").doc(String(integrante.id));
    batch.set(referencia, integrante);
  }

  await batch.commit();

  console.log(`Seed completado: ${integrantes.length} integrantes cargados.`);
}

ejecutarSeedEquipo().catch((error) => {
  console.error("Error al ejecutar el seed del equipo:", error);
  process.exitCode = 1;
});
