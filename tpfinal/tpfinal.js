let pantallas;

function preload() {
  cerdito = loadImage('data/cerdo2.png');
  fondo = loadImage('data/fondo.jpg');
  casa1 = loadImage('data/casa.png');
  instrucciones = loadImage('data/instrucciones.jpg');
  lobo = loadImage('data/lobo.png');
  tallo = loadImage('data/tallo.png');
}

function setup() {
  createCanvas(600, 600);
  fuente = loadFont('data/Nunito.ttf');
  textFont(fuente);
  pantallas = new LasPantallas();
  pantallas.setup();
}

function draw() {
  pantallas.draw();
}

function mousePressed() {
  pantallas.mousePressed();
}
