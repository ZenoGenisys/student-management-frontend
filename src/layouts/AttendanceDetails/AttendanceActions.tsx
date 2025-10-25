import React from 'react';
import { Box, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface AttendanceActionsProps {
  onClickAdd: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
  disableEdit: boolean;
  disableDelete: boolean;
}

const AttendanceActions: React.FC<AttendanceActionsProps> = ({
  onClickAdd,
  onClickEdit,
  onClickDelete,
  disableEdit,
  disableDelete,
}) => {
  return (
    <Box display="flex" justifyContent={'flex-end'} gap={1} p={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickAdd}
        startIcon={<AddCircleOutlineOutlinedIcon />}
      >
        Add
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClickEdit}
        disabled={disableEdit}
        sx={{
          '&.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.26)',
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
        }}
        startIcon={<EditOutlinedIcon />}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={onClickDelete}
        disabled={disableDelete}
        startIcon={<DeleteOutlineOutlinedIcon />}
      >
        Delete
      </Button>
    </Box>
  );
};

export default AttendanceActions;
