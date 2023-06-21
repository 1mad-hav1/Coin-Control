
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Sign from './Sign';
import Home from './Home';
import Single from './Single';
import Profilepage from "./Profilepage";
import Dashboard from "./Dashboard";
import Expense from './Expense';
import Bar from './Bar';
import About from './About';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Bar/>} />
          <Route path='/About' element={<About/>}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/home" element={<Home />} />
          <Route path="/single" element={<Single />} />
          <Route path='/profilepage' element={<Profilepage/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Expense' element={<Expense />}/>
          <Route path='/Income' element={<Single/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
