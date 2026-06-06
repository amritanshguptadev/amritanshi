/* ========================================
   AMRITANSHI PORTFOLIO – script.js
   ======================================== */

/* ── Typed role text animation ── */
const roles = [
  "Frontend Developer",
  "UI Designer",
  "Python Enthusiast",
  "Creative Coder"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-role");

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeRole, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 400);
  } else {
    setTimeout(typeRole, isDeleting ? 60 : 100);
  }
}
setTimeout(typeRole, 800);


/* ── Hamburger / Mobile Nav ── */
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const bars = hamburger.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    bars[0].style.transform = "translateY(7px) rotate(45deg)";
    bars[1].style.opacity   = "0";
    bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.opacity   = "1";
    bars[2].style.transform = "";
  }
});

// Close nav on link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const bars = hamburger.querySelectorAll("span");
    bars[0].style.transform = "";
    bars[1].style.opacity   = "1";
    bars[2].style.transform = "";
  });
});


/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll("section[id]");
const navItems  = document.querySelectorAll(".nav-link");

function setActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => a.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
}
window.addEventListener("scroll", setActiveNav, { passive: true });


/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll(
  ".timeline-card, .skill-card, .project-card, .info-card, .stat-card, .contact-card, .contact-form"
);

revealEls.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach(el => observer.observe(el));


/* ── Skill bar animation ── */
const skillBars = document.querySelectorAll(".skill-fill");
const skillObs  = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct  = fill.style.width;
        fill.style.width = "0%";
        setTimeout(() => { fill.style.width = pct; }, 200);
        skillObs.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);
skillBars.forEach(bar => skillObs.observe(bar));


/* ── Back to Top Button ── */
const backBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backBtn.classList.add("visible");
  } else {
    backBtn.classList.remove("visible");
  }
}, { passive: true });


/* ── Sticky header shadow on scroll ── */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
  } else {
    header.style.boxShadow = "none";
  }
}, { passive: true });


/* ── Contact Form (demo handler) ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById("send-message-btn");
  const success = document.getElementById("form-success");

  btn.textContent = "Sending…";
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = "Send Message 🚀";
    btn.disabled    = false;
    success.style.display = "block";
    e.target.reset();
    setTimeout(() => { success.style.display = "none"; }, 5000);
  }, 1200);
}
