import "../../index.css";

export default function About() {
  return (
    <div className="about">

      {/* HERO */}
      <div className="about-hero">
        <h1>About Our Clinic</h1>
        <p>
          We are a modern physiotherapy center dedicated to helping patients
          recover, move better, and live pain-free lives.
        </p>
      </div>

      {/* STORY */}
      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          Our physiotherapy clinic provides professional care for patients
          recovering from injuries, surgeries, or chronic pain conditions.
          We combine experience, modern techniques, and personalized treatment
          plans to ensure the best recovery outcomes.
        </p>
      </div>

      {/* MISSION */}
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to improve the quality of life for every patient by
          restoring movement, reducing pain, and supporting long-term health
          through effective physiotherapy treatments.
        </p>
      </div>

      {/* SERVICES */}
      <div className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Personalized physiotherapy treatment plans</li>
          <li>Sports injury rehabilitation</li>
          <li>Manual therapy & pain management</li>
          <li>Post-surgery recovery programs</li>
          <li>Exercise plans and patient tracking</li>
          <li>Online appointment booking system</li>
        </ul>
      </div>

      {/* WHY CHOOSE US */}
      <div className="about-section">
        <h2>Why Choose Us</h2>
        <p>
          We focus on patient-centered care, modern rehabilitation methods,
          and continuous monitoring of progress. Our therapists ensure every
          patient receives the attention and treatment they need for full recovery.
        </p>
      </div>

      {/* EXPERIENCE BOX */}
      <div className="about-stats">
        <div>
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>

        <div>
          <h3>500+</h3>
          <p>Recovered Patients</p>
        </div>

        <div>
          <h3>100%</h3>
          <p>Care & Commitment</p>
        </div>
      </div>

    </div>
  );
}