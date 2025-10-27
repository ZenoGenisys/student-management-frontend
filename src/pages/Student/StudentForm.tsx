import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FastField, Form, Formik, type FieldProps, type FormikHelpers } from 'formik';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useStudentDetails } from '../../hooks';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import LevelForm from '../../layouts/common/LevelForm';
import type { CreateStudent } from '../../types';
import {
  AdditionalDetailsForm,
  AddressForm,
  AvatarUpload,
  FatherInfo,
  MotherInfo,
  StudentBasicInfo,
  StudentValidationSchema,
} from '../../layouts';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../routes';
import { useSnackbar } from '../../state';
import { createStudent, updateStudent } from '../../repositories';
import { TitleCard } from '../../components';

const StudentForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useStudentDetails();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const initialValues = useMemo(
    () => ({
      name: data?.name ?? '',
      gender: data?.gender ?? '',
      dateOfBirth: data?.dateOfBirth ? dayjs(data.dateOfBirth) : null,
      joiningDate: data?.joiningDate ? dayjs(data.joiningDate) : null,
      schoolName: data?.schoolName ?? '',
      grade: data?.grade ?? '',
      batch: data?.batch ?? [],
      center: data?.center ?? '',
      status: data?.status ?? 'Active',
      additionalDetails: data?.additionalDetails ?? '',
      bloodGroup: data?.bloodGroup ?? '',
      levelDetails: data?.levelDetails ?? [],
      primaryContactNumber:
        data?.primaryContactNumber === data?.parentDetails?.motherPhoneNumber ? 'Mother' : 'Father',
      email: data?.email ?? '',
      address: data?.address ?? '',
      parentDetails: data?.parentDetails ?? {
        fatherName: data?.parentDetails?.fatherName ?? '',
        motherName: data?.parentDetails?.motherName ?? '',
        fatherPhoneNumber: data?.parentDetails?.fatherPhoneNumber ?? '',
        motherPhoneNumber: data?.parentDetails?.motherPhoneNumber ?? '',
        fatherEmail: data?.parentDetails?.fatherEmail ?? '',
        motherEmail: data?.parentDetails?.motherEmail ?? '',
        fatherOccupation: data?.parentDetails?.fatherOccupation ?? '',
        motherOccupation: data?.parentDetails?.motherOccupation ?? '',
      },
      studentType: data?.studentType === 'regular' ? 'Regular' : 'Crash  Course',
      amount: data?.amount ?? 0,
    }),
    [data],
  );

  const handleSubmit = useCallback(
    async (values: CreateStudent) => {
      try {
        const formValue: CreateStudent = {
          ...values,
          studentType: values?.studentType === 'Regular' ? 'regular' : 'crash_course',
          primaryContactNumber:
            values?.primaryContactNumber === 'Father'
              ? (values?.parentDetails?.fatherPhoneNumber ?? '')
              : (values?.parentDetails?.motherPhoneNumber ?? ''),
        };
        if (data) {
          await updateStudent({ ...formValue, studentId: Number(data.studentId) });
          navigate(PATH.STUDENT_DETAILS.replace(':studentId', data.studentId.toString()));
        } else {
          await createStudent(formValue);
          navigate(PATH.STUDENT);
        }
        showSnackbar({
          message: `Student ${data ? 'updated' : 'added'} successfully!`,
          severity: 'success',
        });
      } catch (error: unknown) {
        showSnackbar({
          message: (error as Error).message || `Failed to ${data ? 'update' : 'add'} staff.`,
          severity: 'error',
        });
      }
    },
    [data, navigate, showSnackbar],
  );

  const addLevel = useCallback(
    (values: CreateStudent, setFieldValue: FormikHelpers<CreateStudent>['setFieldValue']) => {
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
      validationSchema={StudentValidationSchema}
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
                  {data ? 'Edit Student' : 'Add Student'}
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
                  {/* Avatar Upload (memoized subcomponent) */}
                  <AvatarUpload />

                  <Grid container spacing={2}>
                    {/* Example Basic Details usage */}
                    {StudentBasicInfo.map((item, index) => (
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
                                    multiple={item.isMultiple}
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
                                      setFieldValue(field.name, v);
                                    } else {
                                      // Use setFieldValue to avoid casting to `any`
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

              {/* Parent Details */}
              <TitleCard
                title={'Parents Details'}
                icon={
                  <FamilyRestroomOutlinedIcon
                    sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                  />
                }
              >
                <>
                  <FastField name="primaryContactNumber">
                    {({ field }: FieldProps<string>) => (
                      <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <Typography variant="h6" color="secondary">
                          Primary Contact
                        </Typography>
                        <RadioGroup row {...field}>
                          <FormControlLabel value="Father" control={<Radio />} label="Father" />
                          <FormControlLabel value="Mother" control={<Radio />} label="Mother" />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </FastField>
                  <Typography variant="h5" color="secondary" pb={2}>
                    Father's Info
                  </Typography>
                  <Grid container spacing={2}>
                    {FatherInfo.map((item, index) => (
                      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={`father-form${index}`}>
                        <FastField name={`parentDetails.${item.value}`}>
                          {({ field, form, meta }: FieldProps<string>) => (
                            <FormControl fullWidth>
                              <Typography mb={1} variant="h6">
                                {item.label}
                              </Typography>
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
                            </FormControl>
                          )}
                        </FastField>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5" color="secondary" pb={2}>
                    Mother's Info
                  </Typography>
                  <Grid container spacing={2}>
                    {MotherInfo.map((item, index) => (
                      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={`mother-form${index}`}>
                        <FastField name={`parentDetails.${item.value}`}>
                          {({ field, form, meta }: FieldProps<string>) => (
                            <FormControl fullWidth>
                              <Typography mb={1} variant="h6">
                                {item.label}
                              </Typography>
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
                            </FormControl>
                          )}
                        </FastField>
                      </Grid>
                    ))}
                  </Grid>
                </>
              </TitleCard>

              {/* Academic Level */}
              <TitleCard
                title="Academic Level"
                icon={
                  <LocalLibraryOutlinedIcon
                    sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }}
                  />
                }
                suffixIcon={
                  <AddCircleOutlineOutlinedIcon
                    onClick={() => addLevel(values, setFieldValue)}
                    sx={{ cursor: 'pointer' }}
                  />
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
                        errors={
                          Array.isArray(errors.levelDetails)
                            ? typeof errors.levelDetails[idx] === 'string'
                              ? {}
                              : (errors.levelDetails[idx] ?? {})
                            : {}
                        }
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
export default StudentForm;
