import { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { ColumnDefsProps, LevelDetails } from '../../types';
import ListView from '../../components/ListView';
import dayjs from 'dayjs';

type AcademicDetailsProps = {
  data?: LevelDetails[];
};

const Column: ColumnDefsProps[] = [
  { id: 'level', label: 'Level' },
  { id: 'date', label: 'Completed Date', dateFormat: true },
  { id: 'document', label: 'View Document' },
  { id: 'remarks', label: 'Remarks' },
];

const AcademicDetails = ({ data = [] }: AcademicDetailsProps) => {
  const row = useMemo(
    () =>
      data.map((lvl) => ({
        ...lvl,
        date: lvl.date ? dayjs(lvl.date).format('YYYY-MM-DD') : null,
      })),
    [data],
  );

  return (
    <Paper>
      <Box
        flexGrow={1}
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        sx={{ border: '1px solid #E3E8EE', backgroundColor: '#E9EDF4' }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Academic Details
        </Typography>
      </Box>
      <ListView columns={Column} rows={row} showCheckbox={false} />
    </Paper>
  );
};

export default AcademicDetails;
