import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HouseForm = () => {
    const [formData, setFormData] = useState({
        Bedroom: '',
        Bathroom: '',
        Floors: '',
        Year: '',
        RoadWidth: '',
        Area_in_sqft: '',
        Backyard: false,
        Balcony: false,
        Fencing: false,
        Frontyard: false,
        Parking: '',
       
        Jacuzzi: false,
        KidsPlayground: false,
        Lawn: false,
        ModularKitchen: false,
        StoreRoom: false,
        SwimmingPool: false,
        Face: '',
        RoadType: '',
        City: ''
    });

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const faceOptions = [
        'Face_East', 'Face_North', 'Face_North East', 'Face_North West',
        'Face_South', 'Face_South East', 'Face_South West', 'Face_West'
    ];

    const roadTypeOptions = [
        'Road Type_Alley', 'Road Type_Blacktopped', 'Road Type_Concrete',
        'Road Type_Gravelled', 'Road Type_Paved', 'Road Type_Soil Stabilized', 'Road Type_Unknown'
    ];

    const cityOptions = [
        'City_Bhaktapur', 'City_Kathmandu', 'City_Lalitpur'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const navigate=useNavigate()
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            navigate("/signin"); // Redirect to signin page if no email
        }
    }, [navigate]);
    const handleCityChange = (e) => {
        setFormData({
            ...formData,
            City: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowPopup(true);
        setPopupMessage('Please note that this is only a predicted value and not the true price. Calculating...');
    
        const featureNames = [
            'Bedroom', 'Bathroom', 'Floors', 'Year', 'Road Width', 'Area_in_sqft',
            'Backyard', 'Balcony', 'Fencing', 'Frontyard', 'Parking',  
            'Jacuzzi', 'Kids Playground', 'Lawn', 'Modular Kitchen', 'Store Room', 
            'Swimming Pool', 'City_Bhaktapur', 'City_Kathmandu', 'City_Lalitpur', 
            'Face_East', 'Face_North', 'Face_North East', 'Face_North West', 
            'Face_South', 'Face_South East', 'Face_South West', 'Face_West',
            'Parking_0', 'Parking_1', 'Road Type_ Alley', 'Road Type_ Blacktopped', 
            'Road Type_ Concrete', 'Road Type_ Gravelled', 'Road Type_ Paved', 
            'Road Type_ Soil Stabilized', 'Road Type_Unknown'
        ];
    
        const featuresArray = new Array(featureNames.length).fill(0);
    
        featuresArray[featureNames.indexOf('Bedroom')] = parseInt(formData.Bedroom) || 0;
        featuresArray[featureNames.indexOf('Bathroom')] = parseInt(formData.Bathroom) || 0;
        featuresArray[featureNames.indexOf('Floors')] = parseInt(formData.Floors) || 0;
        featuresArray[featureNames.indexOf('Year')] = parseInt(formData.Year) || 0;
        featuresArray[featureNames.indexOf('Road Width')] = parseInt(formData.RoadWidth) || 0;
        featuresArray[featureNames.indexOf('Area_in_sqft')] = parseInt(formData.Area_in_sqft) || 0;
        featuresArray[featureNames.indexOf('Backyard')] = formData.Backyard ? 1 : 0;
        featuresArray[featureNames.indexOf('Balcony')] = formData.Balcony ? 1 : 0;
        featuresArray[featureNames.indexOf('Fencing')] = formData.Fencing ? 1 : 0;
        featuresArray[featureNames.indexOf('Frontyard')] = formData.Frontyard ? 1 : 0;
        featuresArray[featureNames.indexOf('Parking')] = formData.Parking === 'Type0' ? 1 : (formData.Parking === 'Type1' ? 1 : 0);
        
        featuresArray[featureNames.indexOf('Jacuzzi')] = formData.Jacuzzi ? 1 : 0;
        featuresArray[featureNames.indexOf('Kids Playground')] = formData.KidsPlayground ? 1 : 0;
        featuresArray[featureNames.indexOf('Lawn')] = formData.Lawn ? 1 : 0;
        featuresArray[featureNames.indexOf('Modular Kitchen')] = formData.ModularKitchen ? 1 : 0;
        featuresArray[featureNames.indexOf('Store Room')] = formData.StoreRoom ? 1 : 0;
        featuresArray[featureNames.indexOf('Swimming Pool')] = formData.SwimmingPool ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Bhaktapur')] = formData.City === 'City_Bhaktapur' ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Kathmandu')] = formData.City === 'City_Kathmandu' ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Lalitpur')] = formData.City === 'City_Lalitpur' ? 1 : 0;
    
        faceOptions.forEach(option => {
            featuresArray[featureNames.indexOf(option)] = option === formData.Face ? 1 : 0;
        });
    
        roadTypeOptions.forEach(option => {
            featuresArray[featureNames.indexOf(option)] = option === formData.RoadType ? 1 : 0;
        });
    
        if (featuresArray.length !== featureNames.length) {
            console.error(`Feature length mismatch: Expected ${featureNames.length}, got ${featuresArray.length}`);
            setLoading(false);
            return;
        }
        const email = localStorage.getItem('email');
    
        try {
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://localhost:5000/api/predict', {
                        feature_names: featureNames,
                        features: featuresArray
                    });
    
                    setPopupMessage(`The predicted price is Rs ${response.data.prediction}`);

                    await sendFormDataToApi({
                        ...formData,
                        email,
                        prediction: response.data.prediction
                    });
                } catch (error) {
                    console.error('Error fetching prediction:', error);
                    setPopupMessage('An error occurred while fetching the prediction.');
                }
                setLoading(false);
            }, 1000); // Simulated delay
        } catch (error) {
            console.error('Error submitting form:', error);
            setPopupMessage('An error occurred while submitting the form.');
            setLoading(false);
        }
    };
    const sendFormDataToApi = async (data) => {
        try {
            await axios.post('http://localhost:4000/api/save-data', data);
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };
    
    
    return (
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          House Information Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: 'Bedroom', name: 'Bedroom' },
              { label: 'Bathroom', name: 'Bathroom' },
              { label: 'Floors', name: 'Floors' },
              { label: 'Year', name: 'Year' },
              { label: 'Road Width (ft)', name: 'RoadWidth' },
              { label: 'Area in sqft', name: 'Area_in_sqft' },
            ].map((field, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  label={field.label}
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            ))}
  
            {/* Select Fields */}
            {[
              { label: 'City', name: 'City', options: cityOptions },
              { label: 'Face', name: 'Face', options: faceOptions },
              { label: 'Road Type', name: 'RoadType', options: roadTypeOptions },
            ].map((selectField, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FormControl fullWidth required>
                  <InputLabel>{selectField.label}</InputLabel>
                  <Select
                    name={selectField.name}
                    value={formData[selectField.name]}
                    onChange={handleChange}
                  >
                    {selectField.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.replace(/_/g, ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
  
            {/* Checkboxes */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                Additional Features
              </Typography>
              {[
                'Backyard',
                'Balcony',
                'Fencing',
                'Frontyard',
                'Jacuzzi',
                'KidsPlayground',
                'Lawn',
                'ModularKitchen',
                'StoreRoom',
                'SwimmingPool',
              ].map((feature, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={feature}
                      checked={formData[feature]}
                      onChange={handleChange}
                    />
                  }
                  label={feature.replace(/([A-Z])/g, ' $1')}
                />
              ))}
            </Grid>
          </Grid>
  
          {/* Submit Button */}
          <Box sx={{ marginTop: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
  
        {/* Snackbar for feedback messages */}
        <Snackbar
          open={showPopup}
          autoHideDuration={6000}
          onClose={() => setShowPopup(false)}
        >
          <Alert
            onClose={() => setShowPopup(false)}
            severity={popupMessage.includes('error') ? 'error' : 'info'}
          >
            {popupMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
  export default HouseForm;
  