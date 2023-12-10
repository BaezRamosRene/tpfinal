class Casa {
    constructor() {
        this.velocida = 3;
        this.ancho = 200;
        this.posX = width;
        this.posApertura = random(300, height - 300);
        this.radioApertura = 70;
    }

    // reset() {
    //     this.posX = width;
    //     this.posApertura = random(30, height - 30);
    // }

    dibujar() {
        image(casa1, this.posX, this.posApertura);
    }

    moverHaciaAtras() {
        this.posX -= this.velocida;
    }

    seFueDePantalla() {
        
        return this.posX <= -this.ancho;
    }

    tocaPersonaje(personajee) {

            if (personajee.x > this.posX) {
                return true;
            }
            else {
                return false;
            }
        
    }
}
