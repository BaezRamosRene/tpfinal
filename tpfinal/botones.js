// izquierdo 0,0  derecho 500,540
class boton {
  constructor() {
    this.al = 100;
    this.an = 100;
  }
  areaBoton(x, y) { //areaBoton(500,550)
    return (mouseX>x-this.an && mouseX<x+this.an && mouseY>y-this.al/2 && mouseY<y+this.al/2);
  }
  dibujar(texto, x, y) {
    push();
    rectMode(CENTER);
    fill(255);
    rect(x, y, this.an, this.al/2);
    pop();
    push();
    textAlign(CENTER);
    text(texto, x, y);
    pop();
  }
}
