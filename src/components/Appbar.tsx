import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DRAWER_WIDTH } from '../constants/layout';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useAuth } from '../state';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(PATH.LOGIN);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>
        <Button variant="outlined" color="error" endIcon={<LogoutIcon />}>
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
              src="/src/assets/images/logo.png"
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
          <Search sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <MenuItem onClick={handleProfileMenuOpen}>
              <Avatar
                alt="profile"
                src="/src/assets/images/profile-photo.jpg"
              />
            </MenuItem>
          </Box>
        </Toolbar>
      </StyledAppBar>
      {renderMenu}
    </Box>
  );
}
