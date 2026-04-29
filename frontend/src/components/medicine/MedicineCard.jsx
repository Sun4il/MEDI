import Card from "../ui/Card";
import Button from "../ui/Button";
import { formatCurrency, formatDistance } from "../../utils/format";

const fallbackImageLabel = "No image";

const MedicineCard = ({ medicine, onAction }) => {
  const imageUrl = medicine?.image?.url;

  return (
    <Card className="medicine-card">
      {imageUrl ? (
        <img className="medicine-card__image" src={imageUrl} alt={medicine?.name || "Medicine image"} loading="lazy" />
      ) : (
        <div className="medicine-card__image medicine-card__image--placeholder">{fallbackImageLabel}</div>
      )}

      <div className="card__body stack">
        <div className="medicine-card__header">
          <div>
            <h3 className="card__title">{medicine?.name || "Medicine"}</h3>
            <div className="card__meta">{medicine?.brand || medicine?.genericName || "Generic brand"}</div>
          </div>
          <strong className="medicine-card__price">{formatCurrency(medicine?.price)}</strong>
        </div>

        <p className="card__meta">{medicine?.description || "Medicine details will appear here."}</p>

        <div className="toolbar">
          <span className="pill">{medicine?.category || "general"}</span>
          <span className="pill">{formatDistance(medicine?.distanceKm)}</span>
          <span className="pill">Score {medicine?.score ?? "--"}</span>
        </div>

        <Button variant="secondary" type="button" onClick={onAction}>
          View details
        </Button>
      </div>
    </Card>
  );
};

export default MedicineCard;