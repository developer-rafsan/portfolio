import React, { useMemo } from "react";
import styles from "./about.module.css";
import { MdOutlineViewInAr } from "react-icons/md";
import { Link } from "react-router-dom";
import { Preloader } from "../../Components/preloader/Preloader";

// Data-driven lists for optimization and maintainability
const CORE_TECH = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "React-Redux",
  "Node.Js",
  "Express.Js",
  "MongoDB",
  "Tailwind CSS",
  "Bootstrap",
  "WordPress",
  "Elementor",
];

const FAMILIAR_TECH = [
  "Git & GitHub",
  "Git Bash",
  "Cloudinary",
  "UI/UX",
  "Figma",
  "Photoshop",
  "Illustrator",
];

const ON_THE_JOB = [
  "Responsive Design",
  "Version Control",
  "JavaScript best practices, clean code",
  "Continuous Integration/Development",
];

const CONTACTS = [
  {
    href: "https://wa.me/01966445521",
    label: "+880 1966445521",
    isMail: false,
  },
  {
    href: "mailto:developer.rafsanx@gmail.com",
    label: "developer.rafsan@gmail.com",
    isMail: true,
  },
];

const FOOTER_LINKS = [
  { to: "/about", label: "About" },
  { to: "/project", label: "Get Touch" },
  { to: "/youtube-video", label: "youtube" },
];

export default function About() {
  // Memoize lists for performance
  const coreTechList = useMemo(
    () => CORE_TECH.map((tech) => <li key={tech}>{tech}</li>),
    []
  );
  const familiarTechList = useMemo(
    () => FAMILIAR_TECH.map((tech) => <li key={tech}>{tech}</li>),
    []
  );
  const onTheJobList = useMemo(
    () => ON_THE_JOB.map((item) => <li key={item}>{item}</li>),
    []
  );
  const contactLinks = useMemo(
    () =>
      CONTACTS.map((c) => (
        <a key={c.href} href={c.href}>
          {c.label}
        </a>
      )),
    []
  );
  const footerLinks = useMemo(
    () =>
      FOOTER_LINKS.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      )),
    []
  );

  return (
    <section>
      <Preloader text="about" />
      <div className={styles.about} id="wrap">
        <div className={styles.topContent}>
          <h1>
            Jahid Islam <br /> Rafsan <span>-</span>
          </h1>
          <p>
            Welcome, I'm Rafsan, a Web Developer with 4 years of experience in web development. I have built portfolio, business, e-commerce, and branding websites, and have successfully collaborated with clients. My skills include WordPress, JavaScript, React, React-Redux, Node.js, MongoDB, Express.js, Tailwind CSS, and program management. I can help create responsive, user-friendly designs with SEO. Have a good day 😊
          </p>
        </div>
        <div className={styles.experince}>
          <h1>Experience.</h1>
          <div>
            <h5>Core Technology</h5>
            <ul>{coreTechList}</ul>
            <h5>Familiar Technology</h5>
            <ul>{familiarTechList}</ul>
            <h5>On The Job</h5>
            <ul>{onTheJobList}</ul>
          </div>
        </div>
        <footer>
          <h1>Say Hello</h1>
          <div className={styles.content}>
            {/* logo */}
            <Link className={styles.logo} to="/" tabIndex={0} aria-label="Home">
              <img src="/assets/logo.svg" alt="logo" loading="lazy" />
            </Link>
            <div>{contactLinks}</div>
            <div>{footerLinks}</div>
          </div>
          <p>&copy; Jahid Islam Rafsan || 2024</p>
        </footer>
      </div>
    </section>
  );
}
