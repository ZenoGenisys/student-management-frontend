import React from 'react';
import {
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
import { FaDownload } from 'react-icons/fa6';

interface StaffdataProps {
  address: string | undefined;
  additionalDetails: string | undefined;
}

const StaffDetailsTab: React.FC<StaffdataProps> = ({ address, additionalDetails }) => {
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

      {/* Documents */}
      <Card>
        <CardHeader title={<Typography variant="h5">Documents</Typography>} />
        <CardContent
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid
            container
            spacing={2}
            flexDirection={'row'}
            alignItems="center"
          >
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

export default StaffDetailsTab;
