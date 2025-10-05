import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import MenuCell from './MenuCell';

type ActionCellProps = CellRender<StaffType> & {
  onClickView: (id: number) => void;
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
};
const ActionCell = ({ row, onClickView, onClickEdit, onClickDelete }: ActionCellProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" gap={1}>
      {/* Call button: uses tel: link */}
      <IconButton
        aria-label="Call"
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          p: '8px',
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
          p: '8px',
        }}
        component="a"
        href={row.contactNumber ? `https://wa.me/${row.contactNumber}` : undefined}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!row.contactNumber}
      >
        <WhatsAppIcon />
      </IconButton>
      {/* Email button: uses mailto: link */}
      <IconButton
        aria-label="Mail"
        size="small"
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          p: '8px',
        }}
        component="a"
        href={row.email ? `mailto:${row.email}` : undefined}
        disabled={!row.email}
      >
        <MailOutlineOutlinedIcon />
      </IconButton>
      <MenuCell
        id={row?.staffId}
        onClickView={onClickView}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </Box>
  );
};

export default ActionCell;
