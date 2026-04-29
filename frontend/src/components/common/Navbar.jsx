import { NavLink, Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isMarketing = location.pathname === "/" || location.pathname === "/about";

  if (isMarketing) {
    return (
      <header className="navbar navbar--home">
        <div className="container navbar__inner">
          <Link className="navbar__brand navbar__brand--home" to="/">
            <span className="navbar__logo navbar__logo--home" aria-hidden="true">
              ◯
            </span>
            <span>MediFinder</span>
          </Link>

          <nav className="navbar__nav navbar__nav--home" aria-label="Primary navigation">
            <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--home navbar__link--active" : "navbar__link navbar__link--home")} end to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--home navbar__link--active" : "navbar__link navbar__link--home")} to="/about">
              About
            </NavLink>
            <Link className="navbar__link navbar__link--home" to="/about#services">
              Services
            </Link>
            <Link className="navbar__link navbar__link--home" to="/about#contact">
              Contact
            </Link>
          </nav>

          <div className="navbar__actions navbar__actions--home">
            <Link to="/login">
              <Button variant="secondary" type="button">
                Sign In
              </Button>
            </Link>
            <Link to="/signup?role=shop">
              <Button variant="primary" type="button">
                For Shopkeepers
              </Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link className="navbar__brand" to="/">
          <span className="navbar__logo" aria-hidden="true" />
          <span>Smart Medicine Finder</span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary navigation">
          <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--active" : "navbar__link")} to="/user/search">
            Search
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--active" : "navbar__link")} to="/user/upload">
            Upload Prescription
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--active" : "navbar__link")} to="/shop/dashboard">
            Shop
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar__link navbar__link--active" : "navbar__link")} to="/admin/dashboard">
            Admin
          </NavLink>
        </nav>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <span className="pill">{user?.role || "user"}</span>
              <Button variant="secondary" onClick={logout} type="button">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" type="button">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" type="button">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;