import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import profilePhoto from "../../Assets/profile-photo.jpeg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Contact from "../Contact/Contact";

function Home() {
  const nameLensTimer = useRef(null);
  const [nameActive, setNameActive] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState(null);

  const displayName = "PAVAN BUSANAMONi";
  const nameLetters = displayName.split("");

  const activateName = (index = null) => {
    setNameActive(true);
    setHoveredLetter(index);
    window.clearTimeout(nameLensTimer.current);
    nameLensTimer.current = window.setTimeout(() => {
      setNameActive(false);
      setHoveredLetter(null);
    }, 1700);
  };

  const getLetterClass = (letter, index) => {
    const distance =
      hoveredLetter === null ? null : Math.abs(index - hoveredLetter);
    const focusClass =
      distance === 0
        ? " magnify-current"
        : distance === 1
        ? " magnify-near"
        : distance === 2
        ? " magnify-far"
        : "";

    return `${letter === " " ? "name-letter name-space" : "name-letter"}${focusClass}`;
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <div className="hero-kicker">Full Stack Developer Portfolio</div>
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name name-glow-zone">
                <span className="intro-name-text">I'M</span>
                <strong
                  className={`main-name letter-zoom-name ${
                    nameActive ? "letter-touch-active" : ""
                  }`}
                  tabIndex="0"
                  onPointerEnter={() => activateName(0)}
                  onPointerLeave={() => {
                    setNameActive(false);
                    setHoveredLetter(null);
                  }}
                  onFocus={() => activateName(0)}
                  onBlur={() => {
                    setNameActive(false);
                    setHoveredLetter(null);
                  }}
                  aria-label={displayName}
                >
                  {nameLetters.map((letter, index) => (
                    <span
                      className={getLetterClass(letter, index)}
                      style={{ "--i": index }}
                      key={`${letter}-${index}`}
                      onPointerEnter={() => activateName(index)}
                      onPointerDown={() => activateName(index)}
                      aria-hidden="true"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </strong>
              </h1>

              <p className="hero-subtitle">
                I build polished web applications with React, Spring Boot,
                Node.js, databases, and cloud-ready deployment practices.
              </p>

              <div className="hero-actions">
                <Link to="/project" className="btn-primary hero-button">
                  View Projects
                </Link>
                <Link to="/contact" className="hero-button hero-button-outline">
                  Hire / Contact Me
                </Link>
              </div>

              <div className="hero-stats" aria-label="portfolio highlights">
                <span>
                  <strong>10+</strong> Projects
                </span>
                <span>
                  <strong>8.9</strong> CGPA
                </span>
                <span>
                  <strong>Full</strong> Stack
                </span>
              </div>

              <div className="typewriter-shell">
                <Type />
              </div>
            </Col>

            <Col md={5} className="hero-profile-col">
              <div className="profile-photo-frame">
                <img
                  src={profilePhoto}
                  alt="PAVAN BUSANAMONi"
                  className="img-fluid profile-photo"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
      <Contact />
    </section>
  );
}

export default Home;
