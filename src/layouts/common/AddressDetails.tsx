import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { GrDocumentPdf } from 'react-icons/gr';
import { FaDownload, FaWhatsapp } from 'react-icons/fa6';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

type AddressDetailsProps = {
  address?: string;
  additionalDetails?: string;
  parentDetails?: { [key: string]: string | number | undefined };
};

const AddressDetails = ({ address, additionalDetails, parentDetails }: AddressDetailsProps) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} flexDirection="column" gap={2}>
      <Grid container spacing={2} columns={12}>
        {/* Address */}
        <Grid size={12}>
          <Card>
            <CardHeader title={<Typography variant="h5">Address</Typography>} />
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CottageOutlinedIcon />
              <Typography variant="body1">{address}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Parents Details */}
      {parentDetails && (
        <Card>
          <CardHeader
            sx={{ background: '#E9EDF4' }}
            title={<Typography variant="h5">Parents Information</Typography>}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid
              container
              alignItems="center"
              spacing={2}
              p={2}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
              size={12}
            >
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
                size={{ xs: 12, sm: 12, md: 3 }}
              >
                <Avatar variant="square" sx={{ borderRadius: 1 }}>
                  {parentDetails['Father Name'] ? String(parentDetails['Father Name']).charAt(0) : ''}
                </Avatar>
                <Box>
                  <Typography variant="h6">{parentDetails['Father Name']}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Father
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body2" color="text.secondary">
                  {parentDetails['Father Phone Number']}
                </Typography>
              </Grid>

              <Grid
                display={'flex'}
                flexDirection="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={0.5}
                size={{ xs: 12, sm: 12, md: 4 }}
              >
                <Box>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {parentDetails['Father Email']}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                display={'flex'}
                flexDirection="row"
                justifyContent={'flex-end'}
                alignItems={'center'}
                gap={0.5}
                size={{ xs: 12, sm: 12, md: 2 }}
              >
                <Box>
                  <IconButton
                    aria-label="Call"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                    component="a"
                    href={
                      parentDetails['Father Phone Number']
                        ? `tel:${parentDetails['Father Phone Number']}`
                        : undefined
                    }
                    disabled={!parentDetails['Father Phone Number']}
                  >
                    <CallOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Message"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                    component="a"
                    href={
                      parentDetails['Father Phone Number']
                        ? `https://wa.me/${parentDetails['Father Phone Number']}`
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!parentDetails['Father Phone Number']}
                  >
                    <FaWhatsapp />
                  </IconButton>
                  <IconButton
                    aria-label="Mail"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                    }}
                    component="a"
                    href={
                      parentDetails['Father Email']
                        ? `mailto:${parentDetails['Father Email']}`
                        : undefined
                    }
                    disabled={!parentDetails['Father Email']}
                  >
                    <MailOutlineOutlinedIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              alignItems="center"
              spacing={2}
              p={2}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
              size={12}
            >
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
                size={{ xs: 12, sm: 12, md: 3 }}
              >
                <Avatar variant="square" sx={{ borderRadius: 1 }}>
                  {parentDetails['Mother Name'] ? String(parentDetails['Mother Name']).charAt(0) : ''}
                </Avatar>
                <Box>
                  <Typography variant="h6">{parentDetails['Mother Name']}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mother
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body2" color="text.secondary">
                  {parentDetails['Mother Phone Number']}
                </Typography>
              </Grid>

              <Grid
                display={'flex'}
                flexDirection="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={0.5}
                size={{ xs: 12, sm: 12, md: 4 }}
              >
                <Box>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {parentDetails['Mother Email']}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                display={'flex'}
                flexDirection="row"
                justifyContent={'flex-end'}
                alignItems={'center'}
                gap={0.5}
                size={{ xs: 12, sm: 12, md: 2 }}
              >
                <Box>
                  <IconButton
                    aria-label="Call"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                    component="a"
                    href={
                      parentDetails['Mother Phone Number']
                        ? `tel:${parentDetails['Mother Phone Number']}`
                        : undefined
                    }
                    disabled={!parentDetails['Mother Phone Number']}
                  >
                    <CallOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Message"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                      mr: 1,
                    }}
                    component="a"
                    href={
                      parentDetails['Mother Phone Number']
                        ? `https://wa.me/${parentDetails['Mother Phone Number']}`
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!parentDetails['Mother Phone Number']}
                  >
                    <FaWhatsapp />
                  </IconButton>
                  <IconButton
                    aria-label="Mail"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 5,
                    }}
                    component="a"
                    href={
                      parentDetails['Mother Email']
                        ? `mailto:${parentDetails['Mother Email']}`
                        : undefined
                    }
                    disabled={!parentDetails['Mother Email']}
                  >
                    <MailOutlineOutlinedIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card>
        <CardHeader title={<Typography variant="h5">Documents</Typography>} />
        <CardContent
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid container spacing={2} flexDirection={'row'} alignItems="center">
            <Grid
              p={1}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}
            >
              <Box display="flex" alignItems={'center'} gap={1}>
                <GrDocumentPdf />
                <Typography variant="body1">Birth Certificate.pdf</Typography>
              </Box>
              <IconButton aria-label="download" size="medium">
                <FaDownload />
              </IconButton>
            </Grid>

            <Grid
              p={1}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}
            >
              <Box display="flex" alignItems={'center'} gap={1}>
                <GrDocumentPdf />
                <Typography variant="body1">Competition Certificate.pdf</Typography>
              </Box>
              <IconButton aria-label="download" size="medium">
                <FaDownload />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader title={<Typography variant="h5">Notes</Typography>} />
        <CardContent
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <TextareaAutosize
            maxRows={4}
            aria-label="Text area"
            placeholder="Add additional notes here..."
            defaultValue={additionalDetails}
            disabled
            style={{
              width: '100%',
              minHeight: 100,
              resize: 'vertical',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              padding: 8,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddressDetails;
