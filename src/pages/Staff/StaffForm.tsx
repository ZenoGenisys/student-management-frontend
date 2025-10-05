import {
  Box,
  Typography,
  Button,
  CardHeader,
  Card,
  CardContent,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
  TextField,
  Grid,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createStaff, updateStaff } from '../../repositories/StaffRepository';
import { useStaffDetails } from '../../hooks';
import type { CreateStaff } from '../../types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '../../state';
import { PATH } from '../../routes';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date().nullable().required('Date of Birth is required'),
  bloodGroup: Yup.string().required('Blood Group is required'),
  joiningDate: Yup.date().nullable().required('Joining Date is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  qualification: Yup.string().required('Qualification is required'),
  experience: Yup.string().required('Experience is required'),
  level: Yup.number().required('Level is required'),
  center: Yup.string().required('Center is required'),
  status: Yup.string().required('Status is required'),
  address: Yup.string().required('Address is required'),
});

const StaffForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useStaffDetails();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const initialValues: CreateStaff = useMemo(
    () => ({
      name: data?.name ?? '',
      gender: data?.gender ?? '',
      dateOfBirth: data?.dateOfBirth ? dayjs(data.dateOfBirth) : null,
      bloodGroup: data?.bloodGroup ?? '',
      joiningDate: data?.joiningDate ? dayjs(data.joiningDate) : null,
      contactNumber: data?.contactNumber ?? '',
      email: data?.email ?? '',
      maritalStatus: data?.maritalStatus ?? '',
      qualification: data?.qualification ?? '',
      experience: data?.experience ?? 0,
      level: data?.level ?? 1,
      center: data?.center ?? '',
      status: data?.status ?? 'Active',
      address: data?.address ?? '',
      additionalDetails: data?.additionalDetails ?? '',
    }),
    [data],
  );

  const handleSubmit = useCallback(
    async (values: CreateStaff) => {
      try {
        if (data) {
          await updateStaff({ ...values, staffId: data.staffId });
        } else {
          await createStaff(values);
          navigate(PATH.STAFF);
        }
        showSnackbar({
          message: `Staff ${data ? 'updated' : 'added'} successfully!`,
          severity: 'success',
        });
      } catch (error: unknown) {
        showSnackbar({
          message: (error as Error).message || `Failed to ${data ? 'update' : 'add'} staff.`,
          severity: 'error',
        });
      }
    },
    [data, showSnackbar, navigate],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Header */}
            <Box
              flexGrow={1}
              display={'flex'}
              justifyContent="space-between"
              alignItems="center"
              padding={2}
              paddingLeft={0}
              paddingRight={0}
            >
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                {data ? 'Edit Staff' : 'Add Staff'}
              </Typography>
            </Box>

            {/* Personal Information */}
            <Card>
              <CardHeader
                title={
                  <Typography variant="h4" display={'flex'} alignItems={'center'}>
                    <InfoOutlinedIcon
                      sx={{ mr: 1, background: '#fff', padding: '2px', borderRadius: '5px' }}
                    />
                    Personal Information
                  </Typography>
                }
              />
              <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                {/* Photo Section */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    gap: 1,
                  }}
                  mb={3}
                >
                  <Avatar
                    alt=""
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 80, height: 80 }}
                    variant="square"
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        size="medium"
                        sx={{ p: '4px 8px' }}
                      >
                        Upload
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ p: '4px 8px' }}
                      >
                        Remove
                      </Button>
                    </Box>
                    <Typography variant="caption">
                      Upload image size 4MB, Format JPG, PNG
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Name
                      </Typography>
                      <TextField
                        id="name"
                        name="name"
                        size="small"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Gender
                      </Typography>
                      <Select
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        size="small"
                        displayEmpty
                        error={touched.gender && Boolean(errors.gender)}
                      >
                        <MenuItem value="" disabled>
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                      </Select>
                      {touched.gender && errors.gender && (
                        <Typography color="error" variant="caption">
                          {errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="h6">Date of Birth</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={values.dateOfBirth}
                          onChange={(value) => setFieldValue('dateOfBirth', value)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                              error: touched.dateOfBirth && Boolean(errors.dateOfBirth),
                              helperText: touched.dateOfBirth && errors.dateOfBirth,
                            },
                          }}
                          views={isMobile ? ['year', 'month', 'day'] : undefined}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Blood Group
                      </Typography>
                      <TextField
                        id="bloodGroup"
                        name="bloodGroup"
                        size="small"
                        value={values.bloodGroup}
                        onChange={handleChange}
                        error={touched.bloodGroup && Boolean(errors.bloodGroup)}
                        helperText={touched.bloodGroup && errors.bloodGroup}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="h6">Joining Date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={values.joiningDate}
                          onChange={(value) => setFieldValue('joiningDate', value)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                              error: touched.joiningDate && Boolean(errors.joiningDate),
                              helperText: touched.joiningDate && errors.joiningDate,
                            },
                          }}
                          views={isMobile ? ['year', 'month', 'day'] : undefined}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Contact Number
                      </Typography>
                      <TextField
                        id="contactNumber"
                        name="contactNumber"
                        size="small"
                        value={values.contactNumber}
                        onChange={handleChange}
                        error={touched.contactNumber && Boolean(errors.contactNumber)}
                        helperText={touched.contactNumber && errors.contactNumber}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Email
                      </Typography>
                      <TextField
                        id="email"
                        name="email"
                        size="small"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Marital Status
                      </Typography>
                      <Select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={values.maritalStatus}
                        onChange={handleChange}
                        size="small"
                        displayEmpty
                        error={touched.maritalStatus && Boolean(errors.maritalStatus)}
                      >
                        <MenuItem value="" disabled>
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value={'Single'}>Single</MenuItem>
                        <MenuItem value={'Married'}>Married</MenuItem>
                      </Select>
                      {touched.maritalStatus && errors.maritalStatus && (
                        <Typography color="error" variant="caption">
                          {errors.maritalStatus}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Qualification
                      </Typography>
                      <TextField
                        id="qualification"
                        name="qualification"
                        size="small"
                        value={values.qualification}
                        onChange={handleChange}
                        error={touched.qualification && Boolean(errors.qualification)}
                        helperText={touched.qualification && errors.qualification}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Experience
                      </Typography>
                      <TextField
                        id="experience"
                        name="experience"
                        size="small"
                        value={values.experience}
                        onChange={handleChange}
                        error={touched.experience && Boolean(errors.experience)}
                        helperText={touched.experience && errors.experience}
                      />
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Level
                      </Typography>
                      <Select
                        id="level"
                        name="level"
                        value={values.level}
                        onChange={handleChange}
                        size="small"
                        displayEmpty
                        error={touched.level && Boolean(errors.level)}
                      >
                        <MenuItem value="" disabled>
                          <em>Select</em>
                        </MenuItem>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
                          <MenuItem key={lvl} value={lvl}>
                            {lvl}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.level && errors.level && (
                        <Typography color="error" variant="caption">
                          {errors.level}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Center
                      </Typography>
                      <Select
                        id="center"
                        name="center"
                        value={values.center}
                        onChange={handleChange}
                        size="small"
                        displayEmpty
                        error={touched.center && Boolean(errors.center)}
                      >
                        <MenuItem value="" disabled>
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value={'Puliyur'}>Puliyur</MenuItem>
                        <MenuItem value={'Karur'}>Karur</MenuItem>
                      </Select>
                      {touched.center && errors.center && (
                        <Typography color="error" variant="caption">
                          {errors.center}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Status
                      </Typography>
                      <Select
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        size="small"
                        displayEmpty
                        error={touched.status && Boolean(errors.status)}
                      >
                        <MenuItem value="" disabled>
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                      </Select>
                      {touched.status && errors.status && (
                        <Typography color="error" variant="caption">
                          {errors.status}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography mb={1} variant="h6">
                        Additional Details
                      </Typography>
                      <textarea
                        name="additionalDetails"
                        value={values.additionalDetails}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          minHeight: 100,
                          resize: 'vertical',
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 4,
                          padding: 8,
                        }}
                        placeholder="Add additional notes here..."
                      />
                      {touched.additionalDetails && errors.additionalDetails && (
                        <Typography color="error" variant="caption">
                          {errors.additionalDetails}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader
                title={
                  <Typography variant="h4" display={'flex'} alignItems={'center'}>
                    <HomeOutlinedIcon
                      sx={{ mr: 1, background: '#fff', padding: '2px', borderRadius: '5px' }}
                    />
                    Address
                  </Typography>
                }
              />
              <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                <Box>
                  <Grid container spacing={2} mt={2}>
                    <Grid size={12}>
                      <FormControl fullWidth>
                        <textarea
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            minHeight: 100,
                            resize: 'vertical',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 4,
                            padding: 8,
                          }}
                          placeholder="Address..."
                        />
                        {touched.address && errors.address && (
                          <Typography color="error" variant="caption">
                            {errors.address}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={2}>
              <Button variant="outlined" color="primary" size="large" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" size="large" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StaffForm;
