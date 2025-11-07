import React from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent, CardHeader } from '@mui/material';
import StudentIcon from '../assets/images/student.svg';
import StaffIcon from '../assets/images/staff.svg';
import FeesIcon from '../assets/images/fees.png';
import SalaryIcon from '../assets/images/salary.png';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { SummaryCard } from '../layouts';
import { useAuth } from '../state';
import useDashboard from '../hooks/useDashboard';
import { formatNumberWithCommas } from '../utils';
import FeesPendingList from '../components/FeesPendingList';
import FeesPieChart from '../components/FeesPieChart';
import { RevenueChart } from '../components';
import { uploadFiles, type FileUploadItem } from '../repositories/FileUpload';

const Dashboard: React.FC = () => {
  const { name } = useAuth();
  const { dashboardSummary, feesPendingList, onExport, revenueData, showBackground, showContent } =
    useDashboard();
  const [uploading, setUploading] = React.useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      // Prepare files for upload with custom names
      const fileItems: FileUploadItem[] = Array.from(files).map((file, index) => ({
        name: `test-file-${index + 1}`,
        file: file,
      }));

      // Upload files
      const response = await uploadFiles(fileItems, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      });

      console.log('Upload response:', response);
      alert(`Successfully uploaded ${response.successfulUploads} of ${response.totalFiles} files!`);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Check console for details.');
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

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
            startIcon={<CloudUploadOutlinedIcon />}
            component="label"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Test File Upload'}
            <input
              type="file"
              multiple
              hidden
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<CloudDownloadOutlinedIcon />}
            onClick={onExport}
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
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <SummaryCard
            title="Total Students"
            showContent={showContent}
            icon={StudentIcon}
            value={formatNumberWithCommas(dashboardSummary?.student?.total ?? 0)}
            data={{
              Active: formatNumberWithCommas(dashboardSummary?.student?.active ?? 0),
              Inactive: formatNumberWithCommas(dashboardSummary?.student?.inactive ?? 0),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <SummaryCard
            title="Total Staffs"
            showContent={showContent}
            icon={StaffIcon}
            value={formatNumberWithCommas(dashboardSummary?.staff?.total ?? 0)}
            data={{
              'Active:': formatNumberWithCommas(dashboardSummary?.staff?.active ?? 0),
              'Inactive:': formatNumberWithCommas(dashboardSummary?.staff?.inactive ?? 0),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <SummaryCard
            title="Fees to be collected"
            showContent={showContent}
            icon={FeesIcon}
            value={`₹ ${formatNumberWithCommas(dashboardSummary?.fees?.total ?? 0)}`}
            data={{
              'Collected:': `₹ ${formatNumberWithCommas(dashboardSummary?.fees?.collected ?? 0)}`,
              'Pending:': `₹ ${formatNumberWithCommas(dashboardSummary?.fees?.pending ?? 0)}`,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <SummaryCard
            title="Total Income"
            showContent={showContent}
            icon={SalaryIcon}
            value={`₹ ${formatNumberWithCommas(dashboardSummary?.income?.total ?? 0)}`}
            data={{
              'Month:': `₹ ${formatNumberWithCommas(dashboardSummary?.income?.month ?? 0)}`,
              'Year:': `₹ ${formatNumberWithCommas(dashboardSummary?.income?.year ?? 0)}`,
            }}
          />
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
          <RevenueChart revenueData={revenueData?.data ?? []} />
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
          <FeesPieChart
            data={[
              { name: 'Pending', value: dashboardSummary?.fees?.pending ?? 0 },
              { name: 'Collected', value: dashboardSummary?.fees?.collected ?? 0 },
            ]}
          />
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
              <FeesPendingList data={feesPendingList ?? []} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
