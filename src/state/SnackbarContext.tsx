import React, { useState, useCallback } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { SnackbarContext, type SnackbarOptions } from './useSnackbar';

function SlideTransition(props: any) {
  return <Slide {...props} direction="down" />;
}

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const showSnackbar = useCallback(
    ({ message, severity = 'success' }: SnackbarOptions) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(
    (_?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    },
    [],
  );

  const contextValue = React.useMemo(() => ({ showSnackbar }), [showSnackbar]);
  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          color={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};