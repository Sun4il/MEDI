import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import IntroSequence from "../components/common/IntroSequence";

const INTRO_STORAGE_KEY = "medifinder-home-intro-seen";

const shouldPlayIntro = () => {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }

    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== "1";
  } catch {
    return false;
  }
};

const popularMedicines = ["Paracetamol", "Azithromycin", "Cetirizine", "Amoxicillin", "Omeprazole", "Metformin"];

const stats = [
  { value: "200+", label: "Verified Pharmacies" },
  { value: "50,000+", label: "Medicines Listed" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "4.8★", label: "App Rating" },
];

const features = [
  {
    icon: "📍",
    title: "Nearest Pharmacies",
    copy: "Locate verified pharmacies near you on an interactive map with real-time availability.",
  },
  {
    icon: "↗",
    title: "Price Comparison",
    copy: "Compare medicine prices across Jaipur stores and find the most affordable option.",
  },
  {
    icon: "🧠",
    title: "AI Prescription Reader",
    copy: "Upload your doctor’s prescription and let AI extract and search medicines instantly.",
  },
  {
    icon: "☎",
    title: "WhatsApp Confirm",
    copy: "Confirm medicine availability via WhatsApp or call before visiting the pharmacy.",
  },
  {
    icon: "✅",
    title: "Verified Pharmacies",
    copy: "All listed pharmacies are verified with valid drug licenses by our admin team.",
  },
  {
    icon: "⚡",
    title: "Real-Time Stock",
    copy: "Shopkeepers update stock daily so you always see accurate availability info.",
  },
];

const steps = [
  {
    value: "1",
    title: "Search Medicine",
    copy: "Enter medicine name or upload your prescription.",
  },
  {
    value: "2",
    title: "View Results",
    copy: "See availability, prices & nearby pharmacy locations.",
  },
  {
    value: "3",
    title: "Compare & Choose",
    copy: "Filter by price, distance, rating & stock status.",
  },
  {
    value: "4",
    title: "Confirm & Visit",
    copy: "Call, WhatsApp or get directions to the pharmacy.",
  },
];

const testimonials = [
  {
    name: "Anita Verma",
    location: "Vaishali Nagar, Jaipur",
    text: "Found Azithromycin at the lowest price in just 2 minutes! Amazing app for Jaipur residents.",
  },
  {
    name: "Ramesh Gupta",
    location: "C-Scheme, Jaipur",
    text: "The WhatsApp confirmation feature saved me a wasted trip to the pharmacy. Highly recommended!",
  },
  {
    name: "Pooja Sharma",
    location: "Malviya Nagar, Jaipur",
    text: "AI prescription reader is a game changer. Uploaded my doctor’s prescription and got all medicines listed instantly.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!showIntro || typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures and continue with the page.
    }

    setShowIntro(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/user/search", {
      state: {
        query: searchTerm.trim(),
      },
    });
  };

  return (
    <div className="home-page">
      {showIntro ? <IntroSequence onComplete={handleIntroComplete} /> : null}

      <section className="home-hero" id="home">
        <div className="home-hero__halo home-hero__halo--left" aria-hidden="true" />
        <div className="home-hero__halo home-hero__halo--right" aria-hidden="true" />

        <div className="container home-hero__content">
          <span className="home-badge">📍 Serving All of Jaipur City</span>
          <h1 className="home-hero__title">
            Find Any Medicine in <span>Jaipur</span> Instantly
          </h1>
          <p className="home-hero__copy">
            Search medicines, compare prices, check availability at nearby pharmacies — all in one place.
          </p>

          <form className="home-search" onSubmit={handleSearch}>
            <span className="home-search__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              className="home-search__input"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search medicine (e.g., Paracetamol, Aspirin)..."
            />
            <Button className="home-search__button" variant="accent" type="submit">
              Search
            </Button>
          </form>

          <div className="home-popular" aria-label="Popular medicine search shortcuts">
            <span className="home-popular__label">Popular:</span>
            <div className="home-popular__chips">
              {popularMedicines.map((medicine) => (
                <button
                  key={medicine}
                  className="home-chip"
                  type="button"
                  onClick={() => setSearchTerm(medicine)}
                >
                  {medicine}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container home-stats" aria-label="Platform highlights">
          {stats.map((stat) => (
            <Card className="home-stat" key={stat.label}>
              <strong className="home-stat__value">{stat.value}</strong>
              <span className="home-stat__label">{stat.label}</span>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-section home-section--pale" id="about">
        <div className="container">
          <div className="home-section__header">
            <h2 className="home-section__title">Everything You Need</h2>
            <p className="home-section__subtitle">MediFinder makes finding medicines in Jaipur quick, easy, and reliable.</p>
          </div>

          <div className="home-featureGrid">
            {features.map((feature) => (
              <Card className="home-featureCard" key={feature.title}>
                <span className="home-featureCard__icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="home-featureCard__title">{feature.title}</h3>
                <p className="home-featureCard__copy">{feature.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--white" id="services">
        <div className="container">
          <div className="home-section__header">
            <h2 className="home-section__title">How It Works</h2>
            <p className="home-section__subtitle">Get your medicine in 4 simple steps.</p>
          </div>

          <div className="home-steps">
            {steps.map((step) => (
              <article className="home-step" key={step.value}>
                <span className="home-step__bubble">{step.value}</span>
                <h3 className="home-step__title">{step.title}</h3>
                <p className="home-step__copy">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--white">
        <div className="container">
          <div className="home-ownerCard">
            <div className="home-ownerCard__content">
              <span className="home-ownerCard__eyebrow">For Pharmacy Owners</span>
              <h2 className="home-ownerCard__title">Register Your Pharmacy on MediFinder</h2>
              <p className="home-ownerCard__copy">
                Reach thousands of Jaipur customers. Manage your inventory, update stock, and get more walk-ins.
                Admin verification ensures only genuine pharmacies are listed.
              </p>

              <div className="home-ownerCard__actions">
                <Link to="/signup?role=shop">
                  <Button variant="primary" type="button">
                    Register Your Pharmacy
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" type="button">
                    Shopkeeper Login
                  </Button>
                </Link>
              </div>
            </div>

            <div className="home-ownerCard__visual" aria-hidden="true">
              <div className="home-ownerCard__visualFrame">
                <div className="home-ownerCard__visualShelf home-ownerCard__visualShelf--top" />
                <div className="home-ownerCard__visualShelf home-ownerCard__visualShelf--middle" />
                <div className="home-ownerCard__visualShelf home-ownerCard__visualShelf--bottom" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--pale">
        <div className="container">
          <div className="home-section__header">
            <h2 className="home-section__title">What People Say</h2>
            <p className="home-section__subtitle">Real feedback from Jaipur residents using MediFinder.</p>
          </div>

          <div className="home-testimonialGrid">
            {testimonials.map((testimonial) => (
              <Card className="home-testimonialCard" key={testimonial.name}>
                <div className="home-testimonialCard__stars" aria-label="Five star rating">
                  ★★★★★
                </div>
                <p className="home-testimonialCard__copy">“{testimonial.text}”</p>
                <div className="home-testimonialCard__person">
                  <div className="home-testimonialCard__avatar" aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <div className="home-testimonialCard__location">{testimonial.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--white" id="contact">
        <div className="container">
          <div className="home-finalCta">
            <h2 className="home-finalCta__title">Ready to Find Your Medicine?</h2>
            <p className="home-finalCta__copy">
              Join thousands of Jaipur residents who trust MediFinder for their healthcare needs.
            </p>

            <div className="home-finalCta__actions">
              <Link to="/signup">
                <Button variant="primary" type="button">
                  Sign Up as Customer
                </Button>
              </Link>
              <Link to="/user/search">
                <Button variant="secondary" type="button">
                  Search Without Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;