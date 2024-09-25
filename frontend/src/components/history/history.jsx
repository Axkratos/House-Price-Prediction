// src/components/UserHistoryDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

// Custom Card for displaying data
const DataCard = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));

const UserDataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/saved-data?email=${email}`); // Adjust URL as needed
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (loading) return <CircularProgress />;
    if (error) return <div style={{ color: 'red' }}>Error loading data</div>;

    return (
        <div style={{ padding: '16px', maxWidth: '800px', margin: 'auto' }}>
            <h4 style={{ marginBottom: '16px' }}>Saved User Data</h4>
            <Divider style={{ marginBottom: '16px' }} />
            {data.length > 0 ? (
                data.map((item, index) => (
                    <DataCard key={index}>
                        <h6 style={{ marginBottom: '8px' }}>User Data #{index + 1}</h6>
                        <p><strong>Bedroom:</strong> {item.Bedroom}</p>
                        <p><strong>Bathroom:</strong> {item.Bathroom}</p>
                        <p><strong>Floors:</strong> {item.Floors}</p>
                        <p><strong>Year:</strong> {item.Year}</p>
                        <p><strong>Road Width:</strong> {item.RoadWidth}</p>
                        <p><strong>Area (sqft):</strong> {item.Area_in_sqft}</p>
                        <p><strong>Backyard:</strong> {item.Backyard ? 'Yes' : 'No'}</p>
                        <p><strong>Balcony:</strong> {item.Balcony ? 'Yes' : 'No'}</p>
                        <p><strong>Fencing:</strong> {item.Fencing ? 'Yes' : 'No'}</p>
                        <p><strong>Frontyard:</strong> {item.Frontyard ? 'Yes' : 'No'}</p>
                        <p><strong>Parking:</strong> {item.Parking || 'None'}</p>
                        <p><strong>Jacuzzi:</strong> {item.Jacuzzi ? 'Yes' : 'No'}</p>
                        <p><strong>Kids Playground:</strong> {item.KidsPlayground ? 'Yes' : 'No'}</p>
                        <p><strong>Lawn:</strong> {item.Lawn ? 'Yes' : 'No'}</p>
                        <p><strong>Modular Kitchen:</strong> {item.ModularKitchen ? 'Yes' : 'No'}</p>
                        <p><strong>Store Room:</strong> {item.StoreRoom ? 'Yes' : 'No'}</p>
                        <p><strong>Swimming Pool:</strong> {item.SwimmingPool ? 'Yes' : 'No'}</p>
                        <p><strong>City:</strong> {item.City}</p>
                        <p><strong>Face:</strong> {item.Face}</p>
                        <p><strong>Road Type:</strong> {item.RoadType}</p>
                        <p><strong>Prediction:</strong> {item.prediction}</p>
                    </DataCard>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default UserDataDisplay;
