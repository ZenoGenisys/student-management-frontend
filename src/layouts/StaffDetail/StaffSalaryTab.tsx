import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { ColumnDefsProps } from '../../types';
import ListView from '../../components/ListView';
import Search from '../../components/Search';

const mockSalaryData = [
  {
    paymentId: 'PAY-001',
    salaryFor: 'January 2024',
    date: '2024-02-01',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    netSalary: 5000,
  },
  {
    paymentId: 'PAY-002',
    salaryFor: 'January 2025',
    date: '2024-02-01',
    status: 'Pending',
    paymentMethod: '-',
    netSalary: 5000,
  },
];

const StaffSalaryTab: React.FC = () => {
  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'paymentId', label: 'Payment ID', sortable: true },
      { id: 'salaryFor', label: 'Salary For', sortable: true },
      { id: 'date', label: 'Date', sortable: true },
      { id: 'status', label: 'Status', sortable: true },
      { id: 'paymentMethod', label: 'Payment Method', sortable: true },
      { id: 'netSalary', label: 'Net Salary', sortable: true },
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
          Salary
        </Typography>
        <Search search={''} />
      </Box>
      <ListView columns={Column} rows={mockSalaryData} getRowId={(row) => row.paymentId} />
    </Paper>
  );
};

export default StaffSalaryTab;
