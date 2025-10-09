import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa6';
import { useTheme } from '@mui/material/styles';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

type ContactDetailsProps = {
  contactNumber?: string;
  email?: string;
};

const ContactDetails = ({ contactNumber, email }: ContactDetailsProps) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Primary Contact Details</Typography>} />
      <CardContent
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          display={'flex'}
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          gap={2}
          border={`1px solid ${theme.palette.divider}`}
          borderRadius={1}
          p={1}
        >
          <Box display={'flex'} flexDirection="row" alignItems="center" gap={2}>
            <PhoneAndroidOutlinedIcon />
            <Box>
              <Typography variant="h6">Mobile Number</Typography>
              <Typography variant="body2" color="text.secondary">
                {contactNumber}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              aria-label="Call"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 5,
                mr: 1,
              }}
              component="a"
              href={contactNumber ? `tel:${contactNumber}` : undefined}
              disabled={!contactNumber}
            >
              <CallOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="Call"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 5,
                mr: 1,
              }}
              component="a"
              href={contactNumber ? `https://wa.me/${contactNumber}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!contactNumber}
            >
              <FaWhatsapp />
            </IconButton>
          </Box>
        </Box>

        <Box
          display={'flex'}
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          gap={2}
          border={`1px solid ${theme.palette.divider}`}
          borderRadius={1}
          p={1}
        >
          <Box display={'flex'} flexDirection="row" alignItems="center" gap={2}>
            <EmailOutlinedIcon />
            <Box>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              aria-label="Mail"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 5,
                mr: 1,
              }}
              component="a"
              href={email ? `mailto:${email}` : undefined}
              disabled={!email}
            >
              <ForwardToInboxOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
