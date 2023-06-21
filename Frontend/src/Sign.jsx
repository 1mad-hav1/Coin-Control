import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Alert, Typography } from '@mui/material';
import './Sign.css';

const Sign = () => {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCPass] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  
const EmailChange = (e) => {
  setField1(e.target.value);
  setEmail(e.target.value);
};

const Pass1Change = (event) => {
  setField2(event.target.value);
  setPassword(event.target.value);

};
const Pass2Change = (event1) => {
  setField3(event1.target.value);
  setCPass(event1.target.value);

};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (field1.trim() === '' || field2.trim() === '' || field3.trim() === '') {
      alert('Please fill in all required fields.');
    } 
    else {
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
        }
        else{
             if (isChecked) {
                if (password !== cpassword) {
                     alert('Password and confirm password must match.');
                 }
                else{
    const userData = {
      name,
      userName,
      dob,
      place,
      age,
      email,
      education,
      phoneNumber,
      password,
    };

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User already exists');
        }
      })
      .then((data) => {
        console.log('User registered:', data);
        alert("Signed Up Successfully")
        navigate('/Login');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setAlertMessage('User already exists');
      });
    }
  }
  else {
    alert('Please accept terms and conditions');
}
        }}
  };
  

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleReset = () => {
    setName('');
    setUsername('');
    setPlace('');
    setDob('');
    setAge('');
    setEmail('');
    setEducation('');
    setPhoneNumber('');
    setIsChecked(false);
    setCPass('');
    setPassword('');
    setAlertMessage('');
  };

  return (
    <div className="sign-container">
      <div  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Box border={1} borderColor="#808080" borderRadius={5} padding={8} sx={{ backgroundColor: 'rgba(128, 128, 128, 1)',color: '#000000',padding: '20px',alignItems: 'center',justifyContent: 'flex-start', width: '100%'}} style={{ width: '500px' }}>   
          <h1 style={{ color: 'white' }}>CoinControl</h1>
          <h2>Sign Up</h2>
          <div style={{ display: 'flex', gap: '50px' }}>
            <p>Name</p>
            <TextField
              variant="filled"
              value={name}
              sx={{width: '100%'}}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '19px' }}>
            <p>Username</p>
            <TextField
              variant="filled"
              sx={{width: '100%'}}
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '46px' }}>
            <p>Email*</p>
            <TextField
              variant="filled"
              type="email"
              sx={{width: '100%'}}
              value={email}
              onChange={EmailChange}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <p>Password*</p>
            <TextField
              variant="filled"
              type="password"
              sx={{width: '100%'}}
              value={password}
              onChange={Pass1Change}
            />
          </div>
          <div style={{ display: 'flex', gap: '0px' }}>
            <p>Confirm Password*</p>
            <TextField
              variant="filled"
              type="password"
              sx={{width: '100%'}}
              value={cpassword}
              onChange={Pass2Change}
            />
            </div>
          <div style={{ display: 'flex', gap: '60px' }}>
            <p>DOB</p>
            <TextField
              variant="filled"
              type='date'
              sx={{width: '100%'}}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '54px' }}>
            <p>Place</p>
            <TextField
              variant="filled"
              sx={{width: '100%'}}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '63px' }}>
            <p>Age</p>
            <TextField
              variant="filled"
              type="number"
              sx={{width: '100%'}}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <p>Education</p>
            <TextField
              variant="filled"
              sx={{width: '100%'}}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '46px' }}>
            <p>Ph.No</p>
            <TextField
              variant="filled"
              sx={{width: '100%'}}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          <br/><br/>
            <div style={{ display: 'flex', justifyContent: 'center' ,gap:'10px'}}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
            <label>I agree to the    </label><span onClick={handleOpenModal} style={{ color: 'blue' , cursor: 'pointer'}}> Terms and Conditions</span>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} contentLabel="Terms and Conditions" style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',},content: {backgroundColor: 'transparent',color:'white',maxWidth: '400px',width: '50%',height: '50%',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',},}}>
              <h2>Terms and Conditions</h2>
              <Typography style={{ color: 'white' }}>
              1. Acceptance of Terms: By using the expense tracker app, users agree to abide by the terms and conditions outlined herein.</Typography>
              <Typography style={{ color: 'white' }}>

2. User Responsibilities: Users are responsible for maintaining the confidentiality of their account credentials and ensuring the accuracy and legality of the information they provide in the app.</Typography>
<Typography style={{ color: 'white' }}>

3. Personal Data: The app may collect and process personal data, such as user names, email addresses, and financial information, solely for the purpose of providing the expense tracking service. The app will handle this data in accordance with applicable data protection laws and its Privacy Policy.</Typography>
<Typography style={{ color: 'white' }}>

4. Accuracy of Information: Users must ensure that all expense data entered into the app is accurate and reliable. The app provider is not responsible for any inaccuracies or errors in the data entered by users.</Typography>
<Typography style={{ color: 'white' }}>

5. Intellectual Property: The app and all associated content, including logos, designs, and trademarks, are the intellectual property of the app provider. Users may not use, copy, or distribute any app content without prior written permission.</Typography>
<Typography style={{ color: 'white' }}>

6. Prohibited Activities: Users shall not engage in any illegal, unauthorized, or harmful activities while using the app. This includes but is not limited to hacking, data manipulation, or any action that disrupts the app's functionality or compromises the security of other users' data.</Typography>
<Typography style={{ color: 'white' }}>

7. Third-Party Services: The app may integrate with third-party services or link to external websites. Users acknowledge that their use of such services or websites is subject to the terms and conditions and privacy policies of those third parties, and the app provider is not responsible for any content or actions of third-party services.</Typography>
<Typography style={{ color: 'white' }}>

8. Limitation of Liability: The app provider shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the app, including any errors or interruptions in its operation.</Typography>
<Typography style={{ color: 'white' }}>
9. Modification of Terms: The app provider reserves the right to modify or update these terms and conditions at any time. Users will be notified of any changes, and continued use of the app after the modifications constitutes acceptance of the revised terms.</Typography>
<Typography style={{ color: 'white' }}>

10. Termination: The app provider may terminate or suspend a user's access to the app at any time, without prior notice, for violation of these terms and conditions or for any other reason deemed necessary.


              </Typography>
              <br/><br/><br/>
              <div style={{ marginTop:'auto' , textAlign: 'center' }}>
              <Button variant='filled' onClick={handleCloseModal}>Close</Button>
              </div>
            </Modal>
            </div>
            <br/>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              SignUp
            </Button>
            <Button variant="contained" color="warning" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <br/>
          <Typography style={{ marginRight: '1000px' , color: 'red'}}>*required</Typography>
          {alertMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {alertMessage}
            </Alert>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Sign;

