document.addEventListener('DOMContentLoaded', function( ){
    iniciarAPP();
});

function iniciarAPP() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    galeria.textContent = "Vamos a cambiar la galeria!";
}