const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatEuro(value) {
  return euro.format(value);
}

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const progressSection = document.getElementById("fortschritt");

if (progressSection) {
  const goal = Number(progressSection.dataset.goal) || 0;
  const current = Number(progressSection.dataset.current) || 0;
  const donors = Number(progressSection.dataset.donors) || 0;
  const deadline = progressSection.dataset.deadline
    ? new Date(progressSection.dataset.deadline + "T23:59:59")
    : null;
  const percent = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

  document.getElementById("progressCurrent").textContent = formatEuro(current);
  document.getElementById("progressGoal").textContent = formatEuro(goal);
  document.getElementById("progressPercent").textContent = percent + " %";
  document.getElementById("donorCount").textContent = donors.toLocaleString("de-DE");
  document.getElementById("amountLeft").textContent = formatEuro(Math.max(0, goal - current));

  const daysLeftEl = document.getElementById("daysLeft");
  if (deadline) {
    const diff = Math.ceil((deadline - new Date()) / 86400000);
    daysLeftEl.textContent = diff > 0 ? String(diff) : "0";
  }

  const bar = document.getElementById("progressBar");
  const wrap = document.getElementById("progressBarWrap");
  wrap.setAttribute("aria-valuenow", String(percent));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bar.style.width = percent + "%";
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(wrap);
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const target = document.getElementById(btn.dataset.copyTarget);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const original = btn.textContent;
      btn.textContent = "Kopiert ✓";
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    } catch (err) {
      window.prompt("Zum Kopieren:", target.textContent.trim());
    }
  });
});

document.querySelectorAll(".accordion-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".accordion-item");
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
});
