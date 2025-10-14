import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FastField, type FieldProps } from 'formik';
import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { TitleCard } from '../../components';

export const AddressForm = React.memo(() => (
  <TitleCard
    title={'Address'}
    icon={<HomeOutlinedIcon sx={{ mr: 1, background: '#fff', p: '2px', borderRadius: '5px' }} />}
  >
    <Grid container spacing={2} mt={2}>
      <Grid size={{ xs: 12 }}>
        <FastField name="address">
          {({ field, meta }: FieldProps<string>) => (
            <FormControl fullWidth>
              <textarea
                {...field}
                style={{
                  width: '100%',
                  minHeight: 100,
                  resize: 'vertical',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: 8,
                }}
                placeholder="Address..."
              />
              {meta.touched && meta.error && (
                <Typography color="error" variant="caption">
                  {meta.error}
                </Typography>
              )}
            </FormControl>
          )}
        </FastField>
      </Grid>
    </Grid>
  </TitleCard>
));

export const AdditionalDetailsForm = React.memo(() => (
  <Grid container spacing={2} mt={2}>
    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <FastField name="additionalDetails">
        {({ field, meta }: FieldProps<string>) => (
          <FormControl fullWidth>
            <Typography mb={1} variant="h6">
              Additional Details
            </Typography>
            <textarea
              {...field}
              style={{
                width: '100%',
                minHeight: 100,
                resize: 'vertical',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: 8,
              }}
              placeholder="Add additional notes here..."
            />
            {meta.touched && meta.error && (
              <Typography color="error" variant="caption">
                {meta.error}
              </Typography>
            )}
          </FormControl>
        )}
      </FastField>
    </Grid>
  </Grid>
));

export const AvatarUpload = React.memo(() => (
  <Box display="flex" gap={1} mb={3}>
    <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }} variant="square" />
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" gap={1}>
        <Button variant="outlined" color="primary" size="medium" sx={{ p: '4px 8px' }}>
          Upload
        </Button>
        <Button variant="contained" color="primary" size="medium" sx={{ p: '4px 8px' }}>
          Remove
        </Button>
      </Box>
      <Typography variant="caption">Upload image size 4MB, Format JPG, PNG</Typography>
    </Box>
  </Box>
));
