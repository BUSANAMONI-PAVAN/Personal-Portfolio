import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import {
  AiOutlineSafetyCertificate,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineBug,
} from "react-icons/ai";
import { SiAmazonaws, SiSalesforce, SiOracle, SiGoogle } from "react-icons/si";

function About() {
  return (
    <>
      {" "}
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I'M</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>

          {/* Certifications Section */}
          <h1 className="project-heading">
            <strong className="purple">Awards & Certifications</strong>
          </h1>

          <div className="cert-group">
            <div className="cert-group-header">
              <span>Global Certificates</span>
              <p>Internationally recognized cloud, AI, and enterprise credentials.</p>
            </div>
            <Row style={{ justifyContent: "center", paddingBottom: "35px" }}>
              <Col xs={12} md={6} lg={4} className="cert-card">
                <div className="cert-image-card aws-image-card">
                  <div className="cert-image-brand">
                    <SiAmazonaws />
                    <span>aws certified</span>
                  </div>
                  <h4>PAVAN BUSANAMONi</h4>
                  <p>AWS Certified Cloud Practitioner</p>
                  <div className="cert-image-footer">
                    <span>Issued: April 19, 2026</span>
                    <span>Expires: April 19, 2029</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4} className="cert-card">
                <div className="cert-image-card salesforce-image-card">
                  <div className="cert-image-brand">
                    <SiSalesforce />
                    <span>salesforce</span>
                  </div>
                  <h4>CERTIFIED</h4>
                  <p>AI Associate</p>
                  <div className="cert-image-footer">
                    <span>PAVAN BUSANAMONi</span>
                    <span>Certification — 2024</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4} className="cert-card">
                <div className="cert-image-card oracle-image-card">
                  <div className="cert-image-brand">
                    <SiOracle />
                    <span>Oracle University</span>
                  </div>
                  <h4>Oracle Certified Associate</h4>
                  <p>Cloud Infrastructure Architect Associate</p>
                  <div className="cert-image-footer">
                    <span>PAVAN BUSANAMONi</span>
                    <span>Architect Associate — 2025</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="cert-group">
            <div className="cert-group-header">
              <span>Internship Certificates</span>
              <p>Verified internship learning programs and applied training certificates.</p>
            </div>
            <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
              <Col xs={12} md={6} lg={4} className="cert-card">
                <div className="cert-image-card google-image-card">
                  <div className="cert-image-brand">
                    <SiGoogle />
                    <span>Google for Developers</span>
                  </div>
                  <h4>Certificate of Virtual Internship</h4>
                  <p>Google Generative AI</p>
                  <div className="cert-image-footer">
                    <span>PAVAN BUSANAMONi</span>
                    <span>AICTE Verified Internship</span>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4} className="cert-card">
                <div className="cert-image-card eduskills-image-card">
                  <div className="cert-image-brand">
                    <AiOutlineSafetyCertificate />
                    <span>EduSkills AP</span>
                  </div>
                  <h4>Certificate of Completion</h4>
                  <p>Short-Term Internship for 120 Hours</p>
                  <div className="cert-image-footer">
                    <span>PAVAN BUSANAMONi</span>
                    <span>Certification</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Experience Section */}
          <h1 className="project-heading">
            <strong className="purple">Experience</strong> Highlights
          </h1>
          <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col xs={12} md={4} className="cert-card">
              <div className="cert-card-view">
                <AiOutlineTool className="cert-icon" />
                <h5>Full-Stack Projects</h5>
                <p>
                  Built multiple full-stack web applications independently using
                  React, Spring Boot, Node.js, and various databases.
                </p>
              </div>
            </Col>
            <Col xs={12} md={4} className="cert-card">
              <div className="cert-card-view">
                <AiOutlineBug className="cert-icon" />
                <h5>Problem Solving</h5>
                <p>
                  Strong problem-solving and debugging skills honed through
                  hands-on projects and coursework in DSA, ML, and AI.
                </p>
              </div>
            </Col>
            <Col xs={12} md={4} className="cert-card">
              <div className="cert-card-view">
                <AiOutlineTeam className="cert-icon" />
                <h5>Team Collaboration</h5>
                <p>
                  Experience working in teams for development, deployment, and
                  project management in academic and personal projects.
                </p>
              </div>
            </Col>
          </Row>

          <h1 className="project-heading">
            Professional <strong className="purple">Skillset </strong>
          </h1>

          <Techstack />

          <h1 className="project-heading">
            <strong className="purple">Tools</strong> I use
          </h1>
          <Toolstack />

          <Github />
        </Container>
      </Container>
    </>
  );
}

export default About;
