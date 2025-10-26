import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Card,
} from '@mui/material';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import StudentIcon from '../assets/images/student.svg';
import StaffIcon from '../assets/images/staff.svg';
import FeesIcon from '../assets/images/fees.png';
import SalaryIcon from '../assets/images/salary.png';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import RevenueChart from '../components/RevenueChart';
import FeesPending from '../components/FeesPending';

const Dashboard: React.FC = () => {
  const [showBackground, setShowBackground] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    // First fade in the background
    setShowBackground(true);

    // Then fade in the content after background is visible
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 600);

    return () => clearTimeout(contentTimer);
  }, []);

  return (
    <>
      {/* Background fade in layer */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'background.default',
          opacity: showBackground ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          zIndex: -1,
        }}
      />

      {/* Content container with fade in */}
      <Box
        sx={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-in-out',
        }}
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
            startIcon={<CloudDownloadOutlinedIcon />}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          marginBottom: '20px',
          backgroundColor: '#202C4B !important',
          border: '1px solid #202C4B !important',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-in-out',
          transitionDelay: '0.2s',
        }}
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
          <Card
            elevation={2}
            sx={{
              p: 2,
              maxWidth: '100%',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.4s',
            }}
          >
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
                  style={{ width: '90%', height: 'auto' }}
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
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Card
            elevation={2}
            sx={{
              p: 2,
              maxWidth: '100%',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.6s',
            }}
          >
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
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Card
            elevation={2}
            sx={{
              p: 2,
              maxWidth: '100%',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.6s',
            }}
          >
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
                <img src={FeesIcon} alt="fees" style={{ width: '80%', height: 'auto' }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  8,500
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fees to be collected
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
                  Collected:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  6,500
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Pending:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  2,000
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Card
            elevation={2}
            sx={{
              p: 2,
              maxWidth: '100%',
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease-in-out',
              transitionDelay: '0.8s',
            }}
          >
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
                <img src={SalaryIcon} alt="fees" style={{ width: '80%', height: 'auto' }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  8,500
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Salary
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
                  Paid:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  6,500
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Unpaid:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  2,000
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid
          size={{ xs: 12, md: 12, lg: 12, xl: 12 }}
          sx={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.0s',
          }}
        >
          <RevenueChart />
        </Grid>

        <Grid
          size={{ xs: 12, md: 12, lg: 4, xl: 4 }}
          sx={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.2s',
          }}
        >
          <Card>pie chart related to fees</Card>
        </Grid>

        <Grid
          size={{ xs: 12, md: 12, lg: 8, xl: 8 }}
          sx={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.2s',
          }}
        >
          <FeesPending />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
