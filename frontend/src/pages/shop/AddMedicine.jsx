import Card from "../../components/ui/Card";

const AddMedicine = () => (
  <div className="page page-card">
    <section className="section">
      <span className="eyebrow">Shop inventory</span>
      <h1 className="page__title" style={{ fontSize: "2.2rem" }}>
        Add medicine
      </h1>
      <p className="page__subtitle">This screen can be connected to the Cloudinary image upload flow and medicine API later.</p>
    </section>

    <Card>
      <p className="card__meta">Starter placeholder for medicine creation form.</p>
    </Card>
  </div>
);

export default AddMedicine;