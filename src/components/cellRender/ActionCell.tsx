import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import { useTheme } from '@mui/material/styles';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const ActionCell = ({ row }: CellRender<StaffType>) => {
  const theme = useTheme();
  return (
    <Box>
      {/* Call button: uses tel: link */}
      <IconButton
        aria-label="Call"
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          mr: 1,
        }}
        component="a"
        href={row.contactNumber ? `tel:${row.contactNumber}` : undefined}
        disabled={!row.contactNumber}
      >
        <CallOutlinedIcon />
      </IconButton>
      {/* WhatsApp message button: uses wa.me link */}
      <IconButton
        aria-label="Message"
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          mr: 1,
        }}
        component="a"
        href={
          row.contactNumber ? `https://wa.me/${row.contactNumber}` : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
        disabled={!row.contactNumber}
      >
        <MessageOutlinedIcon />
      </IconButton>
      {/* Email button: uses mailto: link */}
      <IconButton
        aria-label="Mail"
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
        }}
        component="a"
        href={row.email ? `mailto:${row.email}` : undefined}
        disabled={!row.email}
      >
        <MailOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

export default ActionCell;
