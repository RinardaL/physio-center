export default function Home() {
  return (
    <div className="home">

      <section className="hero">

        {/* LEFT SIDE */}
        <div className="heroText">

          <span className="tag">
            Physio Center
          </span>

          <h1>
            Professional Care<br />
            For Your Recovery
          </h1>

          <p>
            Personalized physiotherapy treatments focused on
            improving mobility, reducing pain, and restoring
            your quality of life.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn">
              Book Appointment
            </button>

            <button className="secondaryBtn">
              Learn More
            </button>
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="heroImage">
          <img
            src="C:\Users\pc\physio-center\frontend\src\assets\physio-home.png"
            alt="Physiotherapy clinic"
          />
        </div>

      </section>

    </div>
  );
}