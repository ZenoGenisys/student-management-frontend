import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useState, useCallback } from 'react';
import { type TransitionProps } from '@mui/material/transitions';
import { FormControl, FormControlLabel, Radio, RadioGroup, Slide, Typography } from '@mui/material';

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
  onSave: (status: boolean) => void;
  dates: string[] | null;
};

type Status = 'Present' | 'Absent';

const AttendanceDialog = ({ open, onClose, onSave, dates }: AttendanceDialogProps) => {
  const [value, setValue] = useState<Status>('Present');

  const handleSave = useCallback(() => {
    onSave(value === 'Present');
  }, [onSave, value]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="attendance-dialog-title"
      aria-describedby="attendance-dialog-description"
    >
      <DialogTitle id="attendance-dialog-title" variant="h5">
        Attendance
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Date: {dates?.map((d) => d).join(', ')}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="attendance-status"
            name="attendance-status"
            value={value}
            onChange={(_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
              setValue(newValue as Status);
            }}
          >
            <FormControlLabel value={'Present'} control={<Radio />} label="Present" />
            <FormControlLabel value={'Absent'} control={<Radio />} label="Absent" />
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
