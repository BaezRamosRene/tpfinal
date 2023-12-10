class LasPantallas {
  constructor() { 
    this.juegoo = new Juego();
    this.pantallas = 0;
    this.foto = new Array(17);
    this.boton = new boton();
    this.juegoSet=false;
    this.juegoActivo = false;
  }
  
  setup() { 
    this.foto[1] = loadImage("data/inicio.png");
    this.foto[2] = loadImage("data/escena1.png");
    for (let index = 0; index <= 10; index++) {
      this.foto[3+index] = loadImage('data/escena' + (index + 2) +'.png');
    }
    this.foto[14] = loadImage("data/arrepentir.png");
    this.foto[15] = loadImage("data/creditos.png");
    this.foto[16] = loadImage("data/morir.png");
    this.instrucciones = loadImage('data/instrucciones.jpg');
    this.pantallas = 0;
  }

  draw() {
    if (this.pantallas == 0) {
      this.labase("", this.foto[1]);
      this.boton.dibujar("comenzar",550,550);
      this.boton.dibujar("creditos",50,50);
    } else if (this.pantallas  == 1) {
      this.labase("HABIA UNA VEZ, TRES CERDITOS QUE PLANEABAN VIVIR EN EL BOSQUE..", this.foto[2]);
      this.boton.dibujar("atras",50,50);
      this.boton.dibujar("salir",550,550);
    } else if (this.pantallas  == 2) {
      this.labase("LOS HERMANOS EMPRENDIERON CAMINO. EL MAYOR LES ADVIERTE A LOS OTROS QUE CONSTRUYAN CASAS FUERTES PARA EVITAR FUTUROS PROBLEMAS..", this.foto[3]);  
      this.boton.dibujar("construir\ncasas",550,550);
      this.boton.dibujar("arrepentirse",50,50);
    } else if (this.pantallas  == 3) {
      this.labase("PERO EL MAS CHICO, COMO ERA UN HOLGAZÁN, SE CONSTRUYO UNA CASA RÁPIDO, HECHA DE PAJA..", this.foto[4]);
      this.boton.dibujar("menu",50,50);
      this.boton.dibujar("testear\nresistencia",550,550);
    } else if (this.pantallas  == 4) {
      this.labase("DE NOCHE, SE DESPERTÓ CON LA CASA VOLANDOSE, ERA EL LOBO INTENTANDO COMÉRSELO, HABIA TIRADO LA CASA DE UN SOPLIDO!", this.foto[5]);
      this.boton.dibujar("morir",50,50);
      this.boton.dibujar("correr",550,550);
    } else if (this.pantallas  == 5) {
      this.labase("CORRIENDO, FUE A REFUGIARSE A LA CASA DEL HERMANO DEL MEDIO, QUE CON UN POCO MÁS DE ESFUERZO SE CONSTRUYO UNA CASA DE MADERA ¿ESTARÁN A SALVO ALLI?", this.foto[6]);
      this.boton.dibujar("testear\nresistencia",550,550);
      this.boton.dibujar("menu",50,50);
      this.tiempoInicioJuego = millis();
    } else if (this.pantallas  == 6) {//juego
      this.labase("EL LOBO HABRÍA CONSEGUIDO DESARMAR LA CASA ENTERA APENAS CON UN POCO MAS DE ESFUERZO EN SU SOPLIDO", this.foto[7]);
      this.boton.dibujar("morir",50,50);
      this.boton.dibujar("correr",550,550);
      if(this.juegoSet){
          image(this.instrucciones, 0, 0);
          this.juegoo.juegoSetUp();
          this.boton.dibujar("jugar",width/2,height/2+140);
        }
      else if(this.juegoActivo){
        this.juegoo.juegoEventos();
        this.juegoo.dibujar();
        if (this.juegoo.perdiste) {
          this.juegoActivo = false;
            this.pantallas  = 15;
            this.juegoSet = false;
            this.tiempoInicioJuego = 0;
        }
        else if (this.juegoo.ganaste) {
          this.juegoActivo = false;
            this.pantallas  = 7;
            this.juegoSet = false;
            this.tiempoInicioJuego = 0;
        }
      }
    } else if (this.pantallas == 7) {
      this.labase("LOS DOS HERMANOS CORRIERON A REFUGIARSE A LA CASA DEL CHANCHITO MAYOR, QUE ERA MUY SABIO, Y CON MUCHO ESFUERZO SE CONSTRUYÓ UNA CASA DE LADRILLOS, A PRUEBA DE SOPLIDOS ¿HABRÍAN CONSEGUIDO ALLI ESTAR A SALVO?", this.foto[8]);
      this.boton.dibujar("correr",550,550);
    } else if (this.pantallas == 8) {
      this.labase("EL LOBO, ASTUTO, DESPUES DE ANALIZAR LA CASA DE LADRILLOS Y DE DARSE CUENTA QUE NO PODRÍA DERRIBARLA DE UN SOPLIDO, TUVO LA GRANDIOSA IDEA DE ENTRAR POR LA CHIMENEA. LOS TRES CHANCHITOS DEBEN ACTUAR RÁPIDO SI QUIEREN SALVARSE", this.foto[9]);
      this.boton.dibujar("plan en\nmarcha",550,550);
      this.boton.dibujar("morir",50,50);
    } else if (this.pantallas == 9) {//ganaste
      this.labase("LOS TRES HERMANOS ACTUARON RAPIDAMENTE Y SE LES OCURRIÓ TENDERLE UNA TRAMPA AL LOBO..", this.foto[10]);
      this.boton.dibujar("esperar al\nlobo",550,550);
    } else if (this.pantallas == 10) {
      this.labase("CON LA HOYA DEBAJO DE LA CHIMENEA LOGRAN QUE EL LOBO CAIGA DENTRO", this.foto[11]);
      this.boton.dibujar("siguiente",550,550);
    } else if (this.pantallas == 11) {
      this.labase("LOS CHANCHITOS SE VENGARON, EL LOBO SE QUEMÓ TANTO QUE NUNCA MÁS VOLVIÓ A MOLESTAR ", this.foto[12]);
      this.boton.dibujar("siguiente",550,550);
    } else if (this.pantallas == 12) {
      this.labase("LOS 3 CERDITOS DECIDIERON VIVIR JUNTOS, Y VIVIERON FELICES PARA SIEMPRE", this.foto[13]);
      this.boton.dibujar("fin",550,550);
    } else if (this.pantallas == 13) {
      this.labase("LOS HERMANOS ASUSTADOS DECIDIERON ABANDONAR EL PLAN DE VIVIR EN EL BOSQUE Y VUELVEN CON SU MAMÁ", this.foto[14]);
    } else if (this.pantallas == 14) {
      this.labase("", this.foto[15]);
      this.boton.dibujar("menu",50,50);
    } else if (this.pantallas == 15) {//perdiste
      this.labase("EL LOBO VENCIÓ Y AHORA SE PREPARARÁ UNA RICA CENA CON SU PRESA", this.foto[16]);
      this.boton.dibujar("menu",50,50);
    }
  }
  mousePressed() {
    if (this.pantallas == 0 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 1;
    } else if (this.pantallas == 0 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 14;
    } else if (this.pantallas == 1 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 2;
    }
    else if (this.pantallas == 1 && this.boton.areaBoton(50,50)) { //izquierdo
      this.pantallas = 0;
    } else if (this.pantallas == 2 && this.boton.areaBoton(500,550)) {//derecho
        this.pantallas = 3;
    } else if (this.pantallas == 2 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 13;
    } else if (this.pantallas == 3 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 4;
    }
    else if (this.pantallas == 3 && this.boton.areaBoton(50,50)) { //izquierdo
      this.pantallas = 0;
    } else if (this.pantallas == 4 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 5;
    } else if (this.pantallas == 4 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 15;
    } else if (this.pantallas == 5 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 6;
    } else if (this.pantallas == 6 && this.boton.areaBoton(500,550)) { //derecho
      this.juegoSet = true;
    } else if (this.pantallas == 6 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 15;  
    } else if (this.pantallas == 6) {
      if (mouseX >= 250 && mouseX <= 350 && mouseY >= 410 && mouseY <= 450) {
        this.juegoSet = false;
        this.juegoActivo = true;
      }
    }  else if (this.pantallas == 7 && this.boton.areaBoton(500,550)) {//derecho
        this.pantallas = 8;
    } else if (this.pantallas == 8 && this.boton.areaBoton(500,550)) {//derecho
        this.pantallas = 9;
    } else if (this.pantallas == 8 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 15;
    } else if (this.pantallas == 9 && this.boton.areaBoton(500,550)) {//derecho
        this.pantallas = 10;
    } else if (this.pantallas == 10 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 11;
    } else if (this.pantallas == 11 && this.boton.areaBoton(500,550)) { //derecho
        this.pantallas = 12;
    } else if (this.pantallas == 12 && this.boton.areaBoton(500,550)) { //derecho 
        this.pantallas = 0;
    } else if (this.pantallas == 13 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 0;
    } else if (this.pantallas == 14 && this.boton.areaBoton(50,50)) {  //izquierdo
        this.pantallas = 0;
    } else if (this.pantallas == 15 && this.boton.areaBoton(50,50)) { //izquierdo
        this.pantallas = 0;
    }
  }
  labase(mitexto, lafoto) {
    let eltexto = mitexto;
    let mifoto = lafoto;
    image(mifoto, 0, 0, 600, 600);
    textSize(20);
    fill(255);
    text(eltexto, 150+2, 50+2, 300, 300);
    fill(0);
    text(eltexto, 150, 50, 300, 300);
  }
}
