import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useCallback, useState } from 'react';
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
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { GrDocumentPdf } from 'react-icons/gr';
import { FaDownload } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Row {
  rollNo: string;
  name: string;
  avatar: string;
  gender: string;
  center: string;
  level: string;
  status: string;
  doj: string;
  dob: string;
  [key: string]: string;
}

const rows: Row[] = [
  {
    rollNo: '1',
    name: 'Ajith',
    avatar: '',
    gender: 'Male',
    center: 'Puliyur',
    level: '1',
    status: 'Active',
    doj: '01 Aug 2022',
    dob: '23 Nov 1999',
  },
  {
    rollNo: '102',
    name: 'Rajesh',
    avatar: '',
    gender: 'Female',
    center: 'Karur',
    level: '3',
    status: 'Inactive',
    doj: '01 Aug 2021',
    dob: '23 Mar 2000',
  },
];

const StudentDetails: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    [],
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('center');

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () =>
    setPage((p) => Math.min(p + 1, Math.ceil(rows.length / rowsPerPage) - 1));

  const handleChangeRowsPerPage = useCallback(
    (
      event:
        | React.ChangeEvent<{ value: unknown }>
        | React.ChangeEvent<HTMLInputElement>
        | Event,
    ) => {
      const target = event.target as HTMLInputElement | { value: unknown };
      setRowsPerPage(Number(target.value));
      setPage(0);
    },
    [],
  );

  const filteredRows = rows;

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const sortedRows = [...paginatedRows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = paginatedRows.map((row) => row.center);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

  const handleRowClick = (center: string) => {
    const selectedIndex = selectedRows.indexOf(center);
    let newSelectedRows: string[] = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, center);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const handleRequestSort = (property: string) => {
    const isascending = orderBy === property && order === 'asc';
    setOrder(isascending ? 'desc' : 'asc');
    setOrderBy(property);
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
              <Tab
                icon={<LocalLibraryOutlinedIcon fontSize="medium" />}
                iconPosition="start"
                label="Academic Details"
              />
            </Tabs>

            {/* Tab 1 Details */}
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

            {/* Tab 2 Attendance */}
            {tabValue === 1 && <Box>Attendance will show here!</Box>}

            {/* Tab 3 Fees */}
            {tabValue === 2 && (
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 0,
                  border: `1px solid ${theme.palette.divider}`,
                  borderTop: 'none',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color="textSecondary">
                      Row Per Page
                    </Typography>
                    <Select
                      size="small"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      {[5, 10, 25, 50].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="body1" color="textSecondary">
                      Entries
                    </Typography>
                  </Box>
                </Box>

                {/* Table */}
                <TableContainer>
                  <Table
                    sx={{
                      '& th, & td': {
                        borderBottom: '1px solid #e0e0e0', // only horizontal line
                      },
                    }}
                  >
                    <TableHead
                      sx={{
                        bgcolor: '#F9FAFB',
                        '& th': {
                          fontWeight: 'bold',
                          fontSize: '1rem',
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            indeterminate={
                              selectedRows.length > 0 &&
                              selectedRows.length < paginatedRows.length
                            }
                            checked={
                              paginatedRows.length > 0 &&
                              selectedRows.length === paginatedRows.length
                            }
                            onChange={handleSelectAllClick}
                            inputProps={{
                              'aria-label': 'select all desserts',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'rollNo'}
                            direction={orderBy === 'rollNo' ? order : 'asc'}
                            onClick={() => handleRequestSort('rollNo')}
                          >
                            Roll No
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'name'}
                            direction={orderBy === 'name' ? order : 'asc'}
                            onClick={() => handleRequestSort('name')}
                          >
                            Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'gender'}
                            direction={orderBy === 'gender' ? order : 'asc'}
                            onClick={() => handleRequestSort('gender')}
                          >
                            Gender
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'center'}
                            direction={orderBy === 'center' ? order : 'asc'}
                            onClick={() => handleRequestSort('center')}
                          >
                            Center
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'level'}
                            direction={orderBy === 'level' ? order : 'asc'}
                            onClick={() => handleRequestSort('level')}
                          >
                            Level
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">
                          <TableSortLabel
                            active={orderBy === 'status'}
                            direction={orderBy === 'status' ? order : 'asc'}
                            onClick={() => handleRequestSort('status')}
                          >
                            Status
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Date of Join</TableCell>
                        <TableCell align="center">DOB</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedRows.map((row) => (
                        <TableRow
                          key={row.center}
                          selected={selectedRows.indexOf(row.center) !== -1}
                          sx={{ borderBottom: '1px solid #ddd' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={selectedRows.indexOf(row.center) !== -1}
                              onChange={() => handleRowClick(row.center)}
                            />
                          </TableCell>
                          <TableCell align="center">{row.rollNo}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-start"
                              gap={1}
                            >
                              <Avatar src={row.avatar} />
                              {row.name}
                            </Box>
                          </TableCell>
                          <TableCell align="center">{row.gender}</TableCell>
                          <TableCell align="center">{row.center}</TableCell>
                          <TableCell align="center">{row.level}</TableCell>
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center">
                              <Typography
                                variant="body2"
                                color={
                                  row.status === 'Active'
                                    ? theme.palette.success.main
                                    : theme.palette.error.main
                                }
                                sx={{
                                  fontWeight: theme.typography.fontWeightBold,
                                  backgroundColor:
                                    row.status === 'Active'
                                      ? theme.palette.success.light
                                      : theme.palette.error.light,
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  width: 'fit-content',
                                }}
                              >
                                {row.status}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">{row.doj}</TableCell>
                          <TableCell align="center">{row.dob}</TableCell>
                          <TableCell align="center">
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
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  mt={2}
                >
                  <Button
                    size="large"
                    variant="text"
                    onClick={handlePrev}
                    disabled={page === 0}
                  >
                    Prev
                  </Button>
                  <Typography mx={1}>{page + 1}</Typography>
                  <Button
                    size="large"
                    variant="text"
                    onClick={handleNext}
                    disabled={
                      page >= Math.ceil(filteredRows.length / rowsPerPage) - 1
                    }
                  >
                    Next
                  </Button>
                </Box>
              </Paper>
            )}

            {/* Tab 4 Fees */}
            {tabValue === 3 && <Box>Academic details will show here!</Box>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDetails;
