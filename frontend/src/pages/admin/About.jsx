import Navbar from "../../components/Navbar";
import "../../index.css";

import rehabImg from "../../assets/rehab-room.png";
import wellnessImg from "../../assets/wellness-snack.png";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* HERO */}
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

        {/* WHO WE ARE */}
        <section className="about-section about-grid">

          <div className="about-text">

            <span>ABOUT US</span>

            <h2>Focused On Recovery & Wellness</h2>

            <p>
              Our clinic provides professional physiotherapy services designed
              to support recovery, improve mobility, and help patients return
              to daily activities with confidence.
            </p>

            <p>
              We believe every patient deserves personalized treatment and
              long-term support throughout their rehabilitation journey.
            </p>

          </div>

          <div className="about-image">
            <img src={wellnessImg} alt="Clinic" />
          </div>

        </section>

        {/* MISSION */}
        <section className="mission-section">

          <div className="mission-card">
            <h3>Our Mission</h3>

            <p>
              We are a modern physiotherapy clinic dedicated to restoring movement,
              reducing pain, and improving the overall quality of life for our patients.
              Our approach is built on a combination of clinical expertise, personalized treatment plans,
              and a deep understanding of human movement.
              Every patient is unique, and so is every recovery journey.

            </p>
          </div>

          <div className="mission-card">
            <h3>Patient Care</h3>

            <p>
              We focus on creating a comfortable environment where every patient
              receives professional attention and personalized support.
              We work closely with each patient to set realistic goals, track progress, and adjust treatments as needed.
              Our mission is not only to treat the injury, but to help patients regain confidence in their bodies
              and return to an active, pain-free lifestyle.


            </p>
          </div>

          <div className="mission-card">
            <h3>Modern Approach</h3>

            <p>
             
            One of the biggest challenges in rehabilitation is consistency and patience. 
            Recovery is not always linear, and many patients face setbacks, pain flare-ups, or slow progress.
            That’s why our clinic emphasizes continuous support, education, and motivation throughout the entire recovery process.


            </p>
          </div>

        </section>

        {/* STATS */}
        <section className="stats-section">

          <div className="stat-box">
            <h2>10+</h2>
            <p>Years Experience</p>
          </div>

          <div className="stat-box">
            <h2>500+</h2>
            <p>Recovered Patients</p>
          </div>

          <div className="stat-box">
            <h2>100%</h2>
            <p>Care & Commitment</p>
          </div>

        </section>

      </div>
    </>
  );
}