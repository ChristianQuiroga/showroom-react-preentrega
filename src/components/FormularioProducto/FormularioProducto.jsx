import styles from "./Formulario.module.css";

export function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarCambioTalle,
  manejarEnvio,
  manejarCambioImagen,
  loading,
  stockTotal,
  manejarBlurPrecio,
  imagenKey
}) {

  return (
    <form className={styles.formStyle} onSubmit={manejarEnvio}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Catálogo</span>
        <h2>Agregar producto</h2>
        <p>Completá los datos para sumar una prenda al showroom.</p>
      </header>

      <div className={styles.field}>
        <label htmlFor="nombre">Nombre del producto</label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej.: Campera de cuero"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
          minLength={3}
          maxLength={60}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="camperas">Camperas</option>
          <option value="conjuntos">Conjuntos</option>
          <option value="tops">Tops</option>
          <option value="pantalones">Pantalones</option>
          <option value="accesorios">Accesorios</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          placeholder="Ej.: Campera de cuero de marca X"
          name="descripcion"
          value={datosForm.descripcion}
          onChange={manejarCambio}
          required
          minLength={10}
          maxLength={200}
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="text"
          inputMode="decimal"
          name="precio"
          placeholder="Ej.: 158999,99"
          value={datosForm.precio}
          onChange={manejarCambio}
          onBlur={manejarBlurPrecio}
          required
        />
      </div>

      <fieldset className={styles.sizesSection}>
        <legend>Stock por talle</legend>
        <div className={styles.sizesGrid}>
          {datosForm.talles.map((item) => (
            <label
              className={styles.sizeField}
              key={item.talle}
              htmlFor={`stock-${item.talle}`}
            >
              <span>{item.talle}</span>
              <input
                id={`stock-${item.talle}`}
                type="number"
                min="0"
                step="1"
                value={item.cantidad}
                onChange={(evento) =>
                  manejarCambioTalle(item.talle, evento.target.value)
                }
                required
              />
            </label>
          ))}
        </div>
        <p className={styles.stockTotal}>
          Stock total <strong>{stockTotal}</strong>
        </p>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="imagen">Imagen del producto</label>
        <input
          id="imagen"
          type="file"
          key={imagenKey}
          name="Imagen"
          accept="image/*"
          onChange={manejarCambioImagen}
          required
        />
      </div>

      <label className={styles.featured} htmlFor="destacado">
        <input
          id="destacado"
          type="checkbox"
          name="destacado"
          checked={datosForm.destacado}
          onChange={manejarCambio}
        />
        <span>Marcar como producto destacado</span>
      </label>

      <button className={styles.submitButton} type="submit" disabled={loading}>
        {loading ? "Guardando…" : "Guardar producto"}
      </button>
    </form>
  );
}
