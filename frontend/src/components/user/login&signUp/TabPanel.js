import React from 'react';
import { Box, Fade } from '@mui/material';
import PropTypes from 'prop-types';
import './SwitchTabs.css'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div 
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Fade in={value === index}>
        <Box p={3}>
          <p>{children}</p>
        </Box>
      </Fade>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;