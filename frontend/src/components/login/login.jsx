import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
      });
      console.log('Login Successful', response.data);

      // Save email in local storage
      localStorage.setItem('email', email);

      // Handle successful login (e.g., redirect to dashboard)
      window.location.href = '/'; // Redirect using window.location.href
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-light text-dark my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-dark-50 mb-5">Please enter your login and password!</p>

              {error && <p className="text-danger">{error}</p>}

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-dark'
                label='Email address'
                id='formControlLg'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-dark'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className="small mb-3 pb-lg-2">
                <a className="text-dark-50" href="#!">Forgot password?</a>
              </p>
              <MDBBtn outline className='mx-2 px-5' color='primary' size='lg' onClick={handleSignIn}>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account? 
                  <a 
                    onClick={() => (window.location.href = '/signup')} // Use window.location.href for sign-up link
                    className="text-dark-50 fw-bold sign-up-link"
                    style={{ color: 'blue', transition: 'color 0.3s ease', cursor: 'pointer' }} 
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <style jsx>{`
        /* Change logo color */
        .logo {
          color: black;
        }

        /* Options color */
        .option {
          color: blue;
        }

        /* Decrease menu text size */
        .menu-text {
          font-size: 14px; /* Adjust as necessary */
        }

        /* Increase space between menus */
        .menu-item {
          margin: 10px; /* Adjust spacing */
        }

        /* Remove hover effect */
        .menu-item:hover {
          background-color: transparent; /* Disable hover background */
        }

        /* Show hover only on click (use JavaScript if necessary) */
        .menu-item.clicked {
          background-color: lightgrey; /* Example hover color */
        }

        /* Update login card background color */
        .login-card {
          background-color: #f8f9fa; /* Adjust as per your theme */
        }
      `}</style>
    </MDBContainer>
  );
};

export default SignIn;
