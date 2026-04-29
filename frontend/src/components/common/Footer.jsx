import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isMarketing = location.pathname === "/" || location.pathname === "/about";

  if (isMarketing) {
    return (
      <footer className="footer footer--home">
        <div className="container footer__homeGrid">
          <div className="footer__brandBlock">
            <div className="navbar__brand navbar__brand--home footer__brand">
              <span className="navbar__logo navbar__logo--home" aria-hidden="true">
                ◯
              </span>
              <span>MediFinder</span>
            </div>
            <p className="footer__copy">Your trusted medicine finder for Jaipur city. Quick, reliable, verified.</p>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/about#services">Services</Link>
            <Link to="/about#contact">Contact</Link>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">For Users</h3>
            <Link to="/signup">Sign Up / Login</Link>
            <Link to="/user/search">Search Medicines</Link>
            <Link to="/user/upload">Upload Prescription</Link>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">For Pharmacies</h3>
            <Link to="/signup?role=shop">Register Pharmacy</Link>
            <Link to="/login">Shopkeeper Login</Link>
            <Link to="/about#contact">Get Support</Link>
          </div>
        </div>

        <div className="container footer__bar">
          <span>All pharmacies are verified with valid drug licenses</span>
          <span>© 2026 MediFinder, Jaipur. Always consult your doctor before taking medicine.</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>Smart Medicine Finder</span>
        <span>Cloudinary-backed medicine discovery and prescription workflow</span>
      </div>
    </footer>
  );
};

export default Footer;