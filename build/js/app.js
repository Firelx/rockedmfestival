document.addEventListener('DOMContentLoaded', function () {
	iniciarAPP();
});

function iniciarAPP() {
	crearGaleria();
}

function crearGaleria() {
	const galeria = document.querySelector('.galeria-imagenes');

	for (let i = 1; i <= 12; i++) {
		const imagen = document.createElement('picture');
		imagen.innerHTML = `
            <picture>
            <source
                srcset="build/img/thumb/${i}.avif"
                type="image/avif"
            />
            <source
                srcset="build/img/thumb/${i}.webp"
                type="image/webp"
            />
            <img
                loading="lazy"
                width="300"
                height="200"
                src="img/thumb/${i}.jpg"
                alt="Imagen galeria"
            />
            </picture>
        `;
		galeria.appendChild(imagen);
	}
}
