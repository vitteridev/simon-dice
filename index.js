let secuenciaDeColoresJugador = [];
let secuenciaDeColoresMaquina = [];
const COLORES = ["blue", "red", "yellow", "green"];
const $BOTONES = document.querySelectorAll(".btn");
const contenedorDeBotones = document.querySelector(".contenedor-de-botones");

const $btnJugar = document.querySelector(".btn-jugar");

$btnJugar.onclick = ronda;

function obtenerSecuenciaJugador(color) {
  secuenciaDeColoresJugador.push(color);
}

$BOTONES.forEach((boton) => {
  boton.addEventListener("click", function (btn) {
    let colorJugador = btn.target.id;
    obtenerSecuenciaJugador(colorJugador);
    remarcarColor(colorJugador);
    compararSecuencias(secuenciaDeColoresJugador.length - 1);
  });
});

function obtenerNumeroRandom() {
  let numeroRandom = Math.floor(Math.random() * COLORES.length);
  return numeroRandom;
}

function obtenerColorRandom() {
  return COLORES[obtenerNumeroRandom()];
}

function remarcarColor(id) {
  const claseBotonActivo = "btn-activo";
  let $idBoton = document.querySelector(`#${id}`);
  $idBoton.classList.add(claseBotonActivo);
  setTimeout(() => {
    $idBoton.classList.remove(claseBotonActivo);
  }, 250);
}

function obtenerSecuenciaMaquina() {
  let color = obtenerColorRandom();
  secuenciaDeColoresMaquina.push(color);
}

function bloquearClicksJugador() {
  contenedorDeBotones.classList.add("bloquear-clicks");
}

function desbloquearClicksJugador() {
  contenedorDeBotones.classList.remove("bloquear-clicks");
}

function compararSecuencias(nivelActual) {
  if (
    secuenciaDeColoresJugador[nivelActual] ===
    secuenciaDeColoresMaquina[nivelActual]
  ) {
    if (secuenciaDeColoresMaquina.length === secuenciaDeColoresJugador.length) {
      setTimeout(() => {
        ronda();
      }, 1000);
    }
  } else {
    juegoPerdido();
  }
}

function desbloquearBotonJugar() {
  $btnJugar.classList.remove("bloquear-clicks");
}

function bloquearBotonJugar() {
  $btnJugar.classList.add("bloquear-clicks");
}

function juegoPerdido() {
  alert("perdiste");
  secuenciaDeColoresJugador = [];
  secuenciaDeColoresMaquina = [];
  desbloquearBotonJugar();
}

function ronda() {
  secuenciaDeColoresJugador = [];
  bloquearBotonJugar();

  bloquearClicksJugador();
  obtenerSecuenciaMaquina();

  secuenciaDeColoresMaquina.forEach(function ($boton, i) {
    const contadorMaquina = (i + 1) * 1000;
    setTimeout(() => {
      remarcarColor($boton);
    }, contadorMaquina);
  });

  const contadorJugador = (secuenciaDeColoresMaquina.length + 1) * 1000;

  setTimeout(function () {
    desbloquearClicksJugador();
  }, contadorJugador);
}
