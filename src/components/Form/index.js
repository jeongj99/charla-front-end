import "./index.css";

export default function Form() {
  return (
    <div className="form-container">
      <div className="form-top-container">
        <div className="backdrop" />
        <div className="form-header-container">
          <h2 className="form-header-message">Welcome</h2>
          <h2 className="form-header-message">Back</h2>
          <h5 className="form-header-small-message">Please log in to continue</h5>
        </div>
      </div>
    </div>
  );
}