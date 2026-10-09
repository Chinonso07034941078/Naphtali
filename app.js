// Replace the contact details below before publishing. Public artwork IDs are in the uploaded Cloudinary library.
const siteConfig = {
  email: "",
  instagram: "",
  projects: [
    { title: "Jipe Ehelor", kind: "Brand identity", category: "identity", id: "upper_logo_014412_qkb9ke", description: "A bold, high-energy wordmark designed to make the name impossible to miss.", alt: "Blue and white Jipe Ehelor logo design", tone: "blue" },
    { title: "Path — Focus Forward", kind: "Brand campaign", category: "campaign", id: "path_branding_040916_vz3qqv", description: "A fresh visual direction built around clarity, optimism and forward motion.", alt: "Green Path brand campaign artwork", tone: "green" },
    { title: "WCC", kind: "Visual identity", category: "identity", id: "WC_040259_gkutap", description: "A clean, confident mark for a contemporary watch and style brand.", alt: "WCC watch and style brand mark", tone: "light" },
    { title: "Great Men", kind: "Campaign artwork", category: "campaign", id: "great_men.png1_033746_y5xmdo", description: "A high-impact event creative with a strong headline and a clear focal point.", alt: "Great Men campaign artwork", tone: "light" },
    { title: "Campus Trade", kind: "Digital creative", category: "digital", id: "campus_trade_070205_wwae6h", description: "Social-first artwork built to feel energetic, useful and easy to recognise.", alt: "Campus Trade social media design", tone: "blue" },
    { title: "Path — New Month", kind: "Campaign artwork", category: "campaign", id: "path_new_month.pngjk_125806_zmx5au", description: "A recurring campaign visual system designed to keep every new message on-brand.", alt: "Path new month campaign artwork", tone: "green" },
    { title: "October", kind: "Event creative", category: "campaign", id: "OCTO_043104_mdxbmy", description: "A purposeful event graphic with a sharp hierarchy and memorable colour.", alt: "October event campaign graphic", tone: "orange" },
    { title: "Miracle Service", kind: "Event creative", category: "campaign", id: "mirracle_service_043029_hnwpla", description: "A faith-centred event visual composed to feel uplifting and immediate.", alt: "Miracle Service event flyer", tone: "orange" },
    { title: "Manifest — May", kind: "Event creative", category: "campaign", id: "manifest_may_053436_1_v4ltzg", description: "A vibrant event announcement shaped for fast, clear reading on mobile.", alt: "Manifest May event graphic", tone: "orange" },
    { title: "Just Worship", kind: "Event creative", category: "campaign", id: "JUST_WSHP_111814_zp1hcv", description: "Atmospheric worship-night artwork with a focused message and expressive tone.", alt: "Just Worship event design", tone: "dark" },
    { title: "Hangout", kind: "Digital creative", category: "digital", id: "HANGOUT_115955_inceyy", description: "A social event visual designed to feel welcoming, lively and shareable.", alt: "Hangout event social graphic", tone: "light" },
    { title: "Path — Brand world", kind: "Brand identity", category: "identity", id: "path_branding_070856_fwdwod", description: "A companion piece from the Path identity system, extending the brand into digital use.", alt: "Path green brand identity artwork", tone: "green" }
  ]
};

const cloudinary = (id, width = 900) => `https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_${width}/${encodeURIComponent(id)}`;
const grid = document.querySelector("#project-grid");
const filters = [...document.querySelectorAll(".filter-button")];
const dialog = document.querySelector("#lightbox");

function renderProjects() {
  grid.innerHTML = siteConfig.projects.map((project, index) => `
    <article class="project-card" tabindex="0" role="button" data-index="${index}" data-category="${project.category}" aria-label="View ${project.title} project">
      <div class="project-image" data-tone="${project.tone}">
        <img src="${cloudinary(project.id, 900)}" alt="${project.alt}" loading="${index < 4 ? "eager" : "lazy"}" />
        <span class="project-open" aria-hidden="true">↗</span>
      </div>
      <div class="project-meta"><h3>${project.title}</h3><span>${project.kind}</span></div>
    </article>`).join("");
}

function setFilter(button) {
  const category = button.dataset.filter;
  filters.forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.toggle("is-hidden", category !== "all" && card.dataset.category !== category);
  });
}

function openProject(index) {
  const project = siteConfig.projects[index];
  if (!project) return;
  document.querySelector("#lightbox-image").src = cloudinary(project.id, 1600);
  document.querySelector("#lightbox-image").alt = project.alt;
  document.querySelector("#lightbox-title").textContent = project.title;
  document.querySelector("#lightbox-category").textContent = project.kind;
  document.querySelector("#lightbox-description").textContent = project.description;
  dialog.showModal();
}

renderProjects();
filters.forEach((button) => button.addEventListener("click", () => setFilter(button)));
grid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (card) openProject(Number(card.dataset.index));
});
grid.addEventListener("keydown", (event) => {
  const card = event.target.closest(".project-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openProject(Number(card.dataset.index));
  }
});
document.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#year").textContent = new Date().getFullYear();

const contactLink = document.querySelector("#contact-link");
const setupNote = document.querySelector("#contact-setup");
if (siteConfig.email) {
  contactLink.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Design project enquiry")}`;
  setupNote.textContent = siteConfig.instagram ? `Find the latest work on Instagram: ${siteConfig.instagram}` : "Available for select design projects.";
  if (siteConfig.instagram) setupNote.textContent = `Find the latest work on Instagram: ${siteConfig.instagram}`;
} else {
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    setupNote.textContent = "Add the designer’s email in app.js to activate this contact button.";
    setupNote.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
