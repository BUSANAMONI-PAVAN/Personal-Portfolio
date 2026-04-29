import React from "react";
import { Col, Row } from "react-bootstrap";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import intelliJ from "../../Assets/TechIcons/intellij-idea.svg";
import {
  SiAtlassian,
  SiBitbucket,
  SiDocker,
  SiGithub,
  SiJira,
  SiRender,
  SiSupabase,
  SiTwilio,
  SiVercel,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub fontSize={"24px"} />
        <div className="tech-icons-text">GitHub</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJira fontSize={"24px"} />
        <div className="tech-icons-text">Jira</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiBitbucket fontSize={"24px"} />
        <div className="tech-icons-text">Bitbucket</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker fontSize={"24px"} />
        <div className="tech-icons-text">Docker Hub</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel fontSize={"24px"} />
        <div className="tech-icons-text">Vercel</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiRender fontSize={"24px"} />
        <div className="tech-icons-text">Render</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSupabase fontSize={"24px"} />
        <div className="tech-icons-text">Supabase</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAtlassian fontSize={"24px"} />
        <div className="tech-icons-text">Atlassian</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={vsCode} alt="vsCode" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={intelliJ} alt="eclipse" className="tech-icon-images" />
        <div className="tech-icons-text">Eclipse</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTwilio fontSize={"24px"} />
        <div className="tech-icons-text">Twilio API</div>
      </Col>
    </Row>
  );
}

export default Toolstack;
