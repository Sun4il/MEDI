import Card from "../../components/ui/Card";

const Dashboard = () => (
  <div className="page page-card">
    <section className="section">
      <span className="eyebrow">Admin</span>
      <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
        Admin dashboard
      </h1>
      <p className="page__subtitle">Monitor users, shops, and analytics across the platform.</p>
    </section>

    <div className="grid grid--3">
      <Card>
        <h3 className="card__title">Verify shops</h3>
        <p className="card__meta">Approve new shop registrations and maintain trust in search results.</p>
      </Card>
      <Card>
        <h3 className="card__title">Manage users</h3>
        <p className="card__meta">Review and moderate user accounts and access levels.</p>
      </Card>
      <Card>
        <h3 className="card__title">Analytics</h3>
        <p className="card__meta">Track total medicines, active shops, and verified storefronts.</p>
      </Card>
    </div>
  </div>
);

export default Dashboard;