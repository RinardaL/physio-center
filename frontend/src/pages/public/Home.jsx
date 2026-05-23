import { useNavigate } from "react-router-dom";
import physioImg from "../../assets/physio-home.png";
import "./home.css";
import physio1 from "../../assets/physiotherapy.png";
import physio2 from "../../assets/sportsinjury.png";
import physio3 from "../../assets/manualtherapy.png";
import physio4 from "../../assets/rehabilitation.png";
import aboutImg from "../../assets/aboutImg.png";
import Navbar from "../../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="home">
        <div className="heroImage">
          <img src={physioImg} alt="Physio" />

          <div className="imageOverlay">
            <div className="heroText">
              <h1>Professional Care</h1>

              <p>For your recovery</p>

              <p>
                Personalized physiotherapy treatments focused on improving
                mobility, reducing pain, and restoring your quality of life.
              </p>

              <div className="heroButtons">
                <button
                  className="primaryBtn"
                  onClick={() => navigate("/dashboard")}
                >
                  Book Appointment
                </button>

                <button
                  className="secondaryBtn"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="sectionTitle">
          <span>OUR SERVICES</span>

          <h2>
            Treatments Designed <br />
            For Your Recovery
          </h2>

          <p>
            Tailored physiotherapy programs built to eliminate pain, restore full
            mobility, and help you return to peak function and everyday life.
          </p>
        </div>

        <div className="serviceGrid">
          <div className="serviceCard" onClick={() => navigate("/services")}>
            <img src={physio1} alt="" />
            <div className="serviceContent">
              <h3>Physiotherapy</h3>
              <p>Personalized therapy programs focused on reducing pain.</p>
              <button>Learn More →</button>
            </div>
          </div>

          <div className="serviceCard" onClick={() => navigate("/services")}>
            <img src={physio2} alt="" />
            <div className="serviceContent">
              <h3>Sports Injury</h3>
              <p>Specialized care for athletes recovering from injuries.</p>
              <button>Learn More →</button>
            </div>
          </div>

          <div className="serviceCard" onClick={() => navigate("/services")}>
            <img src={physio3} alt="" />
            <div className="serviceContent">
              <h3>Manual Therapy</h3>
              <p>Hands-on techniques to relieve pain and restore movement.</p>
              <button>Learn More →</button>
            </div>
          </div>

          <div className="serviceCard" onClick={() => navigate("/services")}>
            <img src={physio4} alt="" />
            <div className="serviceContent">
              <h3>Rehabilitation</h3>
              <p>Recovery programs after surgery or injury.</p>
              <button>Learn More →</button>
            </div>
          </div>
        </div>

        <div className="appointmentBtn">
          <button onClick={() => navigate("/about")}>
             Book An Appointment
           </button>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about">
        <div className="aboutImage">
          <img src={aboutImg} alt="About Physio" />

          <div className="experienceBox">
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
        </div>

        <div className="aboutContent">
          <span>ABOUT US</span>

          <h2>
            Helping You Restore Movement <br />
            And Live Pain Free
          </h2>

          <p>
            Our clinic provides personalized physiotherapy focused on recovery,
            rehabilitation, and improving your quality of life.
          </p>

          <div className="aboutFeatures">
            <div className="feature">
              <h4>Personalized Care</h4>
              <p>Tailored treatment plans for each patient.</p>
            </div>

            <div className="feature">
              <h4>Modern Equipment</h4>
              <p>Advanced rehab technology for better recovery.</p>
            </div>

            <div className="feature">
              <h4>Expert Therapists</h4>
              <p>Experienced professionals guiding your recovery.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}