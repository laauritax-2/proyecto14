const { DateTime } = luxon;

function calcularEdad() {
  const inputFecha = document.getElementById('fechaNacimiento').value;
  const resultadoP = document.getElementById('resultado');

  if (!inputFecha) {
    resultadoP.textContent = 'Por favor, selecciona una fecha válida.';
    return;
  }

  // Fecha de nacimiento desde el input (formato YYYY-MM-DD)
  const fechaNacimiento = DateTime.fromISO(inputFecha);
  const ahora = DateTime.now();

  // Validar si la fecha de nacimiento es en el futuro
  if (fechaNacimiento > ahora) {
    resultadoP.textContent = 'La fecha de nacimiento no puede ser en el futuro.';
    return;
  }

  // Calcular la diferencia en años, meses y días
  const diferencia = ahora.diff(fechaNacimiento, ['years', 'months', 'days']).toObject();

  const anos = Math.floor(diferencia.years);
  const meses = Math.floor(diferencia.months);
  const dias = Math.floor(diferencia.days);

  resultadoP.textContent = `Tienes ${anos} años, ${meses} meses y ${dias} días.`;
}
