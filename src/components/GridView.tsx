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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import type { GridViewProps } from '../types';
import { getAvatarProps } from '../utils/avatar';
import { useNavigate } from 'react-router-dom';

const GridView: React.FC<GridViewProps> = ({ type, rows }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box marginTop={3}>
      <Grid container spacing={2}>
        {rows.map((row, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`Grid${row?.staffId || index}`}>
            <Card sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <CardHeader
                title={
                  <Typography sx={{ color: theme.palette.primary.main }}>
                    {type === 'STAFF'
                      ? `Staff Id: ${row?.staffId ?? ''}`
                      : `Roll No: ${row?.studentId ?? ''}`}
                  </Typography>
                }
                action={
                  <Box display={'flex'} alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      color={
                        row?.status === 'Active'
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                      sx={{
                        fontWeight: theme.typography.fontWeightBold,
                        backgroundColor:
                          row?.status === 'Active'
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {row?.status}
                    </Typography>
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                <Box
                  sx={{ backgroundColor: '#F9FAFB', borderRadius: 1 }}
                  p={2}
                  display={'flex'}
                  alignItems="center"
                >
                  <Avatar src="" {...getAvatarProps(`${row.name}`)} />
                  <Box ml={2} display={'flex'} flexDirection="column">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>{row?.name}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      Level: {row?.level}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={2} display={'flex'} flexDirection="row" justifyContent="space-around">
                  <Box>
                    <Typography variant="body1" color="textSecondary">
                      Center
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      {row?.center}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" color="textSecondary">
                      Gender
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      {row?.gender}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" color="textSecondary">
                      Joined On
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      {row?.joiningDate}
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
                    component="a"
                    href={row.contactNumber ? `tel:${row.contactNumber}` : undefined}
                    disabled={!row.contactNumber}
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
                    component="a"
                    href={row.contactNumber ? `https://wa.me/${row.contactNumber}` : undefined}
                    disabled={!row.contactNumber}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Mail"
                    size="medium"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                    }}
                    component="a"
                    href={row.email ? `mailto:${row.email}` : undefined}
                    disabled={!row.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MailOutlineOutlinedIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: 'bold', fontSize: 12 }}
                    onClick={() => navigate(`/staff/${row.staffId}`)}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridView;
