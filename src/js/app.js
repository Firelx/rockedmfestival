document.addEventListener('DOMContentLoaded', function () {
	iniciarAPP();
});

function iniciarAPP() {
	crearGaleria();
	scrollNav();
	navegacionFija();
}

// Al hacer click en algun enlace de navegacion ir hacia esa seccion de manera suave (smooth)
function scrollNav() {
	const enlaces = document.querySelectorAll('.navegacion-principal a');

	enlaces.forEach((enlace) => {
		enlace.addEventListener('click', function (e) {
			e.preventDefault();

			const seccionScroll = e.target.attributes.href.value;
			const seccion = document.querySelector(seccionScroll);

			seccion.scrollIntoView({ behavior: 'smooth' });
		});
	});

    const inicio = document.querySelector('.inicio');
    inicio.addEventListener('click', function() {
        window.scrollTo( {
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fijar la barra de navegacion cuando el scroll pase la parte inferior de .sobre-festival
function navegacionFija() {
	const barra = document.querySelector('.header');
	const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

	window.addEventListener('scroll', function () {

        if( sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
	});
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

		imagen.onclick = function () {
			mostrarImagen(i);
		};
		galeria.appendChild(imagen);
	}
}

function mostrarImagen(id) {
	const imagen = document.createElement('picture');
	imagen.innerHTML = `
        <picture>
        <source
            srcset="build/img/grande/${id}.avif"
            type="image/avif"
        />
        <source
            srcset="build/img/grande/${id}.webp"
            type="image/webp"
        />
        <img
            loading="lazy"
            width="300"
            height="200"
            src="img/grande/${id}.jpg"
            alt="Imagen galeria"
        />
        </picture>
    `;

	// Crea el overlay con la imagen
	const overlay = document.createElement('DIV');
	overlay.appendChild(imagen);
	overlay.classList.add('overlay');

	// Cerrar el overlay al dar click en cualquier lugar
	overlay.onclick = function () {
		overlay.remove();
		const body = document.querySelector('body');
		body.classList.remove('fijar-body');
	};

	// Boton para cerrar el modal
	const cerrarModal = document.createElement('P');
	cerrarModal.textContent = 'X';
	cerrarModal.classList.add('btn-cerrar');
	cerrarModal.onclick = function () {
		overlay.remove();
		const body = document.querySelector('body');
		body.classList.remove('fijar-body');
	};
	overlay.appendChild(cerrarModal);

	// Añade el overlay al html
	const body = document.querySelector('body');
	body.appendChild(overlay);
	body.classList.add('fijar-body');
}
