import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this record?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>yes</Button>
        <Button onClick={onClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteConfirmation;
