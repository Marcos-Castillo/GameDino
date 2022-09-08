var contexto = document.getElementById("lienzo").getContext("2d");
contexto.canvas.width = 602;
contexto.canvas.height = 295;
var FPS =60;
var gravedad = 1.5;
var personaje = {
    x:100,
    y:150,
    w:50,
    h:50
}
var fondoAnimado = {
    x:0,
    x2:1,
    y:0,
}
var cactusAnimado = {
    x:100,
    y:150,
    w:50,
    h:50
}
var cactusAnimado2 = {
    x:100,
    y:150,
    w:50,
    h:50
}
//variable imagen
//dino
var dino = new Image();
dino.src = "../img/dinosaurio.png"
//fodo
var fondo = new Image();
fondo.src = "../img/fondo.png"
//cactus
var cactus = new Image();
cactus.src = "../img/cactus.png"
//control
function keyDown(){
    if(personaje.y>=(contexto.canvas.height-personaje.h)){
        personaje.y -=100;
    }
 
}
setInterval(loop,1000/FPS)
function loop(){
    contexto.clearRect(0,0,602,295)
    //fondo
    contexto.drawImage(fondo,fondoAnimado.x,fondoAnimado.y)
    contexto.drawImage(fondo,fondoAnimado.x2,fondoAnimado.y);
    if(fondoAnimado.x< 0){
        fondoAnimado.x += contexto.canvas.width
    }
    if(fondoAnimado.x2< (-contexto.canvas.width)){
        fondoAnimado.x2 += contexto.canvas.width
    }
    fondoAnimado.x-= 2;
    fondoAnimado.x2-= 2;
    //personaje
    contexto.drawImage(dino,personaje.x,personaje.y,personaje.w,personaje.h); 
    //personaje gravedad
    if(personaje.y<(contexto.canvas.height-personaje.h)){
        personaje.y +=gravedad;
    }
    //cactus
    contexto.drawImage(cactus,cactusAnimado.x,(contexto.canvas.height-cactusAnimado.h),cactusAnimado.h,cactusAnimado.w)
    if(cactusAnimado.x < 0){
        cactusAnimado.x += contexto.canvas.width
    }
    cactusAnimado.x-=3;
/*
    contexto.drawImage(cactus,cactusAnimado2.x,(contexto.canvas.height-cactusAnimado2.h),cactusAnimado2.h,cactusAnimado2.w)
    if(cactusAnimado2.x < 0){
        cactusAnimado2.x += contexto.canvas.width
    }
    cactusAnimado2.x-=4; */

}
window.addEventListener("keydown",keyDown)