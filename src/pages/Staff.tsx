import Box from '@mui/material/Box';
import React, { useCallback, useEffect } from 'react';
import { getStaff } from '../repositories';

const Staff: React.FC = () => {
  const get = useCallback(async () => {
    const response = await getStaff({ page: 1, size: 10 });
    console.log(response);
  }, []);
  useEffect(() => {
    get();
  }, [get]);

  return <Box>Staff Page - To be implemented</Box>;
};

export default Staff;
