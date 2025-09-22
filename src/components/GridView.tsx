import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useTheme } from '@mui/material/styles';

const GridView: React.FC = () => {
  const theme = useTheme();

  return (
    <Box marginTop={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardHeader
              title={
                <Typography sx={{ color: theme.palette.primary.main }}>
                  Roll No: 1
                </Typography>
              }
              action={
                <Box display={'flex'} alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    color={theme.palette.success.main}
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                      backgroundColor: theme.palette.success.light,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    Active
                  </Typography>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              }
            />
            <CardContent
              sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
            >
              <Box
                sx={{ backgroundColor: '#F9FAFB', borderRadius: 1 }}
                p={2}
                display={'flex'}
                alignItems="center"
              >
                <Avatar
                  alt="Ajith Kumar"
                  src="/src/assets/images/profile-photo.jpg"
                  sx={{ width: 45, height: 45 }}
                />
                <Box ml={2} display={'flex'} flexDirection="column">
                  <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                    Ajith Kumar
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Level: 1
                  </Typography>
                </Box>
              </Box>
              <Box
                mt={2}
                display={'flex'}
                flexDirection="row"
                justifyContent="space-around"
              >
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Center
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Puliyur
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Male
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Joined On
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    01 Jan 2020
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${theme.palette.divider}`,
                p: 2,
              }}
            >
              <Box>
                <IconButton
                  aria-label="Call"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                    mr: 1,
                  }}
                >
                  <CallOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="Message"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                    mr: 1,
                  }}
                >
                  <MessageOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="Mail"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                  }}
                >
                  <MailOutlineOutlinedIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 'bold', fontSize: 12 }}
                >
                  View Profile
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardHeader
              title={
                <Typography sx={{ color: theme.palette.primary.main }}>
                  Roll No: 2
                </Typography>
              }
              action={
                <Box display={'flex'} alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    color={theme.palette.error.main}
                    sx={{
                      fontWeight: theme.typography.fontWeightBold,
                      backgroundColor: theme.palette.error.light,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    Inactive
                  </Typography>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              }
            />
            <CardContent
              sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
            >
              <Box
                sx={{ backgroundColor: '#F9FAFB', borderRadius: 1 }}
                p={2}
                display={'flex'}
                alignItems="center"
              >
                <Avatar
                  alt="Rajesh"
                  src="/src/assets/images/profile-photo.jpg"
                  sx={{ width: 45, height: 45 }}
                />
                <Box ml={2} display={'flex'} flexDirection="column">
                  <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                    Rajesh
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Level: 3
                  </Typography>
                </Box>
              </Box>
              <Box
                mt={2}
                display={'flex'}
                flexDirection="row"
                justifyContent="space-around"
              >
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Center
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Karur
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Female
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Joined On
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    01 Jan 2019
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${theme.palette.divider}`,
                p: 2,
              }}
            >
              <Box>
                <IconButton
                  aria-label="Call"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                    mr: 1,
                  }}
                >
                  <CallOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="Message"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                    mr: 1,
                  }}
                >
                  <MessageOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="Mail"
                  size="medium"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 5,
                  }}
                >
                  <MailOutlineOutlinedIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 'bold', fontSize: 12 }}
                >
                  View Profile
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridView;
