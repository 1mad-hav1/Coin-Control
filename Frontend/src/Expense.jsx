import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { TextField, Button, Box ,IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import'./Expense.css';

const Expense = () => {

    const [expense, setExpense] = useState('');
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
        expense: parseFloat(expense),
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
        <h2>Add Expense Details</h2>
        <br/>
        <h3  style={{ color: 'white' }}>Enter the monthly expense </h3>
        <TextField  variant="filled"
            label="Expense"
            sx={{
              width: '100%',
              color: '#FFFFFF',
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
              '& .MuiFilledInput-input': {
                color: '#FFFFFF',
              },
            }} value={expense} onChange={e => setExpense(e.target.value)}></TextField>
        <br />
        <br />
        <br />
        <Button variant="filled" color="warning" onClick={handleAddClick}>
          <Link style={{ textDecoration: 'none', color: 'white' }}>ADD</Link>
        </Button>
        <Button variant="filled">
          <Link to='/Income'>Income</Link>
        </Button>
      </Box>
    </div>
    </div>
  )
}

export default Expense