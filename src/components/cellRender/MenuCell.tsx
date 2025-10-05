import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteConfirmation from '../DeleteConfirmation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useState } from 'react';

type MenuCellProps = {
  id: number;
  onClickView?: (id: number) => void;
  onClickEdit?: (id: number) => void;
  onClickDelete?: (id: number) => void;
};

const MenuCell = ({ id, onClickView, onClickEdit, onClickDelete }: MenuCellProps) => {
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
    onClickDelete?.(id);
    setOpenDeleteConfirm(false);
    handleClose();
  }, [onClickDelete, id, handleClose]);

  const handleView = useCallback(() => {
    onClickView?.(id);
  }, [id, onClickView]);

  const handleEdit = useCallback(() => {
    onClickEdit?.(id);
  }, [id, onClickEdit]);

  const handleDeleteModal = useCallback(() => {
    setOpenDeleteConfirm((prev) => !prev);
  }, []);

  return (
    <>
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
        <MenuItem onClick={handleView}>
          <VisibilityOutlinedIcon />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditOutlinedIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteModal}>
          <DeleteOutlinedIcon />
          Delete
        </MenuItem>
      </Menu>
      <DeleteConfirmation
        open={openDeleteConfirm}
        onClose={handleDeleteModal}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default MenuCell;
