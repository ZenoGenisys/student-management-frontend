import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={2} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Dashboard Page
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
