import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../index.css";
import doktori from "../../assets/doktori.png";
import doktoresha from "../../assets/doktoresha.png";
import doktoresha2 from "../../assets/doktoresha2.png";

export default function Therapist() {
  return (
    <>
      <Navbar />
      <section className="services-section">
        <div className="services-header">
          <span>OUR THERAPISTS</span>
          <h2>Meet Our Professional Team</h2>
          <p>
            Our certified therapists are dedicated to providing personalized treatment
            plans for recovery, rehabilitation, and long-term wellness.
          </p>
        </div>

        {/* THERAPIST 1 */}
        <div className="service-row">
          <div className="service-image">
            <img src={doktori} alt="Dr. Blerim Krasniqi" />
          </div>
          <div className="service-info">
            <h3>Dr. Blerim Krasniqi</h3>
            <p><strong>Specialization:</strong> Physiotherapy & Rehabilitation</p>
            <p><strong>Degree:</strong> Doctor of Physical Therapy (DPT), University of London</p>
            <p><strong>Experience:</strong> 12+ years in clinical physiotherapy and post-surgical rehabilitation</p>
            <p>
              Dr. Krasniqi graduated with honors from the University of London and completed his
              residency at St. Thomas' Hospital. He specializes in musculoskeletal rehabilitation
              and has helped hundreds of patients regain full mobility after injury or surgery.
            </p>
            <p><strong>Email:</strong> <a href="mailto:blerim.krasniqi@clinic.com">blerim.krasniqi@clinic.com</a></p>
          </div>
        </div>

        {/* THERAPIST 2 */}
        <div className="service-row reverse">
          <div className="service-image">
            <img src={doktoresha} alt="Dr. Sara Gashi" />
          </div>
          <div className="service-info">
            <h3>Dr. Sara Gashi</h3>
            <p><strong>Specialization:</strong> Sports Injury Recovery</p>
            <p><strong>Degree:</strong> MSc in Sports Medicine, University of Manchester</p>
            <p><strong>Experience:</strong> 9+ years working with professional athletes and active patients</p>
            <p>
              Dr. Gashi holds a Master's degree in Sports Medicine and has worked alongside
              professional sports teams across the UK. Her approach focuses on rapid, safe
              recovery combined with performance optimization to help athletes return stronger
              than before their injury.
            </p>
            <p><strong>Email:</strong> <a href="mailto:sara.gashi@clinic.com">sara.gashi@clinic.com</a></p>
          </div>
        </div>

        {/* THERAPIST 3 */}
        <div className="service-row">
          <div className="service-image">
            <img src={doktoresha2} alt="Dr. Arta Berisha" />
          </div>
          <div className="service-info">
            <h3>Dr. Arta Berisha</h3>
            <p><strong>Specialization:</strong> Manual Therapy</p>
            <p><strong>Degree:</strong> PhD in Rehabilitation Sciences, King's College London</p>
            <p><strong>Experience:</strong> 15+ years in manual and hands-on therapeutic techniques</p>
            <p>
              Dr. Berisha earned her PhD from King's College London and is a certified practitioner
              in advanced manual therapy techniques including joint mobilization and soft tissue
              manipulation. She has published research on chronic pain management and is a
              sought-after speaker at international physiotherapy conferences.
            </p>
            <p><strong>Email:</strong> <a href="mailto:arta.berisha@clinic.com">arta.berisha@clinic.com</a></p>
          </div>
        </div>

      </section>
      <Footer />
    </>
  );
}