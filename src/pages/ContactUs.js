import Navbar from "../components/Navbar";
import ContactUsForm from "../components/Form/ContactUsForm";

import "./ContactUs.css";

export default function ContactUs() {
  return (
    <>
      <div className="contactus-container">
        <Navbar />
        <section className="contactus-section">
          <div className="form-container">
            <div className="form-top-container">
              <div className="backdrop" />
              <div className="form-header-container">
                <h2 className="form-header-message">Contact</h2>
                <h2 className="form-header-message">Us</h2>
                <h5 className="form-header-small-message">
                  Please send your feedback!
                </h5>
              </div>
            </div>
            <div className="form-middle-container">
              <ContactUsForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
