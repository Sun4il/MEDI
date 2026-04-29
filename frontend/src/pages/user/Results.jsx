import { useLocation } from "react-router-dom";
import Card from "../../components/ui/Card";

const Results = () => {
  const location = useLocation();
  const state = location.state || {};

  return (
    <div className="page page-card">
      <section className="section">
        <span className="eyebrow">Results</span>
        <h1 className="page__title" style={{ fontSize: "2.4rem" }}>
          Search or OCR results
        </h1>
      </section>

      <Card>
        <p className="card__meta">
          This page can receive search results or OCR text from the previous step. Current state: {JSON.stringify(state || {}, null, 2)}
        </p>
      </Card>
    </div>
  );
};

export default Results;