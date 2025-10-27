import Grid from '@mui/material/Grid';
import { AcademicDetails, AddressDetails, AttendanceSection, BasicDetails } from '../common';
import type { StudentType } from '../../types';
import { getFormattedDate } from '../../utils';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import StudentFees from './StudentFees';

type StudentDetailsLayoutProps = {
  data: StudentType;
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const StudentDetailsLayout = ({ data, tabValue, handleTabChange }: StudentDetailsLayoutProps) => {
  return (
    <Grid container spacing={2} width="100%">
      {/* Left Side - Student Info */}
      <Grid size={{ xs: 12, md: 3, lg: 3, xl: 3 }}>
        {/* Basic details */}
        <BasicDetails
          name={data?.name}
          status={data?.status}
          contactNumber={data?.primaryContactNumber ?? ''}
          email={data?.email}
          data={{
            'Student Id': data?.studentId,
            'Email Id': data?.email,
            Gender: data?.gender,
            'Date of Birth': getFormattedDate(data?.dateOfBirth),
            Age: data?.age,
            'Date of Joining': getFormattedDate(data?.joiningDate),
            'Blood Group': data?.bloodGroup,
            Grade: data?.grade,
            'School Name': data?.schoolName,
            Batch: data?.batch
              .map((b: string) => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase())
              .join(', '),
            Center: data?.center,
            Type: data?.studentType ?? '',
            Amount: data.amount,
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
              label="Student Details"
            />
            <Tab
              icon={<EventNoteOutlinedIcon fontSize="medium" />}
              iconPosition="start"
              label="Attendance"
            />
            <Tab icon={<PaidOutlinedIcon fontSize="medium" />} iconPosition="start" label="Fees" />
            <Tab
              icon={<LocalLibraryOutlinedIcon fontSize="medium" />}
              iconPosition="start"
              label="Academic Details"
            />
          </Tabs>

          {/* Tab 1 Details */}
          {tabValue === 0 && (
            <AddressDetails
              address={data?.address}
              additionalDetails={data?.additionalDetails}
              parentDetails={{
                'Father Name': data?.parentDetails?.fatherName,
                'Father Phone Number': data?.parentDetails?.fatherPhoneNumber,
                'Father Email': data?.parentDetails?.fatherEmail,
                'Father Occupation': data?.parentDetails?.fatherOccupation,
                'Mother Name': data?.parentDetails?.motherName,
                'Mother Phone Number': data?.parentDetails?.motherPhoneNumber,
                'Mother Email': data?.parentDetails?.motherEmail,
                'Mother Occupation': data?.parentDetails?.motherOccupation,
              }}
            />
          )}

          {/* Tab 2 Attendance */}
          {tabValue === 1 && <AttendanceSection type={'student'} />}

          {/* Tab 3 Fees */}
          {tabValue === 2 && <StudentFees />}

          {/* Tab 4 Academic */}
          {tabValue === 3 && <AcademicDetails data={data?.levelDetails} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudentDetailsLayout;
