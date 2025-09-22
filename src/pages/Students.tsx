import Box from '@mui/material/Box';
import React, { useState } from 'react';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GridFilter, GridHeader } from '../layouts';

const Students: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [activeView, setActiveView] = useState<'grid' | 'list'>(
    isMobile ? 'grid' : 'list',
  );
  const handleViewToggle = (view: 'grid' | 'list') => {
    setActiveView(view);
  };
  return (
    <Box display="flex" flexDirection="column">
      <GridHeader title="Students" />
      <GridFilter activeView={activeView} handleViewToggle={handleViewToggle} />
      <Box flexGrow={1}>
        {activeView === 'grid' ? <GridView /> : <ListView />}
      </Box>
    </Box>
  );
};

export default Students;
