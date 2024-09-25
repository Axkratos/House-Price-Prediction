import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: '#f8f9fa' }} className='text-center text-dark'>
      <MDBContainer className='p-4'>
        <h5 className='text-uppercase mb-4'>Connect with Us</h5>
        <div className='d-flex justify-content-center mb-4'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#4A90E2' }} // Primary Color
            href='https://www.facebook.com'
            role='button'
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55E3C2' }} // Secondary Color
            href='https://www.twitter.com'
            role='button'
          >
            <FontAwesomeIcon icon={faTwitter} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#D0021B' }} // Accent Color
            href='https://www.google.com'
            role='button'
          >
            <FontAwesomeIcon icon={faGoogle} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#50E3C2' }} // Secondary Color
            href='https://www.instagram.com'
            role='button'
          >
            <FontAwesomeIcon icon={faInstagram} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#4A90E2' }} // Primary Color
            href='https://www.linkedin.com'
            role='button'
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }} // Neutral Color
            href='https://www.github.com'
            role='button'
          >
            <FontAwesomeIcon icon={faGithub} />
          </MDBBtn>
        </div>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#e0e0e0' }}>
        <p className="mb-0">© {new Date().getFullYear()} Adevi. All rights reserved.</p>
      </div>
    </MDBFooter>
  );
}
