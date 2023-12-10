class Columnas {
    constructor() {
        this.velocida = 3;
        this.ancho = 60;
        this.posX = width;
        this.posApertura = random(30, height - 30);
        this.radioApertura = 70;
    }

    reset() {
        this.posX = width;
        this.posApertura = random(30, height - 30);
    }

    dibujar() {
        fill(255, 0, 0);
        //rect(this.posX, 0, this.ancho, this.posApertura - this.radioApertura);
        image(tallo,this.posX, this.posApertura - this.radioApertura - tallo.height);
        image(tallo,this.posX, this.posApertura + this.radioApertura);
        //rect(this.posX, this.posApertura + this.radioApertura, this.ancho, height);
    }

    moverHaciaAtras() {
        this.posX -= this.velocida;
    }

    seFueDePantalla() {
        
        return this.posX <= -this.ancho;
    }

    tocoPersonaje(personajee) {

        if (personajee.x < this.posX +  personajee.radio + this.ancho && personajee.x > this.posX -  personajee.radio) {
            if (personajee.y < this.posApertura - this.radioApertura + personajee.radio || personajee.y > this.posApertura + this.radioApertura - personajee.radio) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
