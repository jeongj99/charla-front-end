import Navbar from "../components/Navbar";
import "./About.css";
import alexPhoto from "../images/Alex-Photo.jpeg";
import jordanPhoto from "../images/Jordan-Photo.jpeg";

export default function About() {
  return (
    <>
      <div className="about-container">
        <Navbar />
        <section className="about-section">
          <h1 className="page-title">Meet the Creators!</h1>
          <div className="about-us-container">
            <div className="alex-container">
              <h1 className="alex-header">Jae Yun Jeong</h1>
              <img className="alex-photo" src={alexPhoto} alt="" />
              <p className="alex-description">Lorem ipsum dolor sit amet, te nullam disputationi has, nonumy melius assentior eu vel. Qui ei nibh appellantur neglegentur, quo magna accusata theophrastus cu. An mei libris equidem. Malis blandit his ad, sed ad facer fabellas, id sit epicurei consetetur voluptatibus. In vim everti tincidunt contentiones. Vix aliquam sanctus ut, ei duo alii facete dolorem.
                Duo at vide nonumy quidam. Nisl mucius ut vix, ei pri regione virtute mediocrem. Audire labores offendit usu an. Eu has posse maluisset, id eos alii deleniti tincidunt, aperiri reformidans vel no. Eu quis voluptua eum, et error convenire has.</p>
            </div>
            <div className="jordan-container">
              <h1 className="jordan-header">Jordan Guerrero Martinez</h1>
              <img className="jordan-photo" src={jordanPhoto} alt="" />
              <p className="jordan-description">Lorem ipsum dolor sit amet, te nullam disputationi has, nonumy melius assentior eu vel. Qui ei nibh appellantur neglegentur, quo magna accusata theophrastus cu. An mei libris equidem. Malis blandit his ad, sed ad facer fabellas, id sit epicurei consetetur voluptatibus. In vim everti tincidunt contentiones. Vix aliquam sanctus ut, ei duo alii facete dolorem.

                Duo at vide nonumy quidam. Nisl mucius ut vix, ei pri regione virtute mediocrem. Audire labores offendit usu an. Eu has posse maluisset, id eos alii deleniti tincidunt, aperiri reformidans vel no. Eu quis voluptua eum, et error convenire has.</p>
            </div>
          </div>
        </section>
      </div >
    </>
  );
}