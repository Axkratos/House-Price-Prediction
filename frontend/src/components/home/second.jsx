import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Landing.css";

function Secondrow() {
  return (
    <div className="secondrow">
      <h3 className="text-center ">Why Choose Our House Price Prediction?</h3>
      <Row className="mt-4 ">
        <Col md={3}>
          <div className="cards">
            <p className="card-titles">Accurate Predictions</p>
            <p className="small-desc">
              Our AI model leverages real estate market trends and data to provide highly accurate house price predictions, giving you reliable insights.
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="cards">
            <p className="card-titles">Data-Driven Insights</p>
            <p className="small-desc">
              We use historical data and market trends to help you understand the factors influencing property prices in your area.
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="cards">
            <p className="card-titles">User-Friendly Platform</p>
            <p className="small-desc">
              Our platform is designed to be intuitive and easy to use. Get instant price predictions with just a few clicks, no technical expertise required.
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="cards">
            <p className="card-titles">Market Awareness</p>
            <p className="small-desc">
              Stay ahead of the market by getting regular updates and predictions based on the latest market conditions, ensuring informed decisions.
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Secondrow;
