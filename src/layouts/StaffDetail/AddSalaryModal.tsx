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
  Grid,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback, useEffect } from 'react';
import { type Payment, type StaffSalaryRequest, type StaffSalaryType } from '../../types';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type AddSalaryModalProps = {
  open: boolean;
  onClose: () => void;
  editData?: StaffSalaryType | null;
  onSave: (data: StaffSalaryRequest) => void;
};

const validationSchema = Yup.object({
  salaryFor: Yup.date().required('Salary month is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
  netSalary: Yup.number()
    .typeError('Net salary must be a number')
    .positive('Net salary must be positive')
    .required('Net salary is required'),
  paymentDate: Yup.date().required('Payment date is required'),
});

const AddSalaryModal = ({ open, onClose, editData, onSave }: AddSalaryModalProps) => {
  const {
    values,
    touched,
    errors,
    setValues,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      paymentMethod: '',
      salaryFor: null as dayjs.Dayjs | null,
      paymentDate: null as dayjs.Dayjs | null,
      netSalary: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave({
        mode: values.paymentMethod as Payment,
        salaryMonth: String(values.salaryFor?.format('YYYY-MM')),
        paymentDate: values.paymentDate ? values.paymentDate.toDate() : null,
        amount: Number(values.netSalary),
        ...(editData && { feesId: editData.feesId }),
      });
    },
  });

  useEffect(() => {
    if (editData) {
      setValues({
        paymentMethod: editData.mode || '',
        salaryFor: dayjs(editData.salaryFor) || null,
        paymentDate: dayjs(editData.paymentDate) || null,
        netSalary: editData.amount?.toString() || '',
      });
    } else {
      resetForm();
    }
  }, [editData, setValues, resetForm]);

  const handleCancel = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{editData ? 'Edit Salary' : 'Add Salary'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {/* Salary Month */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Salary For
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month']}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!errors.salaryFor,
                      helperText: errors.salaryFor,
                    },
                  }}
                  value={values.salaryFor}
                  onChange={(newValue) => setFieldValue('salaryFor', newValue)}
                />
              </LocalizationProvider>
            </Grid>

            {/* Payment Method */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Payment Method
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={handleChange}
                  error={!!errors.paymentMethod && touched.paymentMethod}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                </Select>
                {touched.paymentMethod && errors.paymentMethod && (
                  <Typography color="error" variant="caption">
                    {errors.paymentMethod}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Net Salary */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Net Salary
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="netSalary"
                value={values.netSalary}
                onChange={handleChange}
                error={!!errors.netSalary && touched.netSalary}
                helperText={touched.netSalary && errors.netSalary}
              />
            </Grid>

            {/* Payment Date */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Payment Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!errors.paymentDate && touched.paymentDate,
                      helperText: errors.paymentDate && touched.paymentDate,
                    },
                  }}
                  value={values.paymentDate}
                  onChange={(newValue) => setFieldValue('paymentDate', newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSalaryModal;
