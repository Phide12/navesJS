addEventListener('DOMContentLoaded', cargarElementos);

var ctx;
function cargarElementos() {
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
    ctx.translate(coche1.centroX, coche1.centroY);
    ctx.rotate(coche1.rotacion);
    ctx.fillStyle = 'red';
    ctx.fillRect(-coche1.anchura/2, -coche1.altura/2, coche1.anchura, coche1.altura);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-2, -2, 4, 4);
    ctx.fill();
    ctx.restore();
}

function comprobarInput(evento) {

  let teclaAccion = (evento.type == 'keydown')?true:false;
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


