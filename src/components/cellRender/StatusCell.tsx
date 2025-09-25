import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { CellRender, StaffType, StudentType } from '../../types';
import { useTheme } from '@mui/material/styles';

const StatusCell = ({ row }: CellRender<StaffType | StudentType>) => {
  const theme = useTheme();
  return (
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
  );
};

export default StatusCell;
