import React from "react";
import styles from "./about.module.css";
import { MdOutlineViewInAr } from "react-icons/md";
import { Link } from "react-router-dom";
import { Preloader } from "../../Components/preloader/Preloader";

export default function About() {
  return (
    <section>
      <Preloader text="about" />
      <div className={styles.about} id="wrap">
        <div className={styles.topContent}>
          <h1>
            Jahid Islam <br /> Rafsan <span>-</span>
          </h1>
          <p>
            Welcome, I'm Rafsan, a Web Developer. I have 4 years of experience
            in web development. I gained lots of skills, for example, portfolio
            website creation, business website creation, e-commerce website
            creation, branding website creation, etc. Having successfully
            collaborated with clients. With confidence, I am ideal for your
            project. My programming skills are WORDPRESS, JavaScript, React,
            React-Redux, Node Js, MongoDB, Express Js, Tailwind CSS, program
            management etc. I can help create a Responsive and user-friendly
            Design with SEO. Have a good day 😊
          </p>

          <button>
            <Link to="/project">
              <MdOutlineViewInAr />
              Get into Touch
            </Link>
          </button>
        </div>
        <div className={styles.experince}>
          <h1>Experience.</h1>
          <div>
            <h5>Core Technology</h5>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React.js</li>
              <li>React-Redex</li>
              <li>Node.Js</li>
              <li>Express.Js</li>
              <li>MongoDB</li>
              <li>Tailwindcss</li>
              <li>Bootstrap</li>
              <li>WordPress</li>
              <li>Elementor</li>
            </ul>
            <h5>Familiar Technology</h5>
            <ul>
              <li>Git & GitHub</li>
              <li>Git Bash</li>
              <li>Cloudinary</li>
              <li>UI/UX</li>
              <li>Figma</li>
              <li>Photoshop</li>
              <li>Illustrator</li>
            </ul>
            <h5>On The Job</h5>
            <ul>
              <li>Responsive Design</li>
              <li>Version Control</li>
              <li>JavaScript best practices, clean code</li>
              <li>Continuous Integration/Development</li>
            </ul>
          </div>
        </div>
        <footer>
          <h1>Say Hello</h1>
          <div className={styles.content}>
            <div>
              <a href="https://wa.me/01966445521">+880 1966445521</a>
              <a href="mailto:developer.rafsanx@gmail.com">
                developer.rafsan@gmail.com
              </a>
            </div>

            <div>
              <Link to="/about">About</Link>
              <Link to="/project">Gat into Touch</Link>
            </div>
          </div>
          <p>&copy; Jahid Islam Rafsan || 2024</p>
        </footer>
      </div>
    </section>
  );
};
