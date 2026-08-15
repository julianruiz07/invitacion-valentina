const SUPABASE_URL = "https://rqotuykqpdcyczoemzcg.supabase.co";
const SUPABASE_KEY = "sb_publishable_pSLNDGlMxR2DoNZ5I4dlEg_kzHO6P1D";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    }
);

/* ==========================================
   PROYECTO UNAD
   SCRIPT PRINCIPAL
========================================== */

/* ==========================================
   PARTÍCULAS
========================================== */

const container = document.getElementById("particles");

for (let i = 0; i < 40; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration = (5 + Math.random() * 6) + "s";

    particle.style.animationDelay = Math.random() * 8 + "s";

    particle.style.opacity = Math.random();

    container.appendChild(particle);

}

/* ==========================================
   ELEMENTOS
========================================== */

const hero = document.querySelector(".hero");

const book = document.getElementById("book");

const scene3 = document.querySelector(".scene-3");

/* ==========================================
   RESPONSIVE — ESCALADO DEL LIBRO
========================================== */

function ajustarLibro() {

    const libro = document.querySelector(".book-open");

    if (!libro) {
        return;
    }

    const anchoBase = 1450;
    const altoBase = 920;

    const margen = 20;

    const anchoDisponible = window.innerWidth - margen * 2;
    const altoDisponible = window.innerHeight - margen * 2;

    const escalaAncho = anchoDisponible / anchoBase;
    const escalaAlto = altoDisponible / altoBase;

 const escala = Math.min(
    escalaAncho,
    escalaAlto,
    1
);

libro.style.transform = `scale(${escala})`;
}

/* ---------- AJUSTAR AL CARGAR ---------- */

window.addEventListener("load", () => {

    ajustarLibro();

});


/* ---------- AJUSTAR AL CAMBIAR TAMAÑO ---------- */

window.addEventListener("resize", () => {

    ajustarLibro();

});



/* ==========================================
   CARGA INICIAL
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        book.classList.add("show");

    }, 800);

})

/* ==========================================
   CLICK EN EL LIBRO — DESTELLO
========================================== */

book.addEventListener("click", () => {

    /* Evitar doble clic */
    if (book.classList.contains("transitioning")) {
        return;
    }

    book.classList.add("transitioning");

    /* Crear el destello */
    const flash = document.createElement("div");

    flash.className = "flash-transition";

    document.body.appendChild(flash);

    /* Activar destello */
    requestAnimationFrame(() => {
        flash.classList.add("active");
    });

    /* Mostrar el libro abierto mientras la pantalla está blanca */
    setTimeout(() => {

        scene3.classList.add("show");

    }, 180);

    /* Retirar portada */
    setTimeout(() => {

        hero.classList.add("fade-out");

    }, 260);

    /* ---------- Quitar el destello ---------- */
setTimeout(() => {

    flash.classList.remove("active");
    flash.classList.add("fade");

}, 1420);

    /* Limpiar */
    setTimeout(() => {

        flash.remove();

        book.classList.remove("transitioning");

    }, 2500);

});

/* ==========================================
   SISTEMA DE PASO DE HOJAS
========================================== */

const pagePairs = [

    {
        right: ".page-2",
        nextRight: ".page-4",
        left: ".page-1",
        nextLeft: ".page-3"
    },

    {
        right: ".page-4",
        nextRight: ".page-6",
        left: ".page-3",
        nextLeft: ".page-5"
    },

    {
        right: ".page-6",
        nextRight: ".page-8",
        left: ".page-5",
        nextLeft: ".page-7"
    }

];


let pasandoPagina = false;


function crearHoja(sourceSelector, backSelector) {

    const source =
        document.querySelector(sourceSelector);

    const back =
        document.querySelector(backSelector);


    if (!source || !back) {
        return null;
    }


    /* ======================================================
       HOJA FÍSICA
    ====================================================== */

    const sheet =
        document.createElement("div");

    sheet.className =
        "turning-sheet";


    /* ======================================================
       FRENTE
       Página derecha actual
    ====================================================== */

    const front =
        document.createElement("div");

    front.className =
        "turning-face turning-front";


    const frontContent =
        source.cloneNode(true);


    frontContent.classList.remove("active");

    frontContent.classList.add(
        "page-content"
    );


    front.appendChild(
        frontContent
    );


    /* ======================================================
       REVERSO
       Página izquierda siguiente
    ====================================================== */

    const backFace =
        document.createElement("div");

    backFace.className =
        "turning-face turning-back";


    const backContent =
        back.cloneNode(true);


    backContent.classList.remove("active");

    backContent.classList.add(
        "page-content"
    );


    backFace.appendChild(
        backContent
    );


    /* ======================================================
       ARMAR HOJA
    ====================================================== */

    sheet.appendChild(front);

    sheet.appendChild(backFace);


    return sheet;

}


/* ---------- PASAR UNA HOJA ---------- */

function pasarPagina(index) {

    if (pasandoPagina) {
        return;
    }


    const pair =
        pagePairs[index];


    if (!pair) {
        return;
    }


    const right =
        document.querySelector(pair.right);

    const nextRight =
        document.querySelector(pair.nextRight);

    const left =
        document.querySelector(pair.left);

    const nextLeft =
        document.querySelector(pair.nextLeft);


    if (
        !right ||
        !nextRight ||
        !left ||
        !nextLeft
    ) {
        return;
    }


    pasandoPagina = true;


    /* ======================================================
       CREAR LA HOJA
    ====================================================== */

    const sheet =
        crearHoja(
            pair.right,
            pair.nextLeft
        );


    if (!sheet) {

        pasandoPagina = false;

        return;
    }


    const bookOpen =
        document.querySelector(".book-open");


    /* ======================================================
       INSERTAR HOJA ENCIMA DEL LIBRO
    ====================================================== */

    bookOpen.appendChild(sheet);


    /* ======================================================
       OCULTAR LA PÁGINA ORIGINAL
    ====================================================== */

    right.style.visibility =
        "hidden";


    /* ======================================================
       MOSTRAR LA PÁGINA DERECHA SIGUIENTE DEBAJO
    ====================================================== */

    nextRight.classList.add("active");


    /* ======================================================
       FORZAR ESTADO INICIAL
    ====================================================== */

    void sheet.offsetWidth;


    /* ======================================================
       GIRAR
    ====================================================== */

    requestAnimationFrame(() => {

        sheet.classList.add("turn");

    });


    /* ======================================================
       FINAL
    ====================================================== */

    setTimeout(() => {

        right.classList.remove("active");

        left.classList.remove("active");


        nextRight.classList.add("active");

        nextLeft.classList.add("active");


        sheet.remove();


        right.style.visibility =
            "";


        pasandoPagina =
            false;

    }, 1200);

}


/* ==========================================
   CLICS
========================================== */

document
    .querySelector(".page-2")
    .addEventListener("click", () => {

        pasarPagina(0);

    });


document
    .querySelector(".page-4")
    .addEventListener("click", () => {

        pasarPagina(1);

    });


document
    .querySelector(".page-6")
    .addEventListener("click", () => {

        pasarPagina(2);

    });


/* ==========================================
   PERGAMINO — FORMULARIO DE MENSAJE
========================================== */

const pergamino = document.querySelector(".mensaje-interactivo");
const formularioMensaje = document.getElementById("formulario-mensaje");
const mensajeUsuario = document.getElementById("mensaje-usuario");
const nombreInvitado = document.getElementById("nombre-invitado");
const contadorMensaje = document.getElementById("contador-mensaje");
const btnEnviarMensaje = document.getElementById("btn-enviar-mensaje");
const estadoMensaje = document.getElementById("estado-mensaje");


/* ---------- ABRIR FORMULARIO ---------- */

pergamino.addEventListener("click", () => {

    formularioMensaje.classList.add("visible");

});


/* ---------- CONTADOR DE CARACTERES ---------- */

mensajeUsuario.addEventListener("input", () => {

    contadorMensaje.textContent = mensajeUsuario.value.length;

});


/* ---------- ENVIAR MENSAJE ---------- */

btnEnviarMensaje.addEventListener("click", async () => {

    const mensaje = mensajeUsuario.value.trim();
    const nombre = nombreInvitado.value.trim();


    if (nombre.length === 0) {

        estadoMensaje.textContent = "Escribe tu nombre primero ❤️";
        return;

    }


    if (mensaje.length === 0) {

        estadoMensaje.textContent = "Escribe primero tu mensaje ❤️";
        return;

    }


    if (mensaje.length > 200) {

        estadoMensaje.textContent =
            "El mensaje no puede superar los 200 caracteres.";

        return;

    }


    btnEnviarMensaje.disabled = true;
    btnEnviarMensaje.textContent = "Guardando...";


    const { error } = await supabaseClient
        .from("mensajes")
        .insert([
            {
                invitado: nombre,
                mensaje: mensaje
            }
        ]);


    if (error) {

        console.error("Error al guardar:", error);

        estadoMensaje.textContent =
            "No pudimos guardar tu mensaje. Inténtalo nuevamente.";

        btnEnviarMensaje.disabled = false;
        btnEnviarMensaje.textContent = "Guardar mi recuerdo ♥";

        return;

    }


    /* ---------- GUARDADO CORRECTO ---------- */

    estadoMensaje.textContent =
        "Tu recuerdo ha quedado guardado ❤️";

    mensajeUsuario.value = "";
    nombreInvitado.value = "";

    contadorMensaje.textContent = "0";


    setTimeout(() => {

        formularioMensaje.classList.remove("visible");

        btnEnviarMensaje.disabled = false;
        btnEnviarMensaje.textContent = "Guardar mi recuerdo ♥";
        estadoMensaje.textContent = "";

    }, 1800);

});

/* ==========================================
   CÁMARA — VISTA EN VIVO
========================================== */

const camara = document.querySelector(".camara-antigua");

let streamCamara = null;

camara.addEventListener("click", async () => {

    try {

        streamCamara = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        console.log("📷 Cámara abierta correctamente");

        mostrarCamara(streamCamara);

    } catch (error) {

        console.error("Error al abrir la cámara:", error);

        alert("No se pudo abrir la cámara.");

    }

});


/* ---------- MOSTRAR CÁMARA ---------- */
function mostrarCamara(stream) {

    const ventanaCamara = document.createElement("div");

    ventanaCamara.className = "ventana-camara";

    ventanaCamara.innerHTML = `
        <div class="contenido-camara">

            <video
                id="video-camara"
                autoplay
                playsinline
                muted
            ></video>

            <canvas
                id="canvas-camara"
                style="display: none;"
            ></canvas>

            <button
                id="cerrar-camara"
                type="button"
            >
                ✕
            </button>

            <button
                id="tomar-foto"
                type="button"
            >
                📸 Tomar foto
            </button>

            <div
                id="controles-foto"
                style="display: none;"
            >
                <button
                    id="repetir-foto"
                    type="button"
                >
                    🔄 Repetir
                </button>

                <button
                    id="usar-foto"
                    type="button"
                >
                    ❤️ Usar foto
                </button>
            </div>

        </div>
    `;

    document.body.appendChild(ventanaCamara);

    const video = document.getElementById("video-camara");
    const canvas = document.getElementById("canvas-camara");

    const btnTomar = document.getElementById("tomar-foto");
    const btnRepetir = document.getElementById("repetir-foto");
    const btnUsar = document.getElementById("usar-foto");

    const controlesFoto =
        document.getElementById("controles-foto");


    video.srcObject = stream;


    /* ==========================================
       TOMAR FOTO
    ========================================== */

    btnTomar.addEventListener("click", () => {

        if (!video.videoWidth || !video.videoHeight) {
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const contexto = canvas.getContext("2d");

        contexto.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        video.style.display = "none";
        canvas.style.display = "block";

        btnTomar.style.display = "none";
        controlesFoto.style.display = "flex";

    });


    /* ==========================================
       REPETIR FOTO
    ========================================== */

    btnRepetir.addEventListener("click", () => {

        canvas.style.display = "none";
        video.style.display = "block";

        controlesFoto.style.display = "none";
        btnTomar.style.display = "block";

    });


    /* ==========================================
       USAR FOTO
    ========================================== */

    btnUsar.addEventListener("click", () => {

        const foto = canvas.toDataURL("image/png");

        console.log("📸 Foto capturada:", foto);

        /*
         * POR AHORA:
         * dejamos la foto capturada lista.
         *
         * Aquí vamos a colocar después
         * el marco y la composición final.
         */

    });


    /* ==========================================
       CERRAR CÁMARA
    ========================================== */

    document
        .getElementById("cerrar-camara")
        .addEventListener("click", () => {

            cerrarCamara(ventanaCamara);

        });

}


/* ---------- CERRAR CÁMARA ---------- */

function cerrarCamara(ventanaCamara) {

    if (streamCamara) {

        streamCamara.getTracks().forEach(track => track.stop());

        streamCamara = null;

    }

    ventanaCamara.remove();

}