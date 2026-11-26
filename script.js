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
  const percent = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

  document.getElementById("progressCurrent").textContent = formatEuro(current);
  document.getElementById("progressGoal").textContent = formatEuro(goal);
  document.getElementById("progressPercent").textContent = percent + " %";
  document.getElementById("donorCount").textContent = donors.toLocaleString("de-DE");
  document.getElementById("amountLeft").textContent = formatEuro(Math.max(0, goal - current));

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

const amountButtons = document.querySelectorAll(".amount-btn");
const freeWrap = document.getElementById("freeAmountWrap");
const freeInput = document.getElementById("freeAmount");
const paypalCta = document.getElementById("paypalCta");
const paypalBase = "https://www.paypal.com/paypalme/fundraiskantine";

function updatePaypalCta() {
  if (!paypalCta) return;
  const active = document.querySelector(".amount-btn.active");
  let amount = null;
  if (active && active.dataset.amount !== "free") {
    amount = active.dataset.amount;
  } else if (active && active.dataset.amount === "free" && freeInput) {
    const v = freeInput.value.trim();
    if (v) amount = v;
  }
  paypalCta.href = amount ? paypalBase + "/" + encodeURIComponent(amount) : paypalBase;
  paypalCta.textContent = amount
    ? "Jetzt " + amount + " € über PayPal spenden"
    : "Jetzt über PayPal spenden";
}

amountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    amountButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (freeWrap) freeWrap.hidden = btn.dataset.amount !== "free";
    updatePaypalCta();
  });
});

if (freeInput) freeInput.addEventListener("input", updatePaypalCta);

const defaultAmountBtn = document.querySelector('#amountRow .amount-btn[data-amount="25"]');
if (defaultAmountBtn) defaultAmountBtn.classList.add("active");
updatePaypalCta();

const soliRow = document.getElementById("soliAmountRow");
const soliCta = document.getElementById("soliCta");

if (soliRow && soliCta) {
  const soliButtons = soliRow.querySelectorAll(".amount-btn");
  const updateSoli = () => {
    const active = soliRow.querySelector(".amount-btn.active");
    const n = active ? Number(active.dataset.amount) : 1;
    const total = n * 17;
    soliCta.href = paypalBase + "/" + total;
    soliCta.textContent = n + "× Soli-Essenmarke – " + total + " € über PayPal";
  };
  soliButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      soliButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateSoli();
    });
  });
  const soliDefault = soliRow.querySelector('.amount-btn[data-amount="1"]');
  if (soliDefault) soliDefault.classList.add("active");
  updateSoli();
}
