import React from 'react';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './Aboutstyle.css';  
import { Link } from 'react-router-dom';
import './Bar1.css'
const About=()=> {
    return (
        <div className='Bar1'>
          <div className='p2'>
        <h1 className='p2'style={{fontSize: "25px"  }}>Coin Control</h1>
        </div>
        <div style={{paddingRight:'1300px'}}>
        <IconButton  edge='start' size='large' aria-label="PersonIcon" sx={{ mr: 2 }} >
                <Link to={'/'}><LogoutIcon style={{ color: 'white' }} /></Link></IconButton>
        </div>    
      <h2 className='p9' >Overview</h2>
     
      <p className='p2' >This website aims to provide information about Financial services and serve as a platform for users to interact with our AI Expense and Income Tracker.<p></p>Discover the power and convenience of our website, designed to simplify your experience with our brand.</p>
      <p className='p2' >At our website, we strive to deliver a seamless online experience to our users.Feel free to explore the various sections and features of the website to learn more about what we offer.</p>
      <br />
      <div className="collaborators">
        <h2 className='p9' >Our Collaborators</h2>
        <div className="collaborator">
        <img className='collaboratorimg' src="/Karthi.jpg" alt="Collaborator 1" />
          <p className='p2'>Karthik Dileep</p>
        <div className="collaborator">
          <img className='collaboratorimg' src="/abhi.jpg" alt="Collaborator 1" />
          <p className='p2'>Abhimanyu R</p>
        <div className="collaborator">
        <img className='collaboratorimg' src="/madhu.jpg" alt="Collaborator 1" />
          <p className='p2'>Madhav Vijayan</p>
        </div>
        <div className="collaborator">
        <img className='collaboratorimg' src="/jaisappi.jpg" alt="Collaborator 1" />
          <p className='p2'>Austle Jaison</p>
          <div className="collaborator">
        <img className='collaboratorimg' src="/sui.jpg" alt="Collaborator 1" />
          <p className='p2'>Steve Abraham Wilson</p>
        </div>
      </div>
    </div>
</div>
</div>
<br />
<p className='p2' >Isn't it Wonderful that something as small as</p>
<p className='p2' >the flutter of a butterfly's wing can ultimately</p>
<p className='p2' >cause a typhoon halfway around the world!</p>
<p className='p2' >-Chaos Thoery</p>
</div>
    );
}
export default About;
      