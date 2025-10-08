import Box from '@mui/material/Box';
import {
  HeaderDetails,
  PromoteModal,
  RevokeConfirmationModal,
  StaffDetailLayout,
} from '../../layouts';
import { useStaffDetails } from '../../hooks';

const StaffDetails = () => {
  const {
    data,
    tabValue,
    showPromote,
    showRevoke,
    handleTabChange,
    handleEdit,
    handlePromote,
    handleToggleRevoke,
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
        onClickRevoke={handleToggleRevoke}
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

      {showRevoke && (
        <RevokeConfirmationModal
          open={showRevoke}
          onClose={handleToggleRevoke}
          onConfirm={handleRevoke}
        />
      )}
    </Box>
  );
};

export default StaffDetails;
