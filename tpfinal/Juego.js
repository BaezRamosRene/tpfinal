class Juego {
    constructor() {
        this.elPersonaje = new Personaje();
        this.columnas = [];
        this.casA = new Casa();
        this.cantColumnas = 5;
        this.puntos = 0;
        this.perdiste = false;
        this.ganaste = false;
        this.empezarMovCasa = false;
        this.moverCasa = false;
    }

    juegoSetUp() {
        this.elPersonaje = new Personaje();
        this.columnas = [];
        this.casA = new Casa();
        this.puntos = 0;
        this.perdiste = false;
        this.ganaste = false;
        this.empezarMovCasa = false;
        this.moverCasa = false;
    }

    juegoEventos() {
        if (!this.perdiste) {
            this.elPersonaje.calcular();

            if (!this.empezarMovCasa) {
                if (frameCount % 110 === 0) {
                    this.columnas.push(new Columnas());
                }
                for (let index = 0; index < this.columnas.length; index++) {
                    this.columnas[index].moverHaciaAtras();

                    if (this.columnas[index].seFueDePantalla()) {
                        this.columnas.splice(index, 1);
                        this.puntos += 100;
                        if(this.puntos>1000){
                            this.empezarMovCasa = true;
                        }
                    }

                    if (this.columnas[index].tocoPersonaje(this.elPersonaje)) {
                        this.perdiste = true;
                    }
                }
            }
            else {
                this.columnas[0].moverHaciaAtras();
                if (frameCount % 110 === 0) {
                    this.moverCasa = true;
                }
            }

            if (this.moverCasa) {
                this.casA.moverHaciaAtras();

                if (this.casA.tocaPersonaje(this.elPersonaje)) {
                    this.ganaste = true;
                }
                else if(!this.ganaste && this.casA.seFueDePantalla()){
                    this.perdiste = true;
                }
            }


        }
    }

    dibujar() {
        image(fondo, 0, 0);
        for (let index = 0; index < this.columnas.length; index++) {
            this.columnas[index].dibujar();
        }
        this.elPersonaje.dibujar(lobo,cerdito);
        this.casA.dibujar();
        fill(255);
        textSize(32);
        text("PNTS:" + this.puntos, width - 200, 70);
    }
}
