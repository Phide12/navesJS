class coche {

  constructor(posicionX, posicionY, maximoX, maximoY) {
    this.altura = 30;
    this.anchura = 20;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.aceleracionX = 0;
    this.aceleracionY = 0;
    this.cantidadAceleracion = 0;
    this.velX = 0;
    this.velY = 0;
    this.maximoX = maximoX;
    this.maximoY = maximoY;
    this.cantidadRotacion = 0;
    this.rotacionMaxima = 6;
    this.rotacion = 3.14;
    this.velMax = 10;
    this.friccion = 0.25;

    this.giroIzquierda = false;
    this.giroDerecha = false;
    this.estaAcelerando = false;
    this.estaParado = true;

    this.actualizarCentro();
  }

  comprobarMovimiento() {
    if (this.giroDerecha && !this.giroIzquierda) {
      this.alterarRotacion(1);
    } else if (this.giroIzquierda && !this.giroDerecha) {
      this.alterarRotacion(-1);
    } else {
      this.decelerarRotacion();
    }
    this.rotar();
    this.comprobarAceleracion();
    this.actuarFriccion();
    this.mover();
  }

  alterarRotacion(grados) {
    this.cantidadRotacion += grados;
    if (this.cantidadRotacion > this.rotacionMaxima) {
      this.cantidadRotacion = this.rotacionMaxima;
    } else if (this.cantidadRotacion < -this.rotacionMaxima) {
      this.cantidadRotacion = -this.rotacionMaxima;
    }
  }
  decelerarRotacion() {
    if (this.cantidadRotacion > 0) {
      this.cantidadRotacion -= this.friccion;
    } else if (this.cantidadRotacion < 0) {
      this.cantidadRotacion += this.friccion;
    }
  }

  rotar() {
    if (this.cantidadRotacion != 0) {
      let grados = this.cantidadRotacion * (this.cantidadAceleracion / 1000);
      let resultado = this.rotacion + (grados * Math.PI / 180);
      if (resultado < 0) {
        resultado += 6.28;
      }
      if (resultado > 6.28) {
        resultado %= 6.28;
      }
      this.rotacion = resultado;
    }
  }

  comprobarAceleracion() {
    if (this.estaAcelerando) {
      if (this.cantidadAceleracion < 1000) {
        this.cantidadAceleracion += 20;
      }
    } else {
      if (this.cantidadAceleracion > 0) {
        this.cantidadAceleracion -= 20;
      }
    }

    this.aceleracionX = Math.sin(this.rotacion) * (this.cantidadAceleracion / 1000);
    this.aceleracionY = Math.cos(this.rotacion) * (this.cantidadAceleracion / 1000);
  }

  actuarFriccion() {
    let estaParado = true;
    if (this.velX > 0) {
      this.velX -= this.friccion;
      estaParado = false;
      if (this.velX < 0) {
        this.velX = 0;
      }
    } else if (this.velX < 0) {
      this.velX += this.friccion;
      estaParado = false;
      if (this.velX > 0) {
        this.velX = 0;
      }
    }
    if (this.velY > 0) {
      this.velY -= this.friccion;
      estaParado = false;
      if (this.velY < 0) {
        this.velY = 0;
      }
    } else if (this.velY < 0) {
      this.velY += this.friccion;
      estaParado = false;
      if (this.velY > 0) {
        this.velY = 0;
      }
    }
    this.estaParado = estaParado;
  }

  mover() {
    this.velX += this.aceleracionX;
    this.velY += this.aceleracionY;

    if (this.velX > this.velMax) {
      this.velX = this.velMax
    } else if (this.velX < -this.velMax) {
      this.velX = -this.velMax
    }
    if (this.velY > this.velMax) {
      this.velY = this.velMax
    } else if (this.velY < -this.velMax) {
      this.velY = -this.velMax
    }
    
    /* comprobar salir del marco */
    /* hotizontal */
    this.posicionX += this.velX;
    if (this.posicionX > (this.maximoX + 50)) {
      this.posicionX -= (this.maximoX + 50);
    } else if (this.posicionX < -50) {
      this.posicionX = this.maximoX + 50 + this.posicionX;
    }
    /* vertical */
    this.posicionY -= this.velY;
    if (this.posicionY > (this.maximoY + 50)) {
      this.posicionY -= (this.maximoY + 50);
    } else if (this.posicionY < -50) {
      this.posicionY = this.maximoY + 50 + this.posicionY;
    }
    this.actualizarCentro();
  }

  actualizarCentro() {
    this.centroX = this.posicionX + (this.anchura / 2);
    this.centroY = this.posicionY + (this.altura / 2);
  }

}