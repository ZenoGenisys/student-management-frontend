import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { ColumnDefsProps } from '../../types';
import ListView from '../ListView';
import Search from '../Search';

const mockSalaryData = [
  {
    sno: '01',
    level: '1',
    status: 'Completed',
    date: '2024-02-01',
  },
  {
    sno: '02',
    level: '2',
    status: 'Pending',
    date: '-',
  },
];

const StaffAcademicTab: React.FC = () => {
  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'sno', label: 'SNO', sortable: true },
      { id: 'level', label: 'Level', sortable: true },
      { id: 'status', label: 'Status', sortable: true },
      { id: 'date', label: 'Date', sortable: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
      },
    ],
    [],
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
        <Search search={''} />
      </Box>
      <ListView columns={Column} rows={mockSalaryData} />
    </Paper>
  );
};

export default StaffAcademicTab;
