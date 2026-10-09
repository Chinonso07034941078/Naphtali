import React, { useEffect, useRef, useState } from "react";
import { projects } from "./projects.js";

const siteConfig = {
  whatsappNumber: "2347043290931",
};

const workSections = [
  { id: "business-flyers", label: "Business / E Flyers", categories: ["business"] },
  { id: "event-flyers", label: "Event Flyers", categories: ["events"] },
  { id: "song-covers", label: "Song Art Covers", categories: ["songs"] },
  { id: "logo-designs", label: "Logo Designs", categories: ["logos"] },
  { id: "printed-materials", label: "Printed Materials", categories: ["print"] },
  { id: "other-work", label: "Other Work", categories: ["other"] },
];

function imageUrl(id, width = 900) {
  return `https://res.cloudinary.com/dnvgl9k4i/image/upload/f_auto,q_auto,w_${width}/${encodeURIComponent(id)}`;
}

const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi Erumaka, I’d like to discuss a design project.")}`;

function ProjectCard({ project, index, onOpen }) {
  return (
    <article
      className="project-card group cursor-pointer rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`View ${project.alt}`}
    >
      <div className="project-image relative overflow-hidden" data-tone={project.tone}>
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
          src={imageUrl(project.id)}
          alt={project.alt}
          loading={index < 4 ? "eager" : "lazy"}
        />
        <span className="project-open" aria-hidden="true">↗</span>
      </div>
    </article>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (selectedProject && dialog && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog?.open) dialog.close();
  }, [selectedProject]);

  return (
    <div className="min-h-screen overflow-hidden text-ink">
      <div className="grain" aria-hidden="true" />
      <header className="site-header sticky top-0 z-30 mx-auto flex items-center justify-between bg-paper/90 backdrop-blur-md">
        <a className="wordmark" href="#top" aria-label="Naphtali, home">
          <span className="mark">N<span>.</span></span><span className="wordmark-name">NAPHTALI</span>
        </a>
        <button
          className="menu-toggle rounded-full transition-colors hover:bg-black/5"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        ><span /><span /></button>
        <nav id="main-nav" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work <span>01</span></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About <span>02</span></a>
          <a className="nav-contact" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="top" className="min-h-screen">
        <section className="hero section-wrap relative grid items-center">
          <div className="hero-copy relative z-10">
            <p className="eyebrow"><span className="live-dot" /> VISUAL DESIGNER · OWERRI, NIGERIA <span className="eyebrow-year">— PORTFOLIO / 2026</span></p>
            <h1>Good design<br />has <em>presence.</em></h1>
            <div className="hero-bottom flex items-end">
              <p className="hero-intro">I turn ideas into striking visual identities, campaign artwork and digital experiences that people actually remember.</p>
              <a className="round-link transition-transform hover:-rotate-6 hover:bg-acid" href="#work" aria-label="Explore selected work"><span>Explore<br />the work</span><b>↓</b></a>
            </div>
            <div className="hero-stamp" aria-hidden="true"><span>IDEAS<br />MADE<br />VISIBLE</span><b>↓</b></div>
          </div>
          <div className="hero-art relative overflow-hidden" aria-label="Portrait of visual designer Erumaka Naphtali">
            <img className="hero-portrait" src="/naphtali-portrait.jpg" alt="Erumaka Naphtali, visual designer" fetchPriority="high" />
            <div className="hero-art-label"><span>ERUMAKA<br />NAPHTALI</span><span>OWERRI · NIGERIA</span></div>
            <div className="hero-art-foot"><span>VISUAL DESIGNER</span><span>BRAND · CAMPAIGN · PRINT</span></div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="ticker-track">VISUAL IDENTITY <b>•</b> CAMPAIGN DESIGN <b>•</b> DIGITAL ARTWORK <b>•</b> BRAND SYSTEMS <b>•</b> VISUAL IDENTITY <b>•</b> CAMPAIGN DESIGN <b>•</b> DIGITAL ARTWORK <b>•</b> BRAND SYSTEMS <b>•</b></div></div>

        <section id="work" className="work-section section-wrap">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="section-number">01 /</span> THE GOOD STUFF</p><h2>Selected <em>work</em></h2></div>
            <p className="section-note">Browse the work by type. Tap any piece to take a closer look.</p>
          </div>
          <nav className="filters flex flex-wrap gap-2" aria-label="Browse artwork sections">
            {workSections.map((section) => (
              <a className="filter-button transition-colors" key={section.id} href={`#${section.id}`}>
                {section.label}<span aria-hidden="true">↘</span>
              </a>
            ))}
          </nav>
          <div className="work-sections">
            {workSections.map((section) => {
              const sectionProjects = projects.filter((project) => section.categories.includes(project.category));
              return (
                <section className="work-category" id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
                  <div className="work-category-heading"><h3 id={`${section.id}-heading`}>{section.label}</h3><span>{String(sectionProjects.length).padStart(2, "0")} PIECES</span></div>
                  {sectionProjects.length ? (
                    <div className="project-grid" aria-label={`${section.label} artwork`}>
                      {sectionProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} onOpen={setSelectedProject} />
                      ))}
                    </div>
                  ) : (
                    <p className="category-empty">This section is ready for artwork from the collection.</p>
                  )}
                </section>
              );
            })}
          </div>
          <p className="asset-note"><span className="live-dot" /> ARTWORK HOSTED ON CLOUDINARY · BROWSE BY CATEGORY</p>
        </section>

        <section id="about" className="about-section relative overflow-hidden">
          <div className="section-wrap about-wrap">
            <div className="about-side"><p className="eyebrow"><span className="section-number">02 /</span> THE PERSON BEHIND IT</p></div>
            <div className="about-main"><h2 className="about-title">Meet Erumaka<br /><em>Naphtali.</em></h2><div className="about-copy">
              <p>I’m a visual designer based in Owerri, Imo State, Nigeria, focused on creating thoughtful and impactful visual communication.</p>
              <p>My work spans branding, graphic design, print design and motion, with an emphasis on clarity, strong visual direction and attention to detail.</p>
              <p>I create designs that not only look good but help brands communicate better, connect with their audience and ultimately drive sales.</p>
              <p>I’m passionate about design, continuous growth and finding better ways to turn ideas into compelling visual experiences.</p>
            </div>
              <div className="services grid grid-cols-1 md:grid-cols-4">
                <div><span>01</span><b>Branding</b><p>Thoughtful identity and visual direction for stronger brand communication.</p></div>
                <div><span>02</span><b>Graphic design</b><p>Clear, impactful visuals that help brands connect with their audience.</p></div>
                <div><span>03</span><b>Print design</b><p>Considered visual communication made for print.</p></div>
                <div><span>04</span><b>Motion</b><p>Visual ideas brought to life through movement.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="approach-section section-wrap">
          <div className="section-heading compact"><div><p className="eyebrow"><span className="section-number">03 /</span> HOW IT COMES TOGETHER</p><h2>Thought first.<br /><em>Pixels second.</em></h2></div><p className="section-note">A simple process keeps the work sharp and the collaboration easy.</p></div>
          <div className="process-grid grid grid-cols-1 md:grid-cols-3">
            <article><span>01 — LISTEN</span><h3>Get the real brief.</h3><p>We start with the goal, the audience and the feeling the work should leave behind.</p></article>
            <article><span>02 — EXPLORE</span><h3>Find the angle.</h3><p>Concepts give the design a point of view before the details take over.</p></article>
            <article><span>03 — MAKE</span><h3>Make it land.</h3><p>Refine, polish and prepare the artwork for where it needs to show up.</p></article>
          </div>
        </section>

        <section id="contact" className="contact-section relative overflow-hidden">
          <div className="section-wrap contact-wrap relative z-10">
            <p className="eyebrow"><span className="section-number">04 /</span> YOUR IDEA, NEXT</p><h2>Let’s make<br />something <em>stick.</em></h2>
            <div className="contact-bottom flex items-center justify-between gap-5"><p>Have a project in mind? Tell me what you’re dreaming up.</p><a id="contact-link" className="contact-button transition-transform hover:-translate-y-1" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Start a conversation <span>↗</span></a></div>
            <a className="contact-setup inline-block" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WHATSAPP · +234 704 329 0931 ↗</a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap flex items-center justify-between gap-5"><a className="wordmark" href="#top"><span className="mark">N<span>.</span></span><span className="wordmark-name">NAPHTALI</span></a><span className="footer-note">INDEPENDENT BY DESIGN · © {new Date().getFullYear()}</span><a className="back-top" href="#top">BACK TO TOP ↑</a></footer>

      <dialog ref={lightboxRef} className="lightbox" aria-label="Project preview" onClose={() => setSelectedProject(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
        {selectedProject && <>
          <button className="lightbox-close" type="button" aria-label="Close project preview" onClick={() => setSelectedProject(null)}>×</button>
          <div className="lightbox-image-wrap"><img src={imageUrl(selectedProject.id, 1600)} alt={selectedProject.alt} /></div>
          <div className="lightbox-caption"><span>{workSections.find((section) => section.categories.includes(selectedProject.category))?.label}</span></div>
        </>}
      </dialog>
    </div>
  );
}

export default App;
