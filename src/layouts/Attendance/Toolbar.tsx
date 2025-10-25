import { type ToolbarProps } from 'react-big-calendar';
import { type AttendanceEvent } from '../../types/events';
import { Box, Button, ButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback } from 'react';

const Toolbar = (toolbar: ToolbarProps<AttendanceEvent, object>) => {
  const today = new Date();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isNextDisabled = () => {
    const nextDate = new Date(toolbar.date);

    switch (toolbar.view) {
      case 'month':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'week':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'day':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      default:
        break;
    }

    return nextDate > today;
  };

  const navigate = useCallback(
    (action: 'PREV' | 'NEXT' | 'TODAY') => {
      toolbar.onNavigate(action);
    },
    [toolbar],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <ButtonGroup variant="outlined" size={isMobile ? 'small' : 'medium'}>
        <Button onClick={() => navigate('PREV')}>Back</Button>
        <Button onClick={() => navigate('TODAY')}>Today</Button>
        <Button onClick={() => navigate('NEXT')} disabled={isNextDisabled()}>
          Next
        </Button>
      </ButtonGroup>

      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        {toolbar.label}
      </Typography>
    </Box>
  );
};

export default Toolbar;
