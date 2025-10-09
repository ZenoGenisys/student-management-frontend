import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
import { useEffect, useState } from 'react';
import { type StaffSalaryType } from '../../types';
import dayjs from 'dayjs';

interface AddSalaryModalProps {
  open: boolean;
  onClose: () => void;
  editData?: StaffSalaryType | null;
  onSave: (data: any) => void;
}

const AddSalaryModal = ({ open, onClose, editData, onSave }: AddSalaryModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [salaryFor, setSalaryFor] = useState<dayjs.Dayjs | null>(null);
  const [paymentDate, setPaymentDate] = useState<dayjs.Dayjs | null>(null);
  const [netSalary, setNetSalary] = useState('');

  useEffect(() => {
    if (editData) {
      setPaymentMethod(editData.mode);
      setSalaryFor(dayjs(editData.salaryFor));
      setPaymentDate(dayjs(editData.date));
      setNetSalary(editData.amount.toString());
    } else {
      setPaymentMethod('');
      setSalaryFor(null);
      setPaymentDate(null);
      setNetSalary('');
    }
  }, [editData]);

  const handleChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value);
  };

  const handleSave = () => {
    onSave({
      mode: paymentMethod,
      salaryFor: salaryFor?.format('YYYY-MM'),
      date: paymentDate?.format('YYYY-MM-DD'),
      amount: Number(netSalary),
      ...(editData && { feesId: editData.feesId }),
    });
  };

  const handleCancel = () => {
    setPaymentMethod('');
    setSalaryFor(null);
    setPaymentDate(null);
    setNetSalary('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editData ? 'Edit Salary' : 'Add Salary'}</DialogTitle>
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
                value={salaryFor}
                onChange={(newValue) => setSalaryFor(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Payment Method
            </Typography>
            <FormControl fullWidth>
              <Select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value={'Cash'}>Cash</MenuItem>
                <MenuItem value={'Online'}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Net Salary
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={netSalary}
              onChange={(e) => setNetSalary(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4}}>
            <Typography mb={1} variant="h6">
              Payment Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%' }}
                slotProps={{ textField: { size: 'small' } }}
                value={paymentDate}
                onChange={(newValue) => setPaymentDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSalaryModal;