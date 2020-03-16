
// Obtener referencia a botones
// Recuerda: el punto . indica clases
const botones = document.querySelectorAll(".post");
// Definir función y evitar definirla de manera anónima
const cuandoSeHaceClick = function (evento) {
    // Recuerda, this es el elemento
    console.log("El texto que tiene es: ", this.src);
    // Podemos cambiar cualquier cosa, p.ej. el estilo
    //this.style.borderColor = "blue";
}
// botones es un arreglo así que lo recorremos
botones.forEach(boton => {
    //Agregar listener
    boton.addEventListener("click", cuandoSeHaceClick);
});