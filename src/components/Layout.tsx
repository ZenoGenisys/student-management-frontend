import { useState, useEffect } from 'react';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { DRAWER_WIDTH, MOBILE_BREAKPOINT, APPBAR_HEIGHT } from '../constants/layout';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  minHeight: `calc(100vh - ${APPBAR_HEIGHT}px)`,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up(MOBILE_BREAKPOINT)]: {
    ...(open && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Appbar 
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isMobile={isMobile}
      />
      <Sidebar open={open} isMobile={isMobile} onClose={handleDrawerClose} />
      <Box sx={{ 
        display: 'flex', 
        flexGrow: 1, 
        position: 'relative',
        pt: `${APPBAR_HEIGHT}px`
      }}>
        <Main open={open}>
          <Outlet />
        </Main>
      </Box>
    </Box>
  );
};

export default Layout;
