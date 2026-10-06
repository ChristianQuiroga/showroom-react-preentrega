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
          id="nombre"
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre" // Atributo clave para indentificar el imput
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
          minLength={3}
          maxLength={60}
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          id="precio"
          type="number"
          placeholder="Ej: 250000"
          name="precio" // Atributo clave
          value={datosForm.precio}
          onChange={manejarCambio}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label>Stock:</label>
        <input
          id="stock"
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
          required
          min="0"
          step="1"
        />
      </div>

      <div>
        <label>Imagen:</label>
        <input
          id="imagen"
          type="file"
          placeholder="https://…"
          name="Imagen"
          //value={datosForm.Imagen}
          onChange={manejarCambioImagen} // Nueva función para manejar el cambio del input de archivo
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Producto"}
      </button>
    </form>
  );
}
