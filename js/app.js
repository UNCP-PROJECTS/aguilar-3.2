/**
 * Nestlong MVP - Controlador Integral del Cliente
 * Desarrollado para UNCP - Desarrollo de Aplicaciones Web
 * Autores: José Pablo Osorio Mallqui & Arlette D'Alessandra Suárez Román
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdaptiveHeader();
  initScrollSpy();
  initMobileNavCollapse();
  initHeroSlideshow();
  initScrollAnimations();
  initAnimatedCounters();
  initNeighborhoods();
  initFavoritesSystem();
  initCataloguePage();
  initTestimonials();
  initFAQ();
  initDetailPage();
  initFormValidation();
  initCharacterCounters();
  initNewsletterForm();
  initBackToTop();
  initNavCityLinks();
});

/** Normaliza cadenas removiendo diacríticos/tildes y pasando a minúsculas */
function normalizeStr(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Sistema de Notificaciones Toast Flotante */
function showToast(message, duration = 3000) {
  const toast = document.getElementById("nestlong-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

/* ── 1. Header Adaptativo al Scroll ── */
function initAdaptiveHeader() {
  const header = document.getElementById("main-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── 2. ScrollSpy para el Navbar ── */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#navbarNestlongContent .nav-link[href^='#']");
  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("nav-active");
          } else {
            link.classList.remove("nav-active");
          }
        });
      }
    });
  }, { passive: true });
}

/* ── 3. Auto-cierre del Menú Móvil en Clic ── */
function initMobileNavCollapse() {
  const navContent = document.getElementById("navbarNestlongContent");
  if (!navContent) return;

  const links = navContent.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navContent.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navContent);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ── 4. Hero Slideshow con Controles Manuales y Pausa en Hover ── */
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll("#hero-dots button, .hero-dot");
  const prevBtn = document.getElementById("hero-prev-btn");
  const nextBtn = document.getElementById("hero-next-btn");
  const heroSection = document.querySelector("section.position-relative.overflow-hidden");

  if (slides.length < 2) return;

  let current = 0;
  let timer = null;

  function goTo(idx) {
    slides[current].classList.remove("active");
    if (dots[current]) {
      dots[current].classList.remove("active", "opacity-100");
      dots[current].classList.add("opacity-50");
    }
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots[current]) {
      dots[current].classList.remove("opacity-50");
      dots[current].classList.add("active", "opacity-100");
    }
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5500);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      resetTimer();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goTo(current - 1);
      resetTimer();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goTo(current + 1);
      resetTimer();
    });
  }

  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => clearInterval(timer));
    heroSection.addEventListener("mouseleave", startTimer);
  }

  startTimer();
}

/* ── 5. Scroll Animations (IntersectionObserver) ── */
function initScrollAnimations() {
  const els = document.querySelectorAll(".animate-on-scroll");
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible", "visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => observer.observe(el));
}

/* ── 6. Contadores Animados con Easing Cúbico ── */
function initAnimatedCounters() {
  const counters = document.querySelectorAll("[data-counter-target], .counter-value[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.counted === "true") return;

      const target = parseInt(el.dataset.counterTarget || el.dataset.target, 10);
      const suffix = el.dataset.counterSuffix || (el.innerText.includes("%") ? "%" : el.innerText.includes("h") ? "h" : "");
      const duration = 1800;
      const start = performance.now();

      el.dataset.counted = "true";

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(target * eased);
        el.textContent = currentVal.toString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toString() + suffix;
          el.classList.add("counter-animated");
        }
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

/* ── 7. Renderizado e Interactividad de Barrios ── */
function initNeighborhoods() {
  const grid = document.getElementById("neighborhoods-grid");
  if (!grid || typeof BARRIOS_DESTACADOS === "undefined") return;

  grid.innerHTML = BARRIOS_DESTACADOS.map((b, i) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="neighborhood-card h-100 position-relative animate-on-scroll delay-${(i % 3 + 1) * 100} shadow-sm" style="min-height: 260px; cursor: pointer;" data-filter-city="${b.ciudad}">
        <img src="https://picsum.photos/seed/${b.imagenSeed}/600/400" alt="${b.nombre}, ${b.ciudad}" class="w-100 h-100" style="object-fit: cover; position: absolute; inset: 0;" loading="lazy" width="600" height="400">
        <div class="neighborhood-overlay" style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%);"></div>
        <div class="position-absolute bottom-0 start-0 p-4 text-white w-100" style="z-index: 2;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge rounded-pill px-2.5 py-1 text-white" style="background-color: #0369A1; font-size: 0.72rem; font-weight: 700;">${b.propiedadesDisponibles} propiedades</span>
            <span class="small text-slate-300 fw-semibold">${b.ciudad}</span>
          </div>
          <h3 class="h4 fw-bold mb-1 text-white">${b.nombre}</h3>
          <p class="small text-slate-300 mb-2 line-clamp-2" style="font-size: 0.82rem;">${b.descripcionCorta}</p>
          <span class="d-inline-flex align-items-center gap-1 small text-sky-400 fw-semibold text-decoration-none" style="font-size: 0.78rem;">
            Ver viviendas en ${b.ciudad} &rarr;
          </span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".neighborhood-card").forEach(card => {
    card.addEventListener("click", () => {
      const city = card.dataset.filterCity;
      const citySelect = document.getElementById("filter-city");
      if (citySelect) {
        citySelect.value = city;
        citySelect.dispatchEvent(new Event("change"));
      }
      const catalogoSection = document.getElementById("catalogo");
      if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  initScrollAnimations();
}

/* ── 8. Enlaces de Navegación por Ciudad ── */
function initNavCityLinks() {
  document.querySelectorAll(".city-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const city = link.dataset.city;
      const citySelect = document.getElementById("filter-city");
      if (citySelect && city) {
        citySelect.value = city;
        citySelect.dispatchEvent(new Event("change"));
      }
    });
  });
}

/* ── 9. Sistema de Favoritos (LocalStorage) ── */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("nestlong_favorites") || "[]");
  } catch (e) {
    return [];
  }
}

function saveFavorites(favs) {
  try {
    localStorage.setItem("nestlong_favorites", JSON.stringify(favs));
  } catch (e) {}
}

function updateFavBadge() {
  const badge = document.getElementById("fav-count-badge");
  if (!badge) return;
  const favs = getFavorites();
  badge.textContent = favs.length.toString();
  badge.classList.toggle("d-none", favs.length === 0);
}

function initFavoritesSystem() {
  updateFavBadge();
}

/* ── 10. Catálogo Reactivo con Pills y Favoritos ── */
function initCataloguePage() {
  const gridContainer = document.getElementById("properties-grid");
  if (!gridContainer || typeof PROPIEDADES === "undefined") return;

  const cityFilter = document.getElementById("filter-city");
  const priceFilter = document.getElementById("filter-price");
  const typeFilter = document.getElementById("filter-type");
  const searchInput = document.getElementById("filter-search") || document.getElementById("search-input");
  const sortSelect = document.getElementById("filter-sort") || document.getElementById("sort-select");
  const countBadge = document.getElementById("properties-count");
  const toggleFavBtn = document.getElementById("toggle-favorites-btn");
  const activeFiltersBar = document.getElementById("active-filters-bar");
  const activePillsList = document.getElementById("active-pills-list");
  const clearAllBtn = document.getElementById("clear-all-filters-btn");

  let showOnlyFavorites = false;

  function updateActivePills() {
    if (!activeFiltersBar || !activePillsList) return;

    const pills = [];
    const city = cityFilter ? cityFilter.value : "all";
    const price = priceFilter ? priceFilter.value : "all";
    const type = typeFilter ? typeFilter.value : "all";
    const search = searchInput ? searchInput.value.trim() : "";

    if (city !== "all") pills.push({ label: `Ciudad: ${city}`, clear: () => { cityFilter.value = "all"; applyFilters(); } });
    if (price === "under1000") pills.push({ label: "Hasta 1.000 €", clear: () => { priceFilter.value = "all"; applyFilters(); } });
    if (price === "1000to1500") pills.push({ label: "1.000 € - 1.500 €", clear: () => { priceFilter.value = "all"; applyFilters(); } });
    if (price === "above1500") pills.push({ label: "Más de 1.500 €", clear: () => { priceFilter.value = "all"; applyFilters(); } });
    if (type !== "all") pills.push({ label: `Tipo: ${type.charAt(0).toUpperCase() + type.slice(1)}`, clear: () => { typeFilter.value = "all"; applyFilters(); } });
    if (search) pills.push({ label: `"${search}"`, clear: () => { searchInput.value = ""; applyFilters(); } });
    if (showOnlyFavorites) pills.push({ label: "Solo Favoritos", clear: () => { toggleFavFilter(); } });

    if (pills.length === 0) {
      activeFiltersBar.classList.add("d-none");
      activePillsList.innerHTML = "";
    } else {
      activeFiltersBar.classList.remove("d-none");
      activePillsList.innerHTML = pills.map((p, idx) => `
        <span class="filter-pill">
          <span>${p.label}</span>
          <button type="button" data-pill-idx="${idx}" aria-label="Eliminar filtro ${p.label}">&times;</button>
        </span>
      `).join("");

      activePillsList.querySelectorAll("button[data-pill-idx]").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.pillIdx, 10);
          if (pills[idx]) pills[idx].clear();
        });
      });
    }
  }

  function toggleFavFilter() {
    showOnlyFavorites = !showOnlyFavorites;
    if (toggleFavBtn) {
      toggleFavBtn.classList.toggle("btn-danger", showOnlyFavorites);
      toggleFavBtn.classList.toggle("text-white", showOnlyFavorites);
      toggleFavBtn.classList.toggle("btn-outline-secondary", !showOnlyFavorites);
      toggleFavBtn.setAttribute("aria-pressed", showOnlyFavorites.toString());
    }
    applyFilters();
  }

  if (toggleFavBtn) {
    toggleFavBtn.addEventListener("click", toggleFavFilter);
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (cityFilter) cityFilter.value = "all";
      if (priceFilter) priceFilter.value = "all";
      if (typeFilter) typeFilter.value = "all";
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "default";
      showOnlyFavorites = false;
      if (toggleFavBtn) {
        toggleFavBtn.classList.remove("btn-danger", "text-white");
        toggleFavBtn.classList.add("btn-outline-secondary");
        toggleFavBtn.setAttribute("aria-pressed", "false");
      }
      applyFilters();
    });
  }

  function renderProperties(list) {
    updateActivePills();
    updateFavBadge();

    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="p-5 bg-white rounded-4 shadow-sm max-w-md mx-auto border border-slate-200">
            <svg class="svg-icon text-secondary mb-3 d-inline-block" width="48" height="48" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h4 class="h5 fw-bold text-dark mb-2">${showOnlyFavorites ? "No tienes favoritos guardados" : "No se encontraron propiedades"}</h4>
            <p class="text-secondary small mb-4">${showOnlyFavorites ? "Marca el icono de corazón en cualquier propiedad para guardarla aquí." : "Prueba modificando los filtros de búsqueda o la ciudad seleccionada."}</p>
            <button class="btn btn-outline-primary rounded-pill px-4 py-2 small fw-semibold" id="reset-filters-btn">Restablecer filtros</button>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (clearAllBtn) clearAllBtn.click();
        });
      }
      if (countBadge) countBadge.textContent = "0";
      return;
    }

    if (countBadge) countBadge.textContent = list.length.toString();
    const favs = getFavorites();

    gridContainer.innerHTML = list.map((prop, i) => {
      const isFav = favs.includes(prop.id);
      return `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <article class="card h-100 border-0 rounded-4 card-elevation overflow-hidden transition-smooth hover:scale-105 transition-transform animate-on-scroll delay-${(i % 3 + 1) * 100}" style="background-color: #ffffff;">
            <div class="position-relative overflow-hidden">
              <img src="${prop.imagenPrincipal}" alt="Fotografia de ${prop.titulo}" class="property-card-img" loading="lazy" width="800" height="520">
              
              <!-- Badges de Ciudad y Destacado -->
              <span class="position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-1.5 text-white shadow-sm" style="background-color: #0369A1; font-size: 0.72rem; letter-spacing: 0.05em; font-weight: 700;">
                ${prop.ciudad.toUpperCase()}
              </span>

              <!-- Botones de Acción Rápida (Favorito y Compartir) -->
              <div class="position-absolute top-0 end-0 m-3 d-flex gap-1.5" style="z-index: 5;">
                <button type="button" class="btn-copy-link" data-prop-id="${prop.id}" data-prop-title="${prop.titulo}" aria-label="Copiar enlace de ${prop.titulo}" title="Copiar enlace">
                  <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button type="button" class="btn-favorite ${isFav ? "active" : ""}" data-prop-id="${prop.id}" aria-label="${isFav ? "Quitar de favoritos" : "Guardar en favoritos"}" title="${isFav ? "Quitar de favoritos" : "Guardar en favoritos"}">
                  <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <div class="position-absolute bottom-0 start-0 w-100 p-3 d-flex justify-content-between align-items-end text-white" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
                <div>
                  <span class="d-block" style="font-size: 0.72rem;">Fianza legal protegida</span>
                  <span class="badge bg-dark bg-opacity-75 rounded-pill border border-light border-opacity-25">${prop.deposito} ${prop.deposito === 1 ? "mes" : "meses"}</span>
                </div>
                <span class="small font-monospace bg-dark/60 px-2 py-0.5 rounded">${prop.estanciaMinimaMeses} meses min.</span>
              </div>
            </div>
            
            <div class="card-body p-4 d-flex flex-column">
              <div class="d-flex justify-content-between align-items-baseline mb-2">
                <span class="text-uppercase small text-secondary fw-bold" style="font-size: 0.75rem;">${prop.zona}</span>
                <span class="h4 mb-0 fw-bold price-tabular" style="color: #047857;">${prop.precioMensual.toLocaleString("es-ES")} &euro;<small class="text-secondary fs-6 fw-normal">/mes</small></span>
              </div>
              <h3 class="h5 fw-bold mb-2 text-dark line-clamp-1" title="${prop.titulo}">${prop.titulo}</h3>
              <p class="text-secondary small mb-3 flex-grow-1 line-clamp-2" style="font-size: 0.86rem; line-height: 1.55;">${prop.descripcion}</p>
              <div class="d-flex justify-content-between py-2 mb-3 border-top border-bottom border-slate-100 text-secondary small">
                <span class="d-inline-flex align-items-center gap-1" title="Habitaciones">
                  <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10V20M3 15H21M21 10V20M3 10a3 3 0 013-3h12a3 3 0 013 3M7 10V7M17 10V7"/></svg>
                  ${prop.habitaciones} hab.
                </span>
                <span class="d-inline-flex align-items-center gap-1" title="Banos">
                  <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16a2 2 0 012 2v2a4 4 0 01-4 4H6a4 4 0 01-4-4v-2a2 2 0 012-2zM6 12V5a2 2 0 012-2h3a2 2 0 012 2v2"/></svg>
                  ${prop.banos} banos
                </span>
                <span class="d-inline-flex align-items-center gap-1" title="Superficie util">
                  <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 21l18-18M3 21V3M7 17l2-2M11 13l2-2M15 9l2-2"/></svg>
                  ${prop.metrosCuadrados} m&sup2;
                </span>
              </div>
              <div class="d-flex gap-2">
                <a href="propiedad.html?id=${prop.id}" class="btn btn-outline-secondary flex-grow-1 rounded-pill py-2 fw-semibold" style="border-color: #CBD5E1; color: #1E293B;">Ver Ficha</a>
                <a href="contacto.html?propId=${prop.id}&titulo=${encodeURIComponent(prop.titulo)}" class="btn btn-primary rounded-pill px-3.5 py-2 text-white fw-semibold" style="background-color: #0369A1; border-color: #0369A1;" title="Postular a esta propiedad">Postular</a>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join("");

    // Listeners para botones de Favorito y Compartir
    gridContainer.querySelectorAll(".btn-favorite").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = parseInt(btn.dataset.propId, 10);
        let currentFavs = getFavorites();
        if (currentFavs.includes(id)) {
          currentFavs = currentFavs.filter(f => f !== id);
          btn.classList.remove("active");
          btn.setAttribute("aria-label", "Guardar en favoritos");
          showToast("Vivienda eliminada de tus favoritos");
        } else {
          currentFavs.push(id);
          btn.classList.add("active");
          btn.setAttribute("aria-label", "Quitar de favoritos");
          showToast("¡Vivienda guardada en tus favoritos!");
        }
        saveFavorites(currentFavs);
        updateFavBadge();
        if (showOnlyFavorites) applyFilters();
      });
    });

    gridContainer.querySelectorAll(".btn-copy-link").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.dataset.propId;
        const url = `${window.location.origin}${window.location.pathname.replace("index.html", "")}propiedad.html?id=${id}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast("Enlace de la propiedad copiado al portapapeles");
          }).catch(() => {
            showToast(`Enlace: propiedad.html?id=${id}`);
          });
        } else {
          showToast(`Enlace: propiedad.html?id=${id}`);
        }
      });
    });

    initScrollAnimations();
  }

  function applyFilters() {
    const selectedCity = cityFilter ? cityFilter.value : "all";
    const selectedPrice = priceFilter ? priceFilter.value : "all";
    const selectedType = typeFilter ? typeFilter.value : "all";
    const searchTerm = searchInput ? normalizeStr(searchInput.value) : "";
    const sortBy = sortSelect ? sortSelect.value : "default";
    const favs = getFavorites();

    let filtered = PROPIEDADES.filter(item => {
      if (showOnlyFavorites && !favs.includes(item.id)) return false;

      const matchCity = selectedCity === "all" || normalizeStr(item.ciudad) === normalizeStr(selectedCity);
      let matchPrice = true;
      if (selectedPrice === "under1000") matchPrice = item.precioMensual < 1000;
      else if (selectedPrice === "1000to1500") matchPrice = item.precioMensual >= 1000 && item.precioMensual <= 1500;
      else if (selectedPrice === "above1500") matchPrice = item.precioMensual > 1500;
      const matchType = selectedType === "all" || normalizeStr(item.tipo) === normalizeStr(selectedType);

      const matchSearch = !searchTerm ||
        normalizeStr(item.titulo).includes(searchTerm) ||
        normalizeStr(item.zona).includes(searchTerm) ||
        normalizeStr(item.ciudad).includes(searchTerm) ||
        item.servicios.some(s => normalizeStr(s).includes(searchTerm));

      return matchCity && matchPrice && matchType && matchSearch;
    });

    if (sortBy === "price-asc" || sortBy === "price_asc") {
      filtered.sort((a, b) => a.precioMensual - b.precioMensual);
    } else if (sortBy === "price-desc" || sortBy === "price_desc") {
      filtered.sort((a, b) => b.precioMensual - a.precioMensual);
    } else if (sortBy === "area-desc" || sortBy === "area_desc") {
      filtered.sort((a, b) => b.metrosCuadrados - a.metrosCuadrados);
    } else if (sortBy === "recent" || sortBy === "default") {
      filtered.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    renderProperties(filtered);
  }

  renderProperties(PROPIEDADES);

  if (cityFilter) cityFilter.addEventListener("change", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
  if (typeFilter) typeFilter.addEventListener("change", applyFilters);
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyFilters);
}

/* ── 11. Testimonios ── */
function initTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  if (!grid || typeof TESTIMONIOS === "undefined") return;

  function renderStars(n) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      const cls = i <= n ? "star-filled" : "star-empty";
      html += `<svg class="svg-icon ${cls}" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
    return html;
  }

  grid.innerHTML = TESTIMONIOS.map((t, i) => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="p-4 bg-slate-50 rounded-4 border border-slate-200 h-100 d-flex flex-column card-elevation animate-on-scroll delay-${(i % 4 + 1) * 100}">
        <div class="d-flex align-items-center gap-3 mb-3">
          <img src="https://picsum.photos/seed/${t.avatarSeed}/100/100" alt="Retrato de ${t.nombre}" class="testimonial-avatar" loading="lazy" width="56" height="56">
          <div>
            <strong class="d-block text-dark small fw-bold">${t.nombre}</strong>
            <span class="text-secondary" style="font-size: 0.75rem;">${t.ocupacion} · ${t.ciudad}</span>
          </div>
        </div>
        <div class="mb-3 d-flex gap-1">${renderStars(t.puntuacion)}</div>
        <p class="text-secondary small flex-grow-1 mb-0" style="font-style: italic; line-height: 1.6; font-size: 0.88rem;">"${t.texto}"</p>
      </div>
    </div>
  `).join("");

  initScrollAnimations();
}

/* ── 12. FAQ Accordion ── */
function initFAQ() {
  const container = document.getElementById("faq-container") || document.getElementById("faqAccordion");
  if (!container || typeof PREGUNTAS_FRECUENTES === "undefined") return;

  container.innerHTML = `
    <div class="accordion" id="faqAccordionDynamic">
      ${PREGUNTAS_FRECUENTES.map((faq, i) => `
        <div class="accordion-item border-0 mb-3 rounded-4 shadow-sm overflow-hidden border border-slate-200">
          <h3 class="accordion-header" id="faqHead${faq.id}">
            <button class="accordion-button bg-white text-dark fw-bold rounded-4 ${i === 0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#faqBody${faq.id}" aria-expanded="${i === 0 ? "true" : "false"}" aria-controls="faqBody${faq.id}">
              ${faq.pregunta}
            </button>
          </h3>
          <div id="faqBody${faq.id}" class="accordion-collapse collapse ${i === 0 ? "show" : ""}" aria-labelledby="faqHead${faq.id}" data-bs-parent="#faqAccordionDynamic">
            <div class="accordion-body bg-white text-secondary small" style="line-height: 1.7; font-size: 0.9rem;">
              ${faq.respuesta}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/* ── 13. Detalle de Propiedad ── */
function initDetailPage() {
  const detailContainer = document.getElementById("property-detail-content");
  if (!detailContainer || typeof PROPIEDADES === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const propId = parseInt(urlParams.get("id"), 10);
  const prop = PROPIEDADES.find(p => p.id === propId);

  if (!prop) {
    detailContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-5 bg-white rounded-4 shadow-sm max-w-lg mx-auto border border-slate-200">
          <svg class="svg-icon text-secondary mb-3" width="56" height="56" viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 class="h3 fw-bold text-dark mb-2">Propiedad no encontrada</h2>
          <p class="text-secondary mb-4">El identificador solicitado no coincide con ninguna vivienda activa en el catalogo.</p>
          <a href="index.html" class="btn btn-primary rounded-pill px-4 py-2.5 text-white fw-semibold" style="background-color: #0369A1; border-color: #0369A1;">Volver al Catalogo</a>
        </div>
      </div>
    `;
    const similarSection = document.getElementById("similar-properties");
    if (similarSection) similarSection.classList.add("d-none");
    return;
  }

  document.title = `${prop.titulo} | Nestlong Alquiler`;
  const totalFianza = prop.precioMensual * prop.deposito;
  const favs = getFavorites();
  const isFav = favs.includes(prop.id);

  detailContainer.innerHTML = `
    <div class="col-12 mb-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-2 small">
          <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-secondary">Inicio</a></li>
          <li class="breadcrumb-item"><a href="index.html#catalogo" class="text-decoration-none text-secondary">${prop.ciudad}</a></li>
          <li class="breadcrumb-item active text-dark" aria-current="page">${prop.zona}</li>
        </ol>
      </nav>
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h1 class="display-6 fw-bold text-dark mb-1">${prop.titulo}</h1>
          <p class="text-secondary mb-0 d-flex align-items-center gap-1.5 small">
            <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-6-5.686-6-10a6 6 0 0112 0c0 4.314-6 10-6 10zM12 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
            ${prop.zona}, ${prop.ciudad} · Referencia: NL-${prop.id.toString().padStart(4, "0")}
          </p>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" id="detail-fav-btn" class="btn btn-outline-secondary rounded-pill px-3 py-2 d-flex align-items-center gap-1.5 small shadow-sm bg-white" aria-pressed="${isFav}">
            <svg class="svg-icon ${isFav ? "text-danger" : ""}" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span id="detail-fav-text">${isFav ? "En Favoritos" : "Guardar"}</span>
          </button>
          <div class="text-md-end">
            <div class="h2 fw-bold mb-0 price-tabular" style="color: #047857;">${prop.precioMensual.toLocaleString("es-ES")} &euro;<span class="fs-6 text-secondary fw-normal">/mes</span></div>
            <span class="badge rounded-pill px-3 py-1.5" style="background-color: #D1E7DD; color: #0F5132; border: 1px solid #BADBCC; font-weight: 600;">Disponibilidad: ${prop.disponibilidad}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Galeria Visual Interactiva -->
    <div class="col-12 col-lg-8 mb-4">
      <div class="card border-0 rounded-4 overflow-hidden card-elevation mb-3 bg-dark position-relative">
        <img id="main-view-img" src="${prop.imagenPrincipal}" alt="Vista principal de ${prop.titulo}" class="img-fluid w-100" style="max-height: 480px; object-fit: cover; transition: opacity 0.25s ease;">
        <span class="position-absolute bottom-0 end-0 m-3 badge bg-dark/75 text-white backdrop-blur-sm px-3 py-1.5 rounded-pill small" id="gallery-counter">
          1 de ${prop.galeria.length} fotos
        </span>
      </div>
      <div class="d-flex gap-2.5 mb-4 overflow-auto pb-2" role="group" aria-label="Miniaturas de la galeria">
        ${prop.galeria.map((imgUrl, idx) => `
          <button type="button" class="btn p-0 rounded-3 overflow-hidden gallery-thumb ${idx === 0 ? "ring-2 ring-sky-600 active" : "opacity-75 hover:opacity-100"}" style="width: 100px; height: 68px; flex-shrink: 0; border: none; outline: none; transition: all 0.2s ease;" data-img="${imgUrl}" data-index="${idx + 1}" aria-label="Ver foto ${idx + 1}">
            <img src="${imgUrl}" alt="Miniatura ${idx + 1}" class="w-100 h-100" style="object-fit: cover;" loading="lazy">
          </button>
        `).join("")}
      </div>

      <!-- Ficha de Caracteristicas -->
      <div class="card border-0 rounded-4 p-4 card-elevation mb-4 bg-white border border-slate-200">
        <h2 class="h5 fw-bold text-dark mb-3">Caracteristicas de la Vivienda</h2>
        <div class="row text-center g-3 mb-4">
          <div class="col-6 col-sm-3">
            <div class="p-3 bg-light rounded-3 border border-slate-100">
              <svg class="svg-icon d-block mx-auto mb-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.75" style="color:#0369A1;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10V20M3 15H21M21 10V20M3 10a3 3 0 013-3h12a3 3 0 013 3M7 10V7M17 10V7"/></svg>
              <strong class="d-block text-dark fs-5">${prop.habitaciones}</strong>
              <small class="text-secondary">Habitaciones</small>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="p-3 bg-light rounded-3 border border-slate-100">
              <svg class="svg-icon d-block mx-auto mb-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.75" style="color:#0369A1;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16a2 2 0 012 2v2a4 4 0 01-4 4H6a4 4 0 01-4-4v-2a2 2 0 012-2zM6 12V5a2 2 0 012-2h3a2 2 0 012 2v2"/></svg>
              <strong class="d-block text-dark fs-5">${prop.banos}</strong>
              <small class="text-secondary">Banos completos</small>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="p-3 bg-light rounded-3 border border-slate-100">
              <svg class="svg-icon d-block mx-auto mb-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.75" style="color:#0369A1;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 21l18-18M3 21V3M7 17l2-2M11 13l2-2M15 9l2-2"/></svg>
              <strong class="d-block text-dark fs-5">${prop.metrosCuadrados} m&sup2;</strong>
              <small class="text-secondary">Superficie util</small>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="p-3 bg-light rounded-3 border border-slate-100">
              <svg class="svg-icon d-block mx-auto mb-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.75" style="color:#0369A1;" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2"/></svg>
              <strong class="d-block text-dark fs-5">${prop.estanciaMinimaMeses} meses</strong>
              <small class="text-secondary">Estancia minima</small>
            </div>
          </div>
        </div>

        <h2 class="h5 fw-bold text-dark mb-2">Descripcion Detallada</h2>
        <p class="text-secondary leading-relaxed mb-4" style="line-height: 1.7;">${prop.descripcion}</p>

        <h2 class="h5 fw-bold text-dark mb-3">Servicios y Equipamiento Incluido</h2>
        <div class="row g-2.5">
          ${prop.servicios.map(serv => `
            <div class="col-12 col-sm-6">
              <div class="d-flex align-items-center gap-2 p-2.5 bg-light rounded-3 text-dark small border border-slate-100">
                <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" stroke-width="2.5" style="color:#047857;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span class="fw-semibold">${serv}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Sidebar de Condiciones y Postulacion -->
    <div class="col-12 col-lg-4 mb-4">
      <div class="card border-0 rounded-4 p-4 card-elevation sticky-top bg-white border border-slate-200" style="top: 90px;">
        <span class="text-uppercase tracking-wider small fw-bold text-secondary mb-2 d-block">Desglose Economico Legal</span>
        <div class="h3 fw-bold mb-3 price-tabular" style="color: #047857;">${prop.precioMensual.toLocaleString("es-ES")} &euro; <span class="fs-6 text-secondary fw-normal">/mes</span></div>

        <div class="border border-slate-200 rounded-3 p-3.5 mb-4 bg-slate-50">
          <div class="d-flex justify-content-between mb-2 small text-secondary">
            <span>Renta mensual:</span>
            <strong class="text-dark font-tabular">${prop.precioMensual.toLocaleString("es-ES")} &euro;</strong>
          </div>
          <div class="d-flex justify-content-between mb-2 small text-secondary">
            <span>Fianza legal (${prop.deposito} meses):</span>
            <strong class="text-dark font-tabular">${totalFianza.toLocaleString("es-ES")} &euro;</strong>
          </div>
          <div class="d-flex justify-content-between mb-2 small text-secondary">
            <span>Honorarios de agencia:</span>
            <strong class="text-success fw-bold">0 &euro; (Ley 12/2023)</strong>
          </div>
          <div class="d-flex justify-content-between pt-2.5 border-top border-slate-200 small fw-bold text-dark">
            <span>Garantia de permanencia:</span>
            <span style="color: #047857;">Certificada LAU</span>
          </div>
        </div>

        <a href="contacto.html?propId=${prop.id}&titulo=${encodeURIComponent(prop.titulo)}" class="btn btn-primary w-100 rounded-pill py-3 fw-bold text-white shadow-sm mb-2.5" style="background-color: #0369A1; border-color: #0369A1;">Postular a esta Vivienda</a>
        <a href="index.html#catalogo" class="btn btn-outline-secondary w-100 rounded-pill py-2.5 small fw-semibold">Volver al Catalogo</a>

        <div class="mt-4 pt-3 border-top border-slate-100 text-center text-secondary small d-flex align-items-center justify-content-center gap-2">
          <svg class="svg-icon text-secondary" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style="font-size: 0.78rem;">Fianza custodiada en organismo publico oficial.</span>
        </div>
      </div>
    </div>
  `;

  // Listener para botón de favorito en ficha de detalle
  const detailFavBtn = document.getElementById("detail-fav-btn");
  if (detailFavBtn) {
    detailFavBtn.addEventListener("click", () => {
      let currentFavs = getFavorites();
      const textSpan = document.getElementById("detail-fav-text");
      const icon = detailFavBtn.querySelector("svg");
      if (currentFavs.includes(prop.id)) {
        currentFavs = currentFavs.filter(f => f !== prop.id);
        if (textSpan) textSpan.textContent = "Guardar";
        if (icon) {
          icon.classList.remove("text-danger");
          icon.setAttribute("fill", "none");
        }
        showToast("Vivienda eliminada de favoritos");
      } else {
        currentFavs.push(prop.id);
        if (textSpan) textSpan.textContent = "En Favoritos";
        if (icon) {
          icon.classList.add("text-danger");
          icon.setAttribute("fill", "currentColor");
        }
        showToast("¡Vivienda guardada en tus favoritos!");
      }
      saveFavorites(currentFavs);
      updateFavBadge();
    });
  }

  // Thumbnails de galería
  const mainImg = document.getElementById("main-view-img");
  const counterBadge = document.getElementById("gallery-counter");
  const thumbs = document.querySelectorAll(".gallery-thumb");

  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      if (mainImg) {
        mainImg.style.opacity = "0.4";
        setTimeout(() => {
          mainImg.src = btn.dataset.img;
          mainImg.style.opacity = "1";
        }, 150);
      }
      if (counterBadge && btn.dataset.index) {
        counterBadge.textContent = `${btn.dataset.index} de ${prop.galeria.length} fotos`;
      }
      thumbs.forEach(b => {
        b.classList.remove("ring-2", "ring-sky-600", "active");
        b.classList.add("opacity-75");
      });
      btn.classList.add("ring-2", "ring-sky-600", "active");
      btn.classList.remove("opacity-75");
    });
  });

  // Render similar properties
  const similarGrid = document.getElementById("similar-properties-grid");
  const similarSection = document.getElementById("similar-properties");

  if (similarGrid) {
    const similar = PROPIEDADES.filter(p => p.id !== prop.id && (normalizeStr(p.ciudad) === normalizeStr(prop.ciudad) || normalizeStr(p.tipo) === normalizeStr(prop.tipo))).slice(0, 3);
    if (similar.length > 0) {
      similarGrid.innerHTML = similar.map(s => `
        <div class="col-12 col-md-4 mb-3">
          <a href="propiedad.html?id=${s.id}" class="text-decoration-none" aria-label="Ver ficha de ${s.titulo}">
            <div class="card border-0 rounded-4 card-elevation overflow-hidden transition-smooth hover:scale-105 transition-transform bg-white h-100">
              <div class="position-relative">
                <img src="${s.imagenPrincipal}" alt="${s.titulo}" class="property-card-img" loading="lazy" width="800" height="520">
                <span class="position-absolute top-0 start-0 m-2.5 badge rounded-pill px-2.5 py-1 text-white shadow-sm" style="background-color: #0369A1; font-size: 0.7rem; font-weight: 700;">
                  ${s.ciudad.toUpperCase()}
                </span>
              </div>
              <div class="card-body p-3.5 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-baseline mb-1">
                  <span class="small text-secondary fw-semibold">${s.zona}</span>
                  <div class="fw-bold price-tabular" style="color: #047857;">${s.precioMensual.toLocaleString("es-ES")} &euro;<small class="text-secondary fw-normal">/mes</small></div>
                </div>
                <h3 class="h6 fw-bold text-dark mb-1 line-clamp-1">${s.titulo}</h3>
                <div class="d-flex gap-3 text-secondary small mt-auto pt-2 border-top border-slate-100" style="font-size: 0.78rem;">
                  <span>${s.habitaciones} hab.</span>
                  <span>${s.banos} banos</span>
                  <span>${s.metrosCuadrados} m&sup2;</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      `).join("");
      if (similarSection) similarSection.classList.remove("d-none");
    } else if (similarSection) {
      similarSection.classList.add("d-none");
    }
  }
}

/* ── 14. Validación de Formularios con Estado de Carga ── */
function initFormValidation() {
  const forms = document.querySelectorAll(".needs-validation");
  const urlParams = new URLSearchParams(window.location.search);
  const propId = urlParams.get("propId");
  const propTitulo = urlParams.get("titulo");

  const propSelect = document.getElementById("form-property-id");
  const propInfoBanner = document.getElementById("selected-property-banner");

  if (propSelect && propId) {
    if (propSelect.tagName === "SELECT") {
      propSelect.value = propId;
      if (!propSelect.value) {
        const match = Array.from(propSelect.options).find(opt =>
          opt.value == propId || opt.text.includes(propId)
        );
        if (match) propSelect.value = match.value;
      }
    } else {
      propSelect.value = `${propId} - ${decodeURIComponent(propTitulo || "")}`;
    }

    if (propInfoBanner) {
      propInfoBanner.classList.remove("d-none");
      const titleSpan = document.getElementById("selected-property-title");
      if (titleSpan) {
        titleSpan.textContent = decodeURIComponent(propTitulo || `Propiedad Ref. ${propId}`);
      }
    }
  }

  Array.from(forms).forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.classList.add("was-validated");
      const submitBtn = form.querySelector("button[type='submit']");
      const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
      const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;

      if (submitBtn) submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.classList.remove("d-none");
      if (btnText) btnText.textContent = "Procesando solicitud...";

      setTimeout(() => {
        if (btnSpinner) btnSpinner.classList.add("d-none");
        if (btnText) btnText.textContent = submitBtn.id === "submit-contact-btn" ? "Enviar Mensaje" : "Enviar Postulacion";
        if (submitBtn) submitBtn.disabled = false;

        const successAlert = document.getElementById("form-success-alert");
        if (successAlert) {
          successAlert.classList.remove("d-none");
          successAlert.focus();
          successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
          form.reset();
          form.classList.remove("was-validated");
        }
        showToast("¡Solicitud enviada con éxito!");
      }, 650);
    }, false);
  });
}

/* ── 15. Contadores de Caracteres en Textareas ── */
function initCharacterCounters() {
  const notesArea = document.getElementById("applicant-notes");
  const notesCounter = document.getElementById("notes-counter");
  if (notesArea && notesCounter) {
    notesArea.addEventListener("input", () => {
      notesCounter.textContent = `${notesArea.value.length} / 300`;
    });
  }

  const contactMsg = document.getElementById("contact-message");
  const contactCounter = document.getElementById("contact-msg-counter");
  if (contactMsg && contactCounter) {
    contactMsg.addEventListener("input", () => {
      contactCounter.textContent = `${contactMsg.value.length} / 500`;
    });
  }
}

/* ── 16. Formulario de Newsletter ── */
function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  const input = document.getElementById("newsletter-email");
  const feedback = document.getElementById("newsletter-feedback");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.checkValidity()) {
      input.focus();
      return;
    }
    const email = input.value;
    input.value = "";
    if (feedback) {
      feedback.textContent = `¡Gracias! Hemos registrado ${email} en nuestro boletin prioritario.`;
      feedback.classList.remove("d-none");
    }
    showToast("¡Te has suscrito al boletín de Nestlong!");
  });
}

/* ── 17. Botón Volver Arriba ── */
function initBackToTop() {
  const btn = document.getElementById("back-to-top-btn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
