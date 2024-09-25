const express = require('express');
const router = express.Router();
const FormData = require('../models/formdata'); // Import the FormData model

// Save form data route
router.post('/save-data', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Get saved form data route based on email
router.get('/saved-data', async (req, res) => {
    try {
        const email = req.query.email; // Get the email parameter from query string

        if (!email) {
            return res.status(400).json({ message: 'Email query parameter is required' });
        }

        // Find data based on the email parameter
        const data = await FormData.find({ email: email });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found for this email' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Error retrieving data' });
    }
});

module.exports = router;
