/* function subirImagen(imagenFile) {
 Lógica para subir la imagen a un servicio de almacenamiento (por ejemplo, Cloudinary, Imgbb, etc.) y obtener la URL de la imagen)
*/

export async function subirImagen(imagenFile) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("No está configurada la API Key de ImgBB.");
  }

  if (!imagenFile || !imagenFile.type.startsWith("image/")) {
    throw new Error("Debés seleccionar un archivo de imagen válido.");
  }

  const formData = new FormData();
  formData.append("image", imagenFile);

  const respuesta = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!respuesta.ok) {
    throw new Error(`Error HTTP al subir la imagen: ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  if (!datos.success || !datos.data?.url) {
    throw new Error(
      datos.error?.message || "ImgBB no devolvió una URL válida.",
    );
  }

  return datos.data.url;
}
