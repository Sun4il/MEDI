const Loader = ({ label = "Loading" }) => (
  <div className="empty-state" role="status" aria-live="polite">
    <div className="loader" aria-hidden="true" />
    <span>{label}...</span>
  </div>
);

export default Loader;