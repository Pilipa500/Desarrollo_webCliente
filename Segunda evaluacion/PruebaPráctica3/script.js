document.addEventListener("DOMContentLoaded", function () {
    // /1. al cargar la página se pide permiso. Si lo concede se implementa la funcionalidad, en
    // caso contrario no se hace nada
    const permiso = confirm("¿Desea permitir la reproducción de audio?");
    if (!permiso) return;

    let audioActual = null;

    // Función para reproducir audio y mostrar información
    function reproducirAudio(event) {
        const audio = event.target;
        const genero = audio.parentElement.dataset.genero;
        const url = audio.src;
    
    // Obtener información del div contenedor
    const fila = audio.parentElement.dataset.fila;
    const columna = audio.parentElement.dataset.columna;

        // Detener audio previo si existe
        if (audioActual && audio !== audioActual) {
            audioActual.pause();
            limpiarInfo();
        }


        // Mostrar información
        const parrafo = document.createElement("p");
        parrafo.textContent = `Se está reproduciendo una pista de audio del género ${genero}.`;
        audio.parentElement.appendChild(parrafo);

        const enlace1 = document.createElement("a");
        enlace1.textContent = "Para seguir descubriendo nuevos temas visite: ";
        enlace1.href = url;
        enlace1.target = "_blank";
        audio.parentElement.appendChild(enlace1);

        const enlace2 = document.createElement("a");
        enlace2.textContent = "Pulse aquí para registrar su actividad y mandarla a terceros.";
        enlace2.href = "seo.html";
        enlace2.addEventListener("click", function (event) {
            // Guardar información en el almacenamiento local
            localStorage.setItem("titulo_cancion", audio.parentElement.querySelector("audio").getAttribute("src"));
            localStorage.setItem("fila_columna", `${audio.parentElement.dataset.fila}, ${audio.parentElement.dataset.columna}`);
        });
        audio.parentElement.appendChild(enlace2);

        //Reproducir audio
        audio.play();
        audioActual = audio;
    }

    // Función para limpiar información
    function limpiarInfo() {
        const parrafos = document.querySelectorAll("section p");
        parrafos.forEach(parrafo => parrafo.remove());
        const enlaces = document.querySelectorAll("section a");
        enlaces.forEach(enlace => enlace.remove());
    }

    // Agregar manejadores de eventos a los contenedores de audio
    const contenedoresAudio = document.querySelectorAll(".podcast");
    contenedoresAudio.forEach(contenedor => {
        contenedor.addEventListener("click", function (event) {
            const audio = contenedor.querySelector("audio");

            // Si el audio está reproduciendo, se detiene
            if (!audio.paused) {
                audio.pause();
                limpiarInfo();
            } else {
                reproducirAudio(event);
            }
        });
    });
});
