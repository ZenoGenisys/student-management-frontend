import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Icon,
  IconButton,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { GrDocumentPdf } from 'react-icons/gr';
import { FaDownload } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';

const StudentDetails: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box display="flex" flexDirection="column">
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
          Student Details
        </Typography>
        <Box display={'flex'} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<EditOutlinedIcon />}
          >
            Edit Student
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SensorOccupiedOutlinedIcon />}
          >
            Promote
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={2} width="100%">
        {/* Left Side - Student Info */}
        <Grid size={{ xs: 12, md: 3, lg: 3, xl: 3 }}>
          {/* Basic details */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={'flex-start'}
                gap={2}
              >
                <Avatar
                  src="https://via.placeholder.com/120"
                  variant="square"
                  sx={{ width: 78, height: 78, borderRadius: 1 }}
                />
                <Box>
                  <Typography variant="h4" mb={1}>
                    Janet Daniel
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.success.main}
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                      backgroundColor: theme.palette.success.light,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      width: 'fit-content',
                    }}
                  >
                    Active
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" mb={2}>
                Basic Information
              </Typography>
              <Box>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Roll No:</b>
                  </Grid>
                  <Grid size={6}>35013</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Gender:</b>
                  </Grid>
                  <Grid size={6}>Female</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Date of Birth:</b>
                  </Grid>
                  <Grid size={6}>25 Jan 2008</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Age:</b>
                  </Grid>
                  <Grid size={6}>25</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Learning Level:</b>
                  </Grid>
                  <Grid size={6}>1</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Center:</b>
                  </Grid>
                  <Grid size={6}>Puliyur</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Batch:</b>
                  </Grid>
                  <Grid size={6}>Tuesday</Grid>
                </Grid>
                <Grid container spacing={2} columns={12} mb={1}>
                  <Grid size={6}>
                    <b>Student Type:</b>
                  </Grid>
                  <Grid size={6}>Regular</Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          {/* Primary Contact details */}
          <Card>
            <CardHeader
              title={
                <Typography variant="h5">Primary Contact Details</Typography>
              }
            />
            <CardContent
              sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box
                display={'flex'}
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}
                gap={2}
              >
                <Box
                  display={'flex'}
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                >
                  <PhoneAndroidOutlinedIcon />
                  <Box>
                    <Typography variant="h6">Phone</Typography>
                    <Typography variant="body2" color="text.secondary">
                      9843833458
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    aria-label="Call"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                  >
                    <CallOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Call"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                  >
                    <FaWhatsapp />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Tabs and Content */}
        <Grid size={{ xs: 12, md: 9, lg: 9, xl: 9 }}>
          <Box display="flex" flexDirection="column" width="100%">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab
                icon={<SchoolOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Student Details"
              />
              <Tab
                icon={<EventNoteOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Attendance"
              />
              <Tab
                icon={<PaidOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Fees"
              />
            </Tabs>
            {tabValue === 0 && (
              <Box display={'flex'} flexDirection="column" gap={2}>
                {/* Parent Details */}
                <Card>
                  <CardHeader
                    title={
                      <Typography variant="h5">Parents Information</Typography>
                    }
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      spacing={2}
                      p={2}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                      size={12}
                    >
                      <Grid
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                        size={3}
                      >
                        <Avatar variant="square" sx={{ borderRadius: 1 }}>
                          B
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Balachandar</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Father
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={3}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" color="text.secondary">
                          9843833458
                        </Typography>
                      </Grid>

                      <Grid
                        display={'flex'}
                        flexDirection="row"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={0.5}
                        size={6}
                      >
                        <Box>
                          <Typography variant="h6">Email</Typography>
                          <Typography variant="body2" color="text.secondary">
                            balachander123@gmail.com
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            aria-label="Call"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                              mr: 1,
                            }}
                          >
                            <CallOutlinedIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Message"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                              mr: 1,
                            }}
                          >
                            <MessageOutlinedIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Mail"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                            }}
                          >
                            <MailOutlineOutlinedIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      alignItems="center"
                      spacing={2}
                      p={2}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                      size={12}
                    >
                      <Grid
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                        size={3}
                      >
                        <Avatar variant="square" sx={{ borderRadius: 1 }}>
                          S
                        </Avatar>
                        <Box>
                          <Typography variant="h6">Sneha</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Mother
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={3}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" color="text.secondary">
                          9159748978
                        </Typography>
                      </Grid>

                      <Grid
                        display={'flex'}
                        flexDirection="row"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={0.5}
                        size={6}
                      >
                        <Box>
                          <Typography variant="h6">Email</Typography>
                          <Typography variant="body2" color="text.secondary">
                            sneha345@gmail.com
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            aria-label="Call"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                              mr: 1,
                            }}
                          >
                            <CallOutlinedIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Message"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                              mr: 1,
                            }}
                          >
                            <MessageOutlinedIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Mail"
                            size="small"
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              borderRadius: 5,
                            }}
                          >
                            <MailOutlineOutlinedIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Grid container spacing={2} columns={12}>
                  {/* Address */}
                  <Grid size={6}>
                    <Card>
                      <CardHeader
                        title={<Typography variant="h5">Address</Typography>}
                      />
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                          borderTop: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <CottageOutlinedIcon />
                        <Typography variant="body1">
                          123, Main Street, Puliyur, Tamil Nadu, India - 639117
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* School Details */}
                  <Grid size={6}>
                    <Card>
                      <CardHeader
                        title={
                          <Typography variant="h5">School Details</Typography>
                        }
                      />
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                          borderTop: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <SchoolOutlinedIcon />
                        <Typography variant="body1">
                          ABC Matriculation Higher Secondary School
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Documents */}
                <Card>
                  <CardHeader
                    title={<Typography variant="h5">Documents</Typography>}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Grid
                      container
                      flexDirection={'row'}
                      alignItems="center"
                      justifyContent={'space-between'}
                      spacing={2}
                      p={1}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                      size={6}
                    >
                      <Box display="flex" alignItems={'center'} gap={1}>
                        <GrDocumentPdf />
                        <Typography variant="body1">
                          Birth Certificate.pdf
                        </Typography>
                      </Box>
                      <IconButton aria-label="download" size="medium">
                        <FaDownload />
                      </IconButton>
                    </Grid>

                    <Grid
                      container
                      alignItems="center"
                      justifyContent={'space-between'}
                      spacing={2}
                      p={1}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                      size={6}
                    >
                      <Box display="flex" alignItems={'center'} gap={1}>
                        <GrDocumentPdf />
                        <Typography variant="body1">
                          Competition Certificate.pdf
                        </Typography>
                      </Box>
                      <IconButton aria-label="download" size="medium">
                        <FaDownload />
                      </IconButton>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader
                    title={<Typography variant="h5">Notes</Typography>}
                  />
                  <CardContent
                    sx={{
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
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
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDetails;
