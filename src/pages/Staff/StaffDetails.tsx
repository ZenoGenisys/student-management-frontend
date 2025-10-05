import Box from '@mui/material/Box';
import StaffDetailLayout from '../../layouts/StaffDetail';
import { HeaderDetails } from '../../layouts';
import { useStaffDetails } from '../../hooks';

const StaffDetails = () => {
  const { data, tabValue, handleTabChange, handleEdit, handlePromote } = useStaffDetails();

  return (
    <Box display="flex" flexDirection="column">
      {/* Header */}
      <HeaderDetails
        title="Staff Details"
        editLabel="Edit Staff"
        onClickEdit={handleEdit}
        onClickPromote={handlePromote}
      />

      {/* Staff Details Layout */}
      {data && (
        <StaffDetailLayout data={data} tabValue={tabValue} handleTabChange={handleTabChange} />
      )}
    </Box>
  );
};

export default StaffDetails;
