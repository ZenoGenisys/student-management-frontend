import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard Page
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
