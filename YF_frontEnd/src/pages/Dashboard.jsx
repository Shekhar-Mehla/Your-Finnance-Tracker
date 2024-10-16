import React from "react";
import { imges } from "../assets/assets.js";
import Quotes from "../Component/Quotes.jsx";
import { Col, Container, Row } from "react-bootstrap";
import DashboardHero from "../Component/DashboardHero.jsx";
import PieCharts from "../Component/PieChart.jsx";

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <DashboardHero className="bg-dark text-muted border-rounded rounded-3 shawod"></DashboardHero>
        </Col>
      </Row>
      <Row>
        <Col>
          <PieCharts></PieCharts>{" "}
        </Col>
        <Col>expense</Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
