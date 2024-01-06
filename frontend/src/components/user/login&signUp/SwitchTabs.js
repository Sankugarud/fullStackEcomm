import React, { useState, lazy, Suspense } from 'react';
import { Tabs, Tab, Paper, Typography, Container } from '@mui/material';
import TabPanel from './TabPanel';
import './SwitchTabs.css'

const LoginForm = lazy(() => import('./Login'));
const RegisterForm = lazy(() => import('./Register'));

const SwitchTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container  component="main" maxWidth="xs">
      <Paper elevation={3} style={{ marginTop: '10px', padding: '20px' }}>
        <Typography variant="h5" align="center">
          Welcome!
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <TabPanel className value={value} index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm />
          </TabPanel>
        </Suspense>
      </Paper>
    </Container>
  );
};

export default SwitchTabs;