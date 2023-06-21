import { IconButton } from '@mui/material';
import {Link} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import './styles.css'
import './Bar.css'
import './App.css';

const Bar = () => {
  return (
    <div className='p2'>
        <h1 className='p2'style={{fontSize: "35px"  }}>Coin Control</h1>
        <div style={{paddingLeft:'1380px'}}>
        <IconButton  edge='start' size='large' aria-label="PersonIcon" sx={{ mr: 2 }} >
         <Link to={'/Login'}><PersonIcon style={{ color: 'white' }} /></Link>
       </IconButton>
        </div>
      <section className='p3'>
      <h2 className='p2'style={{fontSize: "25px"  }}>About Us</h2>
      <p className='p2'>Welcome to our website! We are a team of individuals dedicated to provide you financial services.</p>
      <p className='p2'>Here's some more information about us and what we do.<Link to={'/About'}>Learn More</Link></p>
      <p></p>
    </section>
    </div>
    
  );
}
export default Bar;
