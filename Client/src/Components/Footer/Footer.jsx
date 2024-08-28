import React from "react";
import styles from "./footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
      <footer>
        <div id="wrap">
          <h2>contact us</h2>
          <div className={styles.contact}>
            <a href="mailto:developer.rafsanx@gmail.com">
              developer.rafsanx@gmail.com
            </a>
            <a href="tel:01966445521">
              880 19***********
            </a>
            <a
              target="Blank"
              href="https://www.google.com/maps/place/Road+No.+30,+Dhaka+1216/@23.8185278,90.3543847,18z/data=!3m1!4b1!4m6!3m5!1s0x3755c1189a5f37a5:0x1856ecde880063e8!8m2!3d23.8185263!4d90.3551957!16s%2Fg%2F11b77b8jr1?entry=ttu"
            >
              Rupnagar R/A, Mirpur, Dhaka, Banngladesh
            </a>
          </div>
          <div className={styles.iconsGroup}>
            <a
              target="_Blank"
              href="https://www.linkedin.com/in/jahid-islam-rafsan-72515a30a/"
            >
              <IoLogoLinkedin />
            </a>
            <a
              target="_Blank"
              href="https://www.facebook.com/developer.rafsan/"
            >
              <FaFacebook />
            </a>
            <a
              target="_Blank"
              href="https://www.linkedin.com/in/jahid-islam-rafsan-72515a30a/"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>
      <h5 className={styles.welcome}>thanks for scrool</h5>
    </>
  );
};
