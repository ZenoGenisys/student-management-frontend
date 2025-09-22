import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useStaff } from '../hooks';

const Staff: React.FC = () => {
  useStaff();

  return (
    <Box>
      <Typography variant="h2" mb={3}>
        Staff TODO List
      </Typography>
    </Box>
  );
};

export default Staff;
