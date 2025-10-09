import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, useTheme } from '@mui/material';
import { getAvatarProps } from '../../utils';
import ContactDetails from './ContactDetails';

type BasicDetailsProps = {
  name: string;
  status: 'Active' | 'Inactive';
  data: { [key: string]: string | number };
  contactNumber: string;
  email: string;
};

const BasicDetails = ({ name, status, data, contactNumber, email }: BasicDetailsProps) => {
  const theme = useTheme();
  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent={'flex-start'}
            gap={2}
          >
            <Avatar
              src=""
              {...getAvatarProps(`${name}`, { width: 80, height: 80 })}
              variant="square"
            />
            <Box>
              <Typography variant="h4" mb={1}>
                {name}
              </Typography>
              <Typography
                variant="body2"
                color={status === 'Active' ? theme.palette.success.main : theme.palette.error.main}
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  backgroundColor:
                    status === 'Active' ? theme.palette.success.light : theme.palette.error.light,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  width: 'fit-content',
                }}
              >
                {status}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" mb={2}>
            Basic Information
          </Typography>
          <Box>
            {Object.keys(data).map((key) => (
              <Grid container spacing={2} columns={12} mb={1} key={key}>
                <Grid size={6}>
                  <b>{key}:</b>
                </Grid>
                <Grid size={6}>{data[key]}</Grid>
              </Grid>
            ))}
          </Box>
        </CardContent>
      </Card>
      <ContactDetails contactNumber={contactNumber} email={email} />
    </>
  );
};

export default BasicDetails;
