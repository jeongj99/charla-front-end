import Navbar from "../components/Navbar";
import "./About.css";
import alexPhoto from "../images/Alex-Photo.jpeg";
import jordanPhoto from "../images/Jordan-Photo.jpeg";
import { GoMarkGithub } from "react-icons/go";
import { AiFillLinkedin } from "react-icons/ai";



export default function About() {
  let iconStyles = { color: "white", fontSize: "2.0em", marginLeft: "0.3em", cursor: "pointer" };

  return (
    <>
      <div className="about-container">
        <Navbar />
        <section className="about-section">
          <h1 className="page-title">Meet the Creators!</h1>
          <div className="about-us-container">
            <div className="alex-container">
              <div className="alex-header-links-container">
                <h1 className="alex-header">Jae Yun Jeong</h1>
                <div className="alex-links-container">
                  <a href="https://github.com/jeongj99">
                    <GoMarkGithub style={iconStyles} />
                  </a>
                  <a href="https://www.linkedin.com/in/jeongj99/">
                    <AiFillLinkedin style={iconStyles} />
                  </a>
                </div>
              </div>
              <img className="alex-photo" src={alexPhoto} alt="" />
              <p className="alex-description">Lorem ipsum dolor sit amet, te nullam disputationi has, nonumy melius assentior eu vel. Qui ei nibh appellantur neglegentur, quo magna accusata theophrastus cu. An mei libris equidem. Malis blandit his ad, sed ad facer fabellas, id sit epicurei consetetur voluptatibus. In vim everti tincidunt contentiones. Vix aliquam sanctus ut, ei duo alii facete dolorem.
                Duo at vide nonumy quidam. Nisl mucius ut vix, ei pri regione virtute mediocrem. Audire labores offendit usu an. Eu has posse maluisset, id eos alii deleniti tincidunt, aperiri reformidans vel no. Eu quis voluptua eum, et error convenire has.</p>
            </div>
            <div className="jordan-container">
              <div className="jordan-header-links-container">
                <h1 className="jordan-header">Jordan Guerrero</h1>
                <div className="jordan-links-container">
                  <a href="https://github.com/jordangm94">
                    <GoMarkGithub style={iconStyles} />
                  </a>
                  <a href="https://www.linkedin.com/in/jordangm94/">
                    <AiFillLinkedin style={iconStyles} />
                  </a>
                </div>

              </div>

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