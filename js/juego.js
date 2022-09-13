var contexto = document.getElementById("lienzo").getContext("2d");
contexto.canvas.width = 602;
contexto.canvas.height = 295;
var score = 0;
var FPS = 60;
var gravedad = 1.5;
var ban =true;
var personaje = {
  x: 100,
  y: 150,
  w: 70,
  h: 70,
};
var fondoAnimado = {
  x: 0,
  x2: 1,
  y: 0,
};
var cactusAnimado = new Array();
cactusAnimado[0] = {
  x: 600,
  y: 150,
  w: 50,
  h: 50,
};

//variable imagen
//dino
var dino = new Image();
dino.src = "../img/dinosaurio.png";
//fodo
var fondo = new Image();
fondo.src = "../img/fondo.png";
//cactus
var cactus = new Image();
cactus.src = "../img/cactus.png";
//audios
//salto
var salto = new Audio();
salto.src = "../audio/mario-bros-jump.mp3";
//musicafondo
var musicafondo = new Audio();
musicafondo.src = "../audio/ringtones-super-mario-bros.mp3";
//cactus impacto
var impacto = new Audio();
impacto.src = "../audio/cartoon048.mp3";
//control
function keyDown() {
  if (personaje.y >= contexto.canvas.height - personaje.h) {
    salto.play();
    personaje.y -= 100;
    cactusAnimado.push({
      x: 650,
      y: 150,
      w: 50,
      h: 50,
    });
    score++
  }

}
var refreshIntervalId = setInterval(loop, 1000 / FPS);
function loop() {
  musicafondo.volume = 0.5; // 75%
  musicafondo.play()
  contexto.clearRect(0, 0, 602, 295);
  //fondo
  contexto.drawImage(fondo, fondoAnimado.x, fondoAnimado.y);
  contexto.drawImage(fondo, fondoAnimado.x2, fondoAnimado.y);
  if (fondoAnimado.x < 0) {
    fondoAnimado.x += contexto.canvas.width;
  }
  if (fondoAnimado.x2 < -contexto.canvas.width) {
    fondoAnimado.x2 += contexto.canvas.width;
  }
  fondoAnimado.x -= 2;
  fondoAnimado.x2 -= 2;
  //personaje
  contexto.drawImage(dino, personaje.x, personaje.y, personaje.w, personaje.h);
  //personaje gravedad
  if (personaje.y < contexto.canvas.height - personaje.h) {
    personaje.y += gravedad;
  }
  //cactus
  for (var i = 0; i < cactusAnimado.length; i++) {
    contexto.drawImage(
      cactus,
      cactusAnimado[i].x,
      contexto.canvas.height - cactusAnimado[i].h,
      cactusAnimado[i].h,
      cactusAnimado[i].w
    );
//colision
if(
  
   personaje.x + personaje.w >= cactusAnimado[i].x &&  //posision mas ancho >= valor cactus en movimiento
   personaje.x <= cactusAnimado[i].x + cactusAnimado[i].w && //posision <= posicion cactus en movimiento+ ancho cactus
   personaje.y >= cactusAnimado[i].y+cactusAnimado[i].h//personaje alto mayor 
  
  )
  {
    musicafondo.pause();
    impacto.play();
    
    contexto.fillStyle = "rgba(175,0,42,1)"
    contexto.font = "50px Arial"
    contexto.clearRect(0, 0, 602, 295);
    contexto.fillText(`Game Over Score: `+score,contexto.canvas.width/8,contexto.canvas.height/2)
    contexto.font = "30px Arial"
    contexto.fillStyle = "rgba(136,0,204,1)"
    contexto.fillText("creado por Marcos Castillo",contexto.canvas.width/8,((contexto.canvas.height/2)+50))
    setTimeout(function(){
      alert("reiniciar juego")
      location.reload()
  }, 1000);
    
//agrgar opcional de reiniciar o finalizar
    clearInterval(refreshIntervalId);
  
    }

   cactusAnimado[i].x -= 4;
  }
  contexto.fillStyle = "rgba(255,255,255,1)"
  contexto.font = "28px Arial"
  contexto.fillText("Score: "+score,10,30)


}

window.addEventListener("click", keyDown);
window.addEventListener("keydown", keyDown);
