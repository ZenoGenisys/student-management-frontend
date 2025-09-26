import {
  Box,
  Typography,
  Button,
  CardHeader,
  Card,
  CardContent,
  Avatar,
  Grid,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createStaff, getStaffById, updateStaff } from '../../repositories/StaffRepository';

const AddStaff: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { staffId } = useParams<{ staffId: string }>();

  const navigate = useNavigate();

  const [staffData, setStaffData] = useState<any>({
    name: '',
    gender: '',
    dateOfBirth: null,
    joiningDate: null,
    maritalStatus: '',
    contactNumber: '',
    email: '',
    address: '',
    qualification: '',
    experience: '',
    center: '',
    level: '',
    status: '',
  });

  useEffect(() => {
    if (staffId) {
      getStaffById(staffId)
        .then((data: any) => {
          setStaffData({
            ...data,
            dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth) : null,
            joiningDate: data.joiningDate ? dayjs(data.joiningDate) : null,
          });
        })
        .catch(console.error);
    }
  }, [staffId]);

  const handleSave = async () => {
    try {
      const payload = {
        ...staffData,
        dateOfBirth: staffData.dateOfBirth ? staffData.dateOfBirth.format('YYYY-MM-DD') : null,
        joiningDate: staffData.joiningDate ? staffData.joiningDate.format('YYYY-MM-DD') : null,
      };

      if (staffId) {
        await updateStaff({ ...payload, staffId });
      } else {
        await createStaff(payload);
      }

      navigate('/staffs');
    } catch (error) {
      console.error('Failed to add staff:', error);
    }
  };

  const handleCancel = () => {
    navigate('/staffs');
  };

  return (
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
          {staffId ? 'Edit Staff' : 'Add Staff'}
        </Typography>
      </Box>

      {/* Persional Information */}
      <Card>
        <CardHeader
          sx={{ background: '#E9EDF4' }}
          title={
            <Typography variant="h4" display={'flex'} alignItems={'center'}>
              <InfoOutlinedIcon
                sx={{
                  mr: 1,
                  background: '#fff',
                  padding: '2px',
                  borderRadius: '5px',
                }}
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Name
                </Typography>
                <TextField
                  id="name"
                  size="small"
                  value={staffData.name}
                  onChange={(e) => setStaffData({ ...staffData, name: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Gender
                </Typography>
                <Select
                  id="gender"
                  value={staffData.gender}
                  onChange={(e) => setStaffData({ ...staffData, gender: e.target.value })}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography variant="h6">Date of Birth</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={staffData.dateOfBirth}
                      onChange={(newValue) => setStaffData({ ...staffData, dateOfBirth: newValue })}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' },
                      }}
                      views={isMobile ? ['year', 'month', 'day'] : undefined}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </Grid>

            {/* <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Blood Group
                </Typography>
                <TextField id="name" size="small" />
              </FormControl>
            </Grid> */}

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography variant="h6">Joining Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={staffData.joiningDate}
                      onChange={(newValue) => setStaffData({ ...staffData, joiningDate: newValue })}
                      slotProps={{
                        textField: { fullWidth: true, size: 'small' },
                      }}
                      views={isMobile ? ['year', 'month', 'day'] : undefined}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Contact Number
                </Typography>
                <TextField
                  id="contactNumber"
                  size="small"
                  value={staffData.contactNumber}
                  onChange={(e) => setStaffData({ ...staffData, contactNumber: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Email
                </Typography>
                <TextField
                  id="email"
                  size="small"
                  value={staffData.email}
                  onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Marital Status
                </Typography>
                <Select
                  id="maritialStatus"
                  value={staffData.maritalStatus}
                  onChange={(e) => setStaffData({ ...staffData, maritalStatus: e.target.value })}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'Single'}>Single</MenuItem>
                  <MenuItem value={'Married'}>Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Qualification
                </Typography>
                <TextField
                  id="qualification"
                  size="small"
                  value={staffData.qualification}
                  onChange={(e) => setStaffData({ ...staffData, qualification: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Experience
                </Typography>
                <TextField
                  id="experience"
                  size="small"
                  value={staffData.experience}
                  onChange={(e) => setStaffData({ ...staffData, experience: e.target.value })}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Level
                </Typography>
                <Select
                  id="level"
                  value={staffData.level}
                  onChange={(e) => setStaffData({ ...staffData, level: e.target.value })}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Center
                </Typography>
                <Select
                  id="center"
                  value={staffData.center}
                  onChange={(e) => setStaffData({ ...staffData, center: e.target.value })}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'Puliyur'}>Puliyur</MenuItem>
                  <MenuItem value={'Karur'}>Karur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Status
                </Typography>
                <Select
                  id="status"
                  value={staffData.status}
                  onChange={(e) => setStaffData({ ...staffData, status: e.target.value })}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'Active'}>Active</MenuItem>
                  <MenuItem value={'Inactive'}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Additional Details
                </Typography>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="Text area"
                  placeholder="Add additional notes here..."
                  defaultValue=""
                  style={{
                    width: '100%',
                    minHeight: 100,
                    resize: 'vertical',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 4,
                    padding: 8,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid> */}
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader
          sx={{ background: '#E9EDF4' }}
          title={
            <Typography variant="h4" display={'flex'} alignItems={'center'}>
              <HomeOutlinedIcon
                sx={{
                  mr: 1,
                  background: '#fff',
                  padding: '2px',
                  borderRadius: '5px',
                }}
              />
              Address
            </Typography>
          }
        />
        <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box>
            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
                <FormControl fullWidth>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="Text area"
                    placeholder="Address..."
                    value={staffData.address}
                    onChange={(e) => setStaffData({ ...staffData, address: e.target.value })}
                    style={{
                      width: '100%',
                      minHeight: 100,
                      resize: 'vertical',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 4,
                      padding: 8,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Upload Document */}
      {/* <Card>
        <CardHeader
          sx={{ background: '#E9EDF4' }}
          title={
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h4" display={'flex'} alignItems={'center'}>
                <AttachFileOutlinedIcon
                  sx={{
                    mr: 1,
                    background: '#fff',
                    padding: '2px',
                    borderRadius: '5px',
                  }}
                />
                Documents
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
              >
                Upload
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
              p={1}
              display={'flex'}
              flexDirection={'row'}
              alignItems="center"
              justifyContent={'space-between'}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Box display="flex" alignItems={'center'} gap={1}>
                <GrDocumentPdf />
                <Typography variant="body1">Birth Certificate.pdf</Typography>
              </Box>
              <IconButton aria-label="download" size="medium">
                <FaDownload />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}

      <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={2}>
        <Button variant="outlined" color="primary" size="large" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" size="large" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddStaff;
