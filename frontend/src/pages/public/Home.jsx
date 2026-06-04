import { useNavigate } from "react-router-dom";
import physioImg from "../../assets/physio-home.png";
import "./home.css";

import physio1 from "../../assets/physiotherapy.png";
import physio2 from "../../assets/sportsinjury.png";
import physio3 from "../../assets/manualtherapy.png";
import physio4 from "../../assets/rehabilitation.png";

import aboutImg from "../../assets/aboutImg.png";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const navigate = useNavigate();

  const services = [
    {
      img: physio1,
      title: "Physiotherapy",
      desc: "Personalized therapy programs focused on reducing pain."
    },
    {
      img: physio2,
      title: "Sports Injury",
      desc: "Specialized care for athletes recovering from injuries."
    },
    {
      img: physio3,
      title: "Manual Therapy",
      desc: "Hands-on techniques to relieve pain and restore movement."
    },
    {
      img: physio4,
      title: "Rehabilitation",
      desc: "Recovery programs after surgery or injury."
    }
  ];

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
                Personalized physiotherapy treatments focused on improving mobility,
                reducing pain, and restoring your quality of life.
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

      {/* SERVICES (SWIPER) */}
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

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {services.map((s, i) => (
            <SwiperSlide key={i}>
              <div
                className="serviceCard"
                onClick={() => navigate("/services")}
              >
                <img src={s.img} alt={s.title} />

                <div className="serviceContent">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <button>Learn More →</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="appointmentBtn">
          <button onClick={() => navigate("/dashboard")}>
            Book An Appointment
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="aboutImage">
          <img src={aboutImg} alt="About Physio" />
        </div>

        <div className="aboutContent">
          <span>OUR CLINIC</span>

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

      <Footer />
    </>
  );
}