import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Button variant="contained" onClick={() => navigate(PATH.DASHBOARD)}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default PageNotFound;
