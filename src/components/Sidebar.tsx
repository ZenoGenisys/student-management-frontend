import React, { useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state';
import { PATH } from '../routes/path';

const drawerWidth = 240;

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
};

const Sidebar: React.FC<SidebarProps> = ({
  open
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = useMemo(() => [
    { text: 'Dashboard', icon: <DashboardIcon />, path: PATH.DASHBOARD },
    { text: 'Students', icon: <PeopleIcon />, path: PATH.STUDENTS },
  ], []);

  const handleLogout = useCallback(() => {
    logout();
    navigate(PATH.LOGIN);
  }, [logout, navigate]);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderLeft: `1px solid ${theme.palette.divider}`,
            borderRight: 'none',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pl: 2 }}
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
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
