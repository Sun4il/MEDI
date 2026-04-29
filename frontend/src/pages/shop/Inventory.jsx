import Card from "../../components/ui/Card";

const Inventory = () => (
  <div className="page page-card">
    <section className="section">
      <span className="eyebrow">Inventory</span>
      <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
        Shop inventory
      </h1>
      <p className="page__subtitle">Use this page to list medicine records and edit Cloudinary-backed images.</p>
    </section>

    <Card>
      <p className="card__meta">Inventory table placeholder.</p>
    </Card>
  </div>
);

export default Inventory;