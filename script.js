
/* PROYECTO 14: CALCULADORA DE EDAD */

/* 1. Importamos Luxon para trabajar con fechas. */
import { DateTime } from "luxon";

/* 2. Importamos Flatpickr para crear el calendario. */
import flatpickr from "flatpickr";

/* 3. Importamos el idioma español. */
import { Spanish } from "flatpickr/dist/l10n/es.js";

/* 4. Importamos los estilos del calendario. */
import "flatpickr/dist/flatpickr.min.css";

/* 5. Importamos nuestros estilos CSS. */
import "./style.css";


/* 6. Buscamos los elementos del HTML. */

const formulario = document.getElementById("formulario-edad");

const campoFecha = document.getElementById("fecha-nacimiento");

const errorFecha = document.getElementById("error-fecha");

const resultado = document.getElementById("resultado");

const elementoAnios = document.getElementById("anios");

const elementoMeses = document.getElementById("meses");

const elementoDias = document.getElementById("dias");

const mensajeEdad = document.getElementById("mensaje-edad");


/* 7. Configuramos el calendario Flatpickr. */

flatpickr(campoFecha, {

    locale: Spanish,

    dateFormat: "Y-m-d",

    altInput: true,

    altFormat: "d/m/Y",

    maxDate: "today",

    allowInput: false,

    disableMobile: true

});


/* 8. Creamos la función para calcular la edad. */

function calcularEdad(fechaNacimiento, fechaActual) {

    // Calculamos la diferencia inicial entre los años.
    let anios = fechaActual.year - fechaNacimiento.year;

    // Obtenemos el último cumpleaños.
    let aniversario = fechaNacimiento.plus({
        years: anios
    });

    // Si todavía no ha llegado el cumpleaños,
    // restamos un año.
    if (aniversario > fechaActual) {

        anios--;

        aniversario = fechaNacimiento.plus({
            years: anios
        });
    }

    // Calculamos los meses desde el último cumpleaños.
    let meses =
        (fechaActual.year - aniversario.year) * 12 +
        (fechaActual.month - aniversario.month);

    // Calculamos una fecha provisional con esos meses.
    let referencia = aniversario.plus({
        months: meses
    });

    // Si todavía no se han completado esos meses,
    // restamos uno.
    if (referencia > fechaActual) {

        meses--;

        referencia = aniversario.plus({
            months: meses
        });
    }

    // Calculamos los días restantes.
    const dias = Math.floor(
        fechaActual.diff(referencia, "days").days
    );

    // Devolvemos los tres valores.
    return {
        anios,
        meses,
        dias
    };
}


/* 9. Escuchamos el envío del formulario. */

formulario.addEventListener("submit", function(evento) {

    // Evitamos que la página se recargue.
    evento.preventDefault();

    // Limpiamos los mensajes anteriores.
    errorFecha.textContent = "";

    // Ocultamos el resultado anterior.
    resultado.hidden = true;


    /* 10. Obtenemos la fecha seleccionada. */

    const fechaTexto = campoFecha.value.trim();

    // Convertimos el texto en una fecha de Luxon.
    const fechaNacimiento = DateTime.fromISO(
        fechaTexto,
        { zone: "local" }
    ).startOf("day");


    /* 11. Validamos la fecha. */

    if (!fechaTexto || !fechaNacimiento.isValid) {

        errorFecha.textContent =
            "Por favor, selecciona una fecha válida.";

        return;
    }


    /* 12. Obtenemos la fecha actual. */

    const fechaActual = DateTime.now().startOf("day");


    // Comprobamos que la fecha no sea futura.
    if (fechaNacimiento > fechaActual) {

        errorFecha.textContent =
            "La fecha de nacimiento no puede ser futura.";

        return;
    }


    /* 13. Ejecutamos el cálculo. */

    const edad = calcularEdad(
        fechaNacimiento,
        fechaActual
    );


    /* 14. Mostramos los resultados en el HTML. */

    elementoAnios.textContent = edad.anios;

    elementoMeses.textContent = edad.meses;

    elementoDias.textContent = edad.dias;


    /* 15. Creamos el mensaje final. */

    mensajeEdad.textContent =
        `Han pasado ${edad.anios} años, ` +
        `${edad.meses} meses y ${edad.dias} días desde tu nacimiento.`;


    /* 16. Mostramos la sección de resultados. */

    resultado.hidden = false;

});
