/* ===================================================
   ETIQUETAS HTML5 — script.js
   1. Dibujo en <canvas>
   2. Navegación dinámica (IntersectionObserver)
   3. Range input con valor en tiempo real
   4. Formulario completo con validación
=================================================== */

/* ===== 1. CANVAS ===== */
const canvas = document.getElementById("miCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  // suelo
  ctx.strokeStyle = "#00ff99";
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(250, 100);
  ctx.stroke();

  // casa (cuadrado)
  ctx.fillStyle = "#ff6b6b";
  ctx.fillRect(100, 60, 50, 40);

  // techo
  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.moveTo(100, 60);
  ctx.lineTo(125, 40);
  ctx.lineTo(150, 60);
  ctx.closePath();
  ctx.fill();

  // sol
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(40, 30, 15, 0, Math.PI * 2);
  ctx.fill();
}

/* ===== 2. NAVEGACIÓN DINÁMICA (sin recarga) ===== */
// Resalta el enlace del menú correspondiente a la sección visible
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll("a.nav[href^='#']");

const highlightNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Quitar clase activa de todos los enlaces
      navLinks.forEach(link => link.classList.remove("activo"));
      // Activar el enlace que corresponde a la sección visible
      const activeLink = document.querySelector(`.nav[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("activo");
    }
  });
}, {
  // La sección activa es la que ocupa el área central de la pantalla
  rootMargin: "-20% 0px -70% 0px",
  threshold: 0
});

sections.forEach(section => highlightNav.observe(section));

/* ===== 3. RANGE: valor en tiempo real ===== */
const rango      = document.getElementById("rango");
const valorRango = document.getElementById("valorRango");

if (rango && valorRango) {
  rango.addEventListener("input", () => {
    valorRango.textContent = rango.value;
  });
}

/* ===== 4. FORMULARIO COMPLETO — validación y envío ===== */
const formContacto = document.getElementById("formularioContacto");
const formMensaje  = document.getElementById("form-mensaje");

if (formContacto && formMensaje) {

  formContacto.addEventListener("submit", (e) => {
    // Evitar recarga de la página
    e.preventDefault();

    const nombre   = document.getElementById("nombre").value.trim();
    const email    = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const mensaje  = document.getElementById("mensaje").value.trim();
    const terminos = document.getElementById("terminos").checked;

    // Validación de campos obligatorios
    if (!nombre || !email || !password || !mensaje) {
      mostrarMensaje("❌ Por favor completa todos los campos obligatorios (*).", "error");
      return;
    }

    // Validación de longitud de contraseña
    if (password.length < 6) {
      mostrarMensaje("❌ La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    // Validación de términos
    if (!terminos) {
      mostrarMensaje("❌ Debes aceptar los términos y condiciones.", "error");
      return;
    }

    // Éxito
    mostrarMensaje(`✅ ¡Mensaje enviado con éxito, ${nombre}! Te contactaremos a ${email}.`, "ok");
    formContacto.reset();
    if (valorRango) valorRango.textContent = "5";
  });

  // Limpiar el mensaje al reiniciar el formulario
  formContacto.addEventListener("reset", () => {
    formMensaje.textContent = "";
    formMensaje.className = "mensaje-form";
  });
}

/** Muestra un mensaje de estado en el formulario */
function mostrarMensaje(texto, tipo) {
  formMensaje.textContent = texto;
  formMensaje.className   = `mensaje-form ${tipo}`;
}
