import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { register as registerRequest } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") === "shop" ? "shop" : "user";
  const [form, setForm] = useState({ name: "", email: "", password: "", role: defaultRole });
  const [status, setStatus] = useState({ loading: false, error: "" });
  const isShopSignup = defaultRole === "shop";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await registerRequest(form);
      setSession(response.user, response.token);
      navigate("/user/dashboard");
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || error.message || "Signup failed" });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return (
    <div className="page page-card">
      <Card className="auth-form">
        <div className="stack">
          <span className="eyebrow">{isShopSignup ? "For pharmacy owners" : "Join the platform"}</span>
          <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
            {isShopSignup ? "Register your pharmacy account" : "Create your account"}
          </h1>
          <p className="page__subtitle">
            {isShopSignup
              ? "Create a shop account so you can manage inventory, stock, and medicine listings."
              : "Sign up as a user or shop account. Admin accounts are created separately."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Name</span>
            <input className="input" type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label className="field">
            <span className="field__label">Email</span>
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Role</span>
            <select className="select" name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="shop">Shop</option>
            </select>
          </label>

          {status.error ? <p className="card__meta" style={{ color: "#b42318" }}>{status.error}</p> : null}

          <div className="toolbar">
            <Button type="submit" disabled={status.loading}>
              {status.loading ? "Creating..." : "Create account"}
            </Button>
            <Link to="/login">
              <Button type="button" variant="secondary">
                Already have account
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;