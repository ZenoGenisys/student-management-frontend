import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { getAvatarProps } from '../../utils/avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

type Props = {
  name: string;
  profileUrl?: string | null;
  redirectionUrl: string;
};

const NameCell = ({ name, profileUrl, redirectionUrl }: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
      <Avatar
        src={profileUrl ?? ''}
        {...getAvatarProps(`${name}`)}
        sx={{
          objectFit: 'fill',
          objectPosition: 'center',
        }}
      />
      <Link component={RouterLink} to={redirectionUrl}>
        {name}
      </Link>
    </Box>
  );
};

export default NameCell;
