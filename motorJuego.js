addEventListener('DOMContentLoaded', cargarElementos);

var ctx;
var imagen;

function cargarElementos() {
  imagen = new Image();
  imagen.src = 'img/coche.png'
  canvas = document.getElementById('lienzo');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.addEventListener('keydown', comprobarInput);
  document.addEventListener('keyup', comprobarInput);
  ctx = canvas.getContext('2d');
  coche1 = new coche(50, 50);
  alert("Controles \n flechas - direccion \n barra espaciadora - freno de mano");
  setInterval(actualizarPantalla, 30);
}

function actualizarPantalla() {
  limpiarPantalla();
  dibujarCoche();
  coche1.comprobarMovimiento();
}

function limpiarPantalla() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function dibujarCoche() {
  ctx.save();
  ctx.beginPath();
  ctx.translate(coche1.centroX, coche1.centroY);
  ctx.rotate(coche1.rotacion);
  ctx.fillStyle = '#00dddd';
  ctx.moveTo(-coche1.anchura / 2, 0);
  ctx.lineTo(coche1.anchura / 2, 0);
  ctx.lineTo(0, -coche1.altura);
  ctx.lineTo(-coche1.anchura / 2, 0);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = '#00ffff';
  ctx.moveTo(-coche1.anchura / 2, 0);
  ctx.lineTo(coche1.anchura / 2, 0);
  ctx.lineTo(0, -coche1.altura / 3);
  ctx.fill();
  ctx.closePath();

  if (coche1.cantidadAceleracion > 0) {
    dibujarPropulsion();
  }
  ctx.restore();
}

function dibujarPropulsion() {
  ctx.beginPath();
  ctx.fillStyle = 'orange';
  ctx.moveTo(-coche1.anchura / 3, 0);
  ctx.lineTo(coche1.anchura / 3, 0);
  ctx.lineTo(0, 30 * coche1.cantidadAceleracion / 1000);
  ctx.lineTo(-coche1.anchura / 3, 0);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.moveTo(-coche1.anchura / 4, 0);
  ctx.lineTo(coche1.anchura / 4, 0);
  ctx.lineTo(0, 10  * coche1.cantidadAceleracion / 1000);
  ctx.lineTo(-coche1.anchura / 4, 0);
  ctx.fill();
  ctx.closePath();
}

function comprobarInput(evento) {

  let teclaAccion = (evento.type == 'keydown') ? true : false;
  switch (evento.keyCode) {
    case 39:
      coche1.giroDerecha = teclaAccion;
      break;
    case 37:
      coche1.giroIzquierda = teclaAccion;
      break;
    case 38:
      coche1.estaAcelerando = teclaAccion;
      break;
  }
}


