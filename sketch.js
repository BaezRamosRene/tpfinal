const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let fondoColor; 
let mic;
let pitch;
let audioContext;
let gestorAmp;
let gestorPitch;
let imagen;
let ovalo;
let factura;
let malla;
let puntos;
let blanco;
let imagenes = [];
let numImagenes = 20;
let numImagenesMallas = 20;
let imagenesMalla = [];
let imagenesFactura = []; // Array para almacenar las imágenes cargadas
let numImagenesFactura = 12; // Número total de imágenes en la carpeta
let imagenesBlancos = []; // Array para almacenar las imágenes cargadas
let numImagenesBlancos = 4; // Número total de imágenes en la carpeta ovalosblancos
let imagenesPuntos = [];
let numImagenesPuntos = 20;
let imagenesA = [];
let numImagenesA = 20;
let imagenesB = [];
let numImagenesB = 20;
let imagenesC = [];
let numImagenesC = 20;

// Constantes para el gestor de señal
const altoGestor = 100;
const anchoGestor = 400;

function preload() {
  // Cargar la imagen antes de iniciar el sketch
  for (let i = 0; i < numImagenes; i++) {
    let img = loadImage(`Ovalos/Ovalos${i + 1}.png`);
    imagenes.push(img);
  }

  for (let i = 1; i <= numImagenesMallas; i++) {
    imagenesMalla.push(loadImage(`Mallas/Textura${i}.png`));
  }

  for (let i = 1; i <= numImagenesFactura; i++) {
    let imagen = loadImage(`grupofacturas/Facturas${i}.png`);
    imagenesFactura.push(imagen);
  }

  for (let i = 1; i <= numImagenesBlancos; i++) {
    let imagen = loadImage(`ovalosblancos/TexturaB${i}.png`);
    imagenesBlancos.push(imagen);
  }

  for (let i = 1; i <= numImagenesPuntos; i++) {
    let img = loadImage(`puntos/Puntos${i}.png`);
    imagenesPuntos.push(img);
  }

  for (let i = 1; i <= numImagenesA; i++) {
    let img = loadImage(`ABC/A/${i}A.png`);
    imagenesA.push(img);
  }

  for (let i = 1; i <= numImagenesB; i++) {
    let img = loadImage(`ABC/B/${i}B.png`);
    imagenesB.push(img);
  }

  for (let i = 1; i <= numImagenesC; i++) {
    let img = loadImage(`ABC/C/${i}C.png`);
    imagenesC.push(img);
  }
}

function setup() {
  createCanvas(400, 570);
  let fondoColores = [
    color(219, 221, 208),
    color(197, 207, 212),
    color(224, 226, 224),
    color(200, 196, 206)
  ];
  fondoColor = random(fondoColores); 

  // Inicializar el micrófono
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  // Inicializar los gestores de señal
  gestorAmp = new GestorSenial(0.05, 0.5); // Valores originales para el volumen
  gestorPitch = new GestorSenial(40, 80); // Valores originales para el pitch

  // Crear una instancia de Ovalo
  ovalo = new Ovalo();
  factura = new Factura();
  malla = new Mallas(random(imagenesMalla));
  puntos = new Puntos();
  blanco = new Blanco();
  // Inicializar el sistema de audio
  userStartAudio();
}

function draw() {
  background(fondoColor);
  // Obtener el nivel de volumen del micrófono
  let vol = mic.getLevel();
  gestorAmp.actualizar(vol); // Actualizar el gestor de señal con el volumen filtrado

  // Obtener el volumen y pitch filtrado
  let volFiltrado = gestorAmp.filtrada;
  let pitchFiltrado = gestorPitch.filtrada;

  // Actualizar y dibujar la imagen rotada y coloreada
  ovalo.update(volFiltrado, pitchFiltrado);
  blanco.display();
  malla.update(volFiltrado);
  factura.update(volFiltrado, pitchFiltrado);
  factura.mover(volFiltrado, pitchFiltrado);
  puntos.update(volFiltrado);
  puntos.display();

  // Mostrar los valores filtrados en la pantalla
  fill(0);
  textSize(16);
 // text(`Volumen filtrado: ${volFiltrado.toFixed(2)}`, 10, height - 50);
  //text(`Pitch normalizado: ${pitchFiltrado.toFixed(2)}`, 10, height - 30); // Añadir texto para mostrar el pitch normalizado
}
class Puntos {
  constructor() {
    this.imagen = loadImage('puntos/Puntos1.png'); // Cargar la imagen
    this.posicion = createVector(random(width), random(height)); // Posición inicial aleatoria
    this.angulo = random(TWO_PI); // Ángulo inicial aleatorio
    this.visible = false; // Estado inicial: no visible
    this.tiempoVisible = 10000; // Tiempo en milisegundos que estará visible (10 segundos)
    this.tiempoAparicion = 0; // Tiempo en el que apareció por última vez
  }

  update(volFiltrado) {
    // Verificar si el volumen filtrado es mayor o igual a 0.80 y no está visible
    if (volFiltrado >= 0.30 && !this.visible) {
      this.visible = true; // Marcar como visible
      this.posicion = createVector(random(width), random(height)); // Nueva posición aleatoria
      this.angulo = random(TWO_PI); // Nuevo ángulo aleatorio
      this.tiempoAparicion = millis(); // Registrar el tiempo de aparición
    }

    // Si está visible y ha pasado el tiempo visible, marcar como no visible
    if (this.visible && millis() - this.tiempoAparicion > this.tiempoVisible) {
      this.visible = false;
    }
  }

  display() {
    if (this.visible) {
      push();
      translate(this.posicion.x, this.posicion.y);
      rotate(this.angulo);
      imageMode(CENTER);
      tint(255);
      image(this.imagen, 0, 0,1000,1200);
      image(this.imagen, 0, 0,1000,1200);
      image(this.imagen, 0, 0,1000,1200);
      pop();
    }
  }
}

class Blanco {
  constructor() {
    // Seleccionar una imagen aleatoria para cada instancia de Blanco
    this.imagen = random(imagenesBlancos); 
    this.posX = random(width); // Posición aleatoria en el eje X
    this.posY = -this.imagen.height / 3, height; // Posición aleatoria desde arriba del canvas hasta un tercio de la imagen por debajo del borde inferior
    this.angulo = random(TWO_PI); // Ángulo de rotación aleatorio

    // Seleccionar un color aleatorio entre los tres especificados
    let colores = [
      color(146, 146, 118),
      color(225, 223, 222), 
      color(200, 201, 207),
      color(255, 255, 207)
    ];
    this.colorSeleccionado = random(colores);
  }

  display() {
    push();
    //translate(this.posX, this.posY);
    //rotate(this.angulo);
    tint(255);
    tint(this.colorSeleccionado.levels[0], this.colorSeleccionado.levels[1], this.colorSeleccionado.levels[2], 255); // Aplicar el color seleccionado a la imagen con opacidad completa
    imageMode(CENTER);
    // Calcular el desplazamiento para ajustar la posición de la imagen
    let desplazamientoY = this.imagen.height / 3; // Un tercio de la altura de la imagen
    // Dibujar la imagen, moviéndola hacia arriba para que solo un tercio superior sea visible
    image(this.imagen, this.posX, height);
    pop();
  }

  
}

class Factura {
  constructor() {
    this.imagenes = imagenesFactura; // Array de imágenes cargadas
    this.imagen = random(this.imagenes); // Imagen inicial aleatoria
    this.posicion = createVector(width / 2, height / 2); // Posición inicial de la imagen en el centro del canvas
    this.tamano = 300; // Tamaño inicial de la imagen
    this.angulo = 0; // Ángulo inicial de rotación
    this.velocidadRotacion = 0.05; // Velocidad de rotación
    this.velocidadDesplazamiento = 0; // Velocidad inicial de desplazamiento
    this.direccion = p5.Vector.random2D(); // Dirección inicial aleatoria
  }

  update(volFiltrado, pitchFiltrado) {
    // Actualizar la velocidad de rotación basada en el volumen del sonido filtrado
    this.velocidadRotacion = map(volFiltrado, 0, 1, 0, 0.1); // Ajusta el rango de velocidad según sea necesario
    this.angulo += this.velocidadRotacion; // Incrementar el ángulo de rotación

    // Dibuja la imagen rotada alrededor del centro
    push();
    translate(this.posicion.x, this.posicion.y);
    rotate(this.angulo);
    imageMode(CENTER);
    tint(color(255, 200));
    image(this.imagen, 0, 0, 1500, 1500); // Ajusta el tamaño según tu imagen
    pop();
  }

  mover(volFiltrado, pitchFiltrado) {
    this.pitchControl = volFiltrado;
    // Verificar que el volumen filtrado sea mayor que 0 y el pitch filtrado esté en el rango adecuado
    if (volFiltrado > 0.01 && this.pitchControl > 0.0 && this.pitchControl <= 1) {
      // Actualizar la velocidad de desplazamiento basada en el pitch filtrado
      console.log(volFiltrado);
      this.velocidadDesplazamiento = map(this.pitchControl, 0.01, 1, 0, 20);
  
      // Mover la posición según la dirección y velocidad actuales
      this.posicion.add(p5.Vector.mult(this.direccion, this.velocidadDesplazamiento));
  
      // Verificar si la imagen se sale completamente de la pantalla y cambiar la dirección
      if (this.posicion.x < -1500 || this.posicion.x > width + 1500) {
        this.direccion.x *= -1;
      }
      if (this.posicion.y < -1500 || this.posicion.y > height + 1500) {
        this.direccion.y *= -1;
      }
    } else {
      // Si el volumen filtrado es 0 o el pitch está fuera del rango, detener el desplazamiento
      this.velocidadDesplazamiento = 0;
    }
    if(volFiltrado === 0.00){
      this.pitchControl = 0;
    }
    if(this.pitchControl === 0){
      this.velocidadDesplazamiento = 0;
    }
  }
}

class Ovalo {
  constructor() {
    // Arreglos de imágenes para cada grupo
    this.imagenesGrupoA = [];
    this.imagenesGrupoB = [];
    this.imagenesGrupoC = [];

    // Cargar imágenes para cada grupo
    for (let i = 1; i <= 20; i++) {
      this.imagenesGrupoA.push(loadImage(`ABC/A/${i}A.png`));
      this.imagenesGrupoB.push(loadImage(`ABC/B/${i}B.png`));
      this.imagenesGrupoC.push(loadImage(`ABC/C/${i}C.png`));
    }

    // Grupos de colores predefinidos
    this.gruposColores = [
      { colorA: color(24, 10, 71), colorB: color(114, 114, 255), colorC: color(0, 255, 194) }, // Grupo a
      { colorA: color(20, 20, 127), colorB: color(24, 10, 71), colorC: color(110, 162, 255) }, // Grupo b
      { colorA: color(255, 152, 179), colorB: color(44, 53, 100), colorC: color(255, 222, 231) } // Grupo c
    ];

    // Seleccionar un grupo de colores aleatorio al inicio
    this.grupoActual = Math.floor(random(0, this.gruposColores.length));
    this.grupoSeleccionado = this.gruposColores[this.grupoActual];

    // Asignar imágenes y colores según el grupo seleccionado
    this.index = Math.floor(random(0, 20));
    this.ovaloA = this.imagenesGrupoA[this.index];
    this.ovaloB = this.imagenesGrupoB[this.index];
    this.ovaloC = this.imagenesGrupoC[this.index];

    this.colorActualA = this.grupoSeleccionado.colorA;
    this.colorActualB = this.grupoSeleccionado.colorB;
    this.colorActualC = this.grupoSeleccionado.colorC;

    this.colorInterpoladoA = this.colorActualA;
    this.colorInterpoladoB = this.colorActualB;
    this.colorInterpoladoC = this.colorActualC;

    // Variables para controlar la interpolación
    this.pitchAnterior = 0;
  }

  update(volFiltrado, pitchFiltrado) {
    // Interpolar colores B y C visceversa según el pitchFiltrado
    let colorInterB = lerpColor(this.colorActualB, this.colorActualC, pitchFiltrado);
    let colorInterC = lerpColor(this.colorActualC, this.colorActualB, pitchFiltrado);

    // Dibujar imágenes con los colores interpolados
    push();
    tint(this.colorActualA);
    imageMode(CENTER);
    image(this.ovaloA, width / 2, height / 2, this.tamano, this.tamano);
    pop();

    push();
    tint(colorInterB);
    imageMode(CENTER);
    image(this.ovaloB, width / 2, height / 2, this.tamano, this.tamano);
    image(this.ovaloB, width / 2, height / 2, this.tamano, this.tamano);
    image(this.ovaloB, width / 2, height / 2, this.tamano, this.tamano);
    pop();

    push();
    tint(colorInterC);
    imageMode(CENTER);
    image(this.ovaloC, width / 2, height / 2, this.tamano, this.tamano);
    image(this.ovaloC, width / 2, height / 2, this.tamano, this.tamano);
    image(this.ovaloC, width / 2, height / 2, this.tamano, this.tamano);
    pop();
  }
}

class GestorSenial {
  constructor(minimo_, maximo_) {
    this.minimo = minimo_;
    this.maximo = maximo_;
    this.puntero = 0;
    this.cargado = 0;
    this.mapeada = [];
    this.filtrada = 0;
    this.anterior = 0;
    this.derivada = 0;
    this.histFiltrada = [];
    this.histDerivada = [];
    this.amplificadorDerivada = 15.0;
    this.dibujarDerivada = false;
    this.f = 0.80;
  }

  actualizar(entrada_) {
    this.mapeada[this.puntero] = map(entrada_, this.minimo, this.maximo, 0.0, 1.0);
    this.mapeada[this.puntero] = constrain(this.mapeada[this.puntero], 0.0, 1.0);

    this.filtrada = this.filtrada * this.f + this.mapeada[this.puntero] * (1 - this.f);
    this.histFiltrada[this.puntero] = this.filtrada;

    this.derivada = (this.filtrada - this.anterior) * this.amplificadorDerivada;
    this.histDerivada[this.puntero] = this.derivada;

    this.anterior = this.filtrada;

    this.puntero++;
    if (this.puntero >= anchoGestor) {
      this.puntero = 0;
    }
    this.cargado = max(this.cargado, this.puntero);
  }

  dibujar(x_, y_) {
    push();
    fill(0);
    stroke(255);
    rect(x_, y_, anchoGestor, altoGestor);

    for (let i = 1; i < this.cargado; i++) {
      let altura1 = map(this.mapeada[i - 1], 0.0, 1.0, y_ + altoGestor, y_);
      let altura2 = map(this.mapeada[i], 0.0, 1.0, y_ + altoGestor, y_);

      stroke(255);
      line(x_ + i - 1, altura1, x_ + i, altura2);

      altura1 = map(this.histFiltrada[i - 1], 0.0, 1.0, y_ + altoGestor, y_);
      altura2 = map(this.histFiltrada[i], 0.0, 1.0, y_ + altoGestor, y_);

      stroke(0, 255, 0);
      line(x_ + i - 1, altura1, x_ + i, altura2);

      if (this.dibujarDerivada) {
        altura1 = map(this.histDerivada[i - 1], -1.0, 1.0, y_ + altoGestor, y_);
        altura2 = map(this.histDerivada[i], -1.0, 1.0, y_ + altoGestor, y_);

        stroke(255, 255, 0);
        line(x_ + i - 1, altura1, x_ + i, altura2);
      }
    }
    stroke(255, 0, 0);
    line(x_ + this.puntero, y_, x_ + this.puntero, y_ + altoGestor);
    pop();
  }
}

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      gestorPitch.actualizar(midiNum);
    }
    getPitch();
  });
}
class Mallas {
  constructor(imagen) {
    this.imagenes = imagenesMalla;
    //this.imagen = random(this.imagenes);
    this.imagen1 = random(this.imagenes); // Asigna una imagen aleatoria cargada en preload
    this.imagen2 = random(this.imagenes); // Asigna una imagen aleatoria cargada en preload
    this.posicion = createVector(width / 2, height / 2); // Posición inicial de la imagen en el centro del canvas
    this.tamano = 200; // Tamaño inicial de la imagen
    this.angulo = 0; // Ángulo inicial de rotación
    this.angulo2 = 0;
    this.velocidad = 0.01; // Velocidad inicial de rotación
    this.umbral = 0.05; // Umbral mínimo de volumen
  }

  update(volFiltrado) {
    // Si el volumen es mayor al umbral, detener la rotación
    if (volFiltrado > this.umbral) {
      this.velocidad = 0;
    } else {
      this.velocidad = 0.01; // Reanudar la rotación si el volumen es menor al umbral
    }

    // Incrementar el ángulo de rotación
    this.angulo += this.velocidad;
    this.angulo2 -= this.velocidad;

    // Dibuja la imagen rotada
    push();
    translate(this.posicion.x, this.posicion.y);
    rotate(this.angulo);
    imageMode(CENTER);
    image(this.imagen1, 0, 0, 700, 800); // Ajusta el tamaño según tu imagen
    pop();

    push();
    translate(this.posicion.x, this.posicion.y);
    rotate(this.angulo2);
    imageMode(CENTER);
    image(this.imagen2, 0, 0, 700, 800); // Ajusta el tamaño según tu imagen
    pop();
  }
}

