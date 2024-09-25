import React from 'react';
import houseImage from '/hero.jpg'; // Replace with a relevant house image
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import './Landing.css'; // Ensure this file includes the new styles

function Firstrow() {
  return (
    <div className="firstrowcontainer">
      <div
        className="firstrow"
        style={{
          backgroundImage: `url(${houseImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#ffffff', // White text for visibility
        }}
      >
        <Container>
          <h1>House Price Prediction AI</h1>
          <p className="description">
            Utilize our advanced AI model to get accurate house price predictions based on your inputs. 
            Try it now!
          </p>
          <Button
            as={NavLink}
            to="/predict"
            style={{
              width: '200px',
              height: '50px',
              fontSize: '20px',
              background: '#2e8b57',
              border: 'none',
            }}
          >
            Predict
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Firstrow;
