import { $$ } from "@/lib/dom-selector";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Muestra con transición los elementos marcados con `data-reveal`
 * cuando entran en pantalla.
 */
function setupReveal() {
  const elements = $$("[data-reveal]");
  if (prefersReducedMotion()) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  elements.forEach((el) => observer.observe(el));
}

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

/**
 * Anima de 0 al valor de `data-count` cuando el número entra en pantalla.
 */
function setupCounters() {
  const counters = $$("[data-count]");

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => observer.observe(el));
}

/**
 * Rellena la línea del timeline según el avance del scroll
 * (expuesto como la variable CSS `--progress`).
 */
function setupTimeline() {
  const timelines = $$("[data-timeline]");
  if (!timelines.length) return;

  const update = () => {
    timelines.forEach((timeline) => {
      const rect = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      timeline.style.setProperty("--progress", progress.toFixed(4));
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/**
 * Desplaza suavemente los elementos con `data-parallax` (factor de velocidad).
 */
function setupParallax() {
  const elements = $$("[data-parallax]");
  if (!elements.length || prefersReducedMotion()) return;

  const update = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const speed = Number(el.dataset.parallax) || 0.1;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

document.addEventListener("astro:page-load", () => {
  setupReveal();
  setupCounters();
  setupTimeline();
  setupParallax();
});
