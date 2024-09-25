import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import bgImage from '/contact.jpeg';

function ContactUs() {
  const handleEmailClick = () => {
    // Redirect to the user's email client
    window.location.href = 'mailto:nabinphuyal29@gmail.com';
  };

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: 'none', lg: 'flex' }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: 'auto', lg: 6 }}
          mr={{ xs: 'auto', lg: 6 }}
        >
          <Box
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <Box
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <Typography variant="h3" color="white">
                Contact Us
              </Typography>
            </Box>
            <Box p={3}>
              <Typography variant="body2" color="text" mb={3}>
                For further questions, including partnership opportunities, please email us at:
              </Typography>
              <Typography 
                variant="body2" 
                color="text" 
                mb={1} 
                sx={{ 
                  cursor: 'pointer', 
                  fontSize: '1.2rem', // Increase font size
                  '&:hover': { 
                    textDecoration: 'underline', 
                    fontSize: '1.5rem' // Increase font size on hover
                  } 
                }} 
                onClick={handleEmailClick} // Handle click event
              >
                <strong>Email:</strong> nabinphuyal29@gmail.com
              </Typography>
              <Typography variant="body2" color="text">
                Feel free to reach out to us with any inquiries or concerns you may have!
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactUs;
