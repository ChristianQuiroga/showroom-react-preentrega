import styles from "./Formulario.module.css";

export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
}) {
  return (
    <form className={styles.formStyle} onSubmit={manejarEnvio}>
      <h3>Agregar Nuevo Producto</h3>
      <div>
        <label htmlFor="nombre">Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre" // Atributo clave para indentificar el imput
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="precio" // Atributo clave
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Imagen:</label>
        <input
          type="file"
          placeholder="https://…"
          name="Imagen"
          //value={datosForm.Imagen}
          onChange={manejarCambioImagen} // Nueva función para manejar el cambio del input de archivo
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Producto"}
      </button>
    </form>
  );
}
