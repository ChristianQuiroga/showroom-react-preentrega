export function convertirPrecio(valor) {
  const texto = String(valor).trim();

  const formatoValido =
    /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(texto);

  if (!formatoValido) {
    return NaN;
  }

  return Number(texto.replace(/\./g, "").replace(",", "."));
}