// En src/contenedores/FormularioContainer/FormularioContainer.jsx
import { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import { convertirPrecio } from "../../utils/convertirPrecio";
import { subirImagen } from "../../services/imageService";
import { crearProductoConsecutivo } from "../../services/productService";

// Función para crear un producto en Firestore
export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: "",
    destacado: false,
    talles: [
      { talle: "S", cantidad: 0 },
      { talle: "M", cantidad: 0 },
      { talle: "L", cantidad: 0 },
      { talle: "XL", cantidad: 0 },
    ],
    //urlImagen: "",
  });

  // 1. Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagenKey, setImagenKey] = useState(0);

  // Manejar cambios en los inputs del formulario
  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosForm((anteriores) => ({
      ...anteriores,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Actualizar la cantidad de talles en el estado del formulario
  const manejarCambioTalle = (talle, valor) => {
    setDatosForm((anteriores) => ({
      ...anteriores,
      talles: anteriores.talles.map((item) =>
        item.talle === talle ? { ...item, cantidad: valor } : item,
      ),
    }));
  };

  const stockTotal = datosForm.talles.reduce(
    (total, item) => total + Number(item.cantidad),
    0,
  );

  // Función para manejar el evento onBlur del input de precio
  const manejarBlurPrecio = () => {
    if (datosForm.precio.trim() === "") return;

    const precio = convertirPrecio(datosForm.precio);

    if (!Number.isFinite(precio) || precio < 0) return;

    const precioFormateado = precio.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setDatosForm((anteriores) => ({
      ...anteriores,
      precio: precioFormateado,
    }));
  };

  // 2. Nueva función para manejar el cambio del input de archivo "file"
  const manejarCambioImagen = (evento) => {
    const file = evento.target.files[0];
    setImagenFile(file);
  };

  // Enviar los datos del formulario a la API
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validamos los datos del formulario antes de enviarlos
    const nombre = datosForm.nombre.trim();
    const precio = convertirPrecio(datosForm.precio);

    // Validamos que todas las cantidades de talles sean números enteros iguales o mayores a cero
    const tallesValidos = datosForm.talles.every((item) => {
      const cantidad = Number(item.cantidad);

      return (
        item.cantidad !== "" && Number.isSafeInteger(cantidad) && cantidad >= 0
      );
    });

    if (!tallesValidos) {
      alert("Ingresá cantidades enteras, iguales o mayores a cero.");
      return;
    }

    // Validaciones
    if (nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      alert("Ingresá un precio válido mayor a 0.");
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
    //await new Promise((resolve) => setTimeout(resolve, 3000)); //

    try {
      const urlImagen = await subirImagen(imagenFile);

      const productoCompleto = {
        nombre,
        precio,
        categoria: datosForm.categoria.trim(),
        descripcion: datosForm.descripcion.trim(),
        destacado: datosForm.destacado,
        imagen: urlImagen,
        talles: datosForm.talles.map((item) => ({
          talle: item.talle,
          cantidad: Number(item.cantidad),
        })),
      };

      const nuevoId = await crearProductoConsecutivo(productoCompleto);

      console.log("Producto creado correctamente. ID:", nuevoId);
      alert(`Producto creado correctamente con ID: ${nuevoId}`);
      setDatosForm({
        nombre: "",
        precio: "",
        categoria: "",
        descripcion: "",
        destacado: false,
        talles: [
          { talle: "S", cantidad: 0 },
          { talle: "M", cantidad: 0 },
          { talle: "L", cantidad: 0 },
          { talle: "XL", cantidad: 0 },
        ],
      });

      setImagenFile(null);
      setImagenKey((anterior) => anterior + 1);
    } catch (error) {
      console.error("Error al preparar el producto:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarCambioTalle={manejarCambioTalle}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      loading={loading}
      stockTotal={stockTotal}
      manejarBlurPrecio={manejarBlurPrecio}
      imagenKey={imagenKey}
    />
  );
}
