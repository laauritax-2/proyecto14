// PROYECTO 14: CALCULADORA DE EDAD
// Este archivo controla el calendario, las validaciones y el cálculo.

// Importamos Luxon para trabajar correctamente con fechas.
// Luxon ayuda a convertir fechas y calcular diferencias.
import { DateTime } from "luxon";

// Importamos Flatpickr para mostrar un calendario personalizado.
// Flatpickr crea el calendario personalizado.
import flatpickr from "flatpickr";
// Importamos la traducción al español del calendario.
import { Spanish } from "flatpickr/dist/l10n/es.js";
import "flatpickr/dist/flatpickr.min.css";
import "./style.css";

// Guardamos en variables los elementos que vamos a utilizar.
// Buscamos en el HTML los elementos que JavaScript necesita controlar.
const formulario = document.getElementById("formulario-edad");
const campoFecha = document.getElementById("fecha-nacimiento");
const errorFecha = document.getElementById("error-fecha");
const resultado = document.getElementById("resultado");

const elementoAnios = document.getElementById("anios");
const elementoMeses = document.getElementById("meses");
const elementoDias = document.getElementById("dias");
const mensajeEdad = document.getElementById("mensaje-edad");

// Configuramos Flatpickr. Así evitamos el calendario predeterminado del navegador.
// Convierte el campo de texto en un calendario interactivo.
flatpickr(campoFecha, {
    locale: Spanish,
    dateFormat: "d/m/Y",
    maxDate: "today",
    allowInput: true,
    disableMobile: true
});

// Esta función calcula años, meses y días completos desde el nacimiento.
// Recibe nacimiento y fecha actual; devuelve años, meses y días completos.
function calcularEdad(fechaNacimiento, fechaActual) {
    // Empezamos calculando la diferencia entre los años.
    // Calculamos primero la diferencia entre los años.
    let anios = fechaActual.year - fechaNacimiento.year;

    // Si todavía no ha llegado el cumpleaños de este año, restamos un año.
    let fechaAniversario = fechaNacimiento.plus({ years: anios });

    // Si este año todavía no ha llegado el cumpleaños, restamos un año.
    if (fechaAniversario > fechaActual) {
        anios--;
        fechaAniversario = fechaNacimiento.plus({ years: anios });
    }

    // Calculamos los meses que han pasado desde el último cumpleaños.
    // Calculamos los meses que han pasado desde el último cumpleaños.
    let meses = fechaActual.month - fechaAniversario.month;

    if (fechaActual.day < fechaAniversario.day) {
        meses--;
    }

    // Evitamos que la cantidad de meses sea negativa.
    if (meses < 0) {
        meses += 12;
    }

    // Sumamos los años y meses completos para encontrar la fecha de referencia.
    // Sumamos los meses completos para obtener la fecha desde la que contamos días.
    const fechaReferencia = fechaAniversario.plus({ months: meses });

    // La diferencia restante corresponde a los días completos.
    // La diferencia restante se expresa en días completos.
    const dias = Math.floor(fechaActual.diff(fechaReferencia, "days").days);

    return { anios, meses, dias };
}

// Cuando se envía el formulario, validamos la fecha y mostramos el resultado.
// Espera a que el usuario pulse el botón y envíe el formulario.
formulario.addEventListener("submit", function (evento) {
    // Evita que el navegador recargue la página al enviar el formulario.
    evento.preventDefault(); // Evita que la página se recargue.

    errorFecha.textContent = "";
    resultado.hidden = true;

    // Flatpickr muestra la fecha como día/mes/año.
    // Leemos la fecha escrita o elegida en el calendario.
    const fechaTexto = campoFecha.value.trim();
    const fechaNacimiento = DateTime.fromFormat(fechaTexto, "d/M/yyyy", {
        zone: "utc"
    }).startOf("day");

    // Validamos que el campo no esté vacío y que la fecha exista.
    // Si está vacío o no representa una fecha real, mostramos un error y paramos.
    if (!fechaTexto || !fechaNacimiento.isValid) {
        errorFecha.textContent = "Por favor, selecciona una fecha válida.";
        campoFecha.focus();
        return;
    }

    // No permitimos fechas posteriores al día actual.
    // Obtenemos la fecha de hoy para compararla con el nacimiento.
    const fechaActual = DateTime.now().toUTC().startOf("day");

    // No se puede calcular la edad con una fecha que todavía no ha ocurrido.
    if (fechaNacimiento > fechaActual) {
        errorFecha.textContent = "La fecha de nacimiento no puede ser futura.";
        campoFecha.focus();
        return;
    }

    // Calculamos la edad y colocamos cada valor en su espacio.
    // Ejecutamos la función que calcula años, meses y días.
    const edad = calcularEdad(fechaNacimiento, fechaActual);

    // Escribimos cada número en el espacio correspondiente del HTML.
    elementoAnios.textContent = edad.anios;
    elementoMeses.textContent = edad.meses;
    elementoDias.textContent = edad.dias;

    // Mostramos una frase completa con el resultado.
    mensajeEdad.textContent =
        `Han pasado ${edad.anios} años, ${edad.meses} meses y ${edad.dias} días desde tu nacimiento.`;

    // Mostramos el bloque de resultado en la misma página.
    // Quitamos hidden para que el resultado se vea en pantalla.
    resultado.hidden = false;
});
