import "../../index.css";

import rehabImg from "../../assets/rehab-room.png";
import wellnessImg from "../../assets/wellness-snack.png";

export default function About() {
  return (
    <div className="about">

      
      <div className="about-hero">
        <div className="hero-overlay"></div>

        <img src={rehabImg} alt="Physiotherapy Clinic" />

        <div className="hero-content">
          <h1>About Our Clinic</h1>
          <p>
            We are a modern physiotherapy center dedicated to helping patients
            recover, move better, and live pain-free lives.
          </p>
        </div>
      </div>


      <div className="about-section about-grid">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Our physiotherapy clinic provides professional care for patients
            recovering from injuries, surgeries, or chronic pain conditions.
            We combine experience, modern techniques, and personalized treatment
            plans to ensure the best recovery outcomes.
          </p>
        </div>

        <div className="about-image-card">
          <img src={wellnessImg} alt="Healthy Wellness" />
        </div>
      </div>

    
      <div className="about-section glass-card">
        <h2>Our Mission</h2>
        <p>
          Our mission is to improve the quality of life for every patient by
          restoring movement, reducing pain, and supporting long-term health
          through effective physiotherapy treatments.
        </p>
      </div>


      <div className="about-section">
        <h2>What We Offer</h2>

        <div className="services-grid">
          <div className="service-card">
            <span>💪</span>
            <p>Personalized physiotherapy treatment plans</p>
          </div>

          <div className="service-card">
            <span>🏃</span>
            <p>Sports injury rehabilitation</p>
          </div>

          <div className="service-card">
            <span>🩺</span>
            <p>Manual therapy & pain management</p>
          </div>

          <div className="service-card">
            <span>🦴</span>
            <p>Post-surgery recovery programs</p>
          </div>

          <div className="service-card">
            <span>📈</span>
            <p>Exercise plans and patient tracking</p>
          </div>

          <div className="service-card">
            <span>📅</span>
            <p>Online appointment booking system</p>
          </div>
        </div>
      </div>

<div className="about-section tips-section">
  <h2>Daily Wellness Tips</h2>

  <div className="tips-grid">
    <div className="tip-card">
      <span>💧</span>
      <h4>Stay Hydrated</h4>
      <p>Drink enough water daily to support muscle recovery and joint health.</p>
    </div>

    <div className="tip-card">
      <span>🧘</span>
      <h4>Stretch Daily</h4>
      <p>Light stretching improves flexibility and reduces pain stiffness.</p>
    </div>

    <div className="tip-card">
      <span>🚶</span>
      <h4>Move Often</h4>
      <p>Avoid long sitting hours. Short walks improve circulation.</p>
    </div>

    <div className="tip-card">
      <span>🥗</span>
      <h4>Eat Healthy</h4>
      <p>Balanced nutrition supports faster healing and energy levels.</p>
    </div>
  </div>
</div>

<div className="about-section timeline-section">
  <h2>Recovery Process</h2>

  <div className="timeline">
    <div className="timeline-item">
      <div className="dot"></div>
      <div>
        <h4>Step 1: Assessment</h4>
        <p>We evaluate your condition and create a personalized plan.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="dot"></div>
      <div>
        <h4>Step 2: Pain Reduction</h4>
        <p>Manual therapy and treatment to reduce pain and inflammation.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="dot"></div>
      <div>
        <h4>Step 3: Rehabilitation</h4>
        <p>Exercises to restore strength, mobility, and balance.</p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="dot"></div>
      <div>
        <h4>Step 4: Recovery</h4>
        <p>Final stage focusing on full return to daily activities.</p>
      </div>
    </div>
  </div>
</div>

      <div className="about-section about-grid reverse">
        <div className="about-image-card">
          <img src={rehabImg} alt="Rehabilitation Equipment" />
        </div>

        <div className="about-text">
          <h2>Why Choose Us</h2>
          <p>
            We focus on patient-centered care, modern rehabilitation methods,
            and continuous monitoring of progress. Our therapists ensure every
            patient receives the attention and treatment they need for full recovery.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat-card">
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>

        <div className="stat-card">
          <h3>500+</h3>
          <p>Recovered Patients</p>
        </div>

        <div className="stat-card">
          <h3>100%</h3>
          <p>Care & Commitment</p>
        </div>
      </div>

    </div>
  );
}