import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Tabs, Tab, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './SwitchTabs.css';
import RegisterForm from './Register';
import LoginForm from './Login';

const Register = () => {
    
  const [activeTab, setActiveTab] = useState('login');

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const slideProps = useSpring({
    transform: `translateX(${activeTab === 'login' ? '0%' : '100%'})`,
    config: {
      mass: 1,
      tension: 180,
      friction: 12,
    },
  })
    
  
  return (
    <div className='pagrlogin'>
            <Paper className="switch-tabs-container">
                <Tabs
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, tab) => switchTab(tab)}
                    variant="fullWidth"
                >
                    <Tab value="login" icon={<LockIcon />} label="Login" />
                    <Tab value="register" icon={<PersonAddIcon />} label="Register" />
                </Tabs>
                <animated.div style={slideProps} className="content">
                    {activeTab === 'login' && <LoginForm />}
                    {activeTab === 'register' && <RegisterForm />}
                </animated.div>
                </Paper>
    </div>
    
  );
};




export default Register;
