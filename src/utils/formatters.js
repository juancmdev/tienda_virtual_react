/**
 * Formatea un número al formato de moneda de Pesos Colombianos (COP).
 * @param {number} amount El valor numérico a formatear.
 * @returns {string} El valor formateado como cadena de texto.
 */
export const formatCurrency = (amount) => {
  // Usamos 'es-CO' para el idioma y 'COP' para la moneda.
  // style: 'currency' asegura que se incluya el símbolo ($).
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
};
