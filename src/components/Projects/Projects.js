import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import jobportal from "../../Assets/Projects/jobportal.png";
import vibeguru from "../../Assets/Projects/vibeguru.png";
import garageservice from "../../Assets/Projects/garageservice.png";
import bankmanagement from "../../Assets/Projects/bankmanagement.png";
import smartagriculture from "../../Assets/Projects/leaf.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={jobportal}
              isBlog={false}
              title="Job Portal Web App"
              description="A full-stack job portal application with authentication, role-based access control, and dynamic job listings. Built with React for the frontend, Spring Boot for the backend API, and MySQL for database management."
              ghLink="https://github.com/BUSANAMONI-PAVAN/WebAppProject.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vibeguru}
              isBlog={false}
              title="Vibe Guru — Music Streaming"
              description="A music streaming application that allows users to upload songs, create playlists, and enjoy a seamless listening experience. Features include user authentication, a login system, and a modern player UI. Built with React, Node.js, and MongoDB."
              ghLink="https://github.com/BUSANAMONI-PAVAN/Vibe-Guru-Music-Streaming.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={garageservice}
              isBlog={false}
              title="Garage Service Booking App"
              description="A service booking platform for garages with slot booking, contact integration using Twilio API, and a clean, responsive interface. Built with Next.js, TypeScript, and Tailwind CSS for a modern development experience."
              ghLink="https://github.com/BUSANAMONI-PAVAN/garage-services.me.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={smartagriculture}
              isBlog={false}
              title="Smart Agriculture Assistant"
              description="An AI-powered agriculture platform for farmers with crop recommendation, disease detection, weather insights, market prices, profit estimation, fertilizer calculation, government schemes, alerts, admin tools, and multilingual support. Built with React, TypeScript, Express, MongoDB, Gemini AI, JWT, Socket.IO, and Nodemailer."
              ghLink="https://github.com/BUSANAMONI-PAVAN/Smart-Agriculture-Assistant.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bankmanagement}
              isBlog={false}
              title="Bank Management System"
              description="A comprehensive bank management system with account creation, fund transfers, balance enquiry, and transaction history. Built using HTML, JavaScript for the frontend, and MySQL for secure data management."
              ghLink="https://github.com/BUSANAMONI-PAVAN"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
