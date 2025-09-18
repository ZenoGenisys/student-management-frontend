import React from 'react';
import {
  Drawer,
  List,
  Box,
  Typography,
  Divider,
  useTheme,
  styled,
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  DashboardOutlined,
  PeopleAltOutlined,
  SchoolOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state';
import { PATH } from '../routes/path';
import { DRAWER_WIDTH } from '../constants/layout';

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
  const { pathname } = window.location; // Get current path

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlined />, path: PATH.DASHBOARD },
    { text: 'Students', icon: <SchoolOutlined />, path: PATH.STUDENTS },
    { text: 'Teachers', icon: <PeopleAltOutlined /> },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
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
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor: pathname === item.path ? '#F2F5FF' : 'transparent',
                  color: pathname === item.path ? '#3D5EE1' : 'inherit',
                  transition: theme.transitions.create(['background-color', 'transform', 'color'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: '#3D5EE1',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                    color: pathname === item.path ? '#3D5EE1' : 'inherit',
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
      </Drawer>
    </Box>
  );
};

export default Sidebar;
