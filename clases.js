class coche {

  constructor(posicionX, posicionY) {
    this.altura = 30;
    this.anchura = 20;
    this.rotacion = 0
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.aceleracionX = 0;
    this.aceleracionY = 0;
    this.velX = 0;
    this.velY = 0;
    this.gradosRotacion = 5;
    this.velMax = 10;
    this.friccion = 0.01;
    this.rotacion = 0;
    this.giroIzquierda = false;
    this.giroDerecha = false;
    this.estaAcelerando = false;

    this.actualizarCentro();
  }

  comprobarMovimiento() {
    if (this.giroDerecha && !this.giroIzquierda) {
      this.rotar(this.gradosRotacion);
    }
    if (this.giroIzquierda && !this.giroDerecha) {
      this.rotar(-this.gradosRotacion);
    }

    if (this.estaAcelerando) {
      this.acelerar();
    } else {
      this.frenar();
    }
    this.mover();

  }

  rotar(grados) {
    if (this.rotacion + grados == 0 || this.rotacion - grados == 0) {
      this.rotacion = 0;
    } else {
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

  acelerar() {
    this.aceleracionX  = Math.sin(this.rotacion);
    this.aceleracionY = Math.cos(this.rotacion);    
    console.log('x: ' + parseInt(this.aceleracionX * 100));
    console.log('y: ' + this.aceleracionY);

  }

  frenar() {
    if (this.aceleracionX > 0) {
      this.aceleracionX = this.transformarCifra(this.aceleracionX - this.friccion);
    } else if ( this.aceleracionX < 0) {
      this.aceleracionX = this.transformarCifra(this.aceleracionX + this.friccion);
    }
    if (this.aceleracionY > 0) {
      this.aceleracionY = this.transformarCifra(this.aceleracionY - this.friccion);
    } else if ( this.aceleracionY < 0) {
      this.aceleracionY = this.transformarCifra(this.aceleracionY + this.friccion);
    }
  }

  mover() {
    this.velX = this.transformarCifra(this.velX + this.aceleracionX);
    this.velY = this.transformarCifra(this.velY + this.aceleracionY);
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

  

  

  transformarCifra(numero) {
    return parseFloat(numero.toFixed(1), 10);
  }

}