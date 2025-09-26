import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DRAWER_WIDTH } from '../constants/layout';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Button from '@mui/material/Button';
import { useAuth } from '../state';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getAvatarProps } from '../utils/avatar';
import logo from "../assets/images/logo.png";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !isMobile && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

interface AppbarProps {
  readonly open: boolean;
  readonly isMobile: boolean;
  readonly handleDrawerOpen: () => void;
  readonly handleDrawerClose: () => void;
}

export default function Appbar({
  open,
  isMobile,
  handleDrawerOpen,
  handleDrawerClose,
}: AppbarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { logout, name, role } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(PATH.LOGIN);
  };

  const theme = useTheme();

  const menuId = 'account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar alt="profile" src="/src/assets/images/profile-photo.jpg" sx={{ mr: 1 }} />
          <Box>
          <Avatar
            alt="profile"
            src=""
            {...getAvatarProps(`${name}`)}
          />
          <Box ml={1}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="primary">
              {role}
            </Typography>
          </Box>
        </Box>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Button
          variant="outlined"
          color="error"
          endIcon={<ExitToAppOutlinedIcon sx={{ color: theme.palette.error.main || 'red' }} />}
          sx={{ fontSize: '1rem', width: '100%' }}
        >
          Logout
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed" open={open} isMobile={isMobile}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              alt="logo"
              src={logo}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                padding: 0.5,
                objectFit: 'contain',
                bgcolor: 'transparent',
              }}
            />
            <Typography variant="h3">Brainybobs</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <MenuItem onClick={handleProfileMenuOpen}>
              <Avatar
                alt="profile"
                src=""
                {...getAvatarProps(`${name}`)}
              />
            </MenuItem>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMenu}
    </Box>
  );
}
