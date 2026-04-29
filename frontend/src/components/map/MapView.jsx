const MapView = ({ children, title = "Nearby shops map" }) => (
  <section className="map-view" aria-label={title}>
    <div className="stack" style={{ alignItems: "center" }}>
      <strong>{title}</strong>
      <span>Map integration placeholder</span>
      {children}
    </div>
  </section>
);

export default MapView;