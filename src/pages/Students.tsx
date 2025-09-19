import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Menu, { type MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { TbFileExport } from 'react-icons/tb';
import { RiFileExcel2Line } from 'react-icons/ri';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import IconButton from '@mui/material/IconButton';
import GridView from '../components/GridView';
import ListView from '../components/ListView';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const Students: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewToggle = (view: 'grid' | 'list') => {
    setActiveView(view);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Box
        flexGrow={1}
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        paddingLeft={0}
        paddingRight={0}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          All Students
        </Typography>
        <Box display={'flex'} gap={2}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<TbFileExport />}
            id="export-menu"
            aria-controls={open ? 'export-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Export Students
          </Button>
          <StyledMenu
            id="export-menu"
            slotProps={{
              list: {
                'aria-labelledby': 'export-menu',
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <PictureAsPdfOutlinedIcon />
              Export as PDF
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <RiFileExcel2Line
                style={{ marginRight: 12, width: 16, height: 16 }}
              />
              Export as Excel
            </MenuItem>
          </StyledMenu>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
          >
            Add Student
          </Button>
        </Box>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexGrow={1}
        p={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
          Students { activeView === 'grid' ? 'Grid' : 'List' }
        </Typography>
        <Box display={'flex'} gap={2}>
          <Box display={'flex'} alignItems="center" sx={{ border: '1px solid #E3E8EE', borderRadius: 1 }}>
            <IconButton
              aria-label="grid view"
              size="small"
              sx={{
                backgroundColor: activeView === 'grid' ? 'primary.main' : '#F9FAFB',
                color: activeView === 'grid' ? 'white' : 'inherit',
                borderRadius: 1,
                m: 0.5,
                '&:hover': { bgcolor: activeView === 'grid' ? 'primary.main' : '#F9FAFB', color: activeView === 'grid' ? 'white' : 'inherit'},
              }}
              onClick={() => handleViewToggle('grid')}
            >
              <GridViewOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="list view"
              size="small"
              sx={{
                backgroundColor: activeView === 'list' ? 'primary.main' : '#F9FAFB',
                color: activeView === 'list' ? 'white' : 'inherit',
                borderRadius: 1,
                m: 0.5,
                '&:hover': { bgcolor: activeView === 'list' ? 'primary.main' : '#F9FAFB', color: activeView === 'list' ? 'white' : 'inherit'},
              }}
              onClick={() => handleViewToggle('list')}
            >
              <ListAltOutlinedIcon />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<FilterAltOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<SwapVertOutlinedIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Sort by A-Z
          </Button>
        </Box>
      </Box>
      <Box flexGrow={1} p={2}>
        {activeView === 'grid' ? <GridView /> : <ListView />}
      </Box>
    </Box>
  );
};

export default Students;
