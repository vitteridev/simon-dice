let secuenciaDeColoresJugador = [];
let secuenciaDeColoresMaquina = [];
const COLORES = ["blue", "red", "yellow", "green"];
const $botones = document.querySelectorAll(".btn");
const $contenedorDeBotones = document.querySelector(".contenedor-de-botones");

const $btnJugar = document.querySelector(".btn-jugar");

$btnJugar.onclick = manejarRonda;

$botones.forEach((boton) => {
  boton.addEventListener("click", function (btn) {
    const colorJugador = btn.target.id;
    secuenciaDeColoresJugador.push(colorJugador);
    remarcarColor(colorJugador);
    compararSecuencias(secuenciaDeColoresJugador.length - 1);
  });
});

function obtenerColorRandom() {
  let numRandom = Math.floor(Math.random() * COLORES.length);
  return COLORES[numRandom];
}

function remarcarColor(id) {
  const claseBotonActivo = "btn-activo";
  let $idBoton = document.querySelector(`#${id}`);
  $idBoton.classList.add(claseBotonActivo);
  setTimeout(() => {
    $idBoton.classList.remove(claseBotonActivo);
  }, 250);
}

function agregarSecuenciaMaquina() {
  let color = obtenerColorRandom();
  secuenciaDeColoresMaquina.push(color);
}

function bloquearClicksJugador() {
  $contenedorDeBotones.classList.add("bloquear-clicks");
}

function desbloquearClicksJugador() {
  $contenedorDeBotones.classList.remove("bloquear-clicks");
}

function compararSecuencias(nivelActual) {
  if (
    secuenciaDeColoresJugador[nivelActual] ===
    secuenciaDeColoresMaquina[nivelActual]
  ) {
    if (secuenciaDeColoresMaquina.length === secuenciaDeColoresJugador.length) {
      setTimeout(() => {
        manejarRonda();
      }, 1000);
    }
  } else {
    perder();
  }
}

function desbloquearBotonJugar() {
  $btnJugar.classList.remove("bloquear-clicks");
}

function bloquearBotonJugar() {
  $btnJugar.classList.add("bloquear-clicks");
}

function perder() {
  alert("perdiste");
  secuenciaDeColoresJugador = [];
  secuenciaDeColoresMaquina = [];
  desbloquearBotonJugar();
  bloquearClicksJugador();
}

function manejarRonda() {
  secuenciaDeColoresJugador = [];
  bloquearBotonJugar();

  bloquearClicksJugador();
  agregarSecuenciaMaquina();

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
