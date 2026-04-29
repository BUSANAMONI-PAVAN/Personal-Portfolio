import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm{" "}
            <span className="purple">PAVAN BUSANAMONi</span> from{" "}
            <span className="purple">Vijayawada, India</span>.
            <br />
            I'm currently a 3rd year{" "}
            <span className="purple">B.Tech CSE</span> student at{" "}
            <span className="purple">KL University</span>.
            <br />
            I'm passionate about learning new technologies and building
            real-world applications. I have strong knowledge in programming,
            web development, and databases.
            <br />
            <br />
            <b>Education:</b>
            <br />
            🎓 B.Tech CSE, KL University (2024–2027) — CGPA: 8.9
            <br />
            🎓 Diploma, Govt. Polytechnic Gadwal (2022–2024) — 70%
            <br />
            🎓 Schooling, ZPHS Kalwarala — 10 GPA
            <br />
            <br />
            Outside of coding, I love engaging in activities that keep me
            creative and inspired:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Reading Tech Articles 📖
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing Cricket & Chess 🏏♟️
            </li>
            <li className="about-activity">
              <ImPointRight /> Gaming 🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Solving Rubik's Cube 🧩
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Pavan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
