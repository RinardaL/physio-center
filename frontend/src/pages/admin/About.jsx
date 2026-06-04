import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../index.css";
import Counter from "./Counter";
import rehabImg from "../../assets/rehab-room.png";
import wellnessImg from "../../assets/wellness-snack.png";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">

        <section className="about-hero">
          <img src={rehabImg} alt="Physiotherapy Clinic" />
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span>PHYSIOTHERAPY CENTER</span>
            <h1>Professional Care For Your Recovery</h1>
            <p>
              Recovery is not just the restoration of movement,
              but the restoration of a person’s confidence in their own body.
            </p>
          </div>
        </section>
 
<section className="why-section">

  <div className="why-text">

    <h2>Why Physio Center?</h2>

    <h3>Local Care. Professional Expertise.</h3>

    <p>
      Founded with the belief that recovery should be faster, safer,
      and more empowering, Physio Center is committed to delivering
      high-quality physiotherapy care tailored to every patient.
    </p>

    <p>
      With a dedicated team of specialists and modern rehabilitation
      techniques, we create personalized treatment plans designed to
      help you recover with confidence and long-term results.
    </p>

  </div>

  <div className="why-boxes">

    <div className="why-box">
      <h4>Personalized Treatment</h4>
      <p>Every recovery plan is designed based on your individual needs and goals.
        We focus on creating a comfortable environment where every patient
                receives professional attention and personalized support.
      </p>
    </div>

    <div className="why-box">
      <h4>Advanced Techniques</h4>
      <p>We use modern physiotherapy methods and rehabilitation technology.
      Recovery is not always linear. That’s why we provide continuous support,
                education, and motivation throughout the process.</p>
    </div>

    <div className="why-box">
      <h4>Expert Therapists</h4>
      <p>Highly trained specialists focused on safe and effective recovery. 
        We are a modern physiotherapy clinic dedicated to restoring movement,
        reducing pain, and improving the overall quality of life for our patients.</p>
    </div>

  </div>

</section>
 
<section className="nutrition-section">

  <div className="nutrition-text">

    <h2>Nutrition & Recovery</h2>

    <h3>Fuel Your Healing Process</h3>

    <p>
      Proper nutrition plays a key role in physical recovery and muscle regeneration.
      At Physio Center, we encourage balanced eating habits that support healing,
      reduce inflammation, and improve overall energy levels.
    </p>

    <p>
      A combination of protein-rich meals, hydration, and natural foods helps
      accelerate rehabilitation and improves treatment results.
    </p>

  </div>

  <div className="nutrition-image">
    <img src={wellnessImg} alt="Healthy Nutrition" />
  </div>

</section>
     <section className="stats-section">

  <div className="stat">
    <h3><Counter end={500} />+</h3>
    <p>Patients Treated</p>
  </div>

  <div className="stat">
    <h3><Counter end={10} />+</h3>
    <p>Years Experience</p>
  </div>

  <div className="stat">
    <h3><Counter end={95} />%</h3>
    <p>Recovery Rate</p>
  </div>

  <div className="stat">
    <h3>5★</h3>
    <p>Patient Satisfaction</p>
  </div>

</section>

        <Footer />
      </div>
    </>
  );
}