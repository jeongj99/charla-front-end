import Navbar from "../components/Navbar";

import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <Navbar />
        <section className="home-section">
          This is home page!
        </section>
      </div>
    </>
  );
}