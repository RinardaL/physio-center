import "./footer.css";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-box">
          <h3>PhysioCenter</h3>
          <p>
            Professional physiotherapy care focused on recovery,
            movement and long-term wellness.
          </p>
        </div>

        {/* TEAM */}
        <div className="footer-box">
          <h4>Our Team</h4>
          <p>👩‍⚕️ Dr. Arta Berisha</p>
          <p>🧑‍⚕️ Dr. Blerim Krasniqi</p>
          <p>👩‍⚕️ Dr. Sara Gashi</p>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h4>Contact</h4>
          <p>📍 Prishtina, Kosovo</p>
          <p>📞 +383 44 123 456</p>
          <p>📧 info@physiocenter.com</p>

          {/* SOCIAL */}
          <div className="socials">
            <a href="https://www.instagram.com/" className="icon" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="https://www.facebook.com/" className="icon" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://x.com/" className="icon" target="_blank" rel="noreferrer" aria-label="X">
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-box">
          <h4>Newsletter</h4>
          <p>Subscribe for health tips & updates</p>

          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PhysioCenter. All rights reserved.</p>
      </div>

    </footer>
  );
}