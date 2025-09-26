import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { getStaffById } from '../../repositories/StaffRepository';
import {
  StaffAcademicTab,
  StaffAttendanceTab,
  StaffSalaryTab,
  StaffDetailsTab,
  StaffContactDetails,
} from '../../components';
import { getAvatarProps } from '../../utils/avatar';

const StaffDetails: React.FC = () => {
  const theme = useTheme();
  const { staffId } = useParams<{ staffId: string }>();
  const [staff, setStaff] = useState<any>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (staffId) {
      getStaffById(staffId).then(setStaff).catch(console.error);
    }
  }, [staffId]);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {/* Header */}
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
          Staff Details
        </Typography>
        <Box display={'flex'} gap={2}>
          <Button variant="outlined" color="primary" size="large" startIcon={<EditOutlinedIcon />}>
            Edit Staff
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

      {/* Main Content */}
      <Grid container spacing={2} width="100%">
        {/* Left Side - Student Info */}
        <Grid size={{ xs: 12, md: 3, lg: 3, xl: 3 }}>
          {/* Basic details */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={'flex-start'}
                gap={2}
              >
                <Avatar
                  src=""
                  {...getAvatarProps(`${staff?.name}`, { width: 80, height: 80 })}
                  variant="square"
                />
                <Box>
                  <Typography variant="h4" mb={1}>
                    {staff?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      staff?.status === 'Active'
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                      backgroundColor:
                        staff?.status === 'Active'
                          ? theme.palette.success.light
                          : theme.palette.error.light,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      width: 'fit-content',
                    }}
                  >
                    {staff?.status}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" mb={2}>
                Basic Information
              </Typography>
              <Box>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Staff Id:</b>
                  </Grid>
                  <Grid size={6}>{staff?.staffId}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Gender:</b>
                  </Grid>
                  <Grid size={6}>{staff?.gender}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Date of Birth:</b>
                  </Grid>
                  <Grid size={6}>
                    {staff?.dateOfBirth?.split('-').reverse().join('-')}
                  </Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Age:</b>
                  </Grid>
                  <Grid size={6}>{staff?.age}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Marital Status:</b>
                  </Grid>
                  <Grid size={6}>{staff?.maritalStatus}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Date of Joining:</b>
                  </Grid>
                  <Grid size={6}>
                    {staff?.joiningDate?.split('-').reverse().join('-')}
                  </Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Blood Group:</b>
                  </Grid>
                  <Grid size={6}>{staff?.bloodGroup}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Qualification:</b>
                  </Grid>
                  <Grid size={6}>{staff?.qualification}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Learning Level:</b>
                  </Grid>
                  <Grid size={6}>{staff?.level}</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Experience:</b>
                  </Grid>
                  <Grid size={6}>{staff?.experience} Years</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Center:</b>
                  </Grid>
                  <Grid size={6}>{staff?.center}</Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          {/* Primary Contact details */}
          <StaffContactDetails contactNumber={staff?.contactNumber} email={staff?.email} />
        </Grid>

        {/* Right Side - Tabs and Content */}
        <Grid size={{ xs: 12, md: 9, lg: 9, xl: 9 }}>
          <Box display="flex" flexDirection="column" width="100%">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab
                icon={<SchoolOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Staff Details"
              />
              <Tab
                icon={<EventNoteOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Attendance"
              />
              <Tab
                icon={<PaidOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Salary"
              />
              <Tab
                icon={<LocalLibraryOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Academic Details"
              />
            </Tabs>

            {/* Tab 1 Details */}
            {tabValue === 0 && <StaffDetailsTab address={staff?.address} />}

            {/* Tab 2 Attendance */}
            {tabValue === 1 && <StaffAttendanceTab />}

            {/* Tab 3 Fees */}
            {tabValue === 2 && <StaffSalaryTab />}

            {/* Tab 4 Fees */}
            {tabValue === 3 && <StaffAcademicTab />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDetails;
