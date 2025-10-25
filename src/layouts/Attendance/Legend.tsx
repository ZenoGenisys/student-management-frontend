import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Legend = () => (
  <Box display="flex" gap={2} flexWrap="wrap">
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#2e7d32' }} />
      <Typography variant="caption">Student Present</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#d32f2f' }} />
      <Typography variant="caption">Student Absent</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#0288d1' }} />
      <Typography variant="caption">Staff Present</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#ed6c02' }} />
      <Typography variant="caption">Staff Absent</Typography>
    </Box>
  </Box>
);

export default Legend;
