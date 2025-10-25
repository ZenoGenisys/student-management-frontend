import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Search } from '../../components';
import Button from '@mui/material/Button';

type AttendanceLayoutProps = {
  children: React.ReactNode;
  entity: 'STAFF' | 'STUDENT';
  search?: string;
  disableDelete: boolean;
  disableEdit: boolean;
  handleSearch: (value: string) => void;
  onClickAdd: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

const AttendanceLayout = ({
  entity,
  search,
  children,
  disableDelete,
  disableEdit,
  handleSearch,
  onClickAdd,
  onClickEdit,
  onClickDelete,
}: AttendanceLayoutProps) => {
  return (
    <Box mb={2}>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography variant="h5" gutterBottom>
          {entity === 'STAFF' ? 'Staff' : 'Student'} Attendance
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Search search={search} onChange={handleSearch} />
          <Button onClick={onClickAdd}>Add</Button>
          <Button disabled={disableEdit} onClick={onClickEdit}>
            Edit
          </Button>
          <Button disabled={disableDelete} onClick={onClickDelete}>
            Delete
          </Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default AttendanceLayout;
