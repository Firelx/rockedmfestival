const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache'); // Para guardar las imagenes en cache para despues reducir su tamaño
const imagemin = require('gulp-imagemin'); // Para reducir el tamaño de las imagenes .jpg y .png
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Ejecuta sass sobre app.scss y guarda el resultado en build/css, ademas ejecuta plumber para que no se detenga el watcch de los archivos scss ante un error
function css(done) {
	src('src/scss/app.scss') // Identificar el archivo SASS
		.pipe(plumber()) // Añadir plumber para que no detenga la ejecución del watch por algun error
		.pipe(sass()) // Compilarlo
		.pipe(dest('build/css')); // Almacenarla en el disco duro

	done(); // Callback que avisa a gulp cuando una función llega al final
}

// Convierte las imagenes png y jpg de src a webp
function versionWebp(done) {
	const opciones = {
		quality: 50,
	};

	src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/img'));

	done();
}

function imagenes(done) {
	const opciones = {
		optimizationLevel: 3,
	};

	src('src/img/**/*.{png,jpg}')
		.pipe(cache(imagemin(opciones))) // Estas imagenes requieren estar en cache
		.pipe(dest('build/img'));

	done();
}

function versionAvif(done) {
	const opciones = {
		quality: 50,
	};

	src('src/img/**/*.{png,jpg}').pipe(avif(opciones)).pipe(dest('build/img'));

	done();
}

//Vigila los cambios en los archivos scss
function dev(done) {
	watch('src/**/*.scss', css);
	done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
