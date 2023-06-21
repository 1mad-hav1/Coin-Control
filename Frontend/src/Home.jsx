import { TableBody, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IconButton ,Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css'
const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState('');
  const [editFormData, setEditFormData] = useState({
    username: '',
    income: 0,
    expense: 0
  });

  const getTotal = () => {
    let total = 0;
    expenses?.forEach(e => {
      if(e.expense==null){total+=e.income}
      else if(e.income==null){total-=e.expense}
      else{  total =total +(e.income-e.expense) }
      
    })
    return total;
  };
  const total = getTotal();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense._id === expenseId);
    setEditingExpenseId(expenseId);
    setEditFormData({
      username: expenseToEdit.username,
      income: expenseToEdit.income,
      expense: expenseToEdit.expense
    });
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    axios.put(`/api/expenses/${editingExpenseId}`, editFormData)
      .then(response => {
        console.log('Expense updated successfully:', response.data);
        setEditingExpenseId('');
        setEditFormData({
          username: '',
          income: 0,
          expense: 0
        });
        fetchExpenses(); 
      })
      .catch(error => {
        console.error('Error updating expense:', error);
      });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteClick = (expenseId) => {
    axios.delete(`/api/expenses/${expenseId._id}`)
      .then(response => {
        console.log('Expense deleted successfully:', response.data);
        setExpenses(prevExpenses =>
          prevExpenses.filter(expense => expense._id !== expenseId)
        );
        window.location.reload(); 
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  const handleSaveClick = () => {
    setEditingExpenseId('');
    setEditFormData({
      username: '',
      income: 0,
      expense: 0
    });
    window.location.reload(); 
  };

  return (
 <div className='app1'>
  <div style={{paddingRight:'1350px'}}>
  <p style={{color: "white"}}>Profile<IconButton  edge='start' size='large' aria-label="AccountBoxicon" sx={{ mr: 2 }} >
         <Link to={'/profilepage'}><AccountBoxIcon style={{ color: 'white' }} /></Link>
       </IconButton> </p>
       <section>
      <IconButton style={{ paddingLeft: '1300px' }} edge='start' size='large' aria-label="PersonIcon" sx={{ mr: 2 }}>
      <Link to={'/'}><LogoutIcon style={{ color: 'white' }} /></Link></IconButton>
      </section>
       </div>
        <div className>
          <h1 className="p8">Coin Control</h1>
          <br />
          <h2 className="p9">Total Profit : {total}</h2>
          <div className="">
            <h1 className="p8">Incomes</h1>
            <TableContainer >
              <Table style={{ color: 'black', backgroundColor:'white'}}>
                <TableHead  >
                  <TableRow >
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px "}}>Name</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px"}}>Income</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px"}}>Edit-Income</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px" }}>Delete-Income</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {expenses.map((expense) => (
                    
                    <TableRow key={expense._id}>
                      {expense.income != null ? (<><TableCell  style={{ color: "black"}}>{expense.username}</TableCell>
                      <TableCell  style={{ color: "black"}}>{expense.income}</TableCell>
                      <TableCell>
                        {editingExpenseId === expense._id ? (
                          <form onSubmit={handleUpdateExpense}>
                          <TextField className='p2'
                            type="number"
                            name="income"
                            label="Income"
                            value={editFormData.income}
                            onChange={handleEditFormChange}
                          />
                          <Button type="submit" variant="contained" color="success">Save</Button>
                          <Button variant="contained" color="secondary" onClick={handleSaveClick}>Cancel</Button>
                        </form>
                        ) : (
                          <>
                              <Button variant="contained" color="error" onClick={() => handleEditExpense(expense._id)}>Edit</Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                      <IconButton edge='start' className='p7' size='large' aria-label="DeleteIcon" sx={{ mr: 2 }}onClick={() => handleDeleteClick(expense)}>Delete<DeleteIcon style={{ color: 'black' }} /></IconButton>

                      </TableCell></>): <></>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br/>
            <h1  className="p8">Expenses</h1>
            <TableContainer>
              <Table className='p11' style={{ color: 'black', backgroundColor:'white'}} >
                <TableHead>
                  <TableRow>
                  <TableCell className='p9'style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px, "}}>Name</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px, "}}>Expenses</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px, "}}>Edit-Expense</TableCell>
                    <TableCell style={{color: "black", backgroundColor: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "20px, "}}>Delete-Expense</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense._id}>
                      {expense.expense != null ? (<><TableCell  style={{ color: "black"}}>{expense.username}</TableCell>
                      <TableCell  style={{ color: "black"}}>{expense.expense}</TableCell>
                      <TableCell>
                        {editingExpenseId === expense._id ? (
                          <form onSubmit={handleUpdateExpense}>
                           <TextField className='p2'
                            type="number"
                            name="expense"
                            label="Expense"
                              value={editFormData.expense}
                              onChange={handleEditFormChange}
                            />
                            <Button type="submit" variant="contained" color="success">Save</Button>
                            <Button variant="contained" color="secondary" onClick={handleSaveClick}>Cancel</Button>
                          </form>
                        ) : (
                          <>
                            <Button variant="contained" color="error" onClick={() => handleEditExpense(expense._id)}>Edit</Button>
                            
                          </>
                        )}
                      </TableCell>
                      <IconButton edge='start' className='p7' size='large' aria-label="DeleteIcon" sx={{ mr: 2 }}onClick={() => handleDeleteClick(expense)}>Delete<DeleteIcon style={{ color: 'black' }} /></IconButton>
                      </>): <></>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button variant="contained" color="success">
            <Link to="/single" style={{ color: 'white' }}>ADD</Link>
          </Button>
        </div>
      </div>
  );
};

export default Home;





