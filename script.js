document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const revealElements = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");
  const divisionButtons = document.querySelectorAll(".division-btn");
  const divisionPanels = document.querySelectorAll(".division-panel");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }

  function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.88;

    revealElements.forEach((element) => {
      const top = element.getBoundingClientRect().top;

      if (top < triggerPoint) {
        element.classList.add("visible");
      }
    });
  }

  function animateCounters() {
    counters.forEach((counter) => {
      if (counter.dataset.animated === "true") return;

      const top = counter.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.92) return;

      const target = Number(counter.dataset.count);
      const increment = Math.max(1, Math.ceil(target / 55));
      let value = 0;

      function update() {
        value += increment;

        if (value >= target) {
          counter.textContent = `${target}+`;
          counter.dataset.animated = "true";
          return;
        }

        counter.textContent = `${value}+`;
        requestAnimationFrame(update);
      }

      update();
    });
  }

  if (divisionButtons.length && divisionPanels.length) {
    divisionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.target;

        divisionButtons.forEach((btn) => btn.classList.remove("active"));
        divisionPanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");

        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  }

  window.addEventListener("scroll", () => {
    revealOnScroll();
    animateCounters();
  });

  revealOnScroll();
  animateCounters();
});