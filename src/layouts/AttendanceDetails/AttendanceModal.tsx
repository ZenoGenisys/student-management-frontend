import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useState, useCallback, useEffect } from 'react';
import { type TransitionProps } from '@mui/material/transitions';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slide,
  type SelectChangeEvent,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type AttendanceModalProps = {
  open: boolean;
  data: string[];
  option: { value: string; label: string }[];
  onClose: () => void;
  onSave: (status: boolean, ids: string[]) => void;
};

type Status = 'Present' | 'Absent';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AttendanceModal = ({ open, option, data, onClose, onSave }: AttendanceModalProps) => {
  const [value, setValue] = useState<Status>('Present');
  const [selectData, setSelectData] = useState<string[]>([]);

  useEffect(() => {
    setSelectData(data);
  }, [data]);

  const handleChange = useCallback((event: SelectChangeEvent<typeof selectData>) => {
    const {
      target: { value },
    } = event;
    setSelectData(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleSave = useCallback(() => {
    onSave(value === 'Present', selectData);
  }, [onSave, value, selectData]);

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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectData}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            renderValue={(selected) =>
              selected
                .map((value) => option.find((opt) => opt.value === value)?.label ?? value)
                .join(', ')
            }
            MenuProps={MenuProps}
          >
            {option.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <Checkbox checked={selectData.includes(item.value)} />
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default AttendanceModal;
