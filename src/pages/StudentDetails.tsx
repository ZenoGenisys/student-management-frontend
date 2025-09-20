import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';

const StudentDetails: React.FC = () => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column">
      <Box
        flexGrow={1}
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        paddingLeft={0}
        paddingRight={0}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Student Details
        </Typography>
        <Box display={'flex'} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<EditOutlinedIcon />}
          >
            Edit Student
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SensorOccupiedOutlinedIcon />}
          >
            Promote
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDetails;
