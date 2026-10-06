// En src/contenedores/FormularioContainer/FormularioContainer.jsx
import { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    //urlImagen: "",
  });
  // 1. Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs del formulario
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };
  // 2. Nueva función para manejar el cambio del input de archivo "file"
  const manejarCambioImagen = (evento) => {
    const file = evento.target.files[0];
    setImagenFile(file);
  };
  /*
  // Enviar los datos del formulario a la API
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log("Enviando los siguientes datos a la API:", datosForm);
  };
*/
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validamos los datos del formulario antes de enviarlos
    const nombre = datosForm.nombre.trim();
    const precio = parseFloat(datosForm.precio);
    const stock = parseInt(datosForm.stock);

    if (nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      alert("Ingresá un precio válido mayor a 0.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      alert("El stock debe ser un número entero igual o mayor a 0.");
      return;
    }

    // Validamos que el usuario haya seleccionado un archivo de imagen
    if (!imagenFile) {
      alert("Por favor, selecciona un archivo de imagen.");
      return;
    }

    if (!imagenFile.type.startsWith("image/")) {
      alert("El archivo seleccionado debe ser una imagen.");
      return;
    }

    setLoading(true); // Iniciamos el estado de carga
    //await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulamos un retraso de 3 segundos

    // Lógica para subir la imagen a un servicio de almacenamiento (por ejemplo, Cloudinary, Imgbb, etc.) y obtener la URL de la imagen)
    //const apiKey = process.env.API_KEY; // Asegúrate de tener la variable de entorno configurada
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const datosImgbb = await respuestaImgbb.json();
      if (datosImgbb.success) {
        const urlImagen = datosImgbb.data.url;
        console.log("Imagen subida con éxito. URL:", urlImagen);

        // Unimos la URL de la imagen con el resto de los datos del formulario
        const productoCompleto = {
          ...datosForm,
          nombre: datosForm.nombre.trim(),
          precio: Number(datosForm.precio),
          stock: Number(datosForm.stock),
          urlImagen: urlImagen,
        };

        console.log(
          "Enviando los siguientes datos Completos a la API:",
          productoCompleto,
        );
      } else {
        throw new Error(
          "La subida de la imagen a Imgbb falló: " + datosImgbb.error.message,
        );
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert(
        "Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setLoading(false); // Finalizamos el estado de carga
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      loading={loading}
    />
  );
}
