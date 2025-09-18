import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  styled,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state';
import { PATH } from '../routes/path';
import { DRAWER_WIDTH, APPBAR_HEIGHT } from '../constants/layout';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

type SidebarProps = {
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  open,
  isMobile,
  onClose
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: PATH.DASHBOARD },
    { text: 'Students', icon: <PeopleIcon />, path: PATH.STUDENTS },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate(PATH.LOGIN);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderLeft: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
            borderRight: 'none',
            top: isMobile ? APPBAR_HEIGHT : 0,
            height: isMobile ? `calc(100% - ${APPBAR_HEIGHT}px)` : '100%',
            transition: theme.transitions.create(['width', 'margin', 'transform'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeader>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pl: 2 }}>
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
                transition: theme.transitions.create(['transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography 
              variant="h3"
              sx={{
                opacity: open ? 1 : 0,
                transition: theme.transitions.create(['opacity'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              Brainybobs
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  transition: theme.transitions.create(['background-color', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                    transition: theme.transitions.create(['color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: theme.transitions.create(['opacity'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                px: 2.5,
                transition: theme.transitions.create(['background-color', 'transform'], {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  transform: 'translateX(4px)',
                  backgroundColor: 'rgba(255, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: theme.palette.error.main,
                  transition: theme.transitions.create(['color'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  transition: theme.transitions.create(['opacity'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '.MuiTypography-root': {
                    color: theme.palette.error.main,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
