import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBarItem } from "../helper";

import en from "./../locales/en.json";
import th from "./../locales/th.json";
import lo from "./../locales/lo.json";
import { Paths } from "../routes/app";

import profiledp from "./../assets/image/profiledp.png";
import cvFile from "./../assets/image/Resume_Souphakone_keopheth.pdf";
import cer1 from "./../assets/image/cer1.png";
import cer3 from "./../assets/image/cer3.png";
import cer6 from "./../assets/image2/cer6.png";
import cer7 from "./../assets/image2/cer7.png";
import cer8 from "./../assets/image2/cer8.png";
import cer9 from "./../assets/image2/cer9.png";
import { useLanguage } from "../context/LanguageContext";
import EmailConnection from "./Email/email";
import { skills } from "../helper";

const translations = { en, th, lo };

const certificates = [
  {
    title: "Fundamental knowledge of programming",
    image: cer1,
    date: "2023-04-21",
  },
  { title: "Coding for Metaverse", image: cer3, date: "2024-02-25" },
  { title: "Mini Data Science Bootcamp 2023", image: cer6, date: "2024-11-05" },
  { title: "Introduction to data analytics", image: cer7, date: "2024-11-05" },
  { title: "Introduction to Data Analytics", image: cer8, date: "2024-11-05" },
  { title: "Mini Data Science Bootcamp 2024", image: cer9, date: "2024-11-05" },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const skillList = skills;
  const [active, setActive] = useState("All");
  const cats = ["All", ...new Set(skillList.flatMap((s) => s.cats))];
  const filtered =
    active === "All"
      ? skillList
      : skillList.filter((s) => s.cats.includes(active));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [language]);

  useEffect(() => {
    const typedScript = document.createElement("script");
    typedScript.src = "https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js";
    typedScript.async = true;

    let typedInstance = null;

    typedScript.onload = () => {
      if (window.Typed) {
        typedInstance = new window.Typed(".multiple-text", {
          strings: [
            "Souphakone keopheth",
            "Software Developer",
            "Data Analyst",
            "UI/UX Enthusiast",
          ],
          typeSpeed: 75,
          backSpeed: 45,
          backDelay: 2500,
          startDelay: 800,
          smartBackspace: true,
          fadeOut: true,
          fadeOutClass: "typed-fade-out",
          fadeOutDelay: 700,
          loop: true,
          showCursor: true,
          cursorChar: "|",
        });
      }
    };

    document.body.appendChild(typedScript);

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (typedInstance) {
        typedInstance.destroy();
      }

      if (document.body.contains(typedScript)) {
        document.body.removeChild(typedScript);
      }
    };
  }, []);

  const navItems = [
    ["home", t.nav.home],
    ["about", t.nav.about],
    ["services", t.nav.skills],
    ["portfolio", t.nav.certificate],
    ["contact", t.nav.contact],
  ];

  return (
    <>
      <header className="header">
        <a href="#home" className="logo">
          Portfolio
        </a>

        <div className="language-switcher">
          <button
            className={language === "en" ? "active-lang" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>

          <button
            className={language === "th" ? "active-lang" : ""}
            onClick={() => setLanguage("th")}
          >
            TH
          </button>

          <button
            className={language === "lo" ? "active-lang" : ""}
            onClick={() => setLanguage("lo")}
          >
            LO
          </button>
        </div>

        <i
          className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}
          id="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          {navItems.map(([id, label]) => (
            <a
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => {
                setMenuOpen(false);

                const el = document.getElementById(id);

                if (el) {
                  el.scrollIntoView({
                    behavior: "smooth",

                    block: "start",
                  });
                }
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section className="home" id="home">
        <div className="home-content">
          <h3>{t.home.intro}</h3>

          <h1>
            <span className="multiple-text"></span>
          </h1>

          <h4>{t.home.degree}</h4>

          <a
            href="https://www.linkedin.com/in/souphakone-youjalearn-67543b327/"
            target="_blank"
            rel="noreferrer"
            className="btn btn2 btn-small"
          >
            {t.home.linkedin}
          </a>

          <a
            href="https://github.com/souphakone-keop"
            target="_blank"
            rel="noreferrer"
            className="btn btn2 btn-small"
          >
            {t.home.github}
          </a>

          <a href={cvFile} download className="btn btn2 cv-btn btn-small">
            {t.home.download}
          </a>
        </div>

        <div className="home-image">
          <img src={profiledp} alt="Souphakone Youjalearn" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-section-header">
          <div className="about-section-label">{t.aboutSection.label}</div>

          <h2 className="heading">
            {t.aboutSection.title} <span>{t.aboutSection.highlight}</span>
          </h2>

          <p className="about-section-sub">{t.aboutSection.subtitle}</p>
        </div>

        <div className="about-cards-grid">
          {/* EDUCATION */}
          <Link to={Paths.EDUCATION} className="exp-card">
            <div className="exp-card-img-wrap">
              <img
                src="https://contents.bu.ac.th/contents/files/uploads/c5100907-14d2-4415-887f-5e5ac387c59b.webp"
                alt={t.experience.education.title}
              />

              <div className="exp-img-gradient" />

              <div className="exp-img-top">
                <span className="exp-type-pill pill-blue">
                  <i className="fa-solid fa-graduation-cap" />{" "}
                  {t.experience.education.type}
                </span>

                <span className="exp-year-tag">
                  {t.experience.education.year}
                </span>
              </div>
            </div>

            <div className="exp-card-body">
              <div className="exp-org-row">
                <span className="exp-org-dot dot-blue" />

                <span className="exp-org-name">
                  {t.experience.education.org}
                </span>
              </div>

              <h3 className="exp-card-title">{t.experience.education.title}</h3>

              <p className="exp-card-role role-blue">
                {t.experience.education.role}
              </p>

              <p className="exp-card-desc">{t.experience.education.desc}</p>

              <div className="exp-card-sep" />

              <div className="exp-card-footer">
                <div className="exp-logo-wrap">
                  <img
                    src="https://mbi.bu.ac.th/images/about.us/bkk.uni/10-00_picture_Top.jpg"
                    alt="Bangkok University"
                  />
                </div>

                <span className="exp-cta cta-blue">
                  {t.experience.education.button}

                  <i className="fa-solid fa-arrow-right exp-cta-arrow" />
                </span>
              </div>
            </div>
          </Link>

          {/* INTERNSHIP */}
          <Link to={Paths.WISESIGHT} className="exp-card">
            <div className="exp-card-img-wrap">
              <img
                src="https://image.thepeople.co/uploads/2019/05/Screen-Shot-2562-05-30-at-3.36.09-PM.png"
                alt={t.experience.internship.title}
              />

              <div className="exp-img-gradient" />

              <div className="exp-img-top">
                <span className="exp-type-pill pill-teal">
                  <i className="fa-solid fa-briefcase" />{" "}
                  {t.experience.internship.type}
                </span>

                <span className="exp-year-tag">
                  {t.experience.internship.year}
                </span>
              </div>
            </div>

            <div className="exp-card-body">
              <div className="exp-org-row">
                <span className="exp-org-dot dot-teal" />

                <span className="exp-org-name">
                  {t.experience.internship.org}
                </span>
              </div>

              <h3 className="exp-card-title">
                {t.experience.internship.title}
              </h3>

              <p className="exp-card-role role-teal">
                {t.experience.internship.role}
              </p>

              <p className="exp-card-desc">{t.experience.internship.desc}</p>

              <div className="exp-card-sep" />

              <div className="exp-card-footer">
                <div className="exp-logo-wrap">
                  <img
                    src="https://check.toolkit.wisesight.com/static/media/logo.15bb7beb72d5b89a9f49.png"
                    alt="Wisesight"
                  />
                </div>

                <span className="exp-cta cta-teal">
                  {t.experience.internship.button}

                  <i className="fa-solid fa-arrow-right exp-cta-arrow" />
                </span>
              </div>
            </div>
          </Link>

          {/* WORK */}
          <Link to={Paths.ANOUSITH} className="exp-card">
            <div className="exp-card-img-wrap">
              <img
                src="https://tapchilaoviet.org/wp-content/uploads/2024/04/10.jpg"
                alt={t.experience.work.title}
              />

              <div className="exp-img-gradient" />

              <div className="exp-img-top">
                <span className="exp-type-pill pill-amber">
                  <i className="fa-solid fa-building" />{" "}
                  {t.experience.work.type}
                </span>

                <span className="exp-year-tag">{t.experience.work.year}</span>
              </div>
            </div>

            <div className="exp-card-body">
              <div className="exp-org-row">
                <span className="exp-org-dot dot-amber" />

                <span className="exp-org-name">{t.experience.work.org}</span>
              </div>

              <h3 className="exp-card-title">{t.experience.work.title}</h3>

              <p className="exp-card-role role-amber">
                {t.experience.work.role}
              </p>

              <p className="exp-card-desc">{t.experience.work.desc}</p>

              <div className="exp-card-sep" />

              <div className="exp-card-footer">
                <div className="exp-logo-wrap">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSEOM71FfqhccpOykypF7_eaTMI8vE_A2uNQ&s"
                    alt="Anousith"
                  />
                </div>

                <span className="exp-cta cta-amber">
                  {t.experience.work.button}

                  <i className="fa-solid fa-arrow-right exp-cta-arrow" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="heading">{t.sections.skills}</h2>

        {/* FILTER */}
        <div className="skill-filter">
          {cats.map((cat) => (
            <button
              key={cat}
              className={active === cat ? "active" : ""}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="services-container">
          {filtered.map((skill) => (
            <div className="services-box" key={skill.name}>
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
              <h3>{skill.name}</h3>
              <p>{t.skills?.[skill.descKey] ?? skill.descKey}</p>

              {/* CATEGORY TAG */}
              <div className="skill-tags">
                {skill.cats.map((c) => (
                  <span key={c} className="skill-cat">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <h2 className="heading">{t.sections.certificate}</h2>

        <div className="portfolio-container">
          {certificates.map((cert) => (
            <div className="portfolio-box" key={`${cert.title}-${cert.image}`}>
              <img src={cert.image} alt={cert.title} />

              <div className="portfolio-layer">
                <h4>{cert.title}</h4>
                <p>{cert.date}</p>
                <i className="fa-solid fa-up-right-from-square"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="contact" id="contact">
        <h2 className="heading">{t.sections.contact}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            <input type="text" placeholder={t.contact.fullName} />

            <input type="email" placeholder={t.contact.email} />
          </div>

          <div className="input-box">
            <input type="number" placeholder={t.contact.mobile} />

            <input type="text" placeholder={t.contact.subject} />
          </div>

          <textarea rows="10" placeholder={t.contact.message}></textarea>

          <input type="submit" value={t.contact.send} className="btn" />

          <div className="contact-details">
            <p>
              <i className="fa-solid fa-paper-plane"></i>{" "}
              souphakone.keop@gmail.com
            </p>

            <p>
              <i className="fa-solid fa-square-phone-flip"></i> (+66)983-562-019
            </p>
          </div>
        </form>
      </section> */}
      <EmailConnection t={t} />

      <NavBarItem item="#home" />
    </>
  );
}

export default HomePage;
