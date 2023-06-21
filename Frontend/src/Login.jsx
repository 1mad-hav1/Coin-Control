import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  
  
const EmailChange = (e) => {
  setField1(e.target.value);
  setEmail(e.target.value);
};

const Pass1Change = (event) => {
  setField2(event.target.value);
  setPassword(event.target.value);
};
    const handleLogin = async () => {
    if (field1.trim() === '' || field2.trim() === '') {
      alert('Please fill in all required fields.');
    } 
    else {
      if (email === 'Coincontrol' && password === 'CoinControlAdmin') {
        navigate('/Dashboard');
        alert('Logged in as Admin!');
      }
      else{
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, isBlocked } = data; 

        if (isBlocked) {

          alert("The user is blocked")
          return;
        }
        localStorage.setItem('token', token);
        alert("Signed in successfully");
        navigate('/home');
      } else {
        const data = await response.json();
        console.log('Login failed');
        alert(data.message)
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };
}
}

  return (
    <>
      <div className="login-container">
        <div>
          <h1>Welcome to CoinControl</h1>
          <Box border={1} borderColor="#808080" borderRadius={5} padding={8} sx={{ backgroundColor: 'rgba(128, 128, 128, 1)', color: '#000000' }} style={{ width: '350px' }}>
            <h2 style={{ color: '#FFFFFF' }}>Login</h2>
            <TextField
              variant="filled" label="E-mail" sx={{
                width: '100%', color: '#FFFFFF', '& label': { color: 'rgba(255, 255, 255, 0.8)', }
              }} value={email} onChange={EmailChange} required />
            <br />
            <br />
            <TextField variant="filled" type="password" label="Password" sx={{
              width: '100%', color: '#FFFFFF', '& label': { color: 'rgba(255, 255, 255, 0.8)', }
            }}
              value={password} onChange={Pass1Change} required />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
              <Button id="bt" variant="contained" color="success" onClick={handleLogin}>
                Login
              </Button>

            </div>
            <br />

            <div style={{ textAlign: 'left' }}>
              <Typography sx={{ color: '#00008B' }}>
                Don't have an account?
                <Link to="/sign" style={{ color: 'darkblue' }}>
                  Sign Up
                </Link>
              </Typography>
            </div>
            <br /><br />
            <Typography style={{ marginRight: '1000px', color: 'red' }}>*required</Typography>
          </Box>
        </div>
      </div></>
  );
};

export default Login;
