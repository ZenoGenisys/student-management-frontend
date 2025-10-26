import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { BasicDetails, AcademicDetails, AddressDetails, AttendanceSection } from '../common';
import type { StaffType } from '../../types';
import { getFormattedDate } from '../../utils';
import StaffSalaryTab from './StaffSalaryTab';

type StaffDetailLayoutProps = {
  data: StaffType;
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const StaffDetailLayout = ({ data, tabValue, handleTabChange }: StaffDetailLayoutProps) => {
  return (
    <Grid container spacing={2} width="100%">
      {/* Left Side - Student Info */}
      <Grid size={{ xs: 12, md: 3, lg: 3, xl: 3 }}>
        {/* Basic details */}
        <BasicDetails
          name={data?.name}
          status={data?.status}
          contactNumber={data?.contactNumber}
          email={data?.email}
          data={{
            'Staff Id': data?.staffId,
            'Email Id': data?.email,
            Gender: data?.gender,
            'Date of Birth': getFormattedDate(data?.dateOfBirth),
            Age: data?.age,
            'Marital Status': data?.maritalStatus,
            'Date of Joining': getFormattedDate(data?.joiningDate),
            'Blood Group': data?.bloodGroup,
            Qualification: data?.qualification,
            'Academic Level': data?.level,
            Experience: `${data?.experience} years`,
            Center: data?.center,
            Role: data?.role ?? '-',
          }}
        />
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
          {tabValue === 0 && (
            <AddressDetails address={data?.address} additionalDetails={data?.additionalDetails} />
          )}

          {/* Tab 2 Attendance */}
          {tabValue === 1 && <AttendanceSection type={'staff'} />}

          {/* Tab 3 Fees */}
          {tabValue === 2 && <StaffSalaryTab />}

          {/* Tab 4 Fees */}
          {tabValue === 3 && <AcademicDetails data={data?.levelDetails} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StaffDetailLayout;
