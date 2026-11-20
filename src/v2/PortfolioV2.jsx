import { createElement, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  CheckCircle2, Github, Linkedin, Mail, MapPin, Menu, Moon,
  Phone, Send, Sun, X,
} from "lucide-react";
import { experience, process, projects, skillGroups, skills, testimonials } from "./data";
import "./portfolio-v2.css";

const sections = [
  { id: "work", label: "Work", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "contact", label: "Contact", number: "07" },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [compactViewport, setCompactViewport] = useState(() => window.matchMedia("(max-width: 720px)").matches);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const updateViewport = () => setCompactViewport(query.matches);
    query.addEventListener("change", updateViewport);
    return () => query.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observedSections = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.2, 0.5] });
    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Daniel Njoku, back to top">
          DN<span>.</span>
        </a>
        <span className="nav-date">PORTFOLIO <span>·</span> 2026</span>
        <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <div className="nav-links__items">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={active === section.id ? "is-active" : ""}
                onClick={closeMenu}
              >
                <span className="nav-index">{section.number}</span>{section.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setDark((value) => !value)}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            title={`Switch to ${dark ? "light" : "dark"} theme`}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
        <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button
          className="menu-toggle"
          type="button"
          style={compactViewport ? { display: "grid", position: "fixed", top: 13, right: 19 } : undefined}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} inert={!menuOpen}>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} onClick={closeMenu}>
            <span>{section.number}</span>{section.label}<ArrowUpRight size={16} />
          </a>
        ))}
        <button type="button" className="mobile-theme" onClick={() => setDark((value) => !value)}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}{dark ? "Light theme" : "Dark theme"}
        </button>
      </div>
    </header>
  );
}

function Ticker() {
  const repeated = [...skills, ...skills];
  return (
    <div className="ticker-cross" aria-label={`Technologies: ${skills.join(", ")}`}>
      {[0, 1].map((row) => <div className={`ticker ticker--${row ? "lime" : "ink"}`} key={row}>
        <div className="ticker-track" aria-hidden="true">
          {repeated.map((skill, index) => <span key={`${row}-${skill}-${index}`}>{skill}<i>✳</i></span>)}
        </div>
      </div>)}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-meta">
        <p className="eyebrow"><span className="status-dot" /> Available for select opportunities</p>
        <p className="hero-location"><MapPin size={13} /> Lagos, Nigeria <span>·</span> 06° 27′ N</p>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-intro" data-reveal>Hi, I’m Daniel<span className="accent-dot">.</span></p>
          <h1 data-reveal>
            I build reliable<br />
            <em>digital systems</em><br />
            for what’s next.
          </h1>
          <div className="hero-summary" data-reveal>
            <p>Backend &amp; AI engineer shaping thoughtful products, dependable APIs, and machine-learning tools that solve real problems.</p>
            <a className="text-link" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-socials" data-reveal>
            <span>Find me</span>
            <a href="https://github.com/danielemmzy" target="_blank" rel="noreferrer" aria-label="Daniel Njoku on GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/daniel-njoku-065687253" target="_blank" rel="noreferrer" aria-label="Daniel Njoku on LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:Daniel@Njokud.online" aria-label="Email Daniel Njoku"><Mail size={16} /></a>
          </div>
        </div>
        <div className="hero-visual" data-reveal>
          <div className="hero-photo-wrap">
            <img src="/projects/profilephoto.jpg" alt="Daniel Njoku" fetchPriority="high" />
            <span className="photo-caption">BUILDING WITH PURPOSE · 2026</span>
          </div>
          <div className="hero-note hero-note--top"><span>01 / 04</span><span>Backend systems</span></div>
          <div className="hero-note hero-note--bottom"><span className="note-mark">DN</span><span>Software engineer<br />Lagos, NG</span><ArrowUpRight size={17} /></div>
          <span className="hero-stamp" aria-hidden="true">D<span>·</span>N</span>
        </div>
      </div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><a href="#work" aria-label="Scroll to selected work"><ArrowDown size={15} /></a><span>PORTFOLIO ’26</span></div>
    </section>
  );
}

function SectionHeading({ index, eyebrow, title, emphasis, children, id }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-index"><span>({index})</span> {eyebrow}</p>
      <div className="section-heading__content">
        <h2 id={id}>{title} {emphasis && <em>{emphasis}</em>}</h2>
        {children && <p className="section-deck">{children}</p>}
      </div>
    </div>
  );
}

function Work() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || window.matchMedia("(max-width: 760px)").matches) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const travel = Math.max(0, track.scrollWidth - stage.clientWidth);
        const range = Math.max(1, stage.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / range));
        track.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <section className="work section-wrap section-space" id="work" aria-labelledby="work-title">
      <SectionHeading index="01" eyebrow="Selected work" title="A few things" emphasis="made to matter." id="work-title">
        A selection of products and systems across health, AI, data, and logistics.
      </SectionHeading>
      <div className="work-stage" ref={stageRef}>
      <div className="project-grid" ref={trackRef}>
        {projects.map((project, index) => (
          <article className={`project-card ${index === 0 ? "project-card--featured" : ""}`} key={project.number} data-reveal>
            <div className="project-art">
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
              <div className="project-art__shade" />
              <span className="project-number">{project.number} <i>—</i> {project.period}</span>
              {project.link ? (
                <a className="project-open" href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}><ArrowUpRight size={19} /></a>
              ) : <span className="project-open project-open--quiet" aria-hidden="true"><ArrowUpRight size={19} /></span>}
            </div>
            <div className="project-info">
              <div className="project-title-row"><div><p className="project-category">{project.category}</p><h3>{project.title}</h3></div>{project.link && <a className="project-inline-link" href={project.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={15} /></a>}</div>
              <p className="project-description">{project.description}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      </div>
      <div className="work-footer" data-reveal><span>Have a project in mind?</span><a className="text-link" href="#contact">Let’s build it together <ArrowUpRight size={17} /></a></div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-wrap section-space" id="about" aria-labelledby="about-title">
      <SectionHeading index="02" eyebrow="A little about me" title="Good engineering" emphasis="starts with care." id="about-title" />
      <div className="about-grid">
        <div className="about-photo" data-reveal>
          <img src="/projects/profilephoto.jpg" alt="Daniel Njoku, software engineer" loading="lazy" />
          <span className="photo-caption">A HUMAN BEHIND THE SYSTEMS</span>
        </div>
        <div className="about-copy" data-reveal>
          <p className="about-lead">I’m a backend-focused software engineer and machine-learning enthusiast. I like designing systems, not just writing code.</p>
          <p>I build Python applications and data-driven products with clear architecture and dependable APIs. I care about how data moves, how components communicate, and how intelligent features become useful in the real world.</p>
          <p>I’m currently looking for a Python backend, machine-learning, or software engineering role where I can help a thoughtful team build products that matter.</p>
          <a className="text-link" href="/projects/DannysResumeAi.pdf" download>Download my résumé <ArrowDown size={15} /></a>
          <div className="about-stats">
            <div><strong>03<span>+</span></strong><small>Years building software</small></div>
            <div><strong>05<span>+</span></strong><small>Products &amp; projects</small></div>
            <div><strong>NG</strong><small>Based in Lagos</small></div>
          </div>
        </div>
      </div>
      <div className="principles" data-reveal>
        <p className="micro-label">WHAT I VALUE</p>
        <div><span>01</span><strong>Clarity over cleverness</strong></div>
        <div><span>02</span><strong>Reliability by design</strong></div>
        <div><span>03</span><strong>Learning in the open</strong></div>
      </div>
    </section>
  );
}

function Process() {
  const sectionRef = useRef(null);
  const curveRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const curve = curveRef.current;
    if (!section || !curve) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        const lift = 28 + Math.sin(progress * Math.PI * 2) * 54;
        curve.setAttribute("d", `M 0 100 C 120 ${100 - lift}, 200 ${100 + lift / 2}, 300 100 S 480 ${100 - lift}, 600 100 S 780 ${100 + lift}, 900 100 S 1080 ${100 - lift / 2}, 1200 100`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <section className="process section-wrap section-space" ref={sectionRef} aria-labelledby="process-title">
      <SectionHeading index="03" eyebrow="How I work" title="From complex problem" emphasis="to clear product." id="process-title" />
      <svg className="process-curve" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path ref={curveRef} d="M 0 100 C 120 60, 200 140, 300 100 S 480 60, 600 100 S 780 140, 900 100 S 1080 80, 1200 100" /></svg>
      <div className="process-grid">
        {process.map((item) => (
          <article className="process-item" key={item.number} data-reveal>
            <span className="process-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="process-rule" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="experience section-wrap section-space" id="experience" aria-labelledby="experience-title">
      <SectionHeading index="04" eyebrow="Experience" title="Learning by" emphasis="building." id="experience-title">
        A few steps along the way, and what I learned from each one.
      </SectionHeading>
      <div className="experience-list">
        {experience.map((item, index) => (
          <article className={`experience-row ${openIndex === index ? "is-open" : ""}`} key={`${item.company}-${item.period}`} data-reveal>
            <span className="experience-count">0{index + 1}</span>
            <button className="experience-trigger" type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
              <div className="experience-main"><p className="experience-period">{item.period} <span>·</span> {item.location}</p><h3>{item.role}</h3><p className="experience-company">{item.company}</p></div>
              <span className="experience-toggle" aria-hidden="true">{openIndex === index ? "−" : "+"}</span>
            </button>
            <div className="experience-detail" hidden={openIndex !== index}><p>{item.description}</p><div className="tag-list">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const move = (direction) => setActive((value) => (value + direction + testimonials.length) % testimonials.length);

  return (
    <section className="testimonial section-wrap section-space" aria-labelledby="testimonial-title">
      <SectionHeading index="05" eyebrow="Kind words" title="Good work is" emphasis="a team effort." id="testimonial-title" />
      <div className="testimonial-card" data-reveal aria-live="polite">
        <span className="quote-mark" aria-hidden="true">“</span>
        <blockquote>{current.quote}</blockquote>
        <div className="testimonial-bottom"><div><strong>{current.author}</strong><span>{current.role}</span></div><div className="slider-controls"><span>{String(active + 1).padStart(2, "0")} <i>/</i> {String(testimonials.length).padStart(2, "0")}</span><button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={17} /></button><button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={17} /></button></div></div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="toolkit section-wrap section-space" aria-labelledby="toolkit-title">
      <SectionHeading index="06" eyebrow="Toolkit" title="The right tools" emphasis="for the job." id="toolkit-title">
        A practical mix of backend, product, and machine-learning tools I use to take ideas into production.
      </SectionHeading>
      <div className="toolkit-grid">
        {skillGroups.map((group, index) => (
          <article className="toolkit-group" key={group.title} data-reveal>
            <p className="toolkit-count">0{index + 1} <span>—</span> {group.title}</p>
            <div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="toolkit-education" data-reveal>
        <span>Learning never ships alone.</span>
        <p>Currently growing across backend engineering, applied machine learning, and the craft of building software for real people.</p>
      </div>
    </section>
  );
}

const contactLinks = [
  { icon: Mail, label: "Email", value: "Daniel@Njokud.online", href: "mailto:Daniel@Njokud.online" },
  { icon: Phone, label: "Phone", value: "+234 902 966 5563", href: "tel:+2349029665563" },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: "https://maps.google.com/?q=Lagos,Nigeria" },
];

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) throw new Error("Email service is not configured. Please email me directly instead.");
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setStatus({ type: "success", message: "Message sent. Thank you — I’ll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error?.text || error?.message || "Your message could not be sent. Please try again or email me directly." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="contact section-wrap section-space" id="contact" aria-labelledby="contact-title">
      <SectionHeading index="07" eyebrow="Get in touch" title="Have a good one" emphasis="in mind?" id="contact-title">
        I’m open to meaningful roles and collaborations. Tell me a little about what you’re working on.
      </SectionHeading>
      <div className="contact-grid">
        <div className="contact-intro" data-reveal>
          <p className="contact-lead">Let’s make something useful.</p>
          <a className="contact-email" href="mailto:Daniel@Njokud.online">Daniel@Njokud.online <ArrowUpRight size={18} /></a>
          <div className="contact-list">{contactLinks.map(({ icon, label, value, href }) => <a href={href} key={label}><span className="contact-icon">{createElement(icon, { size: 16 })}</span><span><small>{label}</small><strong>{value}</strong></span><ArrowUpRight className="contact-arrow" size={15} /></a>)}</div>
          <div className="contact-availability"><span className="status-dot" /> Open to new opportunities</div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="How should I address you?" required />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" required />
          <label htmlFor="contact-message">A little about your idea</label>
          <textarea id="contact-message" name="message" rows="4" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="What are you hoping to build?" required />
          <button className="submit-button" type="submit" disabled={isLoading}>{isLoading ? "Sending…" : <>Send a message <Send size={16} /></>}</button>
          {status.type && <p className={`form-status form-status--${status.type}`} role="status">{status.type === "success" ? <CheckCircle2 size={17} /> : <X size={17} />}{status.message}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="wordmark" href="#top">DN<span>.</span></a>
      <p>© {new Date().getFullYear()} Daniel Njoku. Made with care in Lagos.</p>
      <div><a href="https://github.com/danielemmzy" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/daniel-njoku-065687253" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="#top">Back to top <ArrowUpRight size={13} /></a></div>
    </footer>
  );
}

export function PortfolioV2() {
  useReveal();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    }
  }, []);

  return (
    <div className="portfolio-v2">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Ticker />
        <Work />
        <About />
        <Process />
        <Experience />
        <Testimonials />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
