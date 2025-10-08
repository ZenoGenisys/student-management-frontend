import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { type TransitionProps } from '@mui/material/transitions';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type AttendanceDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (status: string) => void;
  attendanceStatus: string | null;
  date: Date | null;
};

const AttendanceDialog = ({
  open,
  onClose,
  onSave,
  attendanceStatus,
  date,
}: AttendanceDialogProps) => {
  const [status, setStatus] = useState(attendanceStatus);

  useEffect(() => {
    setStatus(attendanceStatus);
  }, [attendanceStatus]);

  const handleSave = () => {
    if (status) {
      onSave(status);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="attendance-dialog-title"
      aria-describedby="attendance-dialog-description"
    >
      <DialogTitle id="attendance-dialog-title" variant="h5">
        {attendanceStatus ? 'Edit' : 'Add'} Attendance
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Date: {date?.toLocaleDateString()}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="attendance-status"
            name="attendance-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel value="present" control={<Radio />} label="Present" />
            <FormControlLabel value="absent" control={<Radio />} label="Absent" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceDialog;
