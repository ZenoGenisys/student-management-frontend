import React from 'react';
import { Box, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import StudentIcon from '../assets/images/student.svg';
import StaffIcon from '../assets/images/staff.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} justifyContent={'flex-end'} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Add Staff
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={2}
        sx={{ p: 3, backgroundColor: '#202C4B !important', border: '1px solid #202C4B !important' }}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        >
          <Box>
            <Typography variant="h2" color="white">
              Welcome Back, Ajith Kumar
            </Typography>
            <Typography color="white">Have a good day!</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
            <CachedOutlinedIcon sx={{ color: 'white' }} />
            <Typography color="white">Last Checkin: 15 Jun 2025</Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Paper elevation={2} sx={{ p: 2, mt: 3, maxWidth: '100%' }}>
            <Box display={'flex'} alignItems="center" gap={2}>
              <Box
                sx={{
                  backgroundColor: 'primary.lighter',
                  borderRadius: '50%',
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={StudentIcon}
                  alt="Student illustration"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  1,530
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Students
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
            <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Active:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  1,530
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Inactive:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  1,530
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Paper elevation={2} sx={{ p: 2, mt: 3, maxWidth: '100%' }}>
            <Box display={'flex'} alignItems="center" gap={2}>
              <Box
                sx={{
                  backgroundColor: 'primary.lighter',
                  borderRadius: '50%',
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={StaffIcon} alt="Staff" style={{ width: '100%', height: 'auto' }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  500
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Staffs
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
            <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Active:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  350
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Inactive:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  150
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
