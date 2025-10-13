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
import { Formik, Form, FastField, type FieldProps, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '../../state';
import { PATH } from '../../routes';
import LevelForm from '../../layouts/common/LevelForm';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

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
  center: Yup.string().required('Center is required'),
  status: Yup.string().required('Status is required'),
  address: Yup.string().required('Address is required'),
  levelDetails: Yup.array()
    .of(
      Yup.object({
        level: Yup.number().required(),
        date: Yup.date().nullable().required('Date is required'),
        document: Yup.string().required('Document is required'),
        remarks: Yup.string().required('Remarks are required'),
      }),
    )
    .min(1, 'At least one level is required')
    .max(8, 'Maximum 8 levels allowed'),
});

const StaffForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useStaffDetails();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const genderOptions = useMemo(() => ['Male', 'Female', 'Other'], []);
  const maritalOptions = useMemo(() => ['Single', 'Married'], []);
  const centerOptions = useMemo(() => ['Puliyur', 'Karur'], []);
  const statusOptions = useMemo(() => ['Active', 'Inactive'], []);

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
      center: data?.center ?? '',
      status: data?.status ?? 'Active',
      address: data?.address ?? '',
      additionalDetails: data?.additionalDetails ?? '',
      levelDetails: data?.levelDetails ?? [],
    }),
    [data],
  );

  const handleSubmit = useCallback(
    async (values: CreateStaff) => {
      try {
        if (data) {
          await updateStaff({ ...values, staffId: data.staffId });
          navigate(`/staff/${data.staffId}`);
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

  const addLevel = useCallback(
    (values: CreateStaff, setFieldValue: FormikHelpers<CreateStaff>['setFieldValue']) => {
      if ((values.levelDetails?.length ?? 0) < 8) {
        setFieldValue('levelDetails', [
          ...(values.levelDetails ?? []),
          { level: (values.levelDetails?.length ?? 0) + 1, date: null, document: '', remarks: '' },
        ]);
      }
    },
    [],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ values, setFieldValue, touched, errors }) => {
        return (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2} px={0}>
                <Typography variant="h3" fontWeight="bold">
                  {data ? 'Edit Staff' : 'Add Staff'}
                </Typography>
              </Box>

              {/* Personal Information */}
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h4" display="flex" alignItems="center">
                      <InfoOutlinedIcon
                        sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                      />
                      Personal Information
                    </Typography>
                  }
                />
                <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                  {/* Avatar Upload (memoized subcomponent) */}
                  <AvatarUpload />

                  <Grid container spacing={2}>
                    {/* Example FastField usage */}
                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="name">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Name
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    {/* Gender */}
                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="gender">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Gender
                            </Typography>
                            <Select
                              {...field}
                              size="small"
                              displayEmpty
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {genderOptions.map((g) => (
                                <MenuItem key={g} value={g}>
                                  {g}
                                </MenuItem>
                              ))}
                            </Select>
                            {meta.touched && meta.error && (
                              <Typography color="error" variant="caption">
                                {meta.error}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    {/* Date of Birth */}
                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="dateOfBirth">
                        {({ field, form, meta }: FieldProps<Date>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Date of Birth
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={dayjs(field.value)}
                                onChange={(v) => form.setFieldValue(field.name, v)}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    size: 'small',
                                    error: meta.touched && Boolean(meta.error),
                                    helperText: meta.touched && meta.error,
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="bloodGroup">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Blood Group
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    {/* Joining Date */}
                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="joiningDate">
                        {({ field, form, meta }: FieldProps<Date>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Joining Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={dayjs(field.value)}
                                onChange={(v) => form.setFieldValue(field.name, v)}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    size: 'small',
                                    error: meta.touched && Boolean(meta.error),
                                    helperText: meta.touched && meta.error,
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="contactNumber">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Contact Number
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="email">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Email
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="maritalStatus">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Marital Status
                            </Typography>
                            <Select
                              {...field}
                              size="small"
                              displayEmpty
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {maritalOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                            {meta.touched && meta.error && (
                              <Typography color="error" variant="caption">
                                {meta.error}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="qualification">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Qualification
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="experience">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Experience
                            </Typography>
                            <TextField
                              {...field}
                              size="small"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="center">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Center
                            </Typography>
                            <Select
                              {...field}
                              size="small"
                              displayEmpty
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {centerOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                            {meta.touched && meta.error && (
                              <Typography color="error" variant="caption">
                                {meta.error}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                      <FastField name="status">
                        {({ field, meta }: FieldProps<string>) => (
                          <FormControl fullWidth>
                            <Typography mb={1} variant="h6">
                              Status
                            </Typography>
                            <Select
                              {...field}
                              size="small"
                              displayEmpty
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <MenuItem value="" disabled>
                                <em>Select</em>
                              </MenuItem>
                              {statusOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                            {meta.touched && meta.error && (
                              <Typography color="error" variant="caption">
                                {meta.error}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </FastField>
                    </Grid>
                  </Grid>

                  {/* Additional Details */}
                  <AdditionalDetailsSection />
                </CardContent>
              </Card>

              {/* Qualification Level */}
              <Card>
                <CardHeader
                  title={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Typography variant="h4" display="flex" alignItems="center">
                        <LocalLibraryOutlinedIcon
                          sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                        />
                        Academic Level
                      </Typography>
                      <AddCircleOutlineOutlinedIcon
                        sx={{
                          mr: 1,
                          background: '#fff',
                          p: '2px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => addLevel(values, setFieldValue)}
                      />
                    </Box>
                  }
                />
                <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Grid container spacing={2} mt={2}>
                    {values.levelDetails?.map((levelDetail, idx) => (
                      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={idx}>
                        <MemoizedLevelForm
                          index={idx}
                          values={levelDetail}
                          touched={
                            Array.isArray(touched.levelDetails) ? touched.levelDetails[idx] : {}
                          }
                          errors={
                            Array.isArray(errors.levelDetails) ? errors.levelDetails[idx] : {}
                          }
                          isMobile={isMobile}
                          levelDetails={values.levelDetails ?? []}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              {touched.levelDetails && typeof errors.levelDetails === 'string' && (
                <Typography color="error" variant="caption">
                  {errors.levelDetails}
                </Typography>
              )}

              {/* Address */}
              <AddressSection />

              {/* Buttons */}
              <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" size="large" type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

const AvatarUpload = React.memo(() => (
  <Box display="flex" gap={1} mb={3}>
    <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }} variant="square" />
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" gap={1}>
        <Button variant="outlined" color="primary" size="medium" sx={{ p: '4px 8px' }}>
          Upload
        </Button>
        <Button variant="contained" color="primary" size="medium" sx={{ p: '4px 8px' }}>
          Remove
        </Button>
      </Box>
      <Typography variant="caption">Upload image size 4MB, Format JPG, PNG</Typography>
    </Box>
  </Box>
));

const AdditionalDetailsSection = React.memo(() => (
  <Grid container spacing={2} mt={2}>
    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <FastField name="additionalDetails">
        {({ field, meta }: FieldProps<string>) => (
          <FormControl fullWidth>
            <Typography mb={1} variant="h6">
              Additional Details
            </Typography>
            <textarea
              {...field}
              style={{
                width: '100%',
                minHeight: 100,
                resize: 'vertical',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: 8,
              }}
              placeholder="Add additional notes here..."
            />
            {meta.touched && meta.error && (
              <Typography color="error" variant="caption">
                {meta.error}
              </Typography>
            )}
          </FormControl>
        )}
      </FastField>
    </Grid>
  </Grid>
));

const AddressSection = React.memo(() => (
  <Card>
    <CardHeader
      title={
        <Typography variant="h4" display="flex" alignItems="center">
          <HomeOutlinedIcon sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }} />
          Address
        </Typography>
      }
    />
    <CardContent>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12 }}>
          <FastField name="address">
            {({ field, meta }: FieldProps<string>) => (
              <FormControl fullWidth>
                <textarea
                  {...field}
                  style={{
                    width: '100%',
                    minHeight: 100,
                    resize: 'vertical',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    padding: 8,
                  }}
                  placeholder="Address..."
                />
                {meta.touched && meta.error && (
                  <Typography color="error" variant="caption">
                    {meta.error}
                  </Typography>
                )}
              </FormControl>
            )}
          </FastField>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
));

const MemoizedLevelForm = React.memo(LevelForm);
export default React.memo(StaffForm);
