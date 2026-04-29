import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Loader from "../../components/common/Loader";
import { uploadPrescription } from "../../services/prescriptionService";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [state, setState] = useState({ loading: false, error: "", result: null });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setState({ loading: false, error: "Please choose a prescription image", result: null });
      return;
    }

    setState({ loading: true, error: "", result: null });

    try {
      const response = await uploadPrescription(file);
      setState({ loading: false, error: "", result: response });
    } catch (error) {
      setState({
        loading: false,
        error: error.response?.data?.message || error.message || "Upload failed",
        result: null,
      });
    }
  };

  return (
    <div className="page page-card">
      <section className="section">
        <span className="eyebrow">AI OCR</span>
        <h1 className="page__title" style={{ fontSize: "2.4rem" }}>
          Upload prescription for text extraction.
        </h1>
        <p className="page__subtitle">The file goes to a dedicated upload route and returns OCR output for medicine matching.</p>
      </section>

      <Card>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Prescription image</span>
            <input className="input" type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </label>

          <Button type="submit" disabled={state.loading}>
            {state.loading ? "Uploading..." : "Upload prescription"}
          </Button>
        </form>
      </Card>

      {state.loading ? <Loader label="Processing OCR" /> : null}

      {state.error ? (
        <Card>
          <p className="card__meta" style={{ color: "#b42318" }}>{state.error}</p>
        </Card>
      ) : null}

      {state.result ? (
        <Card className="stack">
          <h2 className="card__title">OCR output</h2>
          <p className="card__meta">{state.result?.ocr?.text || "No text extracted yet."}</p>
        </Card>
      ) : null}
    </div>
  );
};

export default UploadPrescription;