import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FastField, type FieldProps } from 'formik';
import React, { useCallback } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TitleCard } from '../../components';
import { useSnackbar } from '../../state';
import Avatar from '@mui/material/Avatar';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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
    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 4 }}>
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

type AvatarUploadProps = {
  file?: File | string | null;
  onChange: (event: File) => void;
  onClear: () => void;
};

export const AvatarUpload = ({ file, onChange, onClear }: AvatarUploadProps) => {
  const { showSnackbar } = useSnackbar();
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files?.[0];
      if (!files) return;
      if (files.size > 4 * 1024 * 102) {
        showSnackbar({
          message: 'file size should be less than 4MB',
          severity: 'info',
        });
      } else if (!['image/jpeg', 'image/png'].includes(files.type)) {
        showSnackbar({
          message: 'File type should be JPG or PNG',
          severity: 'info',
        });
      } else {
        onChange(files);
      }
    },
    [showSnackbar, onChange],
  );

  return (
    <Box display="flex" gap={1} mb={3}>
      {file ? (
        <img
          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
          alt="Avatar"
          style={{
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      ) : (
        <Avatar
          src="/static/images/avatar/1.jpg"
          sx={{ width: 80, height: 80 }}
          variant="circular"
        />
      )}

      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            component="label"
            sx={{ p: '4px 8px' }}
            startIcon={<UploadFileOutlinedIcon />}
          >
            Upload Avatar
            <input type="file" hidden onChange={handleFileUpload} accept="image/*" />
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ p: '4px 8px' }}
            onClick={onClear}
            disabled={!file}
          >
            Remove
          </Button>
        </Box>
        <Typography variant="caption">File must be JPG or PNG format, up to 4 MB.</Typography>
      </Box>
    </Box>
  );
};

type AcademyDocumentUploadProps = {
  file?: File | string | null;
  onChange: (event: File) => void;
  onClear: () => void;
};

export const AcademyDocumentUpload = ({ file, onChange, onClear }: AcademyDocumentUploadProps) => {
  const { showSnackbar } = useSnackbar();
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files?.[0];
      if (!files) return;
      // Corrected 4MB calculation
      if (files.size > 4 * 1024 * 1024) {
        showSnackbar({
          message: 'file size should be less than 4MB',
          severity: 'info',
        });
      } else if (
        ![
          'image/jpeg',
          'image/png',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(files.type)
      ) {
        showSnackbar({
          message: 'File type should be JPG, PNG, PDF, DOC, or DOCX',
          severity: 'info',
        });
      } else {
        onChange(files);
      }
    },
    [showSnackbar, onChange],
  );

  const renderFilePreview = () => {
    if (file) {
      return (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            width: 'fit-content',
            height: 'auto',
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
          }}
        >
          <DescriptionOutlinedIcon sx={{ fontSize: 40 }} />
          <Typography variant="caption" noWrap>
            {typeof file === 'string' ? file.split('/').pop() : file.name}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box display="flex" gap={1} mb={3} flexDirection="column">
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            component="label"
            sx={{ p: '4px 8px' }}
            startIcon={<UploadFileOutlinedIcon />} // Added icon
          >
            Upload Document {/* Changed text */}
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ p: '4px 8px' }}
            onClick={onClear}
            disabled={!file} // Disable remove if no file
          >
            Remove
          </Button>
        </Box>
        <Typography variant="caption">
          File must be JPG, PNG, PDF, DOC, or DOCX format, up to 4 MB.
        </Typography>
      </Box>

      {renderFilePreview()}
    </Box>
  );
};
