import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '../../state';
import { promoteStaff } from '../../repositories';
import React, { useCallback } from 'react';
import { type TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-labelledby="promote-dialog-title"
      aria-describedby="promote-dialog-description"
    >
      <DialogTitle id="promote-dialog-title" variant="h5">
        Promote Staff
      </DialogTitle>

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
            <DialogContent>
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
              <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PromoteModal;
