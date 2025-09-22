import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import Avatar from '@mui/material/Avatar';

const NameCell = ({ row }: CellRender<StaffType>) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
      <Avatar src={''} />
      {row.name}
    </Box>
  );
};

export default NameCell;
