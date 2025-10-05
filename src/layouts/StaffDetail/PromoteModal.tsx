import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from '../../state';
import { promoteStaff } from '../../repositories';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PromoteModalProps = {
  staffId: number;
  open: boolean;
  onClose: () => void;
  role: 'ADMIN' | 'STAFF' | null;
  onPromoteSuccess?: () => void;
};

const validationSchema = Yup.object({
  role: Yup.string().oneOf(['ADMIN', 'STAFF']).required('Role is required'),
  password: Yup.string().required('Password is required'),
});

const PromoteModal = ({ open, onClose, role, staffId, onPromoteSuccess }: PromoteModalProps) => {
  const { showSnackbar } = useSnackbar();
  const handleSubmit = useCallback(
    async (values: { role: 'ADMIN' | 'STAFF'; password: string }) => {
      try {
        await promoteStaff(staffId, values.role, values.password);
        showSnackbar({
          message: 'Staff promoted successfully!',
          severity: 'success',
        });
        onPromoteSuccess?.();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to promote staff',
          severity: 'error',
        });
      }
    },
    [staffId, onPromoteSuccess, showSnackbar],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Promote Staff
        </Typography>
        <Formik
          initialValues={{
            role: role ?? 'STAFF',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role"
                  name="role"
                  value={values.role}
                  label="Role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                >
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="STAFF">STAFF</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <Typography color="error" variant="caption">
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                />
              </FormControl>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="primary" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PromoteModal;
