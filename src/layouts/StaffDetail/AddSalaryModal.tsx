import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Grid,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

interface AddSalaryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSalaryModal = ({ open, onClose }: AddSalaryModalProps) => {
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Salary</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Salary For
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['month', 'year']}
                sx={{ width: '100%' }}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Payment Method
            </Typography>
            <FormControl fullWidth>
              <Select id="paymentMethod" value={paymentMethod} onChange={handleChange} size="small">
                <MenuItem value={'cash'}>Cash</MenuItem>
                <MenuItem value={'online'}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Net Salary
            </Typography>
            <TextField fullWidth size="small" type="number" />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Payment Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ width: '100%' }} slotProps={{ textField: { size: 'small' } }} />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSalaryModal;
