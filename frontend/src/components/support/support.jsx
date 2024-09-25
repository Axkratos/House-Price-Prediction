import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Grid, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

// QR Code image path
import qrCodeImage from '/qr-code1.png';

// Styles for the modal
const StyledModal = styled(Modal)({
  '& .MuiModal-paper': {
    maxWidth: '500px',
    width: '80%',
    height: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
});

// Styles for the QR code image
const QRImage = styled('img')({
  width: '100%',
  maxWidth: '350px',
});

// Styles for the donation card
const DonationCard = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
});

// Styles for the close button container
const CloseButtonContainer = styled(Box)({
  position: 'absolute',
  top: '10px', // Adjust to position the button slightly above the QR code
  right: '10px', // Adjust to position the button to the right of the QR code
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  opacity: 0.8, // Increase opacity for better visibility
});

// Styles for the QR code and close button wrapper
const QRWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
});

const SupportPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: '#333' }}>
          Support Our Mission
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: '#555' }}>
          Your contribution helps us advance machine learning research and bring innovative solutions to society. Every donation, big or small, makes a difference. Thank you for your support!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <DonationCard>
              <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                Make a Donation
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                Contribute to our cause and help us drive advancements in machine learning. Your support is invaluable.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Show QR Code
              </Button>
            </DonationCard>
          </Grid>
        </Grid>

        <StyledModal open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', position: 'relative' }}>
            <QRWrapper>
              <QRImage src={qrCodeImage} alt="QR Code" />
              <CloseButtonContainer>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    color: '#333',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '5px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </CloseButtonContainer>
            </QRWrapper>
          </Box>
        </StyledModal>
      </Box>
    </>
  );
};

export default SupportPage;
