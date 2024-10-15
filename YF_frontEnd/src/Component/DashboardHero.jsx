import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { MdSavings } from "react-icons/md";

const DashboardHero = () => {
  return (
    <Row className="mt-3 justify-content-between align-items-center gap-3 ">
      <Col>
        <div className=" text-warning fw-bolder fw-5 fs-3 ">Summary</div>
      </Col>

      <Col>
        <Card className="d-flex justify-content-center p-2 bg-dark text-info">
          <div className="text-center ">Income</div>
          <div className="d-flex  gap-2 justify-content-center align-items-center ">
            <div className="text-warning d-flex justify-content-center ">
              <GiReceiveMoney className="reactDashboarSummaryICONS" />
            </div>
            <div className="text-success ">amount</div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card className="d-flex justify-content-center p-2 bg-dark text-info">
          <div className="text-center ">Expense</div>
          <div className="d-flex  gap-2 justify-content-center align-items-center ">
            <div className="text-warning d-flex justify-content-center ">
              <GiPayMoney className="reactDashboarSummaryICONS" />
            </div>
            <div className="text-danger ">amount</div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card className="d-flex justify-content-center p-2 bg-dark text-info">
          <div className="text-center ">Savings</div>
          <div className="d-flex  gap-2 justify-content-center align-items-center ">
            <div className="text-warning d-flex justify-content-center ">
              <MdSavings className="reactDashboarSummaryICONS" />
            </div>
            <div className="text-success ">amount</div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardHero;
