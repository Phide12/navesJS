class coche {

  constructor(posicionX, posicionY) {
    this.altura = 30;
    this.anchura = 20;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.aceleracionX = 0;
    this.aceleracionY = 0;
    this.cantidadAceleracion = 0;
    this.velX = 0;
    this.velY = 0;
    this.gradosRotacion = 6;
    this.velMax = 10;
    this.friccion = 0.25;
    this.rotacion = 3.14;
    this.giroIzquierda = false;
    this.giroDerecha = false;
    this.estaAcelerando = false;
    this.estaParado = true;

    this.actualizarCentro();
  }

  comprobarMovimiento() {
      if (this.giroDerecha && !this.giroIzquierda) {
        this.rotar(this.gradosRotacion);
      }
      if (this.giroIzquierda && !this.giroDerecha) {
        this.rotar(-this.gradosRotacion);
      }
    this.comprobarAceleracion();
    this.actuarFriccion();
    this.mover();
    console.log('x: ' + this.velX);
    console.log('y: ' + this.velY);  
    console.log('ace: ' + this.cantidadAceleracion);
      
  }

  rotar(grados) {
    if (this.rotacion + grados == 0 || this.rotacion - grados == 0) {
      this.rotacion = 0;
    } else {
      grados *= (this.cantidadAceleracion/1000);
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
        this.cantidadAceleracion -= 10;
      }
    }
    
    this.aceleracionX = Math.sin(this.rotacion) * (this.cantidadAceleracion/1000);
    this.aceleracionY = Math.cos(this.rotacion) * (this.cantidadAceleracion/1000);
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

    this.posicionX += this.velX;
    this.posicionY -= this.velY;
    this.actualizarCentro();
  }

  actualizarCentro() {
    this.centroX = this.posicionX + (this.anchura / 2);
    this.centroY = this.posicionY + (this.altura / 2);
  }

}