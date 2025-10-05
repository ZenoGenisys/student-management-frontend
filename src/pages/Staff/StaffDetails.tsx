import Box from '@mui/material/Box';
import { HeaderDetails, PromoteModal, StaffDetailLayout } from '../../layouts';
import { useStaffDetails } from '../../hooks';

const StaffDetails = () => {
  const {
    data,
    tabValue,
    showPromote,
    handleTabChange,
    handleEdit,
    handlePromote,
    handlePromoteSuccess,
    handleRevoke,
  } = useStaffDetails();

  return (
    <Box display="flex" flexDirection="column">
      {/* Header */}
      <HeaderDetails
        title="Staff Details"
        editLabel="Edit Staff"
        showRevoke={Boolean(data?.role)}
        onClickEdit={handleEdit}
        onClickPromote={handlePromote}
        onClickRevoke={handleRevoke}
      />

      {/* Staff Details Layout */}
      {data && (
        <StaffDetailLayout data={data} tabValue={tabValue} handleTabChange={handleTabChange} />
      )}

      {showPromote && data?.staffId && (
        <PromoteModal
          open={showPromote}
          staffId={data.staffId}
          onClose={handlePromote}
          role={data.role || null}
          onPromoteSuccess={handlePromoteSuccess}
        />
      )}
    </Box>
  );
};

export default StaffDetails;
