// Menú responsive
document.getElementById("btnMenu").addEventListener("click", function () {
  document.querySelector(".menu").classList.toggle("show");
});

// Contador animado
const counters = document.querySelectorAll("[data-count]");
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-count");
    const current = +counter.innerText;
    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Slider automático
let index = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function showSlide() {
  index++;
  if (index >= totalSlides) index = 0;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(showSlide, 4000);
setInterval(showSlide, 4000);

// ------------------------------
// Fondo animado de red profesional
// ------------------------------
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const nodeCount = 60;
const maxDistance = 150;

// Crear nodos con parpadeo
for (let i = 0; i < nodeCount; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random(),
        fade: Math.random() * 0.02 + 0.005
    });
}

function createGradient(x1, y1, x2, y2) {
    let grad = ctx.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, "rgba(255,102,0,0.8)"); 
    grad.addColorStop(1, "rgba(0,0,0,0.2)"); 
    return grad;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,102,0,${n.opacity})`;
        ctx.fill();
    }

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                ctx.strokeStyle = createGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                ctx.globalAlpha = 1 - dist / maxDistance;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
}

function animate() {
    for (let n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        n.opacity += n.fade;
        if (n.opacity <= 0 || n.opacity >= 1) n.fade *= -1;
    }

    draw();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 102, 0, 0.7)'; // Naranja
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.strokeStyle = 'rgba(255, 102, 0, 0.3)';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function update() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();
// Efecto de inclinación con el mouse
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona los cajones en orden de más barato a más costoso
    const cards = [
        document.querySelector(".plan-economico"), // Plan más barato
        document.querySelector(".plan-medio1"),
        document.querySelector(".plan-medio2"),
        document.querySelector(".plan-alto"),
        document.querySelector(".plan-premium") // Plan más caro
    ];

    let index = 0;

    function aplicarBrillo() {
        // Elimina clases anteriores
        cards.forEach(card => card.classList.remove("shine", "pulse"));

        // Aplica efecto de brillo y pulso al actual
        const card = cards[index];
        if (card) {
            card.classList.add("shine");
            setTimeout(() => card.classList.add("pulse"), 300);
        }

        // Avanza al siguiente
        index = (index + 1) % cards.length;
    }

    // Repite el efecto cada 2 segundos
    setInterval(aplicarBrillo, 2000);
});
// Animación interactiva de redes sociales
document.querySelectorAll(".social-link").forEach(icon => {
  icon.addEventListener("click", () => {
    console.log(`Abriendo ${icon.querySelector("span").textContent}...`);
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const button = document.getElementById("sendBtn");
    const successMsg = document.getElementById("successMsg");

    // Sonido de confirmación (puedes poner cualquier archivo mp3 o wav)
    const sound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recarga

        // Efecto de brillo
        button.classList.add("clicked");

        // Reproducir sonido
        sound.play();

        // Mostrar mensaje de éxito
        successMsg.style.display = "block";

        // Quitar el efecto después de un tiempo
        setTimeout(() => {
            button.classList.remove("clicked");
            form.reset();
        }, 1500);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const clickables = [
    ...document.querySelectorAll(".footer-social .social-link"),
    ...document.querySelectorAll(".whatsapp-float")
  ];

  // Accesibilidad: permitir Enter/Espacio como click
  clickables.forEach(el => {
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Efecto ripple
  function addRipple(e, el) {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";

    const clientX = e.clientX ?? (rect.left + rect.width / 2);
    const clientY = e.clientY ?? (rect.top + rect.height / 2);
    ripple.style.left = clientX - rect.left - size / 2 + "px";
    ripple.style.top  = clientY - rect.top  - size / 2 + "px";

    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  }

  clickables.forEach(el => {
    el.addEventListener("click", e => addRipple(e, el));
  });

  // Pulso suave para WhatsApp
  const wa = document.querySelector(".whatsapp-float");
  if (wa) wa.classList.add("pulse");
});

// main/script.js

(() => {
  function onReady() {
    // 1) Pulso para WhatsApp (si existe)
    const wa = document.querySelector('.whatsapp-float');
    if (wa) wa.classList.add('pulse');

    // 2) Animación "reveal" para los cajones
    const boxes = document.querySelectorAll('.cajon');
    if (boxes.length) {
      // Estado inicial (si no lo pusiste en CSS)
      boxes.forEach(b => b.classList.remove('is-visible'));

      const makeVisible = (el) => el.classList.add('is-visible');

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              makeVisible(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.25 });

        boxes.forEach(b => io.observe(b));
      } else {
        // Fallback para navegadores antiguos
        const onScroll = () => {
          boxes.forEach(b => {
            const r = b.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.85) makeVisible(b);
          });
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
document.addEventListener("DOMContentLoaded", () => {
    const cajones = document.querySelectorAll(".cajon-proceso");
    cajones.forEach((cajon, index) => {
        cajon.style.opacity = "0";
        cajon.style.transform = "translateY(30px)";
        setTimeout(() => {
            cajon.style.transition = "all 0.6s ease";
            cajon.style.opacity = "1";
            cajon.style.transform = "translateY(0)";
        }, index * 200);
    });
});


function openForm() {
    document.getElementById("contactModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("contactModal").style.display = "none";
}

// Cerrar si el usuario hace click fuera del modal
window.onclick = function(event) {
    let modal = document.getElementById("contactModal");
    if (event.target === modal) {
        closeForm();
    }
}
function openForm() {
    document.getElementById("contactModal").style.display = "block";
}

function closeForm() {
    document.getElementById("contactModal").style.display = "none";
}

// Cierra si el usuario hace clic fuera del modal
window.onclick = function(event) {
    let modal = document.getElementById("contactModal");
    if (event.target === modal) {
        closeForm();
    }
};
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        palette: {
            popup: { background: "#000" },
            button: { background: "#ff7a00", text: "#ffffff" }
        },
        position: "bottom-left",
        content: {
            message: "Utilizamos cookies para mejorar tu experiencia de navegación.",
            dismiss: "Aceptar todo",
            deny: "Rechazar todo",
            link: "Personalizar",
            href: "#",
            target: "_self" // <-- evita que abra nueva pestaña
        },
        onPopupOpen: function() {
            // Le agregamos un id al enlace de Personalizar
            setTimeout(function(){
                let enlacePersonalizar = document.querySelector(".cc-link");
                if(enlacePersonalizar){
                    enlacePersonalizar.id = "btn-personalizar-cookies";
                }
            }, 50);
        }
    });
});
document.addEventListener("click", function(e){
    if(e.target && e.target.id === "btn-personalizar-cookies"){
        e.preventDefault();
        document.getElementById("cookie-preferences").style.display = "block";
    }
});
