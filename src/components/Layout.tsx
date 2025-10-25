import { useState, useEffect } from 'react';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { DRAWER_WIDTH, MOBILE_BREAKPOINT, APPBAR_HEIGHT } from '../constants/layout';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'show' })<{
  open?: boolean;
  show?: boolean;
}>(({ theme, open, show }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(2),
  minHeight: `calc(100vh - ${APPBAR_HEIGHT}px)`,
  backgroundColor: theme.palette.background.default,
  zIndex: 1,
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : 'translateY(20px)',
  transition: theme.transitions.create(['margin', 'width', 'opacity', 'transform'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
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
  const [open, setOpen] = useState(false);
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    // Initial delay to wait for dashboard to start loading
    const layoutTimer = setTimeout(() => {
      setShowLayout(true);
      // Open sidebar after layout is visible (for desktop)
      if (!isMobile) {
        setTimeout(() => setOpen(true), 300);
      }
    }, 600); // Start after background begins to fade in

    return () => clearTimeout(layoutTimer);
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
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          position: 'relative',
          pt: `${APPBAR_HEIGHT}px`,
        }}
      >
        <Main open={open} show={showLayout}>
          <Outlet />
        </Main>
      </Box>
    </Box>
  );
};

export default Layout;
