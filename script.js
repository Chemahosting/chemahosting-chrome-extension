document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll('#SeccionCero img[data-src]');

    imagenes.forEach((img, index) => {
        cargarImagenConDeteccion(img);
    });
});

function cargarImagenConDeteccion(img, intentos = 0) {
    const srcOriginal = img.getAttribute('data-src');
    const maxIntentos = 3;
    img.src = srcOriginal;

    img.onload = () => {
        img.style.opacity = "1";
        img.style.border = "none";
    };

    img.onerror = () => {
        if (intentos < maxIntentos) {
            console.warn(`Fallo en imagen. Reintentando (${intentos + 1}/${maxIntentos})...`);
            setTimeout(() => {
                img.src = `${srcOriginal}&retry=${new Date().getTime()}`;
                cargarImagenConDeteccion(img, intentos + 1);
            }, 2000);
        } else {
            console.error("No se pudo cargar la imagen tras varios intentos.");
            img.style.opacity = "0.5";
            img.style.border = "2px solid red";
            img.title = "Error al cargar estado del servidor";
        }
    };
}