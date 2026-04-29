import Card from "../../components/ui/Card";

const Dashboard = () => (
  <div className="page page-card">
    <section className="section">
      <span className="eyebrow">Shop</span>
      <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
        Shop dashboard
      </h1>
      <p className="page__subtitle">Manage inventory, shop profile, and the medicine cards that will point to Cloudinary images.</p>
    </section>

    <div className="grid grid--3">
      <Card>
        <h3 className="card__title">Add medicine</h3>
        <p className="card__meta">Upload image, price, stock, and availability data in a single flow.</p>
      </Card>
      <Card>
        <h3 className="card__title">Inventory</h3>
        <p className="card__meta">Track the current medicine list stored by your shop.</p>
      </Card>
      <Card>
        <h3 className="card__title">Shop profile</h3>
        <p className="card__meta">Maintain your verified profile and location data for nearest search.</p>
      </Card>
    </div>
  </div>
);

export default Dashboard;