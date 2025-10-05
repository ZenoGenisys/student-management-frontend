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

type DeleteConfirmationProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const DeleteConfirmation = ({ open, onClose, onConfirm }: DeleteConfirmationProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title" variant="h5">
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description" variant="body1">
          Are you sure you want to delete this record. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="outlined" color="error">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteConfirmation;
