// Inicialización de la librería de animaciones AOS
AOS.init({
    duration: 1000, // Duración de la animación en milisegundos
    once: true,     // Define si la animación debe ocurrir solo una vez al bajar
    mirror: false,  // Define si los elementos deben animarse al hacer scroll hacia arriba
});

// veo si puedo agregar más funciones interactivas más adelante
console.log("Main.js cargado correctamente vlo");
const modal = document.getElementById("modalOlmedo");
const btnAbrir = document.getElementById("abrirModal");
const btnCerrar = document.getElementById("cerrarModal");

// Abrir Modal
btnAbrir.onclick = function() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
}

// Cerrar Modal
btnCerrar.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Libera el scroll osea se encarga de el
}

// Cerrar si hace clic fuera del contenido solo eso
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}