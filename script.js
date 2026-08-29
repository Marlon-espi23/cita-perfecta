
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const music = document.getElementById("bg-music");

const datePicker = document.getElementById("date-picker");
const confirmDateBtn = document.getElementById("confirm-date-btn");

const gameScreen = document.getElementById("game-screen");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");
const step4 = document.getElementById("step-4");

const cardScreen = document.getElementById("card-screen");
const whatsappBtn = document.getElementById("whatsapp-btn");

let choices = {
    date: "",
    plan: "",
    food: ""
};

let currentStep = 1;
let dodges = 0;

function getNoMessage(intentos) {
    const respuestas = [
        "¿Segura? 🥺",
        "Piénsalo bien... 👀",
        "¿De verdad no? 💔",
        "¡Intenta otra vez! 😂",
        "Ni lo sueñes 🤭",
        "¡Ya dile que sí! 🥰",
        "Ese botón no funciona 😌❤️",
        "Creo que quieres decir SÍ 😏"
    ];

    return respuestas[Math.min(intentos - 1, respuestas.length - 1)];
}

function dodge() {
    dodges++;

    no.textContent = getNoMessage(dodges);

    if (yes) {
        const crecimiento = 1 + (dodges * 0.15);
        yes.style.setProperty("--grow", crecimiento);
    }

    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    const buttonWidth = 100;
    const buttonHeight = 55;

    const maxX = Math.max(10, ancho - buttonWidth - 10);
    const maxY = Math.max(10, alto - buttonHeight - 10);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    no.style.position = "fixed";
    no.style.left = "0px";
    no.style.top = "0px";

    no.style.transform =
        "translate(" +
        x +
        "px, " +
        y +
        "px) scale(" +
        Math.max(0.55, 1 - dodges * 0.04) +
        ")";
}

if (no) {
    no.addEventListener("mouseover", dodge);

    no.addEventListener("touchstart", function(event) {
        event.preventDefault();
        dodge();
    });
}

if (yes) {
    yes.addEventListener("click", function() {
        if (music) {
            music.play().catch(function() {
                console.log("El navegador bloqueó el audio.");
            });
        }

        gameScreen.classList.add("hidden");
        step2.classList.remove("hidden");

        currentStep = 2;
    });
}

if (datePicker) {
    const ahora = new Date();

    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0");
    const dia = String(ahora.getDate()).padStart(2, "0");

    const fechaLocal = anio + "-" + mes + "-" + dia;

    datePicker.min = fechaLocal;
    datePicker.value = fechaLocal;
}

if (confirmDateBtn && datePicker) {
    confirmDateBtn.addEventListener("click", function() {
        if (!datePicker.value) {
            alert("Por favor, selecciona una fecha 🥺");
            return;
        }

        const partes = datePicker.value.split("-");

        choices.date =
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0];

        step2.classList.add("hidden");
        step3.classList.remove("hidden");

        currentStep = 3;
    });
}

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const selection =
            event.currentTarget.getAttribute("data-detail");

        if (currentStep === 3) {
            choices.plan = selection;

            step3.classList.add("hidden");
            step4.classList.remove("hidden");

            currentStep = 4;
        } else if (currentStep === 4) {
            choices.food = selection;

            step4.classList.add("hidden");

            currentStep = 5;

            showFinalCard();
        }
    });
});

function showFinalCard() {
    document.getElementById("summary-date").textContent = choices.date;
    document.getElementById("summary-plan").textContent = choices.plan;
    document.getElementById("summary-food").textContent = choices.food;

   const mensaje =
    "\uD83D\uDC95 ¡Nuestra cita está confirmada! \uD83E\uDD79\n\n" +
    "\uD83D\uDCC5 *Fecha:* " + choices.date + "\n" +
    "\uD83C\uDFAC *Plan:* " + choices.plan + "\n" +
    "\uD83C\uDF55 *Comida:* " + choices.food + "\n\n" +
    "\u2728 Ya tenemos nuestro plan listo \uD83E\uDD70\n" +
    "\uD83E\uDD17 ¡Ahora solo falta disfrutar juntos! \u2764\uFE0F\n\n" +
    "\uD83D\uDC95 ¡Qué emoción! \u2728";

    const numeroWhatsApp = "50557817630";

    const enlaceWhatsApp =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);

    if (whatsappBtn) {
        whatsappBtn.href = enlaceWhatsApp;
    }

    cardScreen.classList.remove("hidden");

    iniciarCorazones();
}

let heartInterval = null;

function iniciarCorazones() {
    if (heartInterval) {
        clearInterval(heartInterval);
    }

    heartInterval = setInterval(createHeart, 300);
}

function createHeart() {
    const heart = document.createElement("span");

    heart.textContent = "❤️";
    heart.classList.add("floating-heart");

    heart.style.left = (Math.random() * 100) + "vw";

    heart.style.fontSize =
        (Math.random() * 20 + 15) + "px";

    heart.style.animationDuration =
        (Math.random() * 2 + 3) + "s";

    document.body.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 5000);
}

