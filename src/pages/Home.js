import Navbar from "../components/Navbar";
import Form from "../components/Form";

import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Navbar />
        <section className="home-section">
          <Form />
        </section>
      </div>
    </>
  );
}