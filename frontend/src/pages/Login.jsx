import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { login as loginRequest } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await loginRequest(form);
      setSession(response.user, response.token);
      navigate("/user/dashboard");
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || error.message || "Login failed" });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return (
    <div className="page page-card">
      <Card className="auth-form">
        <div className="stack">
          <span className="eyebrow">Welcome back</span>
          <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
            Login to continue
          </h1>
          <p className="page__subtitle">Use your account to search nearby pharmacies and manage shop inventory.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          {status.error ? <p className="card__meta" style={{ color: "#b42318" }}>{status.error}</p> : null}

          <div className="toolbar">
            <Button type="submit" disabled={status.loading}>
              {status.loading ? "Logging in..." : "Login"}
            </Button>
            <Link to="/signup">
              <Button type="button" variant="secondary">
                Create account
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;