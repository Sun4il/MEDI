import Button from "../ui/Button";

const FilterBar = ({ query, type, onQueryChange, onTypeChange, onSubmit }) => (
  <form className="filter-bar" onSubmit={onSubmit}>
    <label className="field">
      <span className="field__label">Search</span>
      <input
        className="input"
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search medicine name, brand, or symptom"
      />
    </label>

    <label className="field">
      <span className="field__label">Mode</span>
      <select className="select" value={type} onChange={(event) => onTypeChange(event.target.value)}>
        <option value="nearest">Nearest</option>
        <option value="best">Best match</option>
      </select>
    </label>

    <div className="filter-bar__actions">
      <Button type="submit">Search</Button>
    </div>
  </form>
);

export default FilterBar;