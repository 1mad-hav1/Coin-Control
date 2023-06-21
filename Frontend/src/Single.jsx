import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button ,Box, IconButton} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Single.css';
import HomeIcon from '@mui/icons-material/Home';

const Single = () => {
  const [income, setIncome] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = () => {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);
    axios
      .get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('USERNAME FROM SINGLE', response.data.username);
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  };

  const handleAddClick = () => {
    const expenseData = {
      username,
      income: parseFloat(income),
    };
    axios
      .post('/api/expenses', expenseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Expense added successfully:', response.data);
        navigate('/home'); 
      })
      .catch(error => {
        console.error('Error adding expense:', error);
      });
  };
  return (
    <div className="backgroundpic">
    <div className="login-container">
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start',height: '100vh'}}>
    <IconButton style={{ marginRight: '1px', color: "primary" }}><Link to={"/home"}><HomeIcon fontSize="large" color="action" /></ Link></IconButton>
    </div>
    <Box border={1} borderColor="#808080" borderRadius={5} padding={8} sx={{ backgroundColor: 'rgba(128, 128, 128, 1)', color: '#000000' }} style={{ width: '350px' }}>
        <h2>Add Income Details</h2>
        <br/>
        <h3 style={{ color: 'white' }}>Enter the monthly income</h3>
        <TextField  variant="filled"
            label="Income"
            sx={{
              width: '100%',
              color: '#000000',
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
              '& .MuiFilledInput-input': {
                color: '#FFFFFF',
              },
            }} value={income} onChange={e => setIncome(e.target.value)}></TextField>
        <br />
        <br />
        <br />
        <Button variant="filled" onClick={handleAddClick}>
          <Link style={{ textDecoration: 'none', color: 'white' }}>ADD</Link>
        </Button>
        <Button variant="filled">
          <Link to='/Expense' >Expense</Link>
        </Button>
        </Box>
    </div>
    </div>
  );
};

export default Single;
