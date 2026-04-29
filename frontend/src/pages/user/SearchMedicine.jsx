import { useMemo, useState } from "react";
import FilterBar from "../../components/medicine/FilterBar";
import Loader from "../../components/common/Loader";
import MapView from "../../components/map/MapView";
import Marker from "../../components/map/Marker";
import MedicineCard from "../../components/medicine/MedicineCard";
import Card from "../../components/ui/Card";
import useLocation from "../../hooks/useLocation";
import { searchMedicines } from "../../services/medicineService";

const SearchMedicine = () => {
  const { location, loading: locationLoading, error: locationError, refreshLocation } = useLocation();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("nearest");
  const [state, setState] = useState({ loading: false, error: "", results: [] });

  const hasLocation = Boolean(location?.latitude && location?.longitude);

  const searchLabel = useMemo(() => {
    if (type === "nearest") {
      return "Nearest";
    }

    return "Best match";
  }, [type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((current) => ({ ...current, loading: true, error: "" }));

    try {
      const response = await searchMedicines({
        q: query,
        type,
        lat: location?.latitude,
        lng: location?.longitude,
      });

      setState({
        loading: false,
        error: "",
        results: response.results || [],
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.response?.data?.message || error.message || "Search failed",
        results: [],
      });
    }
  };

  return (
    <div className="page page-card">
      <section className="section">
        <span className="eyebrow">Search medicine</span>
        <h1 className="page__title" style={{ fontSize: "2.4rem" }}>
          Find {searchLabel} medicine around you.
        </h1>
        <p className="page__subtitle">
          Search by medicine name, brand, category, or symptom. The backend can rank by nearest distance or best
          overall match.
        </p>
      </section>

      <Card>
        <FilterBar query={query} type={type} onQueryChange={setQuery} onTypeChange={setType} onSubmit={handleSubmit} />
      </Card>

      <div className="toolbar">
        <button className="button button--ghost" type="button" onClick={refreshLocation}>
          Refresh location
        </button>
        <span className="pill">
          {locationLoading ? "Detecting GPS..." : hasLocation ? `GPS ready: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : locationError || "Location unavailable"}
        </span>
      </div>

      {state.loading ? <Loader label="Searching medicine" /> : null}

      {state.error ? <Card><p className="card__meta" style={{ color: "#b42318" }}>{state.error}</p></Card> : null}

      <MapView title="Nearby pharmacies map">
        <Marker label={hasLocation ? "Your location" : "Map placeholder"} />
      </MapView>

      <div className="grid grid--2">
        {state.results.length > 0 ? (
          state.results.map((medicine) => <MedicineCard key={medicine._id || medicine.id} medicine={medicine} />)
        ) : (
          <Card className="empty-state">Search results will appear here.</Card>
        )}
      </div>
    </div>
  );
};

export default SearchMedicine;