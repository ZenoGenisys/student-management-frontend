import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React from 'react';
import { type TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type RevokeConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const RevokeConfirmationModal = ({ open, onClose, onConfirm }: RevokeConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle variant="h5">Confirm Role Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this staff member's role? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RevokeConfirmationModal;
