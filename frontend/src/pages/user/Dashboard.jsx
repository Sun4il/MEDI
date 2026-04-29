import Card from "../../components/ui/Card";

const Dashboard = () => (
  <div className="page page-card">
    <section className="section">
      <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
        User dashboard
      </h1>
      <p className="page__subtitle">Track searches, upload prescriptions, and see nearby medicine options.</p>
    </section>

    <div className="grid grid--3">
      <Card>
        <h3 className="card__title">Nearest search</h3>
        <p className="card__meta">Use your GPS location to discover the closest available pharmacy.</p>
      </Card>
      <Card>
        <h3 className="card__title">Best-match search</h3>
        <p className="card__meta">Rank results by price, distance, stock, and rating score.</p>
      </Card>
      <Card>
        <h3 className="card__title">OCR upload</h3>
        <p className="card__meta">Upload a prescription and extract medicine names from the text flow.</p>
      </Card>
    </div>
  </div>
);

export default Dashboard;