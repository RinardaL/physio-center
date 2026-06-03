import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../index.css";
import physio1 from "../../assets/physiotherapy.png";
import physio2 from "../../assets/sportsinjury.png";
import physio3 from "../../assets/manualtherapy.png";
import physio4 from "../../assets/rehabilitation.png";

export default function Service() {
  return (
    <>
     <Navbar />

<section className="services-section">

  <div className="services-header">

    <span>OUR SERVICES</span>

    <h2>Treatments Designed For Recovery</h2>

    <p>
      We provide professional physiotherapy treatments focused on pain relief,
      movement restoration, rehabilitation, and long-term physical wellness.
    </p>

  </div>

  {/* PHYSIOTHERAPY */}
  <div className="service-row">

    <div className="service-image">
      <img src={physio1} alt="Physiotherapy" />
    </div>

    <div className="service-info">

      <h3>Physiotherapy</h3>

      <p>
        Our physiotherapy programs are designed to improve mobility,
        reduce pain, and strengthen muscles through personalized treatment plans.
      </p>

      <p>
        During sessions patients perform stretching exercises,
        posture correction routines, balance training,
        and guided mobility exercises supervised by professional therapists.
      </p>

      <div className="service-details">

        <div>
          <h4>Equipment Used</h4>
          <p>
            Resistance bands, therapy balls,
            mobility trainers, electrotherapy devices,
            and rehabilitation equipment.
          </p>
        </div>

        <div>
          <h4>Session Goals</h4>
          <p>
            Pain reduction, flexibility improvement,
            posture correction, and movement restoration.
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* SPORTS INJURY */}
  <div className="service-row reverse-row">

    <div className="service-image">
      <img src={physio2} alt="Sports Injury" />
    </div>

    <div className="service-info">

      <h3>Sports Injury Rehabilitation</h3>

      <p>
        We help athletes recover safely from sports-related injuries
        through specialized rehabilitation programs focused on strength and mobility.
      </p>

      <p>
        Therapy sessions include muscle activation exercises,
        agility training, stretching, and recovery-focused movement drills.
      </p>

      <div className="service-details">

        <div>
          <h4>Equipment Used</h4>
          <p>
            Balance boards, resistance systems,
            recovery rollers, exercise bikes,
            and strengthening equipment.
          </p>
        </div>

        <div>
          <h4>Session Goals</h4>
          <p>
            Faster recovery, injury prevention,
            improved athletic performance,
            and muscle strengthening.
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* MANUAL THERAPY */}
  <div className="service-row">

    <div className="service-image">
      <img src={physio3} alt="Manual Therapy" />
    </div>

    <div className="service-info">

      <h3>Manual Therapy</h3>

      <p>
        Manual therapy focuses on hands-on techniques
        used to reduce muscle tension, improve circulation,
        and restore joint mobility naturally.
      </p>

      <p>
        Therapists apply controlled movements,
        soft tissue techniques, and mobility exercises
        to improve flexibility and relieve discomfort.
      </p>

      <div className="service-details">

        <div>
          <h4>Techniques Used</h4>
          <p>
            Joint mobilization, soft tissue massage,
            stretching techniques, and trigger point therapy.
          </p>
        </div>

        <div>
          <h4>Benefits</h4>
          <p>
            Reduced stiffness, pain relief,
            improved posture, and better movement quality.
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* REHABILITATION */}
  <div className="service-row reverse-row">

    <div className="service-image">
      <img src={physio4} alt="Rehabilitation" />
    </div>

    <div className="service-info">

      <h3>Rehabilitation Programs</h3>

      <p>
        Our rehabilitation sessions support recovery after surgery,
        injuries, or chronic physical conditions through structured therapy plans.
      </p>

      <p>
        Patients follow progressive exercises focused on rebuilding strength,
        restoring balance, and safely returning to normal activities.
      </p>

      <div className="service-details">

        <div>
          <h4>Equipment Used</h4>
          <p>
            Rehabilitation machines, resistance equipment,
            balance trainers, treadmills,
            and guided recovery tools.
          </p>
        </div>

        <div>
          <h4>Recovery Focus</h4>
          <p>
            Strength rebuilding, movement restoration,
            injury recovery, and long-term physical stability.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

    {/* FOOTER */}
      <Footer />
    </>
     
  );
}