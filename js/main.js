(function () {
  "use strict";

  var ICONS = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cart: '<path d="M3 4h2l2.4 11h10.8L21 7H6.2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.5 5"/>',
    box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18h2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12"/>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Menú móvil
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");
  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  // Borde del nav al hacer scroll
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Portafolio
  var projects = window.AYIPEY_PROJECTS || [];
  var grid = document.getElementById("projects-grid");
  var filters = document.getElementById("filters");

  function card(p) {
    var link = p.link
      ? '<a class="project__link" href="' + esc(p.link) + '"' +
        (/^https?:/.test(p.link) ? ' target="_blank" rel="noopener"' : "") + ">Conocer más →</a>"
      : "";
    return (
      '<article class="card project' + (p.featured ? " project--featured" : "") + '">' +
        '<div class="project__top">' +
          '<div class="card__ic" style="margin:0"><svg viewBox="0 0 24 24">' + (ICONS[p.icon] || ICONS.code) + "</svg></div>" +
          '<span class="project__cat">' + esc(p.category) + "</span>" +
        "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.summary) + "</p>" +
        '<ul class="tags">' + (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        link +
      "</article>"
    );
  }

  var moreCard =
    '<article class="card more">' +
      "<h3>¿Tu proyecto es el siguiente?</h3>" +
      '<p class="muted">Cuéntanos el reto de tu empresa y lo convertimos en software.</p>' +
      '<a class="btn btn--sm" href="#contacto">Hablemos</a>' +
    "</article>";

  function render(cat) {
    var list = cat ? projects.filter(function (p) { return p.category === cat; }) : projects;
    grid.innerHTML = list.map(card).join("") + moreCard;
    indexChildren(grid);
    if (grid.classList.contains("is-in")) {
      // Reinicia la entrada escalonada al cambiar de filtro
      grid.classList.remove("is-in", "is-done");
      requestAnimationFrame(function () { requestAnimationFrame(function () { show(grid); }); });
    }
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function indexChildren(parent) {
    Array.prototype.forEach.call(parent.children, function (c, i) { c.style.setProperty("--i", Math.min(i, 8)); });
  }

  function show(el) {
    el.classList.add("is-in");
    el.querySelectorAll("[data-count], [data-since]").forEach(countUp);
    if (el.matches("[data-count], [data-since]")) countUp(el);
    // Quita los retrasos al terminar para que el hover responda al instante
    setTimeout(function () { el.classList.add("is-done"); }, 1600);
  }

  grid.classList.add("stagger");

  var cats = projects.map(function (p) { return p.category; })
    .filter(function (c, i, a) { return a.indexOf(c) === i; });

  if (cats.length > 1) {
    filters.innerHTML = ['<button class="chip" role="tab" aria-selected="true" data-cat="">Todos</button>']
      .concat(cats.map(function (c) {
        return '<button class="chip" role="tab" aria-selected="false" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
      })).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
      render(b.getAttribute("data-cat"));
    });
  }
  render("");

  // Contadores animados (ej. montos del recibo, años de operación)
  var fmtCache = {};
  function fmt(n, dec) {
    var f = fmtCache[dec] || (fmtCache[dec] = new Intl.NumberFormat("es-MX", { minimumFractionDigits: dec, maximumFractionDigits: dec }));
    return f.format(n);
  }
  document.querySelectorAll("[data-since]").forEach(function (el) {
    var since = new Date(el.getAttribute("data-since"));
    var years = Math.floor((Date.now() - since) / (365.25 * 864e5));
    el.setAttribute("data-count", years);
    el.textContent = years;
  });
  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    var to = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    if (reduceMotion) { el.textContent = fmt(to, dec); return; }
    var start = null, dur = 1100;
    function step(t) {
      if (start === null) start = t;
      var k = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * eased, dec);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Entrada al hacer scroll (IntersectionObserver, solo transform/opacity)
  document.querySelectorAll(".stagger").forEach(indexChildren);
  document.querySelectorAll(".grid, .values").forEach(function (g) {
    var items = g.querySelectorAll(":scope > .reveal");
    Array.prototype.forEach.call(items, function (el, i) { el.style.setProperty("--i", Math.min(i, 8)); });
  });
  var els = document.querySelectorAll(".reveal, .stagger");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(show);
  }

  // Brillo que sigue al cursor en tarjetas (solo con mouse)
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      var t = e.target.closest && e.target.closest(".card, .step, .values li");
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", (e.clientX - r.left) + "px");
      t.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  // Barra de progreso y sección activa en el menú
  var bar = document.querySelector(".progress");
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", h > 0 ? (window.scrollY / h).toFixed(4) : 0);
      ticking = false;
    });
  }, { passive: true });

  var links = {};
  menu.querySelectorAll('a[href^="#"]:not(.btn)').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
        var a = links[en.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spy.observe(document.querySelector(".hero"));
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // Botones de producto preseleccionan el interés en el formulario
  var interes = document.getElementById("interes");
  document.querySelectorAll("[data-interes]").forEach(function (b) {
    b.addEventListener("click", function () { interes.value = b.getAttribute("data-interes"); });
  });

  // Formulario: abre el cliente de correo con el mensaje prellenado
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (f) {
      var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute("aria-invalid", String(bad));
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = "Por favor completa nombre, correo válido y mensaje."; return; }
    var d = new FormData(form);
    var body =
      "Nombre: " + d.get("nombre") + "\n" +
      "Empresa: " + d.get("empresa") + "\n" +
      "Correo: " + d.get("correo") + "\n" +
      "Teléfono: " + d.get("telefono") + "\n" +
      "Interés: " + d.get("interes") + "\n\n" + d.get("mensaje");
    window.location.href = "mailto:contacto@ayipeytecnology.com?subject=" +
      encodeURIComponent("Contacto web: " + d.get("interes")) + "&body=" + encodeURIComponent(body);
    note.textContent = "Abriendo tu correo para enviar el mensaje…";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
