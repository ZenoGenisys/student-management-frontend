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
import type { Payment, StudentFeesRequest, StudentFeesType } from '../../types';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getOutstandingStudentFees } from '../../repositories';
import { useQuery } from '@tanstack/react-query';

type FeesModalProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  editData?: StudentFeesType | null;
  onSave: (data: StudentFeesRequest) => void;
};

const validationSchema = Yup.object({
  paymentMonth: Yup.date().required('Fees month is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  paymentDate: Yup.date().required('Payment date is required'),
});

const FeesModal = ({ id, open, onClose, editData, onSave }: FeesModalProps) => {
  const {
    values,
    touched,
    errors,
    setValues,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
    setFieldError,
  } = useFormik({
    initialValues: {
      paymentMethod: '',
      paymentMonth: null as dayjs.Dayjs | null,
      paymentDate: null as dayjs.Dayjs | null,
      amount: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      if (Number(formValues.amount) > Number(data?.outstandingAmount ?? 0)) {
        setFieldError('amount', 'Amount cannot be greater than outstanding amount');
        return;
      }

      onSave({
        mode: formValues.paymentMethod as Payment,
        paymentMonth: dayjs(formValues.paymentMonth)?.format('YYYY-MM'),
        paymentDate: formValues.paymentDate ? dayjs(values.paymentDate).format('YYYY-MM-DD') : null,
        amount: Number(formValues.amount),
        ...(editData && { feesId: editData.feesId }),
      });
      resetForm();
    },
  });
  const { data } = useQuery({
    queryKey: ['outstanding-fees', values?.paymentMonth, id, editData?.feesId],
    queryFn: () =>
      getOutstandingStudentFees({
        paymentMonth: values?.paymentMonth?.format('YYYY-MM') ?? '',
        studentId: id,
        feesId: editData?.feesId,
      }),
    enabled: !!values?.paymentMonth,
  });

  useEffect(() => {
    if (editData) {
      setValues({
        paymentMethod: editData.mode || '',
        paymentMonth: dayjs(editData.paymentMonth) || null,
        paymentDate: dayjs(editData.paymentDate) || null,
        amount: editData.amount?.toString() || '',
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
        <DialogTitle>{editData ? 'Edit Fees' : 'Add Fees'}</DialogTitle>
        <DialogContent>
          <Typography>outstanding Amount: {data?.outstandingAmount}</Typography>
          <Typography>Total Amount: {data?.totalAmount}</Typography>
          <Grid container spacing={2} mt={1}>
            {/* payment Month */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Payment Month
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  views={['month', 'year']}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: !!errors.paymentMonth,
                      helperText: errors.paymentMonth,
                    },
                  }}
                  value={values.paymentMonth}
                  onChange={(newValue) => setFieldValue('paymentMonth', newValue)}
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

            {/* Amount */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Amount
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                error={!!errors.amount && touched.amount}
                helperText={touched.amount && errors.amount}
              />
            </Grid>

            {/* Payment Date */}
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
              <Typography mb={1} variant="h6">
                Payment Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
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

export default FeesModal;
