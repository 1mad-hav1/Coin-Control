import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Typography, Grid, Paper, TextField,IconButton} from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './Single.css';
import './Profilepage.css';


const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

const Profilepage = () => {
  const [user, setUser] = useState({
    name: '',
    userName: '',
    dob: '',
    place: '',
    age: '',
    education: '',
    email: '',
    phoneNumber: ''
  });
  const [userid, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userResponse = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();
      setUserId(userData.username);

      const userDetailsResponse = await fetch(`/api/user/${userData.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!userDetailsResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetailsData = await userDetailsResponse.json();
      setUser(userDetailsData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserProfile = async () => {
    try {
      const response = await fetch(`/api/user/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      alert('User profile updated successfully');
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextFieldChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className='Profilepage'>

              <IconButton><Link to={"/home"}><HomeIcon fontSize="large" color="action" />
              </ Link>
              </IconButton>
              <IconButton onClick={e=>{alert("Logging out");}}><Link to={"/"}><LogoutIcon fontSize="large" color="action" /></ Link>
              </IconButton>
            <Grid container justifyContent="center" spacing={2} alignItems="center" >
          <Grid item xs={12} md={6}>
              <ProfilePaper className='Profile' elevation={3} style={{ backgroundColor: '#6c757d ' }}>
                      <Grid item>
                          <ProfileAvatar alt="Profile Picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7txNZdQjTR4hNdkAOC_BWFEqFLo0jQfOuq1lusXcFaA&usqp=CAU&ec=48665699.png" />
                      </Grid>
                      <Grid item>
                      
                          <Typography variant="body1" gutterBottom>
                          <i class="fa-solid fa-user fa-xl"></i>
                                  <TextField
                                  
                                 label="Name:"
                                  name="name"
                                  value={user.name}
                                  inputProps={{
                                    style: {
                                      color: 'white',
                                    },
                                  }}
                                  onChange={handleTextFieldChange}
                                      variant="standard" />
                              
                                  
                            <br/><br/>
                          </Typography>
                          
                          <Typography variant="subtitle1" gutterBottom>
                          <i class="fa-solid fa-location-dot fa-xl"></i>
                                  <TextField
                                      variant='standard'
                                      label="Place:"
                                      name="place"
                                      value={user.place}
                                      inputProps={{
                                        style: {
                                          color: 'white',
                                        },
                                      }}
                                      onChange={handleTextFieldChange} />
                                
                                  
                                <br/><br/>
                          </Typography>

                          
                          <Typography variant="body1" >

                          <i class="fa-solid fa-hat-cowboy fa-xl"></i>
                                <TextField
                                    variant='standard'
                                    label="Username:"
                                    name="userName"
                                    value={user.userName}
                                    inputProps={{
                                      style: {
                                        color: 'white',
                                      },
                                    }}
                                    onChange={handleTextFieldChange} />
                              

                              <br/><br/>
                        </Typography>



                        <Typography variant="body1">

                        <i class="fa-solid fa-baby-carriage fa-xl"></i>
                                <TextField
                                    variant='standard'
                                    label="DOB:"
                                    name="dob"
                                    value={user.dob}
                                    inputProps={{
                                      style: {
                                        color: 'white',
                                      },
                                    }}
                                    onChange={handleTextFieldChange} />
                              

                              <br/><br/>
                        </Typography>





                          <Typography variant="body1">
                             <i class="fa-solid fa-rocket fa-xl"></i>
                                  <TextField
                                      variant='standard'
                                       label="Age:"
                                       name="age"
                                       value={user.age}
                                       inputProps={{
                                        style: {
                                          color: 'white',
                                        },
                                      }}
                                       onChange={handleTextFieldChange} />
                                
                          
                                <br/><br/>
                          </Typography>
                          <Typography variant="body1">
                          <i class="fa-solid fa-book fa-xl"></i>
                                  <TextField
                                    variant='standard'
                                  label="Education:"
                                  name="education"
                                  value={user.education}
                                  inputProps={{
                                    style: {
                                      color: 'white',
                                    },
                                  }}
                                  onChange={handleTextFieldChange} />
                               
                                  
                               <br/><br/>
                          </Typography>
                          <Typography variant="body1">
                          <i class="fa-solid fa-envelope fa-xl"></i>
                                  <TextField
                                    variant='standard'
                                  label="Email-ID:"
                                  name="email"
                                  value={user.email}
                                  inputProps={{
                                    style: {
                                      color: 'white',
                                    },
                                  }}
                                  readOnly
                                 />
                                
                                <br/><br/>
                          </Typography>
                          <Typography variant="body1">
                          <i class="fa-solid fa-phone fa-xl"></i>
                                  <TextField
                                   variant='standard'
                                  label="Ph_No:"
                                  name="phoneNumber"
                                  value={user.phoneNumber}
                                  inputProps={{
                                    style: {
                                      color: 'white',
                                    },
                                  }}
                                  onChange={handleTextFieldChange} /> 
                               
                                  

                               <Grid item>
                           
                              <IconButton onClick={updateUserProfile}>
                                  <Typography variant="srOnly">Update</Typography>
                                  <EditIcon />
                              </IconButton>
                          
                      </Grid>



                              
                          </Typography>
                      </Grid>
                      
                  {/* </Grid> */}
              </ProfilePaper>
          </Grid>
      </Grid>


      
    </div>
  );
};

export default Profilepage;
