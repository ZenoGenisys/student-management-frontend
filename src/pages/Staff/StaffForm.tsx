import {
  Box,
  Typography,
  Button,
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createStaff, updateStaff } from '../../repositories/StaffRepository';
import { useStaffDetails } from '../../hooks';
import type { CreateStaff } from '../../types';
import { Formik, Form, FastField, type FieldProps, type FormikHelpers } from 'formik';
import { useSnackbar } from '../../state';
import { PATH } from '../../routes';
import LevelForm from '../../layouts/common/LevelForm';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import {
  AdditionalDetailsForm,
  AddressForm,
  AvatarUpload,
  StaffBasicInfo,
  StaffValidationSchema,
} from '../../layouts';
import { TitleCard } from '../../components';

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
      validationSchema={StaffValidationSchema}
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
              <TitleCard
                title={'Personal Information'}
                icon={
                  <InfoOutlinedIcon
                    sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                  />
                }
              >
                <>
                  {/* Avatar Upload */}
                  <AvatarUpload />

                  <Grid container spacing={2}>
                    {/* Example Basic Details usage */}
                    {StaffBasicInfo.map((item, index) => (
                      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={`student-form${index}`}>
                        <FastField name={item.value}>
                          {({ field, form, meta }: FieldProps<string>) => (
                            <FormControl fullWidth>
                              <Typography mb={1} variant="h6">
                                {item.label}
                              </Typography>
                              {item.type === 'select' && item?.option && (
                                <>
                                  <Select
                                    {...field}
                                    size="small"
                                    displayEmpty
                                    error={meta.touched && Boolean(meta.error)}
                                    onChange={(e) => {
                                      form.setFieldValue(field.name, e.target.value);
                                      setFieldValue(field.name, e.target.value);
                                    }}
                                  >
                                    <MenuItem value="" disabled>
                                      <em>Select</em>
                                    </MenuItem>
                                    {item.option.map((g) => (
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
                                </>
                              )}
                              {(item.type === 'text' ||
                                item.type === 'email' ||
                                item.type === 'number') && (
                                <TextField
                                  {...field}
                                  type={item.type}
                                  size="small"
                                  error={meta.touched && Boolean(meta.error)}
                                  helperText={meta.touched && meta.error}
                                  inputProps={
                                    item.type === 'number'
                                      ? { inputMode: 'numeric', pattern: '\\d*', maxLength: 10 }
                                      : undefined
                                  }
                                  onChange={(e) => {
                                    if (item.type === 'number') {
                                      const v = (e.target as HTMLInputElement).value
                                        .replace(/\D/g, '')
                                        .slice(0, 10);
                                      form.setFieldValue(field.name, v);
                                    } else {
                                      form.setFieldValue(
                                        field.name,
                                        (e.target as HTMLInputElement).value,
                                      );
                                    }
                                  }}
                                />
                              )}
                              {item.type === 'date' && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    disableFuture
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
                              )}
                            </FormControl>
                          )}
                        </FastField>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Additional Details */}
                  <AdditionalDetailsForm />
                </>
              </TitleCard>

              {/* Academic Level */}
              <TitleCard
                title={'Academic Level'}
                icon={
                  <LocalLibraryOutlinedIcon
                    sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                  />
                }
                suffixIcon={
                  <AddCircleOutlineOutlinedIcon onClick={() => addLevel(values, setFieldValue)} />
                }
              >
                <Grid container spacing={2} mt={2}>
                  {values.levelDetails?.map((levelDetail, idx) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={idx}>
                      <MemoizedLevelForm
                        index={idx}
                        values={levelDetail}
                        touched={
                          Array.isArray(touched.levelDetails) ? touched.levelDetails[idx] : {}
                        }
                        errors={Array.isArray(errors.levelDetails) ? errors.levelDetails[idx] : {}}
                        isMobile={isMobile}
                        levelDetails={values.levelDetails ?? []}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TitleCard>

              {/* Address */}
              <AddressForm />

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

const MemoizedLevelForm = React.memo(LevelForm);
export default React.memo(StaffForm);
