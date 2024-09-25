// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users'); // Adjust URL as needed
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleViewHistory = async (email) => {
    console.log('Fetching history for:', email); // Debugging log
    try {
      const response = await axios.get(`http://localhost:4000/api/saved-data?email=${email}`);
      console.log('History response:', response.data); // Debugging log
      if (response.data) {
        setUserHistory(response.data);
        setSelectedUser(email);
        setModalOpen(true);
      } else {
        console.log('No data returned for this email'); // Debugging log
      }
    } catch (err) {
      console.error('Error fetching user history:', err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading users</Typography>;

  return (
    <Box sx={{ padding: 4, maxWidth: 1000, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      {users.length > 0 ? (
        users.map(user => (
          <Box 
            key={user._id} 
            sx={{ 
              backgroundColor: 'background.paper', 
              borderRadius: 1, 
              boxShadow: 3, 
              padding: 2, 
              marginBottom: 2, 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Date:</strong> {new Date(user.date).toLocaleDateString()}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleViewHistory(user.email)}
              sx={{ marginTop: 2 }}
            >
              View History
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleDelete(user._id)}
              sx={{ marginTop: 2 }}
            >
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No users available</Typography>
      )}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="user-history-modal-title"
        aria-describedby="user-history-modal-description"
      >
        <Box sx={{ 
          padding: 4, 
          bgcolor: 'white', 
          borderRadius: 1, 
          maxWidth: 600, 
          margin: 'auto', 
          marginTop: '10%', 
          maxHeight: '80vh',  // Set maximum height
          overflowY: 'auto'   // Enable vertical scroll
        }}>
          <Typography id="user-history-modal-title" variant="h6" component="h2">
            History for {selectedUser}
          </Typography>
          {userHistory.length > 0 ? (
            userHistory.map((historyItem, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>City:</strong> {historyItem.City}
                </Typography>
                <Typography variant="body1">
                  <strong>Bedroom:</strong> {historyItem.Bedroom}
                </Typography>
                <Typography variant="body1">
                  <strong>Bathroom:</strong> {historyItem.Bathroom}
                </Typography>
                <Typography variant="body1">
                  <strong>Floors:</strong> {historyItem.Floors}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {historyItem.Year}
                </Typography>
                <Typography variant="body1">
                  <strong>Area:</strong> {historyItem.Area_in_sqft} Sq. Feet
                </Typography>
                <Typography variant="body1">
                  <strong>Price: Rs </strong> {historyItem.prediction}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No history available for this user</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
