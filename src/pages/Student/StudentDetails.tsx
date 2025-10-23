import Box from '@mui/material/Box';
import { HeaderDetails, StudentDetailsLayout } from '../../layouts';
import { useStudentDetails } from '../../hooks';

const StudentDetails = () => {
  const { data, tabValue, handleEdit, handleTabChange } = useStudentDetails();
  return (
    <Box display="flex" flexDirection="column">
      <HeaderDetails
        title="Student Details"
        editLabel="Edit Student"
        isStaff={false}
        onClickEdit={handleEdit}
      />
      {data && (
        <StudentDetailsLayout data={data} tabValue={tabValue} handleTabChange={handleTabChange} />
      )}
    </Box>
  );
};

export default StudentDetails;
