import Box from '@mui/material/Box';
import type { CellRender, StaffType } from '../../types';
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useState } from 'react';
import DeleteConfirmation from '../DeleteConfirmation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

type ActionCellProps = CellRender<StaffType> & {
  onClickView: (row: StaffType) => void;
  onClickEdit: (row: StaffType) => void;
  onClickDelete: (row: StaffType) => void;
};
const ActionCell = ({ row, onClickView, onClickEdit, onClickDelete }: ActionCellProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleConfirm = useCallback(() => {
    onClickDelete(row);
    setOpenDeleteConfirm(false);
    handleClose();
  }, [onClickDelete, row, handleClose]);

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
        }}
        component="a"
        href={row.email ? `mailto:${row.email}` : undefined}
        disabled={!row.email}
      >
        <MailOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={() => onClickView(row)}><VisibilityOutlinedIcon />View</MenuItem>
        <MenuItem onClick={() => onClickEdit(row)}><EditOutlinedIcon />Edit</MenuItem>
        <MenuItem onClick={() => setOpenDeleteConfirm(true)}><DeleteOutlinedIcon />Delete</MenuItem>
      </Menu>
      <DeleteConfirmation
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default ActionCell;
