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
  type SelectChangeEvent,
  useMediaQuery,
  TextField,
  TextareaAutosize,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  IconButton,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { FaDownload } from 'react-icons/fa6';
import { GrDocumentPdf } from 'react-icons/gr';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const AddStaff: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  const [gender, setGender] = React.useState('');

  const handleGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const [level, setLevel] = React.useState('');

  const handleLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const [batch, setBatch] = React.useState('');

  const handleBatch = (event: SelectChangeEvent) => {
    setBatch(event.target.value as string);
  };

  const [center, setCenter] = React.useState('');

  const handleCenter = (event: SelectChangeEvent) => {
    setCenter(event.target.value as string);
  };

  const [status, setStatus] = React.useState('');

  const handleStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [stdType, setstdType] = React.useState('');

  const handlestdType = (event: SelectChangeEvent) => {
    setstdType(event.target.value as string);
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
          Add Student
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
                <TextField id="name" size="small" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Gender
                </Typography>
                <Select
                  id="gender"
                  value={gender}
                  onChange={handleGender}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography variant="h6">Date of Birth</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
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
                  Blood Group
                </Typography>
                <TextField id="name" size="small" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography variant="h6">Admission Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
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
                  School Name
                </Typography>
                <TextField id="name" size="small" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Grade
                </Typography>
                <TextField id="name" size="small" />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Learning Level
                </Typography>
                <Select id="level" value={level} onChange={handleLevel} size="small" displayEmpty>
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
                  Batch
                </Typography>
                <Select id="batch" value={batch} onChange={handleBatch} size="small" displayEmpty>
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Monday</MenuItem>
                  <MenuItem value={2}>Tuesday</MenuItem>
                  <MenuItem value={3}>Wednesday</MenuItem>
                  <MenuItem value={4}>Thursday</MenuItem>
                  <MenuItem value={5}>Friday</MenuItem>
                  <MenuItem value={6}>Saturday</MenuItem>
                  <MenuItem value={7}>Sunday</MenuItem>
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
                  value={center}
                  onChange={handleCenter}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Puliyur</MenuItem>
                  <MenuItem value={2}>Karur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <FormControl fullWidth>
                <Typography mb={1} variant="h6">
                  Student Type
                </Typography>
                <Select
                  id="stdType"
                  value={stdType}
                  onChange={handlestdType}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Regular</MenuItem>
                  <MenuItem value={2}>Crash course</MenuItem>
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
                  value={status}
                  onChange={handleStatus}
                  size="small"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
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
          </Grid>
        </CardContent>
      </Card>

      {/* Parent Information */}
      <Card>
        <CardHeader
          sx={{ background: '#E9EDF4' }}
          title={
            <Typography variant="h4" display={'flex'} alignItems={'center'}>
              <FamilyRestroomOutlinedIcon
                sx={{
                  mr: 1,
                  background: '#fff',
                  padding: '2px',
                  borderRadius: '5px',
                }}
              />
              Parents Information
            </Typography>
          }
        />
        <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          {/* Primary Contact */}
          <Box>
            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <FormLabel id="primary-contact" sx={{ marginRight: '10px' }}>
                Primary contact:
              </FormLabel>
              <RadioGroup row aria-labelledby="primary-contact" name="primary-contact">
                <FormControlLabel value="father" control={<Radio />} label="Father" />
                <FormControlLabel value="mother" control={<Radio />} label="Mother" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Father info */}
          <Box>
            <Typography variant="h5" pb={2}>
              Father's Info
            </Typography>
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
                    Father Name
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Phone Number
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Email
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Father Occupation
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Motherr info */}
          <Box>
            <Typography variant="h5" pb={2}>
              Mother's Info
            </Typography>
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
                    Mother Name
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Phone Number
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Email
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <FormControl fullWidth>
                  <Typography mb={1} variant="h6">
                    Mother Occupation
                  </Typography>
                  <TextField id="name" size="small" />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
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
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Upload Document */}
      <Card>
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
      </Card>

      <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={2}>
        <Button variant="outlined" color="primary" size="large">
          Cancel
        </Button>
        <Button variant="contained" color="primary" size="large">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddStaff;
