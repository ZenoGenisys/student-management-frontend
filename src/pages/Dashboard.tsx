import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import StudentIcon from '../assets/images/student.svg';
import StaffIcon from '../assets/images/staff.svg';
import FeesIcon from '../assets/images/fees.png';
import SalaryIcon from '../assets/images/salary.png';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import RevenueChart from '../components/RevenueChart';
import { SummaryCard } from '../layouts';
import { useAuth } from '../state';
import useDashboard from '../hooks/useDashboard';
import { formatNumberWithCommas } from '../utils';
import FeesPendingList from '../components/FeesPendingList';
import FeesPieChart from '../components/FeesPieChart';

const pendingFeesData = [
  { id: '1', name: 'John Doe', totalAmount: 5000, outstanding: 1500 },
  { id: '2', name: 'Jane Smith', totalAmount: 4500, outstanding: 500 },
  { id: '3', name: 'Peter Jones', totalAmount: 6000, outstanding: 2000 },
  { id: '4', name: 'Mary Johnson', totalAmount: 5500, outstanding: 1000 },
  { id: '5', name: 'David Williams', totalAmount: 4800, outstanding: 800 },
  { id: '6', name: 'Emily Brown', totalAmount: 5200, outstanding: 1200 },
];

const Dashboard: React.FC = () => {
  const { name } = useAuth();
  const { dashboardSummary } = useDashboard();
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
              Welcome Back, {name}
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
          <SummaryCard
            title="Total Students"
            showContent={showContent}
            icon={StudentIcon}
            activeCount={dashboardSummary?.student?.active ?? 0}
            inactiveCount={dashboardSummary?.student?.inactive ?? 0}
            totalCount={dashboardSummary?.student?.total ?? 0}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <SummaryCard
            title="Total Staffs"
            showContent={showContent}
            icon={StaffIcon}
            activeCount={dashboardSummary?.staff?.active ?? 0}
            inactiveCount={dashboardSummary?.staff?.inactive ?? 0}
            totalCount={dashboardSummary?.staff?.total ?? 0}
          />
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
                  ₹ {formatNumberWithCommas(dashboardSummary?.fees?.totalIncome)}
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
                  ₹ {formatNumberWithCommas(dashboardSummary?.fees?.currentMonthIncome)}
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
                  ₹ 8,500
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
                  ₹ 6,500
                </Typography>
              </Box>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Typography variant="body1" color="text.secondary">
                  Unpaid:
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ paddingLeft: '5px' }}>
                  ₹ 2,000
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
          size={{ xs: 12, md: 12, lg: 6, xl: 6 }}
          sx={(theme) => ({
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.2s',
            [theme.breakpoints.up('lg')]: { height: '450px' },
          })}
        >
          <FeesPieChart />
        </Grid>

        <Grid
          size={{ xs: 12, md: 12, lg: 6, xl: 6 }}
          sx={(theme) => ({
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-in-out',
            transitionDelay: '1.2s',
            [theme.breakpoints.up('lg')]: { height: '450px' },
          })}
        >
          <Card
            sx={(theme) => ({
              height: '100%',
              [theme.breakpoints.down('lg')]: { height: 'auto' },
            })}
          >
            <CardHeader title={<Typography variant="h5">Fees Pending</Typography>} />
            <CardContent
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                borderTop: `1px solid ${theme.palette.divider}`,
                height: 'calc(100% - 64px)',
                [theme.breakpoints.down('lg')]: { height: 'auto' },
                [theme.breakpoints.up('lg')]: { overflowY: 'auto' },
              })}
            >
              <FeesPendingList data={pendingFeesData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
