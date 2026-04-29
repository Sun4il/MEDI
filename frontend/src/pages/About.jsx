import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const missionPills = [
  { icon: "◎", title: "Mission-driven" },
  { icon: "❤", title: "Patient-first" },
  { icon: "✓", title: "Verified Only" },
  { icon: "⚡", title: "Fast Results" },
];

const values = [
  {
    icon: "🛡",
    title: "Trust & Safety",
    copy: "Every pharmacy on our platform is verified with a valid drug license by our admin team.",
  },
  {
    icon: "👥",
    title: "Community First",
    copy: "We work for both patients and pharmacy owners, creating a win-win ecosystem.",
  },
  {
    icon: "⚡",
    title: "Speed & Accuracy",
    copy: "Real-time stock updates ensure you get accurate information every time you search.",
  },
  {
    icon: "❤",
    title: "Healthcare Access",
    copy: "We believe quality healthcare access is a right, not a privilege, for every Jaipur resident.",
  },
];

const journey = [
  {
    year: "2024",
    title: "MediFinder Founded",
    copy: "Started with a vision to solve medicine availability problems in Jaipur.",
  },
  {
    year: "2024",
    title: "First 50 Pharmacies",
    copy: "Onboarded and verified 50+ pharmacies across Jaipur in the first 3 months.",
  },
  {
    year: "2025",
    title: "AI Prescription Reader",
    copy: "Launched OCR-based prescription reading to simplify medicine search.",
  },
  {
    year: "2026",
    title: "10,000+ Users",
    copy: "Crossed 10,000 registered users and 200 verified pharmacies.",
  },
];

const team = [
  { initials: "AM", name: "Arjun Mehta", role: "Founder & CEO", copy: "Ex-Healthcare Startup, IIT Jodhpur" },
  { initials: "KS", name: "Kavya Sharma", role: "Head of Operations", copy: "Pharmacy Sector Expert, Jaipur" },
  { initials: "RV", name: "Rohit Verma", role: "Tech Lead", copy: "Full Stack Developer, 8 yrs exp" },
  { initials: "PA", name: "Priya Agarwal", role: "Customer Success", copy: "Healthcare Support, Jaipur" },
];

const benefits = [
  "Only verified, licensed pharmacies are listed on our platform.",
  "Real-time stock updates directly from pharmacy owners.",
  "AI-powered prescription reader for instant medicine search.",
  "Price comparison across 200+ Jaipur pharmacies.",
  "WhatsApp & call integration for quick confirmation.",
  "Covers all major areas of Jaipur including outskirts.",
];

const About = () => (
    <div className="about-page">
      <section className="about-hero" id="top">
        <div className="about-hero__content container">
          <span className="about-badge">About MediFinder</span>
          <h1 className="about-hero__title">
            Making Medicines
            <span> Easy to Find</span> in Jaipur
          </h1>
          <p className="about-hero__copy">
            We started MediFinder with one simple mission: no one in Jaipur should struggle to find a medicine.
            Our platform connects patients with verified local pharmacies instantly.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__copy">
            <span className="about-sectionTag">Our Mission</span>
            <h2 className="about-sectionTitle">Connecting Patients with the Right Medicine, Right Now</h2>
            <p className="about-sectionText">
              Every day, thousands of Jaipur residents face the frustrating experience of visiting multiple
              pharmacies to find a specific medicine. MediFinder was built to end this problem - a single search
              should tell you exactly where your medicine is available and at what price.
            </p>
            <p className="about-sectionText">
              We partner with licensed pharmacies across all major areas of Jaipur, from C-Scheme to Vaishali Nagar,
              Malviya Nagar to Mansarovar - ensuring comprehensive coverage of the Pink City.
            </p>

            <div className="about-points">
              {missionPills.map((pill) => (
                <Card className="about-point" key={pill.title}>
                  <span className="about-point__dot" aria-hidden="true">
                    {pill.icon}
                  </span>
                  <strong>{pill.title}</strong>
                </Card>
              ))}
            </div>
          </div>

          <div className="about-mission__visual" aria-hidden="true">
            <div className="about-mission__visualFrame">
              <div className="about-mission__visualShape about-mission__visualShape--circleA" />
              <div className="about-mission__visualShape about-mission__visualShape--circleB" />
              <div className="about-mission__visualShape about-mission__visualShape--window" />
              <div className="about-mission__visualShape about-mission__visualShape--door" />
              <div className="about-mission__stat">
                <span className="about-mission__statIcon">📍</span>
                <div>
                  <strong>200+</strong>
                  <span>Jaipur Pharmacies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section--pale" id="services">
        <div className="container">
          <div className="about-section__header">
            <span className="about-sectionTag">What We Stand For</span>
            <h2 className="about-section__title">Our core values that guide everything we do</h2>
          </div>

          <div className="about-values__grid">
            {values.map((value) => (
              <Card className="about-valueCard" key={value.title}>
                <span className="about-valueCard__icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="about-valueCard__title">{value.title}</h3>
                <p className="about-valueCard__copy">{value.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-section__header">
            <span className="about-sectionTag">Our Journey</span>
            <h2 className="about-section__title">From a small idea to Jaipur's trusted medicine finder</h2>
          </div>

          <div className="about-journey">
            {journey.map((item) => (
              <article className="about-journey__item" key={item.year + item.title}>
                <div className="about-journey__rail">
                  <span className="about-journey__year">{item.year.slice(-2)}</span>
                </div>
                <Card className="about-journey__card">
                  <span className="about-journey__label">{item.year}</span>
                  <h3 className="about-journey__title">{item.title}</h3>
                  <p className="about-journey__copy">{item.copy}</p>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--pale">
        <div className="container">
          <div className="about-section__header">
            <span className="about-sectionTag">Meet the Team</span>
            <h2 className="about-section__title">Passionate people building Jaipur's medicine network</h2>
          </div>

          <div className="about-team__grid">
            {team.map((member, index) => (
              <Card className="about-teamCard" key={member.name}>
                <span className={`about-teamCard__avatar about-teamCard__avatar--${index + 1}`}>{member.initials}</span>
                <h3 className="about-teamCard__name">{member.name}</h3>
                <p className="about-teamCard__role">{member.role}</p>
                <p className="about-teamCard__copy">{member.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-section__header">
            <span className="about-sectionTag">Why Choose MediFinder?</span>
            <h2 className="about-section__title">The reasons patients and pharmacies trust us</h2>
          </div>

          <div className="about-benefits__grid">
            {benefits.map((benefit) => (
              <Card className="about-benefitCard" key={benefit}>
                <span className="about-benefitCard__icon" aria-hidden="true">
                  ✓
                </span>
                <p className="about-benefitCard__copy">{benefit}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta" id="contact">
        <div className="container about-cta__content">
          <span className="about-cta__badge" aria-hidden="true">
            🏅
          </span>
          <h2 className="about-cta__title">Join the MediFinder Community</h2>
          <p className="about-cta__copy">
            Whether you're a patient or a pharmacy owner — MediFinder is for you.
          </p>

          <div className="about-cta__actions">
            <Link to="/signup">
              <Button variant="secondary" type="button">
                Sign Up as Customer
              </Button>
            </Link>
            <Link to="/signup?role=shop">
              <Button variant="secondary" type="button">
                For Shopkeepers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
);

export default About;