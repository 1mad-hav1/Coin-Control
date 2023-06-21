import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import './Dashboard.css';
import './styles.css';
import './Bar1.css';
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleDeleteClick = (user) => {
    axios
      .delete(`/api/user/${user._id}`)
      .then((response) => {
        console.log('user deleted successfully:', response.data);
        setUsers((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== user)
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  const handleBlockClick = (userId) => {
    axios
      .put(`/api/user/${userId}/block`)
      .then((response) => {
        console.log('User blocked successfully:', response.data);
        setUsers((prevExpenses) =>
          prevExpenses.map((expense) => {
            if (expense._id === userId) {
              return {
                ...expense,
                isBlocked: true,
              };
            }
            return expense;
          })
        );
      })
      .catch((error) => {
        console.error('Error blocking user:', error);
      });
  };
  const handleUnBlockClick = (userId) => {
    axios
      .put(`/api/user/${userId}/unblock`)
      .then((response) => {
        console.log('User unblocked successfully:', response.data);
        setUsers((prevExpenses) =>
          prevExpenses.map((expense) => {
            if (expense._id === userId) {
              return {
                ...expense,
                isBlocked: false,
              };
            }
            return expense;
          })
        );
      })
      .catch((error) => {
        console.error('Error unblocking user:', error);
      });
  };
  return (
  <><>
    <div>
      <div className="home-container">
        <div className="content">
          <h1 className="p8">Coin Control</h1>
          <div style={{paddingRight:'1300px'}}>
        <IconButton  edge='start' size='large' aria-label="PersonIcon" sx={{ mr: 2 }} >
                <Link to={'/'}><LogoutIcon style={{ color: 'white' }} /></Link></IconButton>
                </div>   
                 </div>
          <div >
          <TableContainer >
                    <Table style={{ color: "black", backgroundColor: "white"}}>  
                        <TableHead className='white'>
                            <TableRow >
                                <TableCell style={{ color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "15px"  }} >E-mail</TableCell>
                                <TableCell style={{ color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "15px"  }}>Block-User</TableCell>
                                <TableCell style={{ color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "15px" }}>Delete-User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                      {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell style={{ color: 'black' }}>{user._id}</TableCell>
                      <TableCell>
                          {user.isBlocked ? (
                            <IconButton edge='start' className='p7' size='large' aria-label="RemoveCircleOutlineIcon" sx={{ mr: 2 }}onClick={() => handleUnBlockClick(user._id)}>
                            UnBlock<RemoveCircleOutlineIcon style={{ color: 'black' }} /></IconButton>
                          ) : (
                           <> 
                            <IconButton edge='start' className='p7' size='large' aria-label="BlockIcon" sx={{ mr: 2 }} onClick={() => handleBlockClick(user._id)}>
                              Block<BlockIcon style={{ color: 'black' }} /></IconButton>
                              </>
                          )}
                          </TableCell>
                          <TableCell >
                          <IconButton edge='start' className='p7' size='large' aria-label="DeleteIcon" sx={{ mr: 2 }} onClick={() => handleDeleteClick(user)} >Delete<DeleteIcon style={{ color: 'black' }} /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      </>
      </>
  );
};
export default Dashboard;
