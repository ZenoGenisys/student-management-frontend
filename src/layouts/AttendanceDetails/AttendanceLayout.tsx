import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Search } from '../../components';

type AttendanceLayoutProps = {
  children: React.ReactNode;
  entity: 'STAFF' | 'STUDENT';
  search?: string;
  handleSearch: (value: string) => void;
};

const AttendanceLayout = ({ entity, search, children, handleSearch }: AttendanceLayoutProps) => {
  return (
    <Box mb={2}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
        gap={2}
      >
        <Typography variant="h5" gutterBottom>
          {entity === 'STAFF' ? 'Staff' : 'Student'} Attendance
        </Typography>
        <Search search={search} onChange={handleSearch} />
      </Box>
      {children}
    </Box>
  );
};

export default AttendanceLayout;
