import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import Avatar from '@mui/material/Avatar';
import { getAvatarProps } from '../../utils/avatar';

const NameCell = ({ row }: CellRender<StaffType>) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
      <Avatar src="" {...getAvatarProps(`${row.name}`)} />
      {row.name}
    </Box>
  );
};

export default NameCell;
