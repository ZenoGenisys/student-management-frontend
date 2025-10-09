import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import Avatar from '@mui/material/Avatar';
import { getAvatarProps } from '../../utils/avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { PATH } from '../../routes';

const NameCell = ({ row }: CellRender<StaffType>) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
      <Avatar src="" {...getAvatarProps(`${row.name}`)} />
      <Link component={RouterLink} to={PATH.STAFF_DETAILS.replace(':staffId', String(row.staffId))}>
        {row.name}
      </Link>
    </Box>
  );
};

export default NameCell;
